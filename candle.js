/**
 * CandleViz — Birthday Cake Candles (HackerRank)
 * Lógica principal + renderização visual
 */

// ─── Lógica do problema ───────────────────────────────────────────────────────

/**
 * Retorna quantas velas têm a altura máxima.
 * @param {number[]} candles - array com as alturas das velas
 * @returns {number} quantidade de velas mais altas
 */
function birthdayCakeCandles(candles) {
  const tallest = Math.max(...candles);
  return candles.filter(c => c === tallest).length;
}

// ─── Utilitários ──────────────────────────────────────────────────────────────

function parseInput(raw) {
  const trimmed = raw.trim();

  // Se não tem espaços, trata cada caractere como uma vela separada
  if (!/\s/.test(trimmed)) {
    return trimmed
      .split('')
      .map(Number)
      .filter(n => Number.isInteger(n) && n > 0);
  }

  // Com espaços, separa normalmente
  return trimmed
    .split(/\s+/)
    .map(Number)
    .filter(n => Number.isInteger(n) && n > 0);
}

function showError(msg) {
  document.getElementById('cv-error').textContent = msg;
}

function clearError() {
  document.getElementById('cv-error').textContent = '';
}

function setExample(value) {
  document.getElementById('cv-in').value = value;
  runViz();
}

// ─── Renderização ─────────────────────────────────────────────────────────────

function renderCandles(candles) {
  const stage = document.getElementById('cv-stage');
  stage.innerHTML = '';

  const max = Math.max(...candles);
  const UNIT = 130 / max; // altura em px por unidade

  candles.forEach(height => {
    const isTallest = height === max;
    const pxHeight = Math.max(Math.round(height * UNIT), 12);

    // wrapper
    const wrap = document.createElement('div');
    wrap.className = 'candle-wrap';

    // chama
    const flame = document.createElement('div');
    flame.className = 'flame' + (isTallest ? ' on' : '');

    // vela
    const candle = document.createElement('div');
    candle.className = 'candle ' + (isTallest ? 'tallest' : 'normal');
    candle.style.height = pxHeight + 'px';

    // número embaixo
    const label = document.createElement('div');
    label.className = 'candle-label' + (isTallest ? ' tallest-label' : '');
    label.textContent = height;

    wrap.appendChild(flame);
    wrap.appendChild(candle);
    wrap.appendChild(label);
    stage.appendChild(wrap);
  });
}

function updateStats(candles) {
  const max   = Math.max(...candles);
  const count = birthdayCakeCandles(candles);

  document.getElementById('cv-total').textContent = candles.length;
  document.getElementById('cv-max').textContent   = max;
  document.getElementById('cv-count').textContent  = count;

  document.getElementById('cv-result').style.display = 'grid';
}

// ─── Entry point ──────────────────────────────────────────────────────────────

function runViz() {
  clearError();

  const raw = document.getElementById('cv-in').value;
  const candles = parseInput(raw);

  if (candles.length === 0) {
    showError('Digite pelo menos uma altura válida (número inteiro positivo).');
    document.getElementById('cv-result').style.display = 'none';
    document.getElementById('cv-stage').innerHTML =
      '<p class="stage-placeholder">Digite as alturas e clique em Visualizar</p>';
    return;
  }

  renderCandles(candles);
  updateStats(candles);
}

// ─── Enter key support ────────────────────────────────────────────────────────

document.getElementById('cv-in').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') runViz();
});
