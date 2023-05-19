import { useEffect } from "react";
import { useForm } from "../hooks/useForm";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, isLoading, onAddPlace }) {
  const { values, handleChange, setValues } = useForm({});

  useEffect(() => {
    setValues({});
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: values.name,
      link: values.link,
    });
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      buttonText="Создать"
      loadingText="Сохранение..."
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="nameplace-input"
        name="name"
        className="form__input form__input_info_name-place"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={values.name || ""}
        onChange={handleChange}
        required
      />
      <span className="nameplace-input-error form__span-error"></span>
      <input
        type="url"
        id="url-input"
        name="link"
        className="form__input form__input_info_url-place"
        placeholder="Ссылка на картинку"
        value={values.link || ""}
        onChange={handleChange}
        required
      />
      <span className="url-input-error form__span-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
