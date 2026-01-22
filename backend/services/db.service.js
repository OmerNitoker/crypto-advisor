import { MongoClient } from "mongodb"
import { config } from "../config/index.js"

export const dbService = {
    getCollection
}

// const url = 'mongodb://0.0.0.0:27017'

// const dbName = 'crypto-advisor'

var dbConn = null

async function getCollection(collectionName) {
    try {
        const db = await _connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        console.log('ERROR: Cannot get collection')
        throw err
    }
}

async function _connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL, {
            tls: true,
            tlsAllowInvalidCertificates: true
        })

        const db = client.db(config.dbName)
        // const db = client.db('crypto-advisor')
        dbConn = db
        
        return db
    } catch (err) {
        console.log('Cannot connect to DB', err)
        throw err
    }
}
