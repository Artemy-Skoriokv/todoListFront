import { Component } from "react";
import "./styles.scss";

class AddForm extends Component {
  render() {
    const { newTaskText, handleInputChange, validateForm, error } = this.props;

    return (
      <div className="add-form">
        <div className="add-form__input">
          <input
            type="text"
            className="add-form__task"
            placeholder="What needs to be done?"
            value={newTaskText}
            onChange={handleInputChange}
          />
          {error && <span className="add-form__error">{error}</span>}
        </div>
        <button
          className="add-form__button"
          onClick={validateForm}
          type="button"
        >
          ADD
        </button>
      </div>
    );
  }
}

export default AddForm;
