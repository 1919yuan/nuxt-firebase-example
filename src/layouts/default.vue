<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a
          class="navbar-item"
          href="/"
        >
          <img
            src="~assets/buefy.png"
            alt="Buefy"
            height="28"
          >
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <a
            class="navbar-item"
            href="//github.com/1919yuan/nuxt-firebase-example"
          >
            <b-icon icon="github" /> &nbsp;
            <span> Repo </span>
          </a>
        </div>
        <div class="navbar-end">
          <a
            v-if="user"
            class="navbar-item"
            href="/"
          >
            <figure class="image">
              <img
                class="is-rounded"
                :src="user.photoUrl"
                alt="Profile"
                height="28"
              >
            </figure>
          </a>
        </div>
      </div>
    </nav>

    <nuxt />
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>
