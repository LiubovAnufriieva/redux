import { useSelector } from "react-redux";
import {Task} from "../Task/Task";
import { selectAllTasks } from "../../redux/tasks/selectors";

import css from "./TaskList.module.css";

const TaskList = () => {
  const tasks = useSelector(selectAllTasks);

  return (
    <ul className={css.list}>
      {tasks.map(({ id, text }) => (
        <li className={css.listItem} key={id}>
          <Task id={id} text={text} />
        </li>
      ))}
    </ul>
  );
};
export default TaskList;

