import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Layout from "./Layout/Layout";
import AppBar from "./AppBar/AppBar";
import Error from "./Error/Error";
import TaskForm from "./TaskForm/TaskForm";
import TaskList from "./TaskList/TaskList";
import { fetchTasks } from "../redux/operations";
import { selectError, selectIsLoading } from "../redux/selectors";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader/Loader";

export default function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTasks())
      .unwrap()
      .then((value) => {
        console.log(value);

        toast.success("fetchTasks fullfilled");
      })
      .catch((err) => {
        console.log(err);

        toast.error("fetchTasks rejected");
      });
  }, [dispatch]);

  return (
    <Layout>
      <h1>HTTP requests with Redux</h1>
      <AppBar />
      <TaskForm />
      {error && <Error />}
      {loading && !error && <Loader>Loading message</Loader>}
      <TaskList />
      <Toaster />
    </Layout>
  );
}
