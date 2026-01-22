

export const newsService = {
    getCryptoNews
}

async function getCryptoNews(preferences = {}) {
    const CRYPTOPANIC_API_TOKEN = process.env.CRYPTOPANIC_API_TOKEN
    if (!CRYPTOPANIC_API_TOKEN) {
        console.warn('CRYPTOPANIC_API_TOKEN not set. Returning empty news list.')
        return [];
    }

    const assets = preferences.assets || []
    const currenciesParam = assets.length ? assets.join(',') : 'BTC,ETH'


    const url = new URL('https://cryptopanic.com/api/developer/v2/posts/')

    url.searchParams.set('auth_token', CRYPTOPANIC_API_TOKEN)
    url.searchParams.set('public', 'true')
    url.searchParams.set('currencies', currenciesParam)
    url.searchParams.set('filter', 'hot')

    try {
        
        console.log(url.toString())
        const res = await fetch(url.toString())
        if (!res.ok) {
            const text = await res.text()
            console.error('CryptoPanic API failed', res.status, text)
            return []
        }

        const data = await res.json()
        const posts = data.results || []

        const news = posts.map((post) => {
            return {
                id: `cryptopanic:${post.id}`,
                title: post.title,
                url: post.url || post.source?.url || 'https://cryptopanic.com',
                source: post.source?.title || 'CryptoPanic',
                publishedAt: post.published_at ? new Date(post.published_at) : new Date(),
            }
        })


        return news.slice(0, 10);
    } catch (err) {
        console.error('Failed to fetch news from CryptoPanic', err);
        return [];
    }
}
