import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { BOARDS } from '../src/boards.mjs';
import { linkHref, render } from '../scripts/build.mjs';

const games = JSON.parse(readFileSync('src/games.json', 'utf8'));

describe('棋室清單', () => {
  it('四個棋種都有網址、棋盤與文案', () => {
    assert.deepEqual(games.map((game) => game.id).sort(), ['chess', 'gomoku', 'shogi', 'xiangqi']);
    for (const game of games) {
      assert.equal(new URL(game.url).protocol, 'https:');
      assert.ok(game.url.endsWith('/'));
      assert.ok(game.name && game.room && game.tagline);
      assert.equal(typeof BOARDS[game.id], 'function');
    }
  });

  it('子頁連結留在該遊戲的網域內', () => {
    for (const game of games) {
      for (const link of game.links) {
        assert.equal(new URL(linkHref(game, link.path)).origin, new URL(game.url).origin);
      }
    }
  });
});

describe('輸出的頁面', () => {
  it('包含每個棋室的入口，且不含任何腳本', () => {
    const html = render(games);
    for (const game of games) assert.ok(html.includes(`href="${game.url}"`), game.id);
    assert.ok(!html.includes('<!-- panels -->'));
    assert.ok(!/<script/i.test(html));
  });
});
