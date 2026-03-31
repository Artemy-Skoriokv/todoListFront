import { Component } from "react";
import TodoList from "../../components/TodoList";
import AddForm from "../../components/AddForm";
import Footer from "../../components/Footer";
import initialExpenses from "../../constants";
import "./styles.scss";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      newTaskText: "",
      error: "",
      idEditedTask: null,
      editingText: "",
      editingError: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.addTask = this.addTask.bind(this);
    this.handleToggleCheckbox = this.handleToggleCheckbox.bind(this);
    this.openEditingForm = this.openEditingForm.bind(this);
    this.handlChangeInput = this.handlChangeInput.bind(this);
    this.validateEditingForm = this.validateEditingForm.bind(this);
    this.cancelEditingTask = this.cancelEditingTask.bind(this);
    this.sortTasks = this.sortTasks.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      newTaskText: e.target.value,
      error: "",
    });
  }

  validateForm() {
    const { newTaskText } = this.state;

    if (!newTaskText.trim()) {
      this.setState({
        error: "Поле не должно быть пустым",
      });
      return;
    }

    this.addTask();
  }

  addTask() {
    const { newTaskText, tasks } = this.state;

    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false,
    };

    const updatedTasks = [newTask, ...tasks];

    this.setState({
      tasks: updatedTasks,
      newTaskText: "",
      error: "",
    });

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  handleToggleCheckbox(id) {
    const { tasks } = this.state;

    if (!id) {
      return;
    }

    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return;
    }

    const task = tasks[taskIndex];
    const updatedTask = {
      ...task,
      completed: !task.completed,
    };

    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = updatedTask;

    this.setState({ tasks: updatedTasks }, () => {
      this.sortTasks();
    });

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  sortTasks() {
    const { tasks } = this.state;

    if (!tasks.length) {
      return;
    }

    const sortedTasks = [...tasks].sort((a, b) => {
      if (a.completed === b.completed) {
        return 0;
      }
      return a.completed ? 1 : -1;
    });

    this.setState({ tasks: sortedTasks });

    localStorage.setItem("tasks", JSON.stringify(sortedTasks));
  }

  openEditingForm(id) {
    const task = this.state.tasks.find((task) => task.id === id);

    if (!task) {
      return;
    }

    this.setState({
      idEditedTask: id,
      editingText: task.text,
      editingError: "",
    });
  }

  handlChangeInput(e) {
    this.setState({
      editingText: e.target.value,
      editingError: "",
    });
  }

  validateEditingForm() {
    const { idEditedTask, editingText, tasks } = this.state;

    if (!idEditedTask) {
      return;
    }

    if (!editingText.trim()) {
      this.setState({
        editingError: "Поле не должно быть пустым",
      });
      return;
    }

    const taskIndex = tasks.findIndex((task) => task.id === idEditedTask);

    if (taskIndex === -1) {
      return;
    }

    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      text: editingText.trim(),
    };

    this.setState({
      tasks: updatedTasks,
      idEditedTask: null,
      editingText: "",
      editingError: "",
    });

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  cancelEditingTask() {
    this.setState({
      idEditedTask: null,
      editingText: "",
      editingError: "",
    });
  }

  componentDidMount() {
    const savedTasks = localStorage.getItem("tasks");
    this.setState({
      tasks: savedTasks ? JSON.parse(savedTasks) : initialExpenses,
    });
  }

  render() {
    const {
      tasks,
      newTaskText,
      error,
      idEditedTask,
      editingText,
      editingError,
    } = this.state;

    const tasksCount = tasks.length;

    const editingTask = {
      taskId: idEditedTask,
      text: editingText,
      error: editingError,
    };

    return (
      <div className="home-page">
        <h1 className="home-page__title">To do</h1>
        <div className="home-page__card">
          <AddForm
            newTaskText={newTaskText}
            error={error}
            handleInputChange={this.handleInputChange}
            validateForm={this.validateForm}
          />
          <TodoList
            tasks={tasks}
            handleToggleCheckbox={this.handleToggleCheckbox}
            openEditingForm={this.openEditingForm}
            handlChangeInput={this.handlChangeInput}
            validateEditingForm={this.validateEditingForm}
            cancelEditingTask={this.cancelEditingTask}
            editingTask={editingTask}
          />
          <Footer
            tasksCount={tasksCount}
          />
        </div>
      </div>
    );
  }
}

export default HomePage;