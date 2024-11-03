import { updateCounter } from "./counterLoadedFiles.js";
import { cleanErrorBox } from "./errorHandler.js";
import { changeActiveFilter } from "./sortFiles.js";

const clearForm = (loadImages, fileBox) => {
  fileBox.innerHTML =
    '<p class="form__message none">Нет загруженных файлов</p>';
  loadImages.items.clear();
  updateCounter(loadImages);
};

const showLoader = (fileBox) => {
  cleanErrorBox(document.querySelector(".form__error-box"));
  const loader = document.createElement("div");
  loader.classList.add("loader");
  fileBox.append(loader);
};

const hideLoader = (fileBox, text) => {
  document.querySelector(".loader").remove();
  const message = document.createElement("p");
  message.textContent = text;
  message.classList.add("form__message_send");
  fileBox.append(message);
  setTimeout(() => {
    message.remove();
    document.querySelector(".form__message").classList.remove("none");
  }, 3000);
};

export async function sendFiles(event, loadImages) {
  event.preventDefault();
  const fileBox = document.querySelector(".form__uploaded");
  if (loadImages.files.length === 0) {
    cleanErrorBox(document.querySelector(".form__error-box"));
    return;
  }
  const formData = new FormData();
  for (const file of event.target[0].files) {
    const name = file.name;
    formData.append(name, file, name);
  }
  clearForm(loadImages, fileBox);
  try {
    showLoader(fileBox);
    changeActiveFilter(false);
    const response = await fetch("https://dummyjson.com/http/200", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    hideLoader(fileBox, "Файлы отправлены");
  } catch (error) {
    hideLoader(fileBox, "Ошибка, файлы не отправлены");
  }
}
