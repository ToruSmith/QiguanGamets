// 四扇屏風的底紋：每一種棋的棋盤，全部用程式畫成 SVG，不使用外部素材。
const lines = (from, to, step, draw) => {
  let out = '';
  for (let i = from; i <= to; i += step) out += draw(i);
  return out;
};

const svg = (width, height, body) =>
  `<svg class="board" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${body}</svg>`;

/** 九路盤與四個星 */
function shogi() {
  const cell = 40;
  const size = cell * 9;
  const grid =
    lines(0, 9, 1, (i) => `<path d="M${i * cell} 0V${size}"/>`) +
    lines(0, 9, 1, (i) => `<path d="M0 ${i * cell}H${size}"/>`);
  const stars = [3, 6]
    .flatMap((x) => [3, 6].map((y) => `<circle cx="${x * cell}" cy="${y * cell}" r="3.5"/>`))
    .join('');
  return svg(size, size, `<g class="lines">${grid}</g><g class="marks">${stars}</g>`);
}

/** 十五路盤，幾手對局中的黑白子 */
function gomoku() {
  const cell = 30;
  const size = cell * 16;
  const grid = lines(
    1,
    15,
    1,
    (i) => `<path d="M${cell} ${i * cell}H${size - cell}M${i * cell} ${cell}V${size - cell}"/>`,
  );
  const moves = [
    [7, 9, 'b'],
    [8, 8, 'w'],
    [8, 10, 'b'],
    [6, 8, 'w'],
    [9, 11, 'b'],
    [7, 10, 'w'],
    [6, 7, 'b'],
    [9, 9, 'w'],
    [10, 12, 'b'],
    [7, 12, 'w'],
  ];
  const stones = moves
    .map(([x, y, c]) => `<circle class="stone-${c}" cx="${x * cell}" cy="${y * cell}" r="13"/>`)
    .join('');
  return svg(size, size, `<g class="lines">${grid}</g><g class="stones">${stones}</g>`);
}

/** 九路十行：楚河漢界斷開直線，上下九宮有斜線 */
function xiangqi() {
  const cell = 40;
  const w = cell * 8;
  const h = cell * 9;
  const rows = lines(0, 9, 1, (i) => `<path d="M0 ${i * cell}H${w}"/>`);
  const cols = lines(1, 7, 1, (i) => `<path d="M${i * cell} 0V${cell * 4}M${i * cell} ${cell * 5}V${h}"/>`);
  const edges = `<path d="M0 0V${h}M${w} 0V${h}"/>`;
  const palace = [0, 7]
    .map((y) => `<path d="M${cell * 3} ${y * cell}l${cell * 2} ${cell * 2}M${cell * 5} ${y * cell}l-${cell * 2} ${cell * 2}"/>`)
    .join('');
  return svg(w + 40, h + 40, `<g class="lines" transform="translate(20 20)">${rows}${cols}${edges}${palace}</g>`);
}

/** 八乘八的方格 */
function chess() {
  const cell = 45;
  let squares = '';
  for (let y = 0; y < 8; y += 1) {
    for (let x = (y + 1) % 2; x < 8; x += 2) {
      squares += `<rect x="${x * cell}" y="${y * cell}" width="${cell}" height="${cell}"/>`;
    }
  }
  return svg(cell * 8, cell * 8, `<g class="squares">${squares}</g>`);
}

export const BOARDS = { shogi, gomoku, xiangqi, chess };
