# 🌐 Translate Toggle Extension

This feature uses Google Translate to translate pages instantly. It operates as a lightweight Chrome extension, allowing you to seamlessly toggle between the original text and the translated text using shortcut keys.

> **Note:** Currently, this extension supports **English ⇒ Japanese only**.AND PC Beowser Only.NO Smartphone application.

---

## ✨ Features 使い方

Instantly translate and restore web pages using simple keyboard shortcuts or the on-screen toggle switch.
ショートカットキー、または画面上のスイッチで瞬時に翻訳・原文復元が可能です。

* **"Ctrl + Q"** : Translate to Japanese 原文 ⇒ 日本語翻訳
* **"Ctrl + Shift + Q"** : Restore to Original 日本語翻訳 ⇒ 原文復元

---

## 🚀 Installation インストール手順

It's super easy to install! Just follow these steps:
使い方はとても簡単です。以下の手順に従ってください。

1. Create a new folder on your Desktop.
   デスクトップに新しいフォルダを作成します。
2. Save "manifest.json" and "content.js" into that folder.
  "manifest.json" と "content.js" をそのフォルダに保存します。
3. Open Google Chrome and navigate to "chrome://extensions/".
   Chromeを開き、アドレスバーに "chrome://extensions/" と入力してアクセスします。
4. Enable **Developer mode** at the top right corner.
   右上の「デベロッパーモード」を有効（オン）にします。
5. Click **Load unpacked** パッケージ化されていない拡張機能を読み込む.
   左上の「パッケージ化されていない拡張機能を読み込む」ボタンをクリックします。
6. Select the folder you created on your Desktop.
   手順1でデスクトップに作成したフォルダを選択します。
7. Navigate to an English website and test the extension! 🎉
   あとは英語のサイトへ接続し、ショートカットキーを押して動作を確認してください！

---

## 🛑 Limitations 使用不可環境

This extension may not work in certain environments due to strict security policies:
セキュリティの都合上、一部の環境では動作しない場合があります（使えないところでは使えません）。

* Sites where Google Translate is explicitly blocked by security settings.
  セキュリティ設定によりGoogle翻訳がブロック・NGとされているサイト
* Certain strictly secured platforms However, it has been confirmed to work on platforms like Udemy!.
  強力なセキュリティがかかっているページ。※Udemyでの動作は確認済みです

---

## 🔗 Reference 参考

* **Google Cloud Translation Language Codes:**
  If you want to modify the code for other languages, check the language codes here:
  [https://docs.cloud.google.com/translate/docs/languages?hl]https://docs.cloud.google.com/translate/docs/languages?hl

---

## 🛠️ Support & Issues サポート・バグ報告について

Bug reports and pull requests are welcome in the GitHub Issues. However, please note that this project is provided "as-is" and **no active support, troubleshooting, or guaranteed fixes will be provided**.
GitHubのIssue機能にてバグ報告は受け付けておりますが、**個別のサポートや確実な修正対応はお約束いたしかねます**。あらかじめご了承ください。

---

> [!WARNING]
> ## ⚠️ Disclaimer 免責事項
> 
> **English:**
> * This extension was created purely for personal learning and experimental purposes.
> * Because this extension programmatically hides the official Google Translate UI banner and logos, it may conflict with Google's Terms of Service if used commercially or in public production environments. 
> * **Please use it strictly at your own risk.**
>
> **日本語:**
> * 本拡張機能は、個人的な学習・実験目的で作成されたものです。
> * Google翻訳の公式UI（バナー等）を強制的に非表示にする処理が含まれているため、利用規約の観点から、実運用での使用は自己責任（Use at your own risk）でお願いいたします。
