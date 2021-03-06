import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBXBPfWmpTwAxUKgrZnB6u3dvOmVSkXlNw",
  authDomain: "free-css-form.firebaseapp.com",
  projectId: "free-css-form",
  storageBucket: "free-css-form.appspot.com",
  messagingSenderId: "141497808913",
  appId: "1:141497808913:web:a0092e542176f87ed759b0",
};

// initialize firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);

const githubAuthentication = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
    .then((res) => {
      // user info
      let user = res.additionalUserInfo.profile;
      let { avatar_url, bio, blog, location, login, name, html_url } = user;

      // for email
      let { email, accessToken } = res.user.multiFactor.user;

      // final information
      let finalInfo = {
        avatar_url,
        bio,
        blog,
        location,
        login,
        name,
        html_url,
        email,
        accessToken,
      };

      // let ans = res
      //   ? localStorage.setItem("user", JSON.stringify(finalInfo))
      //   : localStorage.removeItem("user");
      return finalInfo;
    })
    .catch((err) => {
      return err;
    });
};

// github authentication
export default githubAuthentication;

// firestore database
export const db = firebaseApp.firestore();
