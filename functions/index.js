const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const dbRef = admin.firestore().doc("tokens/demo");

const TwitterApi = require("twitter-api-v2").default;
const twitterClient = new TwitterApi({
  clientId: "dXZKd2pEcjJzdnplOWxMdVYxbU46MTpjaQ",
  clientSecret: "cIuLQks6-TkZhsHUHwisf0YVeXmZPH8IRm7EzbJQY6-KQYcEna",
});

const callbackURL =
  "http://localhost:5000/twitter-tweeter-3cc43/us-central1/callback";

exports.auth = functions.https.onRequest(async (request, response) => {
  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
    callbackURL,
    {
      scope: ["tweet.read", "tweet.write", "users.read", "offline.access"],
    }
  );

  await dbRef.set({ codeVerifier, state });

  response.redirect(url);
});

exports.callback = functions.https.onRequest((request, response) => {});

exports.tweet = functions.https.onRequest((request, response) => {});

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
