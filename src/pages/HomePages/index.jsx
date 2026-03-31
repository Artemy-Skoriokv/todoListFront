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