# お問い合わせフォーム：Google Sheets + メール通知のセットアップ

お問い合わせ内容を **Google スプレッドシートに保存**し、同時に **メールで通知**を受け取るための Google Apps Script (GAS) の設定手順です。無料で利用できます。

---

## 1. Google スプレッドシートの準備

1. [Google スプレッドシート](https://sheets.google.com) で新しいスプレッドシートを作成します。
2. 1行目に次のヘッダーを入力します（A1〜G1）：

   | A | B | C | D | E | F | G |
   |---|----|-----|------|----------|----------|--------|
   | 送信日時 | お名前 | 会社名 | メールアドレス | 電話番号 | お問い合わせ種別 | メッセージ |

---

## 2. Google Apps Script の作成

1. スプレッドシートのメニューで **拡張機能** → **Apps Script** をクリックします。
2. 開いたエディタの `Code.gs` の内容を **すべて削除**し、以下のスクリプトに **置き換え**ます。

```javascript
// 通知先メールアドレス（受け取りたいアドレスに変更してください）
const NOTIFICATION_EMAIL = 'your-email@example.com';

function doPost(e) {
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);

  try {
    const body = e.postData ? JSON.parse(e.postData.contents) : {};
    const name = body.name || '';
    const company = body.company || '';
    const email = body.email || '';
    const phone = body.phone || '';
    const inquiryType = body.inquiryType || 'general';
    const message = body.message || '';

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const timestamp = new Date();
    sheet.appendRow([timestamp, name, company, email, phone, inquiryType, message]);

    const inquiryTypeLabel = {
      general: '一般的なお問い合わせ',
      demo: 'デモ依頼',
      consulting: '顧問相談',
      service: 'サービスについて'
    }[inquiryType] || inquiryType;

    const subject = '【お問い合わせ】' + (name ? name + ' 様' : '') + ' - ' + inquiryTypeLabel;
    const emailBody = [
      '以下の内容でお問い合わせがありました。',
      '',
      '---',
      '送信日時: ' + timestamp.toLocaleString('ja-JP'),
      'お名前: ' + name,
      '会社名: ' + company,
      'メールアドレス: ' + email,
      '電話番号: ' + phone,
      'お問い合わせ種別: ' + inquiryTypeLabel,
      '',
      '【メッセージ】',
      message
    ].join('\n');

    GmailApp.sendEmail(NOTIFICATION_EMAIL, subject, emailBody);

    output.setContent(JSON.stringify({ success: true }));
    return output;
  } catch (err) {
    console.error(err);
    output.setContent(JSON.stringify({ success: false, error: String(err) }));
    return output;
  }
}
```

3. **4行目**の `NOTIFICATION_EMAIL` を、問い合わせを受け取りたいメールアドレスに変更します。
4. エディタ上部の **保存** アイコンをクリックして保存します。プロジェクト名は任意（例: 「お問い合わせフォーム」）で構いません。

---

## 3. Web アプリとしてデプロイ

1. エディタ右上の **デプロイ** → **新しいデプロイ** をクリックします。
2. **種類を選択** の横の歯車アイコン → **Web アプリ** を選びます。
3. 次のように設定します：
   - **説明**: 任意（例: 「お問い合わせ受信」）
   - **次のユーザーとして実行**: **自分**
   - **アクセスできるユーザー**: **全員**（※外部のサイトから POST するため「全員」が必要です）
4. **デプロイ** をクリックします。
5. **Web アプリの URL** が表示されます。この URL をコピーします（例: `https://script.google.com/macros/s/xxxxx/exec`）。

---

## 4. スプレッドシートの1行目（ヘッダー）の確認

スクリプトは **アクティブなシート** の次の空行に追記します。1行目がヘッダーになるよう、次のようにしてください。

| A | B | C | D | E | F | G |
|---|----|-----|------|----------|----------|--------|
| 送信日時 | お名前 | 会社名 | メールアドレス | 電話番号 | お問い合わせ種別 | メッセージ |

Apps Script を開いたときの「このスプレッドシートのアクティブなシート」が、この表があるシートになっていれば問題ありません。

---

## 5. 環境変数の設定

1. プロジェクトの `.env.local` に、コピーした Web アプリの URL を設定します：

```env
CONTACT_FORM_WEBHOOK_URL=https://script.google.com/macros/s/あなたのID/exec
```

2. Vercel にデプロイしている場合は、Vercel のプロジェクト設定 → **Environment Variables** で `CONTACT_FORM_WEBHOOK_URL` を同じ URL で追加します。

---

## 6. 動作確認

1. サイトのお問い合わせフォームからテスト送信します。
2. スプレッドシートに1行追加されていることを確認します。
3. 設定したメールアドレスに通知メールが届いていることを確認します。

---

## トラブルシューティング

- **「送信に失敗しました」と表示される**
  - `CONTACT_FORM_WEBHOOK_URL` が正しく設定されているか確認してください。
  - GAS の「アクセスできるユーザー」が **全員** になっているか確認してください。
  - GAS の「実行ログ」や「実行数」でエラーが出ていないか確認してください。

- **スプレッドシートに追記されない**
  - Apps Script の「実行するアプリ」が、該当のスプレッドシートを開いた状態でデプロイした Web アプリか確認してください。
  - 正しいシート（1行目がヘッダーのシート）が「アクティブなシート」になっているか確認してください。

- **メールが届かない**
  - `NOTIFICATION_EMAIL` が正しいアドレスか確認してください。
  - Gmail の「迷惑メール」フォルダも確認してください。
  - GAS を初めて使う場合、最初の実行時に「権限の承認」が必要です。デプロイ後、一度ブラウザから GAS の URL にアクセスして承認すると、以降はメールが送信されます。

---

## セキュリティの注意

- Web アプリの URL は **誰でも POST できる状態**です。必要に応じて、GAS 側で簡易トークンやリファラチェックを追加することを検討してください。
- `CONTACT_FORM_WEBHOOK_URL` はサーバー側の環境変数のみで使用し、クライアントに露出しないようにしてください（現在の実装では API Route 経由のため問題ありません）。
