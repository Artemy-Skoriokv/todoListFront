import { Component } from "react";
import Todo from "../Todo";
import "./styles.scss";

class TodoList extends Component {
  render() {
    const { 
      tasks,
      handleToggleCheckbox,
      handlChangeInput
    } = this.props;

    return (
      <div className="todo-list">
        {tasks && tasks.map((task) => (
          <Todo
            key={task.id}
            task={task}
            handleToggleCheckbox={handleToggleCheckbox}
            handlChangeInput={handlChangeInput}
          />
        ))}
      </div>
    );
  }
}

export default TodoList;