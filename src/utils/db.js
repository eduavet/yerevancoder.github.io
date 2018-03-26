import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB7cO7cBbZr4gy5Whaurud8tA5MN-zZfeY',
  authDomain: 'yerevan-coder.firebaseapp.com',
  databaseURL: 'https://yerevan-coder.firebaseio.com',
  projectId: 'yerevan-coder',
  storageBucket: 'yerevan-coder.appspot.com',
  messagingSenderId: '404306745515',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
// Need to create a yerevancoder-dev app version as well.
if (process.env.__DEV__) {
  //
} else {
  //
}

const db = firebase.database();

const auth = firebase.auth();

const hiring_table_posts_ref = db.ref(`hiring-table-posts`);

const freelancers_posts_ref = db.ref(`freelancer-table-posts`);

export { firebase, auth, db, hiring_table_posts_ref, freelancers_posts_ref };
