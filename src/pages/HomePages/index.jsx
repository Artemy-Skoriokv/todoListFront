import { Component } from "react";
import TodoList from "../../components/TodoList";
import Footer from "../../components/Footer";
import initialExpenses from "../../constants";
import "./styles.scss";

class HomePage extends Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
    const savedTasks = localStorage.getItem("tasks");
    this.setState({
      tasks: savedTasks ? JSON.parse(savedTasks) : initialExpenses,
    });
  }

  render() {
    const { tasks } = this.state;

    const tasksCount = tasks.length;

    return (
      <div className="home-page">
        <h1 className="home-page__title">To do</h1>
        <div className="home-page__card">
          <TodoList tasks={tasks} />
          <Footer tasksCount={tasksCount} />
        </div>
      </div>
    );
  }
}

export default HomePage;