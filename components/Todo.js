class Todo {
  constructor(data, selector) {
    this._completed = data.completed;
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._templateElement = document.querySelector(selector);
  }
  _setEventListener() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._completed = !this._completed;
    });
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._todoElement.null();
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._completed;
    this._todoCheckboxEl.id = `todo-${this._id}`;
    this._todoLabel.setAttribute("for", `todo-${this._id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

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
    this._setEventListener();

    return this._todoElement;
  }
  _generateCheckboxEl() {
    const checkboxEl = document.createElement("input");
    checkboxEl.type = "checkbox";
    checkboxEl.checked = this.completed;
    return checkboxEl;
  }
}

export default Todo;
