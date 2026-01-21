import { utilService } from "../../services/util.service.js"
import { dbService } from "../../services/db.service.js";
import { ObjectId } from "mongodb";
import { coinGeckoService } from "../../services/coinGecko.service.js";

export const dashboardService = {
    getSnapshot
}

async function getSnapshot(userId) {
    const dateNormalized = utilService.normalizeDateToUtcStart(new Date())

    try {
        const userCollection = await dbService.getCollection('user')
        const user = await userCollection.findOne({ _id: new ObjectId(userId) })
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const dashboardCollection = await dbService.getCollection('dashboardSnapshot')
        let snapshot = await dashboardCollection.findOne({ userId: user._id, dateNormalized })

        if (!snapshot) {
            snapshot = await _buildSnapshot({ user, dateNormalized, dashboardCollection })
        }

        return snapshot
    } catch (err) {
        console.error('Failed to get dashboard:', err)
        throw err
    }

}

async function _buildSnapshot({ user, dateNormalized, dashboardCollection }) {
    const { preferences } = user
    try {
        const news = await fetchNews(preferences)
        const coins = await fetchCoins(preferences)
        const aiInsight = await generateAiInsight(preferences)
        const meme = await getRandomMeme(preferences)

        const snapshotDoc = {
            userId: user._id,
            createdAt: new Date(),
            dateNormalized,
            news,
            coins,
            aiInsight,
            meme
        }

        const insertedDoc = await dashboardCollection.insertOne(snapshotDoc)
        return { ...snapshotDoc, _id: insertedDoc.insertedId }

    } catch (err) {
        console.log('ERROR: Failed to creade snapshot')
        throw err
    }


}

async function fetchNews(preferences) {

    return [
        {
            id: 'static:news-1',
            title: 'Bitcoin surges 5% after ETF approval',
            url: 'https://example.com/article1',
            source: 'static',
            publishedAt: new Date(),
        }
    ]
}

async function fetchCoins(preferences) {
    const prices = coinGeckoService.getCoinsPrices(preferences.assets, 'usd')
    console.log('prices:', prices)
    return prices
    //     return [
    //     {
    //       id: 'bitcoin',
    //       symbol: 'BTC',
    //       name: 'Bitcoin',
    //       currency: 'USD',
    //       price: 42000,
    //       change24h: 2.5,
    //     },
    //     {
    //       id: 'ethereum',
    //       symbol: 'ETH',
    //       name: 'Ethereum',
    //       currency: 'USD',
    //       price: 2600,
    //       change24h: -1.2,
    //     },
    //   ]
}

async function generateAiInsight(preferences) {
    return `Based on your ${preferences?.investorType || 'investor'} profile, today is a good day to review your long-term allocation rather than making impulsive trades.`

}

async function getRandomMeme(preferences) {
    return {
        id: 'static:hodl-meme-1',
        url: 'https://your-static-cdn.com/memes/hodl1.jpg',
        title: 'HODL like there’s no tomorrow',
    }
}