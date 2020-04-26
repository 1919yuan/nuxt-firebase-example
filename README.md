# nuxt-firebase-example

> Example Nuxt Firebase integration in SSR mode with authentication, hosting,
> firestore and functions.
> The accompanying tutorial is
> [here](https://1919yuan.github.io/post/2020-04-20-nuxt-firebase/)
> The demo website is [here](https://nuxt-firebase-example-1919yuan.web.app)

## Build Setup

```bash
# install dependencies
$ yarn install && yarn --cwd functions install

# predeploy for development environment
$ yarn preparedev

# predeploy for production environment
$ yarn prepareprd

# serve with hot reload at localhost:8080
$ yarn dev

# build for production and launch Firebase hosting at localhost:5000
# Firebase functions at localhost:5001
$ yarn build
$ yarn ssr

# deploy to development Firebase project
$ yarn stage

# deploy to production Firebase project
$ yarn deploy

# clean up repo
$ yarn clean
```

## References

[1]: [Using Firebase Authentication in a Nuxt Server-side Rendered Application](https://levelup.gitconnected.com/using-firebase-authentication-in-a-nuxt-server-side-rendered-application-c2a624a9e999)
[2]: [Nuxt Firebase](https://firebase.nuxtjs.org/)
[3]: [Vue.js/Nuxt on Firebase hosting](https://www.youtube.com/watch?v=ZYUWsjUxxUQ)
[4]: [Deploy nuxt on Firebase](https://dev.to/kiritchoukc/deploy-nuxt-on-firebase-4ad8)
[5]: [How to host Nuxt.js application on firebase with a single command](https://dev.to/slushnys/how-to-host-nuxt-js-application-on-firebase-with-a-single-command-1nio)
[6]: [williamchong007/nuxt-ssr-firebase](https://github.com/williamchong007/nuxt-ssr-firebase)
