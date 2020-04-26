<template>
  <section class="hero is-white is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="content">
          <p> Hello, {{ name }} </p>
        </div>
        <div class="block">
          <div class="buttons">
            <b-button v-if="!isLoggedIn" type="is-primary" @click="doLoginWithGoogle">
              Sign in with Google
            </b-button>
            <b-button v-if="isLoggedIn" type="is-primary" @click="$fireAuth.signOut()">
              Sign out
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase/app'

export default {
  name: 'HomePage',

  computed: {
    name () {
      if (this.$store.state.user) {
        return this.$store.state.user.email
      }
      return 'please log in.'
    },
    isLoggedIn () {
      return this.$store.getters.IS_AUTHENTICATED
    }
  },
  methods: {
    async handleOAuthSuccess (result) {
      // Just a dummy example here showing fireStore operations,
      // but this is on client side.
      const { user } = result
      const { operationType } = result
      const info = result.additionalUserInfo
      if (user && operationType === 'signIn' && info.isNewUser) {
        await this.$fireStore.doc(`User/${user.uid}`).set({
          Uid: user.uid,
          Email: user.email,
          Created: firebase.firestore.Timestamp.now()
        })
      }
    },
    async doLoginWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/userinfo.email')
      provider.addScope('https://www.googleapis.com/auth/userinfo.profile')
      this.$fireAuth.useDeviceLanguage()
      const persistence = firebase.auth.Auth.Persistence.SESSION
      await this.$fireAuth.setPersistence(persistence)
      const result = await this.$fireAuth.signInWithPopup(provider)
      await this.handleOAuthSuccess(result)
    }
  }
}
</script>
