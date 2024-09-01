import { useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import css from "./Task.module.css";
import { deleteTask, toggleCompleted, updateTask } from "../../redux/operations";
import { useState } from "react";

const TaskEditor = ({ taskId, initialValue, onClose }) => {
  const [text, setText] = useState(initialValue);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateTask({
        id: taskId,
        text,
      })
    )
      .unwrap()
      .then(() => onClose());
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteTask(task.id));

  const handleToggle = () => dispatch(toggleCompleted(task));

  return (
    <div className={css.wrapper}>
      <input
        type="checkbox"
        className={css.checkbox}
        checked={task.completed}
        onChange={handleToggle}
      />
      {isEditing ? (
        <TaskEditor
          initialValue={task.text}
          taskId={task.id}
          onClose={() => setIsEditing(false)}
        />
      ) : (
        <p className={css.text} onClick={() => setIsEditing(true)}>{task.text}</p>
      )}

      <button className={css.btn} onClick={handleDelete}>
        <MdClose size={24} />
      </button>
    </div>
  );
}
