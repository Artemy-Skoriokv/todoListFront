import { Component } from "react";
import pencil from "../../images/pencil.png";
import cross from "../../images/cross.png";
import checkMark from "../../images/checkMark.png";
import "./styles.scss";

class Todo extends Component {
  render() {
    const { task } =
      this.props;

    return (
      <div className="todo">
        <button
          className={`todo__checkbox ${task.completed ? "todo__checkbox-checked" : ""}`}
          type="button"
        >
          {task.completed && (
            <img
              src={checkMark}
              alt="check"
              className="todo-list__checkbox-images"
            />
          )}
        </button>
        <span
          className={`todo__text ${task.completed ? "todo__text-completed" : ""}`}
        >
          {task.text}
        </span>
        <button
          className={`todo__button ${task.completed ? "todos__button" : ""}`}
          type="button"
        >
          <img
            src={task.completed ? cross : pencil}
            alt="pencil"
            className="todo-list__pencil"
          />
        </button>
      </div>
    );
  }
}

export default Todo;
