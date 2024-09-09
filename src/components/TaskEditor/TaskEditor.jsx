import { useDispatch } from "react-redux";
import { addTask } from "../../redux/tasks/operations";
import css from "./TaskEditor.module.css";

const TaskEditor = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const text = form.elements.text.value;
    if (text !== "") {
      dispatch(addTask(text));

      form.reset();
      return;
    }
    alert("Task cannot be empty. Enter some text!");
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        name="text"
        placeholder="Enter task text..."
      />
      <button type="submit" className={css.button}>Add task</button>
    </form>
  );
};

export default TaskEditor;
