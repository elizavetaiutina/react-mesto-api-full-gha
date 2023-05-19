import { useForm } from "../hooks/useForm";
import { useEffect } from "react";
import Header from "./Header";

function Login({ onLogin }) {
  const { values, handleChange, setValues } = useForm({});

  useEffect(() => {
    resetForm();
  }, []);

  const resetForm = () => {
    setValues({ email: "", password: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onLogin(values.password, values.email);
  };

  return (
    <>
      <Header namelink="Регистрация" link="signup" />
      <main className="sign">
        <h1 className="sign__title">Вход</h1>
        <form name="register" className="form-sign form-sign_type_register" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="form-sign__input"
            placeholder="Email"
            value={values.email || ""}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="form-sign__input"
            placeholder="Пароль"
            value={values.password || ""}
            onChange={handleChange}
            required
          />
          <button type="submit" className="form-sign__button">
            Войти
          </button>
        </form>
      </main>
    </>
  );
}
export default Login;
