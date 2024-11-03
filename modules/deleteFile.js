import { updateCounter } from "./counterLoadedFiles";
import { cleanErrorBox } from "./errorHandler";
import { dropEvents, removeDropEventsListenners } from "./drag&drop";
import { changeOrderFilesInDom } from "./sortFiles";

export function deleteFileListener(loadImages, element) {
  const deleteBtn = element.children[4];

  const removeFile = () => {
    element.remove();
    const fileName = element.getAttribute("id");
    loadImages.items.remove(findCurrentIndex(loadImages, fileName));
    changeOrderFilesInDom(loadImages);
    deleteBtn.removeEventListener("click", removeFile);
    removeDropEventsListenners(dropEvents, deleteBtn.parentElement);
    cleanErrorBox(document.querySelector(".form__error-box"));
    updateCounter(loadImages);
    document.querySelector("#image_uploads").files = loadImages.files;
    if (loadImages.items.length === 0) {
      document.querySelector(".form__message").classList.remove("none");
    }
  };

  deleteBtn.addEventListener("click", removeFile);
}

export function findCurrentIndex(loadImages, fileName) {
  const names = [].map.call(loadImages.files, (element) => element.name);
  for (const item of fileName) {
    const index = names.indexOf(fileName);
    if (index !== -1) return index;
  }
  return -1;
}
