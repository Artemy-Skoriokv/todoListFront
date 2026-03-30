import { Component } from "react";
import "./styles.scss";

class Footer extends Component {
  render() {
    const { tasksCount, deleteAllTasks } = this.props;

    return (
      <div className="footer">
        <span className="footer__count">{tasksCount} items</span>
        <button
        className="footer__button"
        type="button"
        onClick={deleteAllTasks}
        >
          Delete All
        </button>
      </div>
    );
  }
}

export default Footer;
