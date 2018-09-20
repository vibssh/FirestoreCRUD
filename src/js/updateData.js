const updateData = (id, db, collectionName, data, inputField) => {
  // , db,  collectionName, data, inputField

  db.context.collection(collectionName).doc(id).set(data).then(() => {
    inputField.value = ''; // eslint-disable-line no-param-reassign
    inputField.focus();
  })
    .catch((err) => { console.log(err); });
};

export default {
  updateData,
};
