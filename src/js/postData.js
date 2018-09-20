const postData = (db, collectionName, data, inputField) => {
  db.context.collection(collectionName).add(data).then(() => {
    inputField.value = ''; // eslint-disable-line no-param-reassign
    inputField.focus();
  }).catch((err) => { console.log(err); });
};

export default {
  postData,
};
