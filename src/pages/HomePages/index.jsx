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
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.addTask = this.addTask.bind(this);
    this.handleToggleCheckbox = this.handleToggleCheckbox.bind(this);
    this.handlChangeInput = this.handlChangeInput.bind(this);
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

  handlChangeInput(e) {
    this.setState({
      editingText: e.target.value,
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
      error
    } = this.state;

    const tasksCount = tasks.length;

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
            handlChangeInput={this.handlChangeInput}
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