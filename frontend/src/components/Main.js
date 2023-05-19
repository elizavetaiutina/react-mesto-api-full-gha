import { useContext } from "react";
import Header from "./Header";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  onSignOut,
  userData,
  loggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header
        namelink="Выйти"
        link="signin"
        userData={userData}
        onSignOut={onSignOut}
        loggedIn={loggedIn}
      />
      <main className="main">
        <section className="profile">
          <div className="profile__avatar-overlay" onClick={onEditAvatar}>
            <img alt="avatar" className="profile__avatar" src={currentUser.avatar} />
          </div>
          <div className="profile__info">
            <div className="profile__name-edit">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                aria-label="Изменить данные профиля"
                className="profile__button-edit"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
          <button
            type="button"
            aria-label="Добавить"
            className="profile__button-add"
            onClick={onAddPlace}
          ></button>
        </section>
        <section className="gallery">
          <ul className="gallery__card-list">
            {cards.map((item) => {
              return (
                <Card
                  key={item._id}
                  card={item}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
