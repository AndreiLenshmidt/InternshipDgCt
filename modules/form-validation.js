export function formValidation(event) {
  event.preventDefault();
  const footerEmail = document.querySelector(".footer__small-box input");
  const footerButton = document.querySelector(".footer__small-box button");
  const formBoxes = document.querySelectorAll(".form__box");
  const formSubmitted = document.querySelector(".form__submitted");
  const validationImg = document.querySelector("#validimg");
  const pattern =
    /^(?!.*@.*@.*$)(?!.*@.*--.*\..*$)(?!.*@.*-\..*$)(?!.*@.*-$)((.*)?@.+(\..{1,11})?)$/;
  const isValid = pattern.test(event.target[0].value);
  if (event.target[0].value.length === 0 || !isValid) {
    event.target[0].classList.add("form__email_invalid");
    validationImg.classList.remove("none");
    validationImg.classList.add("form__email_invalid-img");
    return;
  }
  for (const elem of event.target) {
    elem.setAttribute("disabled", "disabled");
  }
  event.target[0].classList.add("form__email_valid");
  validationImg.classList.remove("none");
  validationImg.classList.add("form__email_valid-img");
  footerEmail.setAttribute("disabled", "disabled");
  footerButton.setAttribute("disabled", "disabled");

  setTimeout(() => {
    for (const box of formBoxes) {
      box.remove();
    }
    formSubmitted.classList.remove("none");
  }, 3500);
}
