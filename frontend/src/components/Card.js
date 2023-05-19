import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__button-like ${isLiked && "card__button-like_active"}`;

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      {isOwn && (
        <button
          type="button"
          aria-label="Удалить Карточку"
          className="card__button-delete"
          onClick={handleDeleteClick}
        />
      )}
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="card__info">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__like">
          <button
            type="button"
            aria-label="Поставить лайк"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="card__like-amount">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
