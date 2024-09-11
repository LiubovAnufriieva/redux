import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./Layout/Layout";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import { refreshUser } from "../redux/auth/operations";
import { selectIsRefreshing } from "../redux/auth/selectors";
import css from "./App.module.css";

const HomePage = lazy(() => import("../pages/HomePage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const TasksPage = lazy(() => import("../pages/TasksPage"));

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Layout>
      {isRefreshing ? (
        <div className={css.text}>Refreshing user, please wait...</div>
      ) : (
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                component={<RegisterPage />}
                redirectTo="/tasks"
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  redirectTo="/tasks"
                  component={<LoginPage />}
                />
              }
            />
            <Route
              path="/tasks"
              element={
                <PrivateRoute redirectTo="/login" component={<TasksPage />} />
              }
            />
          </Routes>
        </Suspense>
      )}
      <Toaster />
    </Layout>
  );
}
