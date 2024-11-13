const showImg = (img: HTMLElement): void => {
  img.classList.remove("none");
};
const hideImg = (img: HTMLElement): void => {
  img.classList.add("none");
};
const formValidation = (
  input: HTMLInputElement | null,
  validImg: HTMLElement | null,
  invalidImg: HTMLElement | null
) => {
  const pattern: RegExp =
    /^(?!.*@.*@.*$)(?!.*@.*--.*\..*$)(?!.*@.*-\..*$)(?!.*@.*-$)((.*)?@.+(\..{1,11})?)$/;
  const isValid: boolean = pattern.test(input?.value || "");
  if (isValid && input?.value.length !== 0) {
    if (validImg) showImg(validImg);
    if (invalidImg) hideImg(invalidImg);
    return true;
  } else {
    if (validImg) hideImg(validImg);
    if (invalidImg) showImg(invalidImg);
    return false;
  }
};
const handlerFocusEvent = (
  input: HTMLInputElement | null,
  invalidClassName: string,
  validImg: HTMLElement | null,
  invalidImg: HTMLElement | null
) => {
  input?.classList.remove(invalidClassName);
  if (validImg) hideImg(validImg);
  if (invalidImg) hideImg(invalidImg);
};
const handleBlurEvent = (
  input: HTMLInputElement | null,
  invalidClassName: string,
  validClassName: string,
  validImg: HTMLElement | null,
  invalidImg: HTMLElement | null
) => {
  const isValid = formValidation(input, validImg, invalidImg);
  if (isValid) {
    input?.classList.remove(invalidClassName);
    input?.classList.add(validClassName);
  } else {
    input?.classList.remove(validClassName);
    input?.classList.add(invalidClassName);
  }
};

const handlerSubmit = (
  event: React.FormEvent,
  input: HTMLInputElement | null,
  invalidClassName: string,
  validClassName: string,
  validImg: HTMLElement | null,
  invalidImg: HTMLElement | null
) => {
  event.preventDefault();
  const isvalid = formValidation(input, validImg, invalidImg);
  if (!isvalid) {
    handleBlurEvent(
      input,
      invalidClassName,
      validClassName,
      validImg,
      invalidImg
    );
    return;
  }
  const forms = document.querySelectorAll("form");
  for (const form of forms) {
    for (const elem of form) {
      elem.setAttribute("disabled", "disabled");
    }
  }
  setTimeout(() => {
    for (const elem of [...forms[0].children].slice(0, 2)) {
      elem.setAttribute("style", "display: none");
    }
    forms[0].children[2].classList.remove("none");
  }, 1000);
};

export { formValidation, handlerFocusEvent, handleBlurEvent, handlerSubmit };
