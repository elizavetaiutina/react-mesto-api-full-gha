function PopupWithForm({
  title,
  name,
  children,
  buttonText,
  loadingText,
  isOpen,
  isLoading,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`pop-up pop-up_type_${name} ${isOpen ? "pop-up_opened" : ""}`}>
      <div className="pop-up__container">
        <button type="button" aria-label="Закрыть" className="pop-up__exit" onClick={onClose} />
        <h2 className="pop-up__title">{title}</h2>
        <form name={`form-${name}`} className={`form form_type_${name}`} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="form__button-save">
            {isLoading ? loadingText : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
