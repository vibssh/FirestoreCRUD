const updateUI = (el, id, uid, inputField) => {
  const element = el.parentNode;
  const spanEl = element.querySelector('span');
  const form = document.querySelector('form[name="addHeartRate"]');
  const addBtn = document.querySelector('#add-btn');

  const editBtn = document.createElement('button');
  editBtn.setAttribute('id', 'edit-btn');
  editBtn.setAttribute('data-id', id);
  editBtn.setAttribute('data-uid', uid);
  editBtn.setAttribute('type', 'submit');
  editBtn.textContent = 'Update Data';
  inputField.value = ''; // eslint-disable-line no-param-reassign
  inputField.value = spanEl.textContent; // eslint-disable-line no-param-reassign
  inputField.focus();
  form.replaceChild(editBtn, addBtn);
};

export default {
  updateUI,
};
