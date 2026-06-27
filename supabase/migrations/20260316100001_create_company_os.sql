-- ============================================================
-- Company OS - State Machine
-- 全Engineの中央制御レイヤー
-- ============================================================

-- ============================================================
-- 1. companies テーブル（B2B事業者ライフサイクル）
-- ============================================================
CREATE TABLE IF NOT EXISTS public.companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- 基本情報
  name text NOT NULL,
  contact_name text,
  contact_email text,
  contact_phone text,
  website_url text,
  industry text,                -- ハウスクリーニング, 消防設備点検, etc.
  business text NOT NULL DEFAULT 'pine',  -- pine | ai_consulting | hp_meo

  -- ステータス（State Machine）
  status text NOT NULL DEFAULT 'lead'
    CHECK (status IN (
      'lead',        -- リード（問い合わせ段階）
      'trial',       -- トライアル中
      'customer',    -- 契約済み
      'active',      -- 利用安定
      'expanding',   -- 追加契約・拡大中
      'churn_risk',  -- チャーンリスク検知
      'churned',     -- 解約済み
      'lost'         -- 商談不成立
    )),

  -- リンク
  lead_id uuid REFERENCES public.leads(id),           -- 元のリード
  outreach_target_id uuid REFERENCES public.outreach_targets(id), -- アウトバウンド元
  pine_company_id text,       -- PineのSupabaseのcompany ID（外部参照）

  -- 契約情報
  plan text,                  -- プラン名
  mrr numeric DEFAULT 0,     -- 月額売上
  contracted_at timestamptz,  -- 契約日
  churned_at timestamptz,     -- 解約日

  -- メタデータ
  notes text,
  metadata jsonb DEFAULT '{}',

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_companies_status ON public.companies (status);
CREATE INDEX idx_companies_business ON public.companies (business);
CREATE INDEX idx_companies_lead_id ON public.companies (lead_id);
-- updated_at 自動更新（既存関数を再利用）
CREATE TRIGGER companies_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
-- RLS
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role full access" ON public.companies
  USING (auth.role() = 'service_role');
CREATE POLICY "anon read" ON public.companies
  FOR SELECT USING (auth.role() = 'anon');
-- ============================================================
-- 2. state_transitions テーブル（全テーブルの状態遷移ログ）
-- ============================================================
CREATE TABLE IF NOT EXISTS public.state_transitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- どのテーブルのどのレコードか
  entity_type text NOT NULL,  -- companies | leads | outreach_targets | cpo_requests
  entity_id uuid NOT NULL,

  -- 遷移内容
  from_status text,           -- NULL = 新規作成
  to_status text NOT NULL,

  -- コンテキスト
  triggered_by text,          -- agent名 or 'ayumu' or 'system'
  reason text,                -- 遷移理由
  metadata jsonb DEFAULT '{}',

  -- ルーティング結果
  routed_to text[],           -- トリガーされたEngine/Agent名の配列
  routing_errors text[],      -- ルーティング失敗時のエラー

  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_state_transitions_entity ON public.state_transitions (entity_type, entity_id);
CREATE INDEX idx_state_transitions_created ON public.state_transitions (created_at DESC);
CREATE INDEX idx_state_transitions_to_status ON public.state_transitions (entity_type, to_status);
-- RLS
ALTER TABLE public.state_transitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role full access" ON public.state_transitions
  USING (auth.role() = 'service_role');
CREATE POLICY "anon read" ON public.state_transitions
  FOR SELECT USING (auth.role() = 'anon');
-- ============================================================
-- 3. pg_net拡張を有効化（Supabaseで利用可能）
-- ============================================================
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
-- ============================================================
-- 4. DB Trigger: status変更を検知 → state_transitions記録 + company-os-router呼び出し
-- ============================================================

-- 汎用の状態遷移記録 + Edge Function HTTP呼び出し
CREATE OR REPLACE FUNCTION public.notify_state_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  _entity_type text;
  _old_status text;
  _new_status text;
  _transition_id uuid;
  _payload jsonb;
  _supabase_url text;
  _service_role_key text;
BEGIN
  -- テーブル名からentity_typeを決定
  _entity_type := TG_TABLE_NAME;

  -- INSERT時はfrom_status = NULL
  IF TG_OP = 'INSERT' THEN
    _old_status := NULL;
    _new_status := NEW.status;
  ELSIF TG_OP = 'UPDATE' THEN
    _old_status := OLD.status;
    _new_status := NEW.status;
    -- statusが変わっていなければ何もしない
    IF _old_status = _new_status THEN
      RETURN NEW;
    END IF;
  ELSE
    RETURN NEW;
  END IF;

  -- state_transitionsに記録
  INSERT INTO public.state_transitions (entity_type, entity_id, from_status, to_status, triggered_by)
  VALUES (_entity_type, NEW.id, _old_status, _new_status, 'system')
  RETURNING id INTO _transition_id;

  -- company-os-router Edge Functionを非同期HTTP呼び出し（pg_net）
  _payload := jsonb_build_object(
    'transition_id', _transition_id,
    'entity_type', _entity_type,
    'entity_id', NEW.id,
    'from_status', _old_status,
    'to_status', _new_status,
    'timestamp', now()
  );

  -- Supabase Edge Function URLを構築
  _supabase_url := current_setting('app.settings.supabase_url', true);
  _service_role_key := current_setting('app.settings.service_role_key', true);

  -- pg_net.http_postで非同期呼び出し（triggerをブロックしない）
  IF _supabase_url IS NOT NULL AND _service_role_key IS NOT NULL THEN
    PERFORM net.http_post(
      url := _supabase_url || '/functions/v1/company-os-router',
      body := _payload,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || _service_role_key
      )
    );
  END IF;

  RETURN NEW;
END;
$$;
-- companies テーブルにtrigger適用
CREATE TRIGGER companies_state_change
  AFTER INSERT OR UPDATE OF status ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.notify_state_change();
-- leads テーブルにtrigger適用
CREATE TRIGGER leads_state_change
  AFTER INSERT OR UPDATE OF status ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.notify_state_change();
-- outreach_targets テーブルにtrigger適用
CREATE TRIGGER outreach_targets_state_change
  AFTER INSERT OR UPDATE OF status ON public.outreach_targets
  FOR EACH ROW EXECUTE FUNCTION public.notify_state_change();
-- cpo_requests テーブルにtrigger適用
CREATE TRIGGER cpo_requests_state_change
  AFTER INSERT OR UPDATE OF status ON public.cpo_requests
  FOR EACH ROW EXECUTE FUNCTION public.notify_state_change();
