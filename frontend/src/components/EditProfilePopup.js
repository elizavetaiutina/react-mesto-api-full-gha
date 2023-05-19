import { useEffect, useContext } from "react";
import { useForm } from "../hooks/useForm";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, isLoading, onUpdateUser }) {
  const { values, handleChange, setValues } = useForm({});

  const currentUser = useContext(CurrentUserContext);
  useEffect(() => {
    setValues(currentUser);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      buttonText="Сохранить"
      loadingText="Сохранение..."
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="name-input"
        name="name"
        className="form__input form__input_info_name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={values.name || ""}
        onChange={handleChange}
        required
      />
      <span className="name-input-error form__span-error"></span>
      <input
        type="text"
        id="profession-input"
        name="about"
        className="form__input form__input_info_profession"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        value={values.about || ""}
        onChange={handleChange}
        required
      />
      <span className="profession-input-error form__span-error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
