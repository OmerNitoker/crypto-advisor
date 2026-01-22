import { utilService } from "../../services/util.service.js"
import { dbService } from "../../services/db.service.js";
import { ObjectId } from "mongodb";
import { coinGeckoService } from "../../services/coinGecko.service.js";
import { newsService } from "../../services/news.service.js";
import { aiService } from "../../services/ai.service.js";
import { memeService } from "../../services/meme.service.js";


export const dashboardService = {
    getSnapshot,
    clearSnapshot
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

async function clearSnapshot(userId) {
    const collection = await dbService.getCollection('dashboardSnapshot');
    await collection.deleteMany({ userId: new ObjectId(userId) })
}

async function _buildSnapshot({ user, dateNormalized, dashboardCollection }) {
    const { preferences } = user
    try {
        const news = await fetchNews(preferences)
        const coins = await fetchCoins(preferences)
        const aiInsight = await generateAiInsight(preferences, coins, news)
        const meme = memeService.getRandomMeme()

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
    return newsService.getCryptoNews(preferences)
}

async function fetchCoins(preferences) {
    return coinGeckoService.getCoinsPrices(preferences.assets, 'usd')
}

async function generateAiInsight(preferences, coins, news) {
    return aiService.getAiInsight(preferences, coins, news)
}

