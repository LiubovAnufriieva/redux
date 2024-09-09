import PageTitle from "../components/PageTitle/PageTitle";
import LoginForm from "../components/LoginForm/LoginForm";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div>
      <PageTitle>Please log in</PageTitle>
      <LoginForm />

      <p>
        or <Link to="/register">register</Link>
      </p>
    </div>
  );
}
