import { FILES_FORMAT_REG, BYTES_IN_MB } from "../main";
import { findCurrentIndex } from "./deleteFile";

export function addFileInDOM(addedFile, loadImages) {
  const fileBox = document.querySelector(".form__uploaded");
  const file = document.createElement("div");
  file.classList.add("form__img-box");
  file.setAttribute("id", addedFile.name);
  file.setAttribute("draggable", "true");
  file.style.order = findCurrentIndex(loadImages, addedFile.name);
  fileBox.children[0].classList.add("none");
  file.innerHTML = `
    <img draggable="false" class="form__img" src="${window.URL.createObjectURL(
      addedFile
    )}">
    <p class="form__img-name" title="${addedFile.name.replace(
      FILES_FORMAT_REG,
      ""
    )}">
        name: ${addedFile.name.replace(FILES_FORMAT_REG, "")}</p>
    <p class="form__img-format">type: ${
      addedFile.name.match(FILES_FORMAT_REG)[0]
    }</p>
    <p class="form__img-size">size: ${(addedFile.size / BYTES_IN_MB).toFixed(
      2
    )} mb</p>
    <svg class="form__btn-delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
    </svg>
    `;
  fileBox.append(file);
  return file;
}
