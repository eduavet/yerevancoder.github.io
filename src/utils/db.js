import * as firebase from 'firebase';
import { __DEV__ } from './constants';

let config = null;

if (__DEV__) {
  config = {
    apiKey: 'AIzaSyD0lm_n8XSRPJmyEfjVX6QgbJ5lf_wzeO0',
    authDomain: 'yerevan-coder-62f6c.firebaseapp.com',
    databaseURL: 'https://yerevan-coder-62f6c.firebaseio.com',
    projectId: 'yerevan-coder-62f6c',
    storageBucket: 'yerevan-coder-62f6c.appspot.com',
    messagingSenderId: '1071336616103',
  };
} else if (__DEV__ === false) {
  config = {
    apiKey: 'AIzaSyB7cO7cBbZr4gy5Whaurud8tA5MN-zZfeY',
    authDomain: 'yerevan-coder.firebaseapp.com',
    databaseURL: 'https://yerevan-coder.firebaseio.com',
    projectId: 'yerevan-coder',
    storageBucket: 'yerevan-coder.appspot.com',
    messagingSenderId: '404306745515',
  };
} else {
  console.error(`Unknown value for __DEV__:${__DEV__}`);
}

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();

const auth = firebase.auth();

const hiring_table_posts_ref = db.ref(`hiring-table-posts`);

const freelancers_posts_ref = db.ref(`freelancer-table-posts`);

export { firebase, auth, db, hiring_table_posts_ref, freelancers_posts_ref };
