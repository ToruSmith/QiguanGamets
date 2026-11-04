// 由 src/games.json 產生純靜態網站到 dist/。沒有任何相依，網站也不需要 JavaScript。
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { BOARDS } from '../src/boards.mjs';

const escape = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const linkHref = (game, path) => new URL(path, game.url).href;

function panel(game) {
  const links = game.links
    .map((link) => `<li><a href="${escape(linkHref(game, link.path))}">${escape(link.label)}</a></li>`)
    .join('');
  return `<section class="panel panel-${game.id}" aria-labelledby="${game.id}-name">
      ${BOARDS[game.id]()}
      <h2 class="name" id="${game.id}-name">${escape(game.name)}</h2>
      <div class="door">
        <p class="tagline">${escape(game.tagline)}</p>
        <a class="enter" href="${escape(game.url)}">進入${escape(game.room)}</a>
        ${links ? `<ul class="more">${links}</ul>` : ''}
      </div>
    </section>`;
}

export function render(games) {
  const template = readFileSync('src/index.template.html', 'utf8');
  return template.replace('<!-- panels -->', games.map(panel).join('\n    '));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const games = JSON.parse(readFileSync('src/games.json', 'utf8'));
  rmSync('dist', { recursive: true, force: true });
  mkdirSync('dist');
  cpSync('public', 'dist', { recursive: true });
  cpSync('src/styles.css', 'dist/styles.css');
  writeFileSync('dist/index.html', render(games));
  console.log('dist/ 已產生');
}
