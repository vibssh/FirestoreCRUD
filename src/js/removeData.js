const removeData = (id, db, collectionName) => {
  // , db,  collectionName, data, inputField
  db.context.collection(collectionName).doc(id).delete().then(() => {
    console.log('successfully deleted');
  })
    .catch((err) => { console.log(err); });
};

export default {
  removeData,
};
