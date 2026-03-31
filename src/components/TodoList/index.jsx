import { Component } from "react";
import Todo from "../Todo";
import EditingForm from "../EditingForm";
import "./styles.scss";

class TodoList extends Component {
  render() {
    const { 
      tasks, 
      handleToggleCheckbox, 
      openEditingForm,
      handlChangeInput,
      validateEditingForm,
      cancelEditingTask,
      editingTask,
    } = this.props;

    return (
      <div className="todo-list">
        {tasks.map((task) => (
          task.id === editingTask.taskId ? (
            <EditingForm
              key={task.id}
              text={editingTask.text}
              handlChangeInput={handlChangeInput}
              validateEditingForm={validateEditingForm}
              cancelEditingTask={cancelEditingTask}
              error={editingTask.error}
            />
          ) : (
            <Todo
              key={task.id}
              task={task}
              handleToggleCheckbox={handleToggleCheckbox}
              openEditingForm={openEditingForm}
            />
          )
        ))}
      </div>
    );
  }
}

export default TodoList;