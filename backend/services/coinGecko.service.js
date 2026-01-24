// backend/src/services/coingecko.service.js
// import fetch from 'node-fetch'

export const coinGeckoService = {
  getCoinsPrices
}

const SYMBOL_TO_ID = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  SOL: 'solana',
  BNB: 'binancecoin',
  DOGE: 'dogecoin',
}

async function getCoinsPrices(symbols, vsCurrency = 'usd') {
  const ids = symbols
    .map((sym) => SYMBOL_TO_ID[sym.toUpperCase()])
    .filter(Boolean)

  if (!ids.length) return []

  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(',')}&vs_currencies=${vsCurrency}&include_24hr_change=true&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    console.error('CoinGecko HTTP error', res.status, await res.text())
    return []
  }

  const data = await res.json();

  return Object.entries(data).map(([id, value]) => {
    const symbol = Object.entries(SYMBOL_TO_ID).find(
      ([sym, mappedId]) => mappedId === id
    )?.[0];

    return {
      id,
      symbol,
      name: symbol || id,
      currency: vsCurrency.toUpperCase(),
      price: value[vsCurrency],
      change24h: value[`${vsCurrency}_24h_change`] ?? null,
    };
  });
}
