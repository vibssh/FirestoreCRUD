import firebase from 'firebase';
import settings from './config';
import pubsub from './pubsub';
import main from './main';
import uuid from './uuid';
import post from './postData';
import update from './updateUI';
import updateData from './updateData';
import removeData from './removeData';

// const main = require('./main');
firebase.initializeApp(settings.config);

const db = require('./db');

const { collectionName } = settings.config;

const form = document.querySelector('form[name="addHeartRate"]');

const _events = pubsub.events();

const addButton = document.querySelector('#add-btn');

const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
// Realtime Multiple Data get Data
db.context.collection(collectionName).onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    const data = change.doc.data();
    const dataId = change.doc.id;
    const dataObj = {
      dataId,
      data,
    };

    const changeType = change.type;
    console.log(changeType);
    switch (changeType) {
      case 'added':
        _events.publish('getData', dataObj);
        break;

      case 'modified':
        _events.publish('updateData', dataObj);
        break;

      case 'removed':
        _events.publish('removeData', dataObj);
        break;
      default:
        _events.publish('getData', dataObj);
    }
  });
});

// Post Data
addButton.addEventListener('click', (e) => {
  e.preventDefault();
  const addInputField = document.querySelector('#addHeartRate');
  const heartRate = addInputField.value;
  const uniqueId = uuid.guid();
  const docData = {
    entryDate: timeStamp,
    heartRateValue: heartRate,
    uid: uniqueId,
  };
  if (docData.heartRateValue !== null || docData.uid !== null) {
    post.postData(db, collectionName, docData, addInputField);
  }
});

// update ui
document.addEventListener('click', (e) => {
  const addInputField = document.querySelector('#addHeartRate');
  if (e.target.className === 'edit-btn') {
    const dataId = e.target.getAttribute('data-id');
    const dataUid = e.target.getAttribute('data-uid');
    update.updateUI(e.target, dataId, dataUid, addInputField);
  }
});

// update Data
document.addEventListener('click', (e) => {
  const addInputField = document.querySelector('#addHeartRate');
  if (e.target.id === 'edit-btn') {
    e.preventDefault();
    console.log(e.target);
    console.log(form);
    const dataId = e.target.getAttribute('data-id');
    const heartRate = addInputField.value;
    const uniqueId = e.target.getAttribute('data-uid');
    const data = {
      entryDate: timeStamp,
      heartRateValue: heartRate,
      uid: uniqueId,
    };
    if (data.heartRateValue !== '') {
      updateData.updateData(dataId, db, collectionName, data, addInputField);
      form.replaceChild(addButton, e.target);
    }
  }
});

// Remove Data
document.addEventListener('click', (e) => {
  if (e.target.className === 'remove-btn') {
    const dataId = e.target.getAttribute('data-id');
    removeData.removeData(dataId, db, collectionName);
  }
});

/** Event Hooks */
// Get Data
_events.subscribe('getData', (dataObj) => {
  main.createLists(dataObj.data.heartRateValue, dataObj.dataId, dataObj.data.uid);
  console.log(dataObj);
});

// Update Data
_events.subscribe('updateData', (dataObj) => {
  console.log('Modified', dataObj);
  const id = dataObj.dataId;
  const text = dataObj.data.heartRateValue;
  main.updateList(text, id);
  console.log('updated dataObj');
});

// Remove Data
_events.subscribe('removeData', (dataObj) => {
  const id = dataObj.dataId;
  main.removeList(id);
  console.log('Remove Data', dataObj);
});
