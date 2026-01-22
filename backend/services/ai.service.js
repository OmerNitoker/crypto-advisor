
export const aiService = {
    getAiInsight
}

async function getAiInsight(preferences = {}, coins = [], news = []) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.warn('OPENROUTER_API_KEY not set, falling back to simple rule-based insight.');
    return buildFallbackInsight(preferences, coins);
  }

  const assets = preferences.assets || [];
  const investorType = preferences.investorType || 'HODLer';
  const contentTypes = preferences.contentTypes || [];

  const coinsSummary = coins
    .map((c) => `${c.symbol || c.name}: ${c.price} ${c.currency} (${c.change24h?.toFixed?.(2) ?? '0'}% 24h)`)
    .join('\n');

  const newsSummary = news
    .slice(0, 3)
    .map((n) => `- ${n.title} (${n.source})`)
    .join('\n');

  const userProfileText = `
User profile:
- Assets of interest: ${assets.length ? assets.join(', ') : 'not specified'}
- Investor type: ${investorType}
- Content types: ${contentTypes.join(', ') || 'not specified'}

Market snapshot (24h):
${coinsSummary || 'No coin data'}

Recent headlines:
${newsSummary || 'No news data'}
  `.trim();

  const systemPrompt = `
You are a friendly but concise crypto investing assistant.

Goal:
- Generate ONE short "AI insight of the day" for the user.
- Insight should be 2-4 sentences.
- It must be based on the user's profile and the given market snapshot.
- Do NOT give direct trading instructions (no "buy now", "sell now").
- Focus on mindset, risk management, and what to pay attention to today.
- Do not mention that you are an AI model or that this is not financial advice (the UI already handles disclaimers).
  `.trim();

  const body = {
    // תבחר מודל שאתה רוצה להשתמש בו דרך OpenRouter
    // אפשר להחליף למודל אחר לפי מה שהגדרת אצלך
    model: 'openai/gpt-4o-mini', // דוגמה — תבחר מודל מהרשימה של OpenRouter
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userProfileText },
    ],
  };

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'http://localhost:3030', // אם יש לך דומיין אמיתי – שים אותו כאן
        'X-Title': 'Crypto Advisor',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('OpenRouter API error:', res.status, text);
      return buildFallbackInsight(preferences, coins);
    }

    const data = await res.json();
    const content =
      data.choices?.[0]?.message?.content?.trim() ||
      buildFallbackInsight(preferences, coins);

    return content;
  } catch (err) {
    console.error('Failed to call OpenRouter:', err);
    return buildFallbackInsight(preferences, coins);
  }
}

// fallback פשוט למקרה שמשהו נופל
function buildFallbackInsight(preferences = {}, coins = []) {
  const assets = preferences.assets || [];
  const investorType = preferences.investorType || 'HODLer';
  const mainAssets = assets.length ? assets.join(' & ') : 'your main crypto positions';

  let base = `Based on your interest in ${mainAssets} as a ${investorType}, today is a good opportunity to zoom out and look at the bigger picture rather than reacting to every small price move.`;

  if (coins.length) {
    const movers = coins
      .filter((c) => Math.abs(c.change24h || 0) >= 3)
      .map((c) => c.symbol || c.name);

    if (movers.length) {
      base += ` Pay special attention to volatility in ${movers.join(
        ', '
      )}, as strong daily moves can be a good reminder to review your risk exposure and position sizing.`;
    } else {
      base += ` The market looks relatively calm in the last 24 hours, which can be a good time to review your long-term thesis and make sure your portfolio still matches your goals.`;
    }
  }

  return base;
}
