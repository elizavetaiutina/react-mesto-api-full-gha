// конфиг, передаваемый при валидации
const objectValidation = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-save",
  inactiveButtonClass: "form__button-save_disabled",
  inputErrorClass: "form__input_type_error-bottom-red",
  errorClass: "form__span-error_active",
};

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDY3MjhiNDlhZWYwOTQ0M2VlZjNjZDciLCJpYXQiOjE2ODQ0ODc3ODgsImV4cCI6MTY4NTA5MjU4OH0.go157xxi0znQFsIHi_UKafUVh8BMCdEVh20IJOuDyvM";

export { objectValidation, token };
