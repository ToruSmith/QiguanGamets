# AGENTS.md

給在這個儲存庫工作的 AI 工程師（Claude、Codex、Cursor、Gemini 等）與人類維護者的規則。
`CLAUDE.md` 只是引用這個檔案，規則以這裡為準。

## 專案

手談棋館：四個棋類遊戲的入口網站。只放連結，不放遊戲。正式網址 <https://torusmith.github.io/QiguanGamets/>。

- 四個遊戲是獨立專案：不共用程式碼、Firebase 或部署。西洋棋是 GPL-3.0，不可把遊戲程式碼併進本專案。
- 不做帳號、跨遊戲戰績、遊戲內嵌（iframe）。
- 網站沒有 JavaScript；`index.template.html` 的 CSP 也不允許腳本。
- 部署在 GitHub Pages，由 `.github/workflows/deploy.yml` 發布 `dist/`。GitHub Pages 不支援 `_headers`，安全設定要放在 HTML 的 `<meta>`。
- 程式碼沒有採用開源授權，著作權由作者保留。第三方素材記在 `THIRD_PARTY_NOTICES.md`。

## 四個遊戲

| 棋室   | 網站                                                   | 儲存庫                                   |
| ------ | ------------------------------------------------------ | ---------------------------------------- |
| 將棋   | <https://shtoruogigamets.pages.dev/>                   | `ToruSmith/ShogiGamets`                  |
| 五子棋 | <https://gomokugamets.pages.dev/>                      | `ToruSmith/GomokuGamets`                 |
| 象棋   | <https://online-2-player-chinese-chess.onrender.com/> | `ToruSmith/Online-2-Player-Chinese-Chess` |
| 西洋棋 | <https://chesstorusgamets.pages.dev/>                  | `ToruSmith/ChessTorusGamets`             |

每個遊戲都有自己的 `AGENTS.md`、玩家指南（`docs/player-guide.md`）與每週巡檢，改遊戲時去各自的儲存庫。

## 指令

- `npm test`：驗證 `src/games.json` 與輸出的頁面
- `npm run build`：產生 `dist/`

## 結構

- `src/games.json`：棋室清單，網址與文案只改這裡。子頁路徑要對照各遊戲的路由：五子棋沒有可直達的子頁；象棋用路徑；將棋與西洋棋用 `#/`。
- `src/boards.mjs`：四種棋盤的 SVG。
- `scripts/build.mjs`：套用 `src/index.template.html` 輸出靜態頁。
- `.github/workflows/health.yml`：每週檢查棋館與四個遊戲的網址都打得開，失敗時 GitHub 會寄信。

介面只有繁體中文。
