-- Backfill pipeline scores for already imported Meta leads.
update meta_leads
set
  score = greatest(0, least(100,
    50
    + case
        when nullif(trim(coalesce(company, '')), '') is not null
          and trim(coalesce(company, '')) not in ('なし', '無し', '個人', '年金生活者です', '未入力', '-')
          then 20
        else -15
      end
    + case when nullif(trim(coalesce(phone, '')), '') is not null then 15 else -5 end
    + case when nullif(trim(coalesce(email, '')), '') is not null and lower(coalesce(email, '')) not like '%example.com%' then 10 else 0 end
    + case when lower(coalesce(campaign_name, '') || ' ' || coalesce(ad_name, '') || ' ' || coalesce(raw_fields::text, '')) like any (array['%テスト%', '%test%']) then -30 else 0 end
    + case when lower(coalesce(campaign_name, '') || ' ' || coalesce(ad_name, '') || ' ' || coalesce(raw_fields::text, '')) like any (array['%電話%', '%取りこぼし%', '%予約%', '%問い合わせ%']) then 5 else 0 end
    + case when lower(coalesce(campaign_name, '') || ' ' || coalesce(ad_name, '') || ' ' || coalesce(raw_fields::text, '')) like any (array['%店舗%', '%複数%', '%拠点%', '%フランチャイズ%']) then 10 else 0 end
    + case when lower(coalesce(campaign_name, '') || ' ' || coalesce(ad_name, '') || ' ' || coalesce(raw_fields::text, '')) like any (array['%清掃%', '%クリーニング%', '%ハウスクリーニング%', '%民泊%']) then 10 else 0 end
  )),
  score_reason = concat_ws(', ',
    case
      when nullif(trim(coalesce(company, '')), '') is not null
        and trim(coalesce(company, '')) not in ('なし', '無し', '個人', '年金生活者です', '未入力', '-')
        then '会社名あり'
      else '会社名なし/弱い'
    end,
    case when nullif(trim(coalesce(phone, '')), '') is not null then '電話番号あり' else '電話番号なし' end,
    case when nullif(trim(coalesce(email, '')), '') is not null and lower(coalesce(email, '')) not like '%example.com%' then 'メールあり' end,
    case when lower(coalesce(campaign_name, '') || ' ' || coalesce(ad_name, '') || ' ' || coalesce(raw_fields::text, '')) like any (array['%テスト%', '%test%']) then 'テスト疑い' end,
    case when lower(coalesce(campaign_name, '') || ' ' || coalesce(ad_name, '') || ' ' || coalesce(raw_fields::text, '')) like any (array['%電話%', '%取りこぼし%', '%予約%', '%問い合わせ%']) then '予約/問い合わせ改善ニーズ' end,
    case when lower(coalesce(campaign_name, '') || ' ' || coalesce(ad_name, '') || ' ' || coalesce(raw_fields::text, '')) like any (array['%店舗%', '%複数%', '%拠点%', '%フランチャイズ%']) then '複数拠点ニーズ' end,
    case when lower(coalesce(campaign_name, '') || ' ' || coalesce(ad_name, '') || ' ' || coalesce(raw_fields::text, '')) like any (array['%清掃%', '%クリーニング%', '%ハウスクリーニング%', '%民泊%']) then 'Pine対象業種' end
  ),
  pipeline_scored_at = now()
where leadgen_id is not null;
