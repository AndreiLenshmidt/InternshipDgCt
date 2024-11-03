import "normalize.css";
import "./styles/styles.scss";
import { addFiles } from "./modules/addFiles.js";
import { sendFiles } from "./modules/sendFiles.js";
import { updateCounter } from "./modules/counterLoadedFiles.js";
import { dropFiles } from "./modules/drag&drop.js";
import "./modules/appMarkupCreator.js";
import { cleanErrorBox } from "./modules/errorHandler.js";
import { sortFiles } from "./modules/sortFiles.js";

const loadImages = new DataTransfer();
const input = document.querySelector("#image_uploads");
const form = document.querySelector("#form-upload");
const BYTES_IN_MB = 1048576;
const FILES_FORMAT_REG = /.jpg|.PNG|.JPG|.png|.JPEG|.jpeg/;
export { BYTES_IN_MB, FILES_FORMAT_REG };

input.addEventListener("change", () => {
  cleanErrorBox(document.querySelector(".form__error-box"));
  addFiles(input, loadImages);
  updateCounter(loadImages);
});

dropFiles(input, loadImages);

form.addEventListener("submit", (event) => {
  sendFiles(event, loadImages);
});

[
  "#name-ascending",
  "#name-descending",
  "#size-ascending",
  "#size-descending",
].forEach((id) => {
  document.querySelector(id).addEventListener("click", () => {
    sortFiles(id, loadImages);
  });
});
