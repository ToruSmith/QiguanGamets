# CLAUDE.md

給在這個儲存庫工作的 Claude（與人類維護者）的規則。

## 專案

手談棋館：四個棋類遊戲的入口網站。只放連結，不放遊戲。

- 四個遊戲是獨立專案：不共用程式碼、Firebase 或部署。西洋棋是 GPL-3.0，不可把遊戲程式碼併進本專案。
- 不做帳號、跨遊戲戰績、遊戲內嵌（iframe）。
- 網站沒有 JavaScript；`index.template.html` 的 CSP 也不允許腳本。
- 部署在 GitHub Pages，由 `.github/workflows/deploy.yml` 發布 `dist/`。GitHub Pages 不支援 `_headers`，安全設定要放在 HTML 的 `<meta>`。

## 指令

- `npm test`：驗證 `src/games.json` 與輸出的頁面
- `npm run build`：產生 `dist/`

## 結構

- `src/games.json`：棋室清單，網址與文案只改這裡。子頁路徑要對照各遊戲的路由：五子棋沒有可直達的子頁；象棋用路徑；將棋與西洋棋用 `#/`。
- `src/boards.mjs`：四種棋盤的 SVG。
- `scripts/build.mjs`：套用 `src/index.template.html` 輸出靜態頁。

介面只有繁體中文。
