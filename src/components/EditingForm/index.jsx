import { Component } from "react";
import cross from "../../images/cross.png";
import checkMark from "../../images/checkMark.png";
import "./styles.scss";

class EditingForm extends Component {
  render() {
    const { 
      text, 
      handlChangeInput, 
      validateEditingForm, 
      cancelEditingTask, 
      error,
    } = this.props;

    return (
      <div className="editing-form">
        <button
          className="editing-form__button"
          onClick={validateEditingForm}
          type="button"
        >
          <img src={checkMark} alt="check" />
        </button>
        <div className="editing-form__block">
          <input
            type="text"
            className="editing-form__input"
            value={text}
            onChange={handlChangeInput}
          />
          {error && <span className="editing-form__error">{error}</span>}
        </div>
        <button
          className="editing-form__button"
          onClick={cancelEditingTask}
          type="button"
        >
          <img src={cross} alt="cross" />
        </button>
      </div>
    );
  }
}

export default EditingForm;