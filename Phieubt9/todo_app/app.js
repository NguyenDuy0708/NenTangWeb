const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const countEl = document.getElementById('count');
const clearBtn = document.getElementById('clearCompleted');
const nav = document.querySelector('header nav');

let todos = JSON.parse(localStorage.getItem('todos') || '[]');
let filter = 'all';

function save() { localStorage.setItem('todos', JSON.stringify(todos)); }

function render() {
  todoList.innerHTML = '';

  const visible = todos.filter(t =>
    filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed
  );

  visible.forEach(t => {
    const li = document.createElement('li');
    li.dataset.id = t.id;
    li.className = t.completed ? 'completed' : '';

    const left = document.createElement('div');
    left.className = 'left';

    const text = document.createElement('span');
    text.className = 'text';
    text.textContent = t.text;

    left.appendChild(text);

    const del = document.createElement('button');
    del.className = 'btn-delete';
    del.title = 'Xóa';
    del.textContent = '❌';

    li.appendChild(left);
    li.appendChild(del);

    todoList.appendChild(li);
  });

  const leftCount = todos.filter(t => !t.completed).length;
  countEl.textContent = `${leftCount} item${leftCount !== 1 ? 's' : ''} left`;
}

function addTodo(text) {
  const t = { id: Date.now().toString(36), text: text.trim(), completed: false };
  if (!t.text) return;
  todos.unshift(t);
  save();
  render();
}

todoForm.addEventListener('submit', e => {
  e.preventDefault();
  addTodo(todoInput.value);
  todoInput.value = '';
  todoInput.focus();
});

// Event delegation for list (toggle, delete, edit double-click)
todoList.addEventListener('click', e => {
  const li = e.target.closest('li');
  if (!li) return;
  const id = li.dataset.id;

  if (e.target.classList.contains('btn-delete')) {
    todos = todos.filter(t => t.id !== id);
    save(); render();
    return;
  }

  // Click on text toggles completed
  if (e.target.classList.contains('text')) {
    todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    save(); render();
  }
});

// Double-click to edit
todoList.addEventListener('dblclick', e => {
  const li = e.target.closest('li');
  if (!li) return;
  const id = li.dataset.id;
  const t = todos.find(x => x.id === id);
  if (!t) return;

  li.classList.add('editing');
  li.innerHTML = '';
  const input = document.createElement('input');
  input.type = 'text';
  input.value = t.text;
  li.appendChild(input);
  input.focus();

  function done(saveText) {
    if (saveText !== undefined) t.text = saveText.trim() || t.text;
    li.classList.remove('editing');
    save(); render();
  }

  input.addEventListener('keydown', ev => {
    if (ev.key === 'Enter') {
      done(input.value);
    } else if (ev.key === 'Escape') {
      done();
    }
  });
  // blur also saves
  input.addEventListener('blur', () => done(input.value));
});

// Filter nav
nav.addEventListener('click', e => {
  if (e.target.tagName !== 'A') return;
  e.preventDefault();
  nav.querySelectorAll('a').forEach(a => a.classList.remove('active'));
  e.target.classList.add('active');
  filter = e.target.dataset.filter;
  render();
});

clearBtn.addEventListener('click', () => {
  todos = todos.filter(t => !t.completed);
  save(); render();
});

// Initial render
render();
