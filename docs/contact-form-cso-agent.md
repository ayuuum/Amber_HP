# お問い合わせフォーム：CSO Agent 連携セットアップ

お問い合わせフォーム（`/api/contact`）は **Amber CSO Agent**（Supabase Edge Function）に転送されます。CSO Agent 側で以下を一括処理します。

1. Supabase `leads` テーブルに保存
2. 企業リサーチ（Firecrawl + Exa.ai、結果は7日キャッシュ）
3. ナレッジベースから関連ドキュメント引き当て
4. Claude で返信メールドラフト生成
5. `tasks` テーブルにフォロータスク登録
6. Slack に「✅ このまま送信 / ⏭️ スキップ」ボタン付きで通知
7. （Slack で「送信」承認後）Resend でメール自動返信

## 必須環境変数（Vercel Production）

| 変数名 | 役割 |
|---|---|
| `CSO_AGENT_URL` | `https://<project>.supabase.co/functions/v1/cso-agent` |
| `CSO_AGENT_SECRET` | Supabase 側の `AMBER_WEBHOOK_SECRET` と一致する値 |
| `CSO_AGENT_ANON_KEY` | Supabase の anon キー（Edge Function ゲートウェイ用） |

## Supabase 側の必須環境変数（cso-agent）

| 変数名 | 用途 | 無い時の挙動 |
|---|---|---|
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | leads / tasks への INSERT | **必須**（無いとクラッシュ） |
| `AMBER_WEBHOOK_SECRET` | HP からの認証 | **必須**（無いと401） |
| `SLACK_WEBHOOK_URL` | Slack 通知 | 通知スキップ |
| `ANTHROPIC_API_KEY` | AI返信生成 | テンプレ文にフォールバック |
| `FIRECRAWL_API_KEY` | 企業リサーチ | スキップ |
| `EXA_API_KEY` | 企業ニュース | スキップ |
| `RESEND_API_KEY` | 自動返信メール | Slack 承認後の送信スキップ |

最小構成（Supabase + Slack のみ）なら、最初の3つ + `SLACK_WEBHOOK_URL` だけセットすれば動く。

## 動作確認

```bash
curl -i https://www.amber-inc.com/api/contact \
  -X POST -H "Content-Type: application/json" \
  -d '{"name":"テスト","email":"test@example.com","inquiryType":"general","message":"動作確認"}'
```

- 200 + `{"success":true}` が返ること
- Supabase `leads` テーブルに1行追加されていること
- Slack（CSO Agent 側で設定された Webhook 先）に通知が届くこと

## トラブルシューティング

- **500 が返る**
  - Vercel env に `CSO_AGENT_*` の3つが揃っているか確認
  - Vercel のログ（Functions タブ → `/api/contact`）で `CSO Agent error` または `missing` を確認

- **CSO Agent 側で 401**
  - HP の `CSO_AGENT_SECRET` と Supabase の `AMBER_WEBHOOK_SECRET` が一致しているか

- **Slack に通知が来ない**
  - Supabase 側 `SLACK_WEBHOOK_URL` の有無を確認

- **応答が遅い（30〜60秒）**
  - 仕様。初回のFirecrawl/Exa/Claudeコール込みで最大60秒。フロントは「送信中…」表示で吸収。
  - 速くしたい場合は CSO Agent をキューイング化（後続改善）
