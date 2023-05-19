import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import api from "../utils/api.js";
import auth from "../utils/auth.js";

import CurrentUserContext from "../contexts/CurrentUserContext.js";
import Footer from "./Footer";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "./PageNotFound";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [arrayCards, setArrayCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, array]) => {
        setCurrentUser(user);
        setArrayCards(array);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}.`);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((selectedCard) => {
        setArrayCards((state) => state.map((c) => (c._id === card._id ? selectedCard : c)));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}.`);
      });
  }
  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setArrayCards((state) => state.filter((c) => (c._id === card._id ? "" : c)));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}.`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}.`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .editUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}.`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .createNewCard(card)
      .then((card) => {
        setArrayCards([card, ...arrayCards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}.`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Открытие закрытие попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleCardClick = (card) => {
    setIsCardPopupOpen(true);
    setSelectedCard(card);
  };
  const handleDeleteClick = (card) => {
    setIsDeleteCardPopupOpen(true);
    setSelectedCard(card);
  };
  const handleInfoTooltip = () => {
    setIsInfoTooltipPopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsInfoTooltipPopupOpen(false);
  };

  // Обработчик Escape
  const isOpenPopup =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isCardPopupOpen ||
    isDeleteCardPopupOpen ||
    isInfoTooltipPopupOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    function closeByOverlay(evt) {
      if (evt.target.classList.contains("pop-up_opened")) {
        closeAllPopups();
      }
    }
    if (isOpenPopup) {
      // Навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      document.addEventListener("mousedown", closeByOverlay);
      // Удаляем в cleanup функции
      return () => {
        document.removeEventListener("keydown", closeByEscape);
        document.removeEventListener("mousedown", closeByOverlay);
      };
    }
  }, [isOpenPopup]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const [isFailedRequestOfRegister, setIsFailedRequestOfRegister] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserData(res.data.email);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onRegister = (password, email) => {
    auth
      .register(password, email)
      .then((data) => {
        if (!data) {
          throw new Error("Что-то пошло не так");
        }
        console.log("Регистрация", data);
      })
      .then(() => {
        setIsFailedRequestOfRegister(false); //запрос успешен

        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        console.log("Некорректно заполнено одно из полей");
        setIsFailedRequestOfRegister(true);
      })
      .finally(() => {
        handleInfoTooltip();
      });
  };

  const onLogin = (password, email) => {
    auth
      .authorize(password, email)
      .then((data) => {
        if (!data) {
          throw new Error("Что-то пошло не так");
        }
        if (data) {
          setLoggedIn(true);
          localStorage.setItem("jwt", data.token);
          return data;
        }
      })
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log("Неправильный логин или пароль");
      });
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/signin", { replace: true });
  };

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/signup" element={<Register onRegister={onRegister} />} />
          <Route path="/signin" element={<Login onLogin={onLogin} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Main}
                cards={arrayCards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteClick}
                onSignOut={onSignOut}
                userData={userData}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onDeleteCard={handleCardDelete}
          card={selectedCard}
        />
        <ImagePopup card={selectedCard} isOpen={isCardPopupOpen} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          errorAnswerOfServer={isFailedRequestOfRegister}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
