import imgSuccess from "../images/success.svg";
import imgFail from "../images/fail.svg";

function InfoTooltip({ isOpen, errorAnswerOfServer, onClose }) {
  return (
    <div className={`pop-up ${isOpen ? "pop-up_opened" : ""}`}>
      <div className="pop-up__container">
        <button type="button" aria-label="Закрыть" className="pop-up__exit" onClick={onClose} />
        <img
          src={errorAnswerOfServer ? imgFail : imgSuccess}
          alt="Результат запроса"
          className="pop-up__img"
        />
        <h2 className="pop-up__text">
          {errorAnswerOfServer
            ? "Что-то пошло не так! Попробуйте ещё раз."
            : "Вы успешно зарегистрировались!"}
        </h2>
      </div>
    </div>
  );
}
export default InfoTooltip;

//Что-то пошло не так! Попробуйте ещё раз.
