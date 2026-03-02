class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._completed = data.completed;
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._selector = selector;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }
  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._completed);
      this._remove();
    });
    this._todoCheckboxEl.addEventListener("change", () => {
      this._toggleCompletion();
      this._handleCheck(this._completed);
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._completed;
    this._todoCheckboxEl.id = `todo-${this._id}`;
    this._todoLabel.setAttribute("for", `todo-${this._id}`);
  }

  _toggleCompletion() {
    this._completed = !this._completed;
  }
  _remove() {
    this._todoElement.remove();
    this._todoElement = null;
  }

  getView() {
    this._todoElement = this._getTemplate();

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._name;
    const dueDate = new Date(this._date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
  _getTemplate() {
    return document.querySelector("#todo-template").content.cloneNode(true);
  }
  getName() {
    let name = this._name;
    if (name.length > 25) {
      name = name.substring(0, 25) + "...";
    }
    return name;
  }
}

export default Todo;
