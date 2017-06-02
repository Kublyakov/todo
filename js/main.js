'use strict';
const newTodo = document.querySelector('.new-todo');
const list = document.querySelector('.list');
const showActiveBtn = document.querySelector('.show-active');

newTodo.addEventListener('keypress', (e) => {
  let target = e.target;
  if(e.keyCode === 13 && target.value.length > 0) {
    addItem(target.value);
    target.value = '';
    itemsCount();
  }
});

const addItem = (text) => {
  list.insertAdjacentHTML('afterBegin', itemTemplate(text));
};

// Шаблон
const itemTemplate = (text) => {
  return `
<li class="item">
  <button class="change-status">✔</button>
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

// Поменять статус выбранного пункта
const changeItemStatus = () => {
  list.addEventListener('click', (e) => {
    let target = e.target;
    if(target.className === 'change-status') {
      target.parentNode.classList.toggle('completed');
      itemsCount();
    }
  });
};

// Показать активные пункты
showActiveBtn.addEventListener('click', () => {
  list.children.forEach((item) => {
    if(!(item.classList.contains('completed'))) {
      this.classList.add('hide');
    }
  });
});


deleteItem();
changeItemStatus();