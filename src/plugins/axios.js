// Code taken from
// https://levelup.gitconnected.com/using-firebase-authentication-in-a-nuxt-server-side-rendered-application-c2a624a9e999

export default function ({ $axios, app, req }) {
  $axios.defaults.baseURL = process.env.BASE_URL;

  const getIdToken = () => {
    if (process.server) {
      if (!req.headers.cookie) { return null; }
      return import("cookie").then((cookie) => {
        const parsedCookies = cookie.parse(req.headers.cookie);
        console.log(parsedCookies);
        if (!parsedCookies) { return; }
        if (parsedCookies.__session) {
          const session = JSON.parse(parsedCookies.__session);
          return session.idToken;
        } else {
          return null;
        }
      });
    }
    if (process.client) {
      return new Promise((resolve, reject) => {
        const unsubscribe = app.$fireAuth.onAuthStateChanged((user) => {
          unsubscribe();
          if (user) {
            user.getIdToken().then((idToken) => {
              resolve(idToken);
            }, () => {
              resolve(null);
            });
          } else {
            resolve(null);
          }
        });
      });
    }
    return null;
  };

  $axios.onRequest(async (config) => {
    // if (process.env.NODE_ENV !== "production") {
    config.withCredentials = true;
    // }

    const idToken = await getIdToken();

    if (config.headers != null && config.headers["X-Requested-With"] == null) {
      config.headers = {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Bearer " + idToken,
        ...config.headers
      };
    }
    return config;
  });
}
