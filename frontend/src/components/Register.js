import { useForm } from "../hooks/useForm";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";

function Register({ onRegister }) {
  const { values, handleChange, setValues } = useForm({});

  const resetForm = () => {
    setValues({ email: "", password: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onRegister(values.password, values.email);
  };

  useEffect(() => {
    resetForm();
  }, []);

  return (
    <>
      <Header namelink="Войти" link="signin" />
      <main className="sign">
        <h1 className="sign__title">Регистрация</h1>
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
            Зарегистрироваться
          </button>
        </form>
        <p className="sign__text">
          Уже зарегистрированы?{" "}
          <Link to="/signin" className="sign__link">
            Войти
          </Link>
        </p>
      </main>
    </>
  );
}
export default Register;
