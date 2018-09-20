
const ul = document.querySelector('#heart-rate');
let li = '';
let textNode = '';
let spanEl = '';
let editBtn = '';
let removeBtn = '';

const createLists = (item, itemId, itemUid) => {
  console.log('itemUid', itemUid);
  li = document.createElement('li');
  editBtn = document.createElement('button');
  spanEl = document.createElement('span');
  removeBtn = document.createElement('button');
  li.setAttribute('data-id', itemId);
  textNode = document.createTextNode(item);
  editBtn.setAttribute('data-id', itemId);
  editBtn.setAttribute('data-uid', itemUid);
  editBtn.setAttribute('class', 'edit-btn');
  editBtn.textContent = 'Edit';
  removeBtn.setAttribute('class', 'remove-btn');
  removeBtn.setAttribute('data-id', itemId);
  removeBtn.textContent = 'Delete';
  spanEl.appendChild(textNode);
  li.appendChild(spanEl);
  li.appendChild(editBtn);
  li.appendChild(removeBtn);

  ul.appendChild(li);
};

const updateList = (item, itemId) => {
  const el = document.querySelector(`li[data-id="${itemId}"]`);
  spanEl = el.querySelector('span');
  spanEl.textContent = item;
};

const removeList = (itemId) => {
  const el = document.querySelector(`[data-id="${itemId}"]`);
  el.parentNode.removeChild(el);
};

export default {
  createLists,
  updateList,
  removeList,
};
