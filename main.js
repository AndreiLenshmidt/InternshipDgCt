import { hideHeader } from "../modules/hide-header.js";
import { openDatailsOnSmatphones } from "../modules/open-details.js";
import { formValidation } from "../modules/form-validation.js";

openDatailsOnSmatphones(
  document.querySelectorAll(".footer__menu:not(:first-child)")
);

for (const form of document.querySelectorAll("form")) {
  form.addEventListener("submit", formValidation);
}

window.addEventListener("scroll", hideHeader);
