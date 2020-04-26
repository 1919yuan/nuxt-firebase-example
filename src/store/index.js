// Code mostly taken from
// https://levelup.gitconnected.com/using-firebase-authentication-in-a-nuxt-server-side-rendered-application-c2a624a9e999

const cookie = require('cookie')
const JWTDecode = require('jwt-decode')

const COOKIE_NAME = '__session'

export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user
  }
}

export const getters = {
  IS_AUTHENTICATED (state) {
    return !!state.user
  }
}

export const actions = {
  nuxtServerInit: (process.server && !process.static)
    ? async function ({ commit }, { req, store }) {
      if (!req.headers.cookie) { return }

      const parsedCookies = cookie.parse(req.headers.cookie)
      if (!parsedCookies) { return }

      // Here I'm making __session cookie by a json object instead of string,
      // so that it can store more than the firebase token.
      let session = null
      if (parsedCookies[COOKIE_NAME]) {
        session = JSON.parse(parsedCookies[COOKIE_NAME])
      }
      const idToken = session && session.idToken

      let decodedAuthUserClaims = null
      decodedAuthUserClaims = JWTDecode(idToken)

      if (decodedAuthUserClaims == null) { return }

      const admin = require('firebase-admin')
      const decodedToken = await admin.auth().verifyIdToken(idToken, true)
      const { uid } = decodedToken
      if (uid) {
        const user = {
          photoUrl: decodedAuthUserClaims.picture,
          displayName: decodedAuthUserClaims.name,
          email: decodedAuthUserClaims.email,
          uid: decodedAuthUserClaims.user_id
        }
        store.commit('SET_USER', user)
      }
    } : () => {},

  SET_SESSION_COOKIE (ctx, idToken) {
    // This is a little bit different than Austin's solution:
    // this.$cookies is from 'cookie-universal-nuxt',
    // js-cookie doesn't set cookie correctly on the client side
    // according to my experience.
    const secure = process.env.NODE_ENV === 'production'
    let session = { idToken }
    if (this.$cookies.get(COOKIE_NAME)) {
      session = JSON.parse(this.$cookies.get(COOKIE_NAME))
      session.idToken = idToken
    }
    let expires = 3600
    if (idToken == null) {
      delete session.idToken
    }
    if (Object.keys(session).length === 0) {
      // Expire the cookie if no properties are stored in it.
      expires = 0
    }
    this.$cookies.set(COOKIE_NAME, JSON.stringify(session), {
      maxAge: expires,
      secure
    })
  }
}
