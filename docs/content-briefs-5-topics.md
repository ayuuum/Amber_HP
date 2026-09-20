# コンテンツブリーフ 25本（日本語メイン）

> 記事本文・PDF実装・事例ページ改修はスコープ外。執筆・公開前の企画台帳として使う。
> トーン・制約は `content/blog/_template/development.md` に準拠（結論ファースト、敬体、「暮らしを支える産業」、顧客名は原則匿名）。
> CTAは `docs/03-CTA自動最適化ルール.md` に準拠。問い合わせ `source` は `buildContactHref` 想定のメモ。

---

## 共通ルール

| 項目 | 方針 |
|------|------|
| 言語 | タイトル・アウトラインは日本語。英語KWは補助として併記 |
| タイトル | SEO向け・60文字以内・主KWを前方に配置 |
| 形式 | blog / guide / comparison / case study / tutorial |
| 段階 | awareness / consideration / decision |
| 情報収集系CTA | 無料チェックリスト／プレイブックDL（問い合わせ種別 `demo` 想定） |
| 比較・検討系CTA | 30分無料壁打ち相談 |
| 導入直前・事例系CTA | 事例ヒアリング or デモ予約 |

### 既存資産（カニバリ回避）

| 資産 | パス | 使い方 |
|------|------|--------|
| ブログ1本 | `/service/development/blog/ai-donyu-syogai-bosu` | 「導入失敗防止の総論」。Change Managementクラスタは定着・研修・役割に特化し重複を避ける |
| 事例：清掃OS | `/cases/cleaning-operations-os` | Field Service / データ連携の証明点 |
| 事例：消防設備 | `/cases/fire-equipment-digitalization` | Case Studies / 点検DXの証明点 |
| 事例：化学AI | `/cases/chemical-ai-standardization` | Change Management / AI定着の証明点 |

---

## A. Field Service Automation（現場業務の自動化）

### クラスタメタ

| 項目 | 内容 |
|------|------|
| 想定ペルソナ | 現場・施設オペレーション責任者／ソリューションを評価する技術バイヤー |
| コンテンツ角度 | 現場チーム向けセクタープレイブック（ワークフロー・KPI・パイロットチェックリスト） |
| ビジネスインパクト | 実務解を探すオペ責任者を集客。パイロットチェックリストDLでリード化し、Amberを実装寄りパートナーとして位置づける |
| 内部リンク方針 | A1→A2→A4 を主線。A5・E3 から `/cases/cleaning-operations-os` へ。A3 からサービスLP（AI & Software）へ |

### 英語補助KW対応

`field service automation` / `field service digital transformation` / `field service workflow` / `field service automation consultants` / `field service software implementation` / `field service automation pilot` / `book field service demo`

---

### A1. 現場業務の自動化とは？ワークフローとKPIの基本

| 項目 | 内容 |
|------|------|
| タイトル | 現場業務の自動化とは？ワークフローとKPIの基本 |
| 文字数 | 28 |
| 形式 | blog |
| バイヤー段階 | awareness |
| 主KW | 現場業務 自動化 |
| 補助KW | field service automation, field service workflow |
| 記事タイプ（CTAルール） | 情報収集 |
| 期待成果 / CTA | パイロットチェックリストDL（`source=blog-fsa-basics`） |
| CTA文言案 | 【無料DL】現場自動化パイロット開始前チェックリスト |

**アウトライン**

1. 現場業務自動化の定義（予約・割当・作業記録・報告・請求までの一連）
2. よくある分断（紙・LINE・Excel・個別SaaS）と手戻りの構造
3. 最低限追うKPI（初回解決率、移動時間、再訪問率、報告完了までの時間）
4. 「全部自動化」ではなく、ボトルネック1本から始める考え方
5. 次の一手：プレイブック（A2）とパイロット（A4）への導線

---

### A2. 現場DXプレイブック：導入前に決める5つの設計

| 項目 | 内容 |
|------|------|
| タイトル | 現場DXプレイブック：導入前に決める5つの設計 |
| 文字数 | 27 |
| 形式 | guide |
| バイヤー段階 | consideration |
| 主KW | 現場サービス DX |
| 補助KW | field service digital transformation, field service workflow |
| 記事タイプ（CTAルール） | 情報収集 |
| 期待成果 / CTA | 現場DXプレイブックDL（`source=blog-fsa-playbook`） |
| CTA文言案 | 【無料DL】現場DX導入前に決める5つの設計シート |

**アウトライン**

1. 対象業務の境界（パイロット範囲と対象外の明示）
2. 役割設計（現場・事務所・管理者・ベンダー）
3. データ項目の共通化（顧客・現場・作業・証跡）
4. 例外処理（緊急対応・再訪問・権限外作業）のルール
5. 成功指標と撤退条件（2〜4週間で見る数字）

---

### A3. 現場向けソフト比較：SaaSと業務基盤の選び方

| 項目 | 内容 |
|------|------|
| タイトル | 現場向けソフト比較：SaaSと業務基盤の選び方 |
| 文字数 | 28 |
| 形式 | comparison |
| バイヤー段階 | consideration |
| 主KW | 現場業務 ソフトウェア 導入 |
| 補助KW | field service software implementation, field service automation consultants |
| 記事タイプ（CTAルール） | 比較・検討 |
| 期待成果 / CTA | 30分無料壁打ち相談（`source=blog-fsa-compare`） |
| CTA文言案 | 【無料相談】SaaSか業務基盤か、30分で整理しませんか？ |

**アウトライン**

1. 比較軸（導入速度、カスタム度、連携、現場UI、総所有コスト）
2. パッケージSaaSが向くケース／向かないケース
3. 業務基盤（自社プロセスに合わせる）が向くケース
4. ベンダー評価で見る質問リスト（デモで確認すべき画面・例外フロー）
5. 決め方の進め方（PoC要件の書き方）

---

### A4. 現場自動化パイロット：2週間で回すチェックリスト

| 項目 | 内容 |
|------|------|
| タイトル | 現場自動化パイロット：2週間で回すチェックリスト |
| 文字数 | 29 |
| 形式 | tutorial |
| バイヤー段階 | decision |
| 主KW | 現場自動化 パイロット |
| 補助KW | field service automation pilot, book field service demo |
| 記事タイプ（CTAルール） | 情報収集（チェックリスト）＋導入直前寄りの導線 |
| 期待成果 / CTA | パイロット相談／デモ予約（`source=blog-fsa-pilot`、inquiry=`demo`） |
| CTA文言案 | 【デモ予約】2週間パイロットの範囲を一緒に切りませんか？ |

**アウトライン**

1. Day 0：対象チーム・現場・KPIの固定
2. Day 1–3：現行フローの観察とボトルネック1点の選定
3. Day 4–10：最小構成の実装／設定と現場テスト
4. Day 11–14：KPI比較、現場ヒアリング、拡大可否の判断
5. つまずきやすい点（端末、通信、権限、紙の並行運用）

---

### A5. 訪問・現場業務を統合した業務基盤の導入結果

| 項目 | 内容 |
|------|------|
| タイトル | 訪問・現場業務を統合した業務基盤の導入結果 |
| 文字数 | 28 |
| 形式 | case study |
| バイヤー段階 | decision |
| 主KW | 現場業務 事例 |
| 補助KW | field service case study（Eクラスタと相互リンク） |
| 記事タイプ（CTAルール） | 導入直前 |
| 期待成果 / CTA | 類似業種ヒアリング（`source=blog-fsa-case`） |
| CTA文言案 | 【事例ヒアリング】訪問・現場業務の統合事例について聞く |

**アウトライン**

1. 課題：予約・顧客・現場作業が分断されていた状態
2. 支援内容：業務フロー再設計と統合業務基盤
3. 変化の読み方（数値捏造を避け、定性＋検証可能な変化で記述）
4. 学び：パイロット範囲と定着の同時設計
5. 内部リンク：`/cases/cleaning-operations-os` 詳細へ

**差別化注記:** `/cases/cleaning-operations-os` の要約＋「オペ責任者向け読み方」に特化。事例ページの複製にしない。

---

## B. Data Integration（データ連携）

### クラスタメタ

| 項目 | 内容 |
|------|------|
| 想定ペルソナ | 技術バイヤー／インテグレーションエンジニア |
| コンテンツ角度 | API・ETL・RAGのパターン解説と Microsoft／Google 例 |
| ビジネスインパクト | 技術クエリで開発・情シス層を集客。営業会話用の構成例を提供 |
| 内部リンク方針 | B1→B2→B3 を技術線。B4→見積もり。B5・A5 から清掃／消防の連携文脈へ |

### 英語補助KW対応

`data integration patterns` / `connect legacy systems to cloud` / `RAG integration` / `data integration services` / `system integration consultants` / `hire data integration consultant` / `get integration estimate`

---

### B1. データ連携パターン入門：API・ETL・RAGの違い

| 項目 | 内容 |
|------|------|
| タイトル | データ連携パターン入門：API・ETL・RAGの違い |
| 文字数 | 28 |
| 形式 | blog |
| バイヤー段階 | awareness |
| 主KW | データ連携 パターン |
| 補助KW | data integration patterns |
| 記事タイプ（CTAルール） | 情報収集 |
| 期待成果 / CTA | 連携パターン早見表DL（`source=blog-di-patterns`） |
| CTA文言案 | 【無料DL】API・ETL・RAG 選び方早見表 |

**アウトライン**

1. なぜ「つなぐ」が先に詰まるのか（マスタ・権限・タイミング）
2. API連携：リアルタイム性・粒度・認証の要点
3. ETL／バッチ：大量・定期・品質チェック向き
4. RAG：文書知識を業務回答に載せる位置づけ（データ連携の一種としての境界）
5. パターン選定の最初の質問5つ

---

### B2. レガシーをクラウドへつなぐ設計ガイド（Microsoft／Google例）

| 項目 | 内容 |
|------|------|
| タイトル | レガシーをクラウドへつなぐ設計ガイド（Microsoft／Google例） |
| 文字数 | 38 |
| 形式 | guide |
| バイヤー段階 | consideration |
| 主KW | レガシー クラウド 連携 |
| 補助KW | connect legacy systems to cloud |
| 記事タイプ（CTAルール） | 比較・検討（設計選択肢の比較を含む） |
| 期待成果 / CTA | アーキテクチャ壁打ち（`source=blog-di-legacy`） |
| CTA文言案 | 【無料相談】レガシー連携の構成、30分で壁打ち |

**アウトライン**

1. 現状棚卸し（オンプレDB、ファイル、独自API、紙）
2. Microsoft系の典型パターン（例：Azure Integration / Power Platform 周辺の役割分担 ※製品押し売りにしない）
3. Google系の典型パターン（例：Cloud／Workspace 連携の考え方）
4. 認証・ネットワーク・エラー再試行の設計チェック
5. 「全部クラウド移行」ではなく段階接続のロードマップ

---

### B3. RAG連携の実装手順：社内文書を業務に載せる

| 項目 | 内容 |
|------|------|
| タイトル | RAG連携の実装手順：社内文書を業務に載せる |
| 文字数 | 27 |
| 形式 | tutorial |
| バイヤー段階 | consideration |
| 主KW | RAG 連携 |
| 補助KW | RAG integration |
| 記事タイプ（CTAルール） | 情報収集（手順） |
| 期待成果 / CTA | 技術相談（`source=blog-di-rag`） |
| CTA文言案 | 【技術相談】社内文書RAGの対象範囲を一緒に切る |

**アウトライン**

1. 対象文書の選定（鮮度・権限・責任部署）
2. 取り込み〜チャンク〜埋め込み〜検索の流れ
3. 回答品質の評価方法（正解セットと現場フィードバック）
4. ガバナンス（出典表示、更新、削除、監査）
5. よくある失敗（古い手順書、権限無視、チャット万能化）

---

### B4. データ連携サービス比較：内製・SIer・実装パートナー

| 項目 | 内容 |
|------|------|
| タイトル | データ連携サービス比較：内製・SIer・実装パートナー |
| 文字数 | 31 |
| 形式 | comparison |
| バイヤー段階 | decision |
| 主KW | データ連携 コンサル |
| 補助KW | data integration services, system integration consultants, hire data integration consultant |
| 記事タイプ（CTAルール） | 比較・検討 |
| 期待成果 / CTA | 見積もり相談（`source=blog-di-partner`、英語KW `get integration estimate` 相当） |
| CTA文言案 | 【見積相談】連携範囲と工数感を30分で整理 |

**アウトライン**

1. 比較軸（要件定義力、現場理解、保守、スピード、コスト構造）
2. 内製が向く条件と向かない条件
3. 大手SIer／実装パートナーの違い（意思決定の速さ・現場伴走）
4. RFPに書くべき連携要件の最小セット
5. 見積もりの読み方（初期／運用／変更コスト）

---

### B5. 点検・予約・顧客データをつないだ連携事例の読み方

| 項目 | 内容 |
|------|------|
| タイトル | 点検・予約・顧客データをつないだ連携事例の読み方 |
| 文字数 | 30 |
| 形式 | case study |
| バイヤー段階 | decision |
| 主KW | システム連携 事例 |
| 補助KW | data integration services（事例文脈） |
| 記事タイプ（CTAルール） | 導入直前 |
| 期待成果 / CTA | 連携見積もり（`source=blog-di-case`） |
| CTA文言案 | 【見積相談】点検・予約・顧客データの連携範囲を聞く |

**アウトライン**

1. 分断されていたデータ領域の整理（顧客・予約・現場実績）
2. どのパターン（API／バッチ／画面連携）を選んだかの観点
3. 前後で見る指標（手入力回数、報告遅延、問い合わせのたらい回し）
4. 技術より先に決めた業務ルール
5. 参照：`/cases/cleaning-operations-os` および消防事例の連携文脈

**差別化注記:** 事例ページの機能説明ではなく「連携設計の読み方」に特化。

---

## C. AI Agents（AIエージェント）

### クラスタメタ

| 項目 | 内容 |
|------|------|
| 想定ペルソナ | 技術バイヤー／デジタル変革責任者 |
| コンテンツ角度 | オペ向け実装パターン、アーキテクチャ、ガバナンスチェックリスト |
| ビジネスインパクト | 実現性・ガバナンス検索を取り込み、現代的なエージェント実装で差別化 |
| 内部リンク方針 | C1→C2→C3。C4でパートナー選定。C5からパイロット相談。研修LP（エージェント言及）へ必要時リンク |

### 英語補助KW対応

`ai agents for business` / `agent architecture` / `ai agent governance` / `ai agent implementation partners` / `enterprise ai agent services` / `ai agent pilot consultation` / `book ai integration demo`

---

### C1. 業務向けAIエージェントとは？できることと限界

| 項目 | 内容 |
|------|------|
| タイトル | 業務向けAIエージェントとは？できることと限界 |
| 文字数 | 28 |
| 形式 | blog |
| バイヤー段階 | awareness |
| 主KW | AIエージェント 業務 |
| 補助KW | ai agents for business |
| 記事タイプ（CTAルール） | 情報収集 |
| 期待成果 / CTA | 適性チェックリストDL（`source=blog-agent-basics`） |
| CTA文言案 | 【無料DL】業務AIエージェント適性チェックリスト |

**アウトライン**

1. チャットボット／自動化／エージェントの違い
2. 向く業務（手順が明確、ツール操作、例外が限定的）
3. 向かない業務（曖昧な責任、高リスク単独判断）
4. 人間との役割分担（提案・実行・承認）
5. 次の一手：アーキテクチャ（C2）とガバナンス（C3）

---

### C2. エージェントアーキテクチャ：ツール・権限・監査の設計

| 項目 | 内容 |
|------|------|
| タイトル | エージェントアーキテクチャ：ツール・権限・監査の設計 |
| 文字数 | 31 |
| 形式 | guide |
| バイヤー段階 | consideration |
| 主KW | エージェント アーキテクチャ |
| 補助KW | agent architecture |
| 記事タイプ（CTAルール） | 情報収集（設計ガイド）＋壁打ち導線可 |
| 期待成果 / CTA | 設計レビュー相談（`source=blog-agent-arch`） |
| CTA文言案 | 【無料相談】ツール・権限・監査の設計を30分レビュー |

**アウトライン**

1. 構成要素（LLM、ツール、メモリ、オーケストレーション）
2. ツール接続の原則（最小権限、入出力スキーマ）
3. 権限モデル（誰の代理で動くか、昇格の禁止）
4. 監査ログ（何を・いつ・どの根拠で実行したか）
5. 失敗時ハンドオフ（人間へのエスカレーション）

---

### C3. AIエージェント導入チェック：ガバナンス10項目

| 項目 | 内容 |
|------|------|
| タイトル | AIエージェント導入チェック：ガバナンス10項目 |
| 文字数 | 28 |
| 形式 | tutorial |
| バイヤー段階 | consideration |
| 主KW | AIエージェント ガバナンス |
| 補助KW | ai agent governance |
| 記事タイプ（CTAルール） | 情報収集（チェックリスト） |
| 期待成果 / CTA | ガバナンス雛形DL（`source=blog-agent-gov`） |
| CTA文言案 | 【無料DL】AIエージェントガバナンス10項目チェック |

**アウトライン**

1. 利用目的と禁止事項の文書化
2. データ分類（顧客情報・社外秘・公開）と取扱い
3. 承認フロー（自動実行の上限）
4. 評価指標（正確性、完了率、エスカレーション率）
5. インシデント対応とモデル／プロンプト変更管理

---

### C4. AIエージェント実装パートナーの選び方と比較軸

| 項目 | 内容 |
|------|------|
| タイトル | AIエージェント実装パートナーの選び方と比較軸 |
| 文字数 | 29 |
| 形式 | comparison |
| バイヤー段階 | decision |
| 主KW | AIエージェント 実装 |
| 補助KW | ai agent implementation partners, enterprise ai agent services |
| 記事タイプ（CTAルール） | 比較・検討 |
| 期待成果 / CTA | パートナー選定壁打ち（`source=blog-agent-partner`） |
| CTA文言案 | 【無料相談】実装パートナー比較軸を30分で整理 |

**アウトライン**

1. 比較軸（業務理解、セキュリティ設計、運用引き継ぎ、現場定着）
2. デモで見抜くポイント（例外処理、権限、ログ）
3. 「モデル自慢」だけベンダーの危険信号
4. 契約・責任分界（誰が運用し、誰が改善するか）
5. Amberの位置づけ（Essential Industries向け実装伴走）※売り込み過多にしない

---

### C5. 現場オペでエージェントを試したパイロット設計例

| 項目 | 内容 |
|------|------|
| タイトル | 現場オペでエージェントを試したパイロット設計例 |
| 文字数 | 28 |
| 形式 | case study |
| バイヤー段階 | decision |
| 主KW | AIエージェント パイロット |
| 補助KW | ai agent pilot consultation, book ai integration demo |
| 記事タイプ（CTAルール） | 導入直前 |
| 期待成果 / CTA | パイロット相談／デモ（`source=blog-agent-pilot`、inquiry=`demo`） |
| CTA文言案 | 【デモ予約】現場オペ向けエージェントパイロットを相談 |

**アウトライン**

1. パイロットの業務例（照会、下書き、手配候補提示など）
2. 成功指標とガードレールのセット設計
3. 2〜4週間の進め方（対象ユーザー、フィードバック会議）
4. 結果の読み方（自動化率より「手戻り削減」を優先する理由）
5. 拡大判断のチェックリスト

**差別化注記:** 架空KPIを作らない。既存事例がある場合は定性的学習に留め、数値は検証可能なもののみ。

---

## D. Change Management（変化管理・定着）

### クラスタメタ

| 項目 | 内容 |
|------|------|
| 想定ペルソナ | HR / L&D／現場・施設オペレーション責任者 |
| コンテンツ角度 | AI＋ソフト導入の研修計画・ガバナンス・役割設計プレイブック |
| ビジネスインパクト | 「現場が使わない」「現場が止まる」という反論に答え、パイロット開始の心理的ハードルを下げる |
| 内部リンク方針 | D1→D2→D3。D4で伴走比較。D5→`/cases/chemical-ai-standardization`。既存記事 `ai-donyu-syogai-bosu` へ「導入総論はこちら」と相互リンク |

### 英語補助KW対応

`change management for ai` / `digital adoption playbook` / `training plan for new software` / `digital adoption services` / `ai rollout partner` / `book adoption workshop` / `get adoption estimate`

### 既存記事との差別化

| 既存 | 本クラスタ |
|------|------------|
| `ai-donyu-syogai-bosu`：導入失敗防止の総論・段階導入 | 定着・研修計画・役割設計・ロールアウト伴走に特化 |

---

### D1. AI導入で現場が動かない理由と変化管理の基本

| 項目 | 内容 |
|------|------|
| タイトル | AI導入で現場が動かない理由と変化管理の基本 |
| 文字数 | 28 |
| 形式 | blog |
| バイヤー段階 | awareness |
| 主KW | AI チェンジマネジメント |
| 補助KW | change management for ai |
| 記事タイプ（CTAルール） | 情報収集 |
| 期待成果 / CTA | 定着チェックリストDL（`source=blog-cm-basics`） |
| CTA文言案 | 【無料DL】AI導入・現場定着チェックリスト |

**アウトライン**

1. 「動かない」の典型パターン（時間がない、意味が分からない、評価されない）
2. ツール問題と組織問題の切り分け
3. 変化管理の最小セット（目的・役割・練習・フィードバック）
4. 現場リーダーを巻き込むタイミング
5. 次の一手：プレイブック（D2）

---

### D2. デジタル定着プレイブック：研修・役割・ガバナンス

| 項目 | 内容 |
|------|------|
| タイトル | デジタル定着プレイブック：研修・役割・ガバナンス |
| 文字数 | 30 |
| 形式 | guide |
| バイヤー段階 | consideration |
| 主KW | デジタル定着 プレイブック |
| 補助KW | digital adoption playbook, digital adoption services |
| 記事タイプ（CTAルール） | 情報収集 |
| 期待成果 / CTA | プレイブックDL（`source=blog-cm-playbook`） |
| CTA文言案 | 【無料DL】デジタル定着プレイブック（研修・役割・統治） |

**アウトライン**

1. 定着の定義（利用率ではなく業務成果指標）
2. 役割設計（スポンサー、チャンピオン、現場トレーナー）
3. 研修の段階（知る→使う→教える→改善する）
4. ガバナンス（変更管理、問い合わせ窓口、改善バックログ）
5. 90日プランの骨格

---

### D3. 新ソフト研修計画の作り方（現場リーダー向け）

| 項目 | 内容 |
|------|------|
| タイトル | 新ソフト研修計画の作り方（現場リーダー向け） |
| 文字数 | 27 |
| 形式 | tutorial |
| バイヤー段階 | consideration |
| 主KW | 新ソフト 研修計画 |
| 補助KW | training plan for new software |
| 記事タイプ（CTAルール） | 情報収集（手順） |
| 期待成果 / CTA | 研修計画テンプレDL（`source=blog-cm-training`） |
| CTA文言案 | 【無料DL】現場リーダー向け・新ソフト研修計画テンプレ |

**アウトライン**

1. 研修ゴールの書き方（操作習得ではなく業務完了）
2. 対象別カリキュラム（新人／既存／管理者）
3. 現場での練習環境（本番データを使わないルール）
4. 定着フォロー（1週間後・1か月後の確認項目）
5. よくある失敗（一斉座学だけ、マニュアル配布だけ）

---

### D4. AIロールアウト伴走の選び方：研修会社 vs 実装伴走

| 項目 | 内容 |
|------|------|
| タイトル | AIロールアウト伴走の選び方：研修会社 vs 実装伴走 |
| 文字数 | 31 |
| 形式 | comparison |
| バイヤー段階 | decision |
| 主KW | AI導入 パートナー |
| 補助KW | ai rollout partner, book adoption workshop |
| 記事タイプ（CTAルール） | 比較・検討 |
| 期待成果 / CTA | 定着ワークショップ予約（`source=blog-cm-partner`） |
| CTA文言案 | 【ワークショップ予約】定着伴走の型を90分で設計 |

**アウトライン**

1. 研修会社が強い領域／弱い領域
2. 実装伴走が強い領域／弱い領域
3. 組み合わせ patron（研修×実装）の判断基準
4. 見積もりの内訳（設計・研修・現場同行・改善）
5. 選定質問リスト

---

### D5. 大規模組織のAI活用基盤で定着が進んだポイント

| 項目 | 内容 |
|------|------|
| タイトル | 大規模組織のAI活用基盤で定着が進んだポイント |
| 文字数 | 28 |
| 形式 | case study |
| バイヤー段階 | decision |
| 主KW | AI導入 定着 事例 |
| 補助KW | change management for ai（事例）, get adoption estimate |
| 記事タイプ（CTAルール） | 導入直前 |
| 期待成果 / CTA | 定着見積もり相談（`source=blog-cm-case`） |
| CTA文言案 | 【見積相談】部門横断の定着プログラムを相談 |

**アウトライン**

1. 課題：部門ごとのツール・使い方のばらつき
2. 支援：業務棚卸し、テーマ設計、内製化プログラム、推進体制
3. 定着が進んだ要因（共通の使い方、推進役、学習の仕組み）
4. 他社が真似できるチェック項目
5. 詳細：`/cases/chemical-ai-standardization`

**差別化注記:** 事例ページの要約＋「定着観点の読み方」。数値KPIの捏造禁止（`data/cases.ts` の outcomes 方針に合わせる）。

---

## E. Case Studies（事例・調達向け証明）

### クラスタメタ

| 項目 | 内容 |
|------|------|
| 想定ペルソナ | 現場・施設オペレーション責任者／調達・購買 |
| コンテンツ角度 | 指標ドリブン、利用技術明示、前後KPI・証言（必要な場合のみ匿名） |
| ビジネスインパクト | 調査→問い合わせの転換を上げる。調達が求める証跡でリスク認知を下げる |
| 内部リンク方針 | E1→E2→E3。E4→`/cases/fire-equipment-digitalization`。E5で問い合わせ導線。A5/B5/D5 と相互リンク |

### 英語補助KW対応

`field service case study` / `ai implementation case study` / `maintenance digital transformation case` / `ai implementation case studies` / `digital transformation case study` / `request case study` / `contact for case study demo`

---

### E1. デジタル変革事例の読み方：見るべきKPIと落とし穴

| 項目 | 内容 |
|------|------|
| タイトル | デジタル変革事例の読み方：見るべきKPIと落とし穴 |
| 文字数 | 28 |
| 形式 | blog |
| バイヤー段階 | awareness |
| 主KW | デジタル変革 事例 |
| 補助KW | digital transformation case study |
| 記事タイプ（CTAルール） | 情報収集 |
| 期待成果 / CTA | KPI見方ガイドDL（`source=blog-cs-howto`） |
| CTA文言案 | 【無料DL】DX事例のKPI見方ガイド |

**アウトライン**

1. 事例ページで最初に確認する項目（業種、業務範囲、期間、 anonymize 有無）
2. 見るべきKPI（時間、品質、手戻り、定着）と見なくてよい見た目指標
3. よくある誇張・欠落（Before不明、対象範囲のすり替わり）
4. 自社への当てはめ質問3つ
5. `/cases` 一覧への導線

---

### E2. 調達向け：AI導入事例の比較チェックシート

| 項目 | 内容 |
|------|------|
| タイトル | 調達向け：AI導入事例の比較チェックシート |
| 文字数 | 26 |
| 形式 | guide |
| バイヤー段階 | consideration |
| 主KW | AI導入 事例 |
| 補助KW | ai implementation case studies, ai implementation case study |
| 記事タイプ（CTAルール） | 情報収集 |
| 期待成果 / CTA | チェックシートDL（`source=blog-cs-procurement`） |
| CTA文言案 | 【無料DL】調達向け・AI導入事例比較チェックシート |

**アウトライン**

1. 調達が確認すべき証跡（範囲、責任分界、セキュリティ、保守）
2. ベンダー提示事例の比較表テンプレ
3. 匿名事例の扱い方（何が分かり、何が分からないか）
4. 追加質問リスト（参照可能な範囲の確認）
5. 次工程：詳細デモ／ヒアリング（E5）

---

### E3. 現場DX事例3類型：点検・清掃・AI定着の違い

| 項目 | 内容 |
|------|------|
| タイトル | 現場DX事例3類型：点検・清掃・AI定着の違い |
| 文字数 | 28 |
| 形式 | comparison |
| バイヤー段階 | consideration |
| 主KW | 現場 デジタル化 事例 |
| 補助KW | field service case study, maintenance digital transformation case |
| 記事タイプ（CTAルール） | 比較・検討 |
| 期待成果 / CTA | 業種マッチ相談（`source=blog-cs-types`） |
| CTA文言案 | 【無料相談】自社に近い事例類型を30分で照合 |

**アウトライン**

1. 類型A：設備点検の業務基盤再構築（消防）
2. 類型B：訪問・現場業務の統合（清掃／Field Services）
3. 類型C：大規模組織のAI活用定着（素材・化学）
4. 自社課題から類型を選ぶ早見表
5. 各 `/cases/{slug}` への内部リンク

---

### E4. 消防設備点検の業務基盤再構築：前後KPIの見方

| 項目 | 内容 |
|------|------|
| タイトル | 消防設備点検の業務基盤再構築：前後KPIの見方 |
| 文字数 | 28 |
| 形式 | case study |
| バイヤー段階 | decision |
| 主KW | 設備点検 デジタル化 事例 |
| 補助KW | maintenance digital transformation case |
| 記事タイプ（CTAルール） | 導入直前 |
| 期待成果 / CTA | 事例デモ／詳細請求（`source=blog-cs-fire`、inquiry=`demo`） |
| CTA文言案 | 【事例詳細】消防設備点検の業務基盤事例を聞く |

**アウトライン**

1. Before：紙帳票・スケジュール分断
2. 支援：フロー再設計、報告デジタル化、スケジュール整備
3. Afterの読み方（進行中案件としての記述ルール、捏造しない）
4. 調達・オペが追加で聞くべき質問
5. 詳細ページ：`/cases/fire-equipment-digitalization`

**差別化注記:** 事例詳細ページのコピーではなく「KPIの読み方・質問の仕方」コンテンツ。

---

### E5. 事例ヒアリング依頼の進め方：質問項目と準備物

| 項目 | 内容 |
|------|------|
| タイトル | 事例ヒアリング依頼の進め方：質問項目と準備物 |
| 文字数 | 28 |
| 形式 | tutorial |
| バイヤー段階 | decision |
| 主KW | 事例 デモ 依頼 |
| 補助KW | request case study, contact for case study demo |
| 記事タイプ（CTAルール） | 導入直前 |
| 期待成果 / CTA | 事例デモ予約／問い合わせ（`source=blog-cs-request`、inquiry=`demo`） |
| CTA文言案 | 【予約】事例ヒアリング／デモを依頼する |

**アウトライン**

1. 依頼前に社内で揃える情報（対象業務、制約、決裁タイミング）
2. ベンダーへの質問項目（範囲、期間、定着、保守、セキュリティ）
3. デモで見る画面・例外フローのチェック
4. 匿名事例でも確認できること／できないこと
5. 問い合わせ時の書き方例（`/contact`、inquiry=`demo`）

---

## CTA整合チェック（docs/03）

| ID | 形式 | 判定タイプ | 推奨CTA | 本ブリーフのCTA | 整合 |
|----|------|------------|---------|-----------------|------|
| A1 | blog | 情報収集 | チェックリストDL | パイロットチェックリストDL | OK |
| A2 | guide | 情報収集 | チェックリスト／資料DL | プレイブックDL | OK |
| A3 | comparison | 比較・検討 | 30分壁打ち | 30分壁打ち | OK |
| A4 | tutorial | 情報収集＋導入直前 | DL＋デモ | パイロット相談／デモ | OK（DL誘導を本文内、末尾デモ） |
| A5 | case study | 導入直前 | 事例ヒアリング | 類似業種ヒアリング | OK |
| B1 | blog | 情報収集 | DL | 早見表DL | OK |
| B2 | guide | 比較・検討寄りの設計 | 壁打ち | アーキテクチャ壁打ち | OK |
| B3 | tutorial | 情報収集 | DL／相談 | 技術相談 | OK（手順記事のため相談可） |
| B4 | comparison | 比較・検討 | 壁打ち | 見積もり相談 | OK |
| B5 | case study | 導入直前 | 事例ヒアリング | 連携見積もり | OK |
| C1 | blog | 情報収集 | DL | 適性チェックリストDL | OK |
| C2 | guide | 情報収集／検討 | 壁打ち可 | 設計レビュー相談 | OK |
| C3 | tutorial | 情報収集 | DL | ガバナンス雛形DL | OK |
| C4 | comparison | 比較・検討 | 壁打ち | パートナー選定壁打ち | OK |
| C5 | case study | 導入直前 | 事例／デモ | パイロット相談／デモ | OK |
| D1 | blog | 情報収集 | DL | 定着チェックリストDL | OK |
| D2 | guide | 情報収集 | DL | プレイブックDL | OK |
| D3 | tutorial | 情報収集 | DL | 研修計画テンプレDL | OK |
| D4 | comparison | 比較・検討 | 壁打ち | 定着ワークショップ予約 | OK |
| D5 | case study | 導入直前 | 事例ヒアリング | 定着見積もり相談 | OK |
| E1 | blog | 情報収集 | DL | KPI見方ガイドDL | OK |
| E2 | guide | 情報収集 | DL | チェックシートDL | OK |
| E3 | comparison | 比較・検討 | 壁打ち | 業種マッチ相談 | OK |
| E4 | case study | 導入直前 | 事例ヒアリング | 事例デモ／詳細請求 | OK |
| E5 | tutorial | 導入直前 | 事例／デモ | 事例デモ予約 | OK |

### 実装メモ（将来・本ドキュメントスコープ外）

- チェックリストDLの専用フローは未実装。当面は問い合わせ `inquiry=demo` ＋本文内リストで代替可。
- 記事公開時は `content/blog/development/` に Markdown 追加し、末尾 `InquiryCTA` の文言を上表CTAに合わせる。
- `source` クエリは計測用。命名は上表のまま統一推奨。

---

## 一覧（25本）

| ID | 段階 | 形式 | タイトル | 主KW |
|----|------|------|----------|------|
| A1 | awareness | blog | 現場業務の自動化とは？ワークフローとKPIの基本 | 現場業務 自動化 |
| A2 | consideration | guide | 現場DXプレイブック：導入前に決める5つの設計 | 現場サービス DX |
| A3 | consideration | comparison | 現場向けソフト比較：SaaSと業務基盤の選び方 | 現場業務 ソフトウェア 導入 |
| A4 | decision | tutorial | 現場自動化パイロット：2週間で回すチェックリスト | 現場自動化 パイロット |
| A5 | decision | case study | 訪問・現場業務を統合した業務基盤の導入結果 | 現場業務 事例 |
| B1 | awareness | blog | データ連携パターン入門：API・ETL・RAGの違い | データ連携 パターン |
| B2 | consideration | guide | レガシーをクラウドへつなぐ設計ガイド（Microsoft／Google例） | レガシー クラウド 連携 |
| B3 | consideration | tutorial | RAG連携の実装手順：社内文書を業務に載せる | RAG 連携 |
| B4 | decision | comparison | データ連携サービス比較：内製・SIer・実装パートナー | データ連携 コンサル |
| B5 | decision | case study | 点検・予約・顧客データをつないだ連携事例の読み方 | システム連携 事例 |
| C1 | awareness | blog | 業務向けAIエージェントとは？できることと限界 | AIエージェント 業務 |
| C2 | consideration | guide | エージェントアーキテクチャ：ツール・権限・監査の設計 | エージェント アーキテクチャ |
| C3 | consideration | tutorial | AIエージェント導入チェック：ガバナンス10項目 | AIエージェント ガバナンス |
| C4 | decision | comparison | AIエージェント実装パートナーの選び方と比較軸 | AIエージェント 実装 |
| C5 | decision | case study | 現場オペでエージェントを試したパイロット設計例 | AIエージェント パイロット |
| D1 | awareness | blog | AI導入で現場が動かない理由と変化管理の基本 | AI チェンジマネジメント |
| D2 | consideration | guide | デジタル定着プレイブック：研修・役割・ガバナンス | デジタル定着 プレイブック |
| D3 | consideration | tutorial | 新ソフト研修計画の作り方（現場リーダー向け） | 新ソフト 研修計画 |
| D4 | decision | comparison | AIロールアウト伴走の選び方：研修会社 vs 実装伴走 | AI導入 パートナー |
| D5 | decision | case study | 大規模組織のAI活用基盤で定着が進んだポイント | AI導入 定着 事例 |
| E1 | awareness | blog | デジタル変革事例の読み方：見るべきKPIと落とし穴 | デジタル変革 事例 |
| E2 | consideration | guide | 調達向け：AI導入事例の比較チェックシート | AI導入 事例 |
| E3 | consideration | comparison | 現場DX事例3類型：点検・清掃・AI定着の違い | 現場 デジタル化 事例 |
| E4 | decision | case study | 消防設備点検の業務基盤再構築：前後KPIの見方 | 設備点検 デジタル化 事例 |
| E5 | decision | tutorial | 事例ヒアリング依頼の進め方：質問項目と準備物 | 事例 デモ 依頼 |
