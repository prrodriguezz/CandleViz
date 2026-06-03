# 🕯️ CandleViz

Visualizador interativo para o problema **Birthday Cake Candles** do HackerRank.

## Como usar

Abra o arquivo `index.html` no navegador — sem servidor necessário.

## Estrutura

```
candleviz/
├── index.html   ← página principal
├── style.css    ← estilos e animações
├── candle.js    ← lógica do problema + renderização
└── README.md    ← este arquivo
```

## O problema

Dado um array de alturas de velas, retornar quantas têm a altura máxima.

```js
function birthdayCakeCandles(candles) {
  const tallest = Math.max(...candles);
  return candles.filter(c => c === tallest).length;
}
```

**Exemplo:** `[3, 2, 1, 3]` → altura máxima é `3`, aparecem `2` vezes → resposta: `2`
