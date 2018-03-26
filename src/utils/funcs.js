import { firebase, db } from './db';

export const query_my_freelance_submission = () => {
  const current_user = firebase.auth().currentUser;
  return db
    .ref(`users/${current_user.uid}/my-freelance-submission`)
    .once('value')
    .then(snapshot => snapshot.val());
};

export const query_my_hiring_post_submissions = () => {
  const current_user = firebase.auth().currentUser;
  return db
    .ref(`users/${current_user.uid}/my-hiring-board-submissions`)
    .once('value')
    .then(snapshot => snapshot.val());
};

export const updateByPropertyName = (propertyName, value) => () => ({ [propertyName]: value });

export const is_number = s => /\d/.test(s);

export const obj_to_array = obj => Object.keys(obj).map(key => ({ ...obj[key], post_key: key }));

export const no_op = () => null;
