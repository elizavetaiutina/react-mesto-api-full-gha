import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, isLoading, onDeleteCard, card }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete-card"
      buttonText="Да"
      loadingText="Удаление..."
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
export default DeleteCardPopup;
