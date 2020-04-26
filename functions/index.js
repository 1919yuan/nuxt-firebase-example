const functions = require('firebase-functions')

require('dotenv').config()

// Set up Firebase Admin SDK with API key.
// API key json file is in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const admin = require('firebase-admin')

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  })
}

const { Nuxt } = require('nuxt')

const config = {
  dev: false,
  debug: false
}

const nuxt = new Nuxt(config)

// const express = require('express')

// const app = express()
// let isReady = false
// const readyPromise = nuxt
//   .ready()
//   .then(() => {
//     isReady = true
//   })
//   .catch(() => {
//     process.exit(1)
//   })

// async function handleRequest (req, res) {
//   if (!isReady) {
//     await readyPromise
//   }
//   res.set('Cache-Control', 'public, max-age=1, s-maxage=1')
//   await nuxt.render(req, res)
// }

// app.get('*', handleRequest)
// app.use(handleRequest)
// exports.nuxt = functions.https.onRequest(app)

exports.nuxt = functions.https.onRequest(async (req, res) => {
  await nuxt.ready()
  nuxt.render(req, res)
})
