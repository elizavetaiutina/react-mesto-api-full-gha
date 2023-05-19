function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`pop-up pop-up_type_card-open ${isOpen ? "pop-up_opened" : ""}`}>
      <div className="open-card">
        <button type="button" aria-label="Закрыть" className="pop-up__exit" onClick={onClose} />
        <figure className="open-card__container">
          <img className="open-card__image" src={`${card.link || ""}`} alt={card.name} />
          <figcaption className="open-card__name">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
