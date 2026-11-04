# 手談棋館

將棋、五子棋、象棋、西洋棋的入口網站。棋館只負責帶路，四個遊戲各自獨立部署。

## 開發

需要 Node.js 22 以上，沒有任何 npm 相依。

```bash
npm test
npm run build
```

輸出在 `dist/`，用任何靜態伺服器打開都可以。

## 新增或修改棋室

改 `src/games.json`。新棋種還要在 `src/boards.mjs` 畫棋盤，並在 `src/styles.css` 加配色。

## 部署（GitHub Pages）

到 **Settings → Pages → Source** 選 **GitHub Actions**。之後推送到 `main`，`.github/workflows/deploy.yml` 會測試、建置並發布 `dist/`。

網址是 <https://torusmith.github.io/QiguanGamets/>。頁面用相對路徑，放在子路徑或自訂網域都能運作。

## 授權

程式碼未採用開源授權，著作權由作者保留。第三方素材見 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
