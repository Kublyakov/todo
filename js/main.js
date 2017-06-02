'use strict';
const newTodo = document.querySelector('.new-todo');
const list = document.querySelector('.list');

newTodo.addEventListener('keypress', (e) => {
  let target = e.target;
  if(e.keyCode === 13 && target.value.length > 0) {
    addItem("1", target.value);
    target.value = '';
    itemsCount();
  }
});

const addItem = (id, text) => {
  list.insertAdjacentHTML('afterBegin', itemTemplate(id, text));
};

// Шаблон
const itemTemplate = (id, text) => {
return `
<li class="item">
  <label for="item${id}">✔</label>
  <input type="checkbox" id="item${id}">
  <div class="todo-text">${text}</div>
  <button class="item-delete">x</button>
</li>
`
};

// Показывать количество элементов в списке
const itemsCount = () => {
  const countElem = document.querySelector('.count');
  let count = list.children.length;
  count !== 1 ? countElem.innerHTML = `${count} items left` : countElem.innerHTML = `${count} item left`;
};

// Удалить выбранный пункт
const deleteItem = () => {
  list.addEventListener('click', (e) => {
    let target = e.target;
    if(target.className === 'item-delete') {
      target.parentNode.remove();
      itemsCount();
    }
  });
};

deleteItem();