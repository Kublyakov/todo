'use strict';
const newTodo = document.querySelector('.new-todo');
const list = document.querySelector('.list');
const showAllBtn = document.querySelector('.show-all');
const showActiveBtn = document.querySelector('.show-active');
const showCompletedBtn = document.querySelector('.show-completed');
const clearCompletedBtn = document.querySelector('.clear-completed');
const completeAllBtn = document.querySelector('.complete-all');

// Добавить пункт
newTodo.addEventListener('keypress', (e) => {
  let target = e.target;
  if(e.keyCode === 13 && target.value.length > 0) {
    addItem(target.value);
    target.value = '';
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

// Показывать количество активных элементов в списке
const itemsCount = () => {
  const countElem = document.querySelector('.count');
  let children = list.children;
  let count = 0;
  for(let i = 0; i < children.length; i++) {
    if(!(children[i].classList.contains('completed'))) {
      count++;
    }
  }
  count !== 1 ? countElem.innerHTML = `${count} items left` : countElem.innerHTML = `${count} item left`;
};

list.addEventListener('click', (e) => {
  let target = e.target;

  // Удалить выбранный пункт
  if(target.className === 'item-delete') {
    target.parentNode.remove();
  }

  // Поменять статус выбранного пункта
  if(target.className === 'change-status') {
    target.parentNode.classList.toggle('completed');
  }
});

list.addEventListener('dblclick', (e) => {
  let target = e.target;
  if(target.className === 'todo-text') {
    let content = target.textContent;
    let input = document.createElement('input');
    input.type = 'text';
    input.value = content;
    input.classList.add('edit-item');
    target.parentNode.appendChild(input);
    input.focus();
    input.addEventListener('blur', () => {
      input.classList.add('hide');
      if(input.value.length === 0) {
        target.parentNode.remove();
      } else {
        target.textContent = input.value;
      }
    });
  }
});

// Показать все пункты
showAllBtn.addEventListener('click', () => {
  let children = list.children;
  for(let i = 0; i < children.length; i++) {
    children[i].classList.remove('hide');
  }
});

// Показать активные пункты
showActiveBtn.addEventListener('click', () => {
  let children = list.children;
  for(let i = 0; i < children.length; i++) {
    if(children[i].classList.contains('completed')) {
      children[i].classList.add('hide');
    } else {
      children[i].classList.remove('hide');
    }
  }
});

// Показать выполненные пункты
showCompletedBtn.addEventListener('click', () => {
  let children = list.children;
  for(let i = 0; i < children.length; i++) {
    if(!(children[i].classList.contains('completed'))) {
      children[i].classList.add('hide');
    } else {
      children[i].classList.remove('hide');
    }
  }
});

// Удалить выполненные
clearCompletedBtn.addEventListener('click', (e) => {
  let children = list.children;
  for(let i = 0; i < children.length; i++) {
    if (children[i].classList.contains('completed')) {
      children[i].remove();
    }
  }
});

let isComplete = false;
// Пометить все пункты как выполненные
completeAllBtn.addEventListener('click', () => {
  let children = list.children;
  if(!isComplete) {
    for(let i = 0; i < children.length; i++) {
      children[i].classList.add('completed');
    }
    isComplete = true;
  } else {
    for(let i = 0; i < children.length; i++) {
      children[i].classList.remove('completed');
    }
    isComplete = false;
  }
});

const observer = new MutationObserver(() => {
  itemsCount()
});
const observerConfig = {attributes: true, childList: true, characterData: true, subtree: true};

observer.observe(list, observerConfig);