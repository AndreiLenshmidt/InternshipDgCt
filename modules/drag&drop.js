import { addFiles } from "./addFiles.js";
import { updateCounter } from "./counterLoadedFiles.js";
import { cleanErrorBox } from "./errorHandler.js";
import { sortByDragAndDrop } from "./sortFiles.js";

export function dropFiles(input, loadImages) {
  const dropFileZone = document.querySelector(".form__drop-box");
  dropFileZone.addEventListener("dragover", (event) => event.preventDefault());
  dropFileZone.addEventListener("dragenter", (event) => {
    event.stopPropagation();
    dropFileZone.classList.add("form__drop-box_active");
  });
  dropFileZone.addEventListener("dragleave", (event) => {
    event.stopPropagation();
    dropFileZone.classList.remove("form__drop-box_active");
  });
  dropFileZone.addEventListener("drop", (event) => {
    dropFileZone.classList.remove("form__drop-box_active");
    event.preventDefault();
    event.stopPropagation();
    input.files = event.dataTransfer.files;
    cleanErrorBox(document.querySelector(".form__error-box"));
    addFiles(input, loadImages);
    updateCounter(loadImages);
  });
}
export const dropEvents = [];

let dragStartElement;
export function dragDropListenner(loadImages, element) {
  const dragstartHandler = (event) => {
    event.target.classList.add(`selected`);
    dragStartElement = element;
  };
  element.addEventListener("dragstart", dragstartHandler);

  const dragendHandler = (event) => event.target.classList.remove("selected");
  element.addEventListener("dragend", dragendHandler);

  const dragoverHandler = (event) => event.preventDefault();
  element.addEventListener("dragover", dragoverHandler);

  const dropHandler = (event) => {
    event.preventDefault();
    dragStartElement.classList.remove("selected");
    if (dragStartElement.style.order === element.style.order) {
      cleanErrorBox(document.querySelector(".form__error-box"));
      return;
    }
    sortByDragAndDrop(
      dragStartElement.style.order,
      element.style.order,
      loadImages
    );
    [dragStartElement.style.order, element.style.order] = [
      element.style.order,
      dragStartElement.style.order,
    ];
    cleanErrorBox(document.querySelector(".form__error-box"));
  };
  element.addEventListener("drop", dropHandler);
  dropEvents.push(
    { name: "dragstart", handler: dragstartHandler },
    { name: "dragend", handler: dragendHandler },
    { name: "dragover", handler: dragoverHandler },
    { name: "drop", handler: dropHandler }
  );
}

let touchstartElem;
let movableElem;

export function dragDropSmartphone(loadImages, element) {
  const touchstartHandler = (event) => {
    // event.preventDefault();
    const clone = element.cloneNode(true);
    element.after(clone);
    clone.classList.add(`selected`);
    const touch = event.targetTouches[0];
    clone.style.position = "absolute";
    clone.style.left = `${touch.clientX - 60}px`;
    clone.style.top = `${
      touch.clientY - 60 + document.documentElement.scrollTop
    }px`;
    touchstartElem = element;
    movableElem = clone;
  };
  element.addEventListener("touchstart", touchstartHandler);

  const touchmoveHandler = (event) => {
    event.preventDefault();
    let touch = event.targetTouches[0];
    movableElem.style.left = `${touch.clientX - 60}px`;
    movableElem.style.top = `${
      touch.clientY - 60 + document.documentElement.scrollTop
    }px`;
  };
  element.addEventListener("touchmove", touchmoveHandler);

  const touchendHandler = (event) => {
    movableElem.remove();
    const { clientX, clientY } = event.changedTouches[0];
    let touchendElement = document.elementFromPoint(clientX, clientY);
    if (touchendElement?.parentElement.classList.contains("form__img-box")) {
      touchendElement = touchendElement.parentElement;
    } else if (
      !touchendElement?.attributes.draggable === true &&
      touchendElement?.tagName === "DIV"
    ) {
      touchendElement = false;
    }
    if (
      touchstartElem?.style?.order === touchendElement?.style?.order ||
      !touchendElement
    ) {
      cleanErrorBox(document.querySelector(".form__error-box"));
      return;
    } else if (
      touchendElement.classList.contains("form__btn-delete") ||
      touchendElement.tagName === "path"
    ) {
      return;
    }
    element.style.left = "";
    element.style.top = "";
    sortByDragAndDrop(
      touchstartElem.style.order,
      touchendElement.style.order,
      loadImages
    );
    [touchstartElem.style.order, touchendElement.style.order] = [
      touchendElement.style.order,
      touchstartElem.style.order,
    ];
    cleanErrorBox(document.querySelector(".form__error-box"));
  };
  element.addEventListener("touchend", touchendHandler);
  dropEvents.push(
    { name: "touchstart", handler: touchstartHandler },
    { name: "touchmove", handler: touchmoveHandler },
    { name: "touchend", handler: touchendHandler }
  );
}

export function removeDropEventsListenners(dropEvents, element) {
  dropEvents.forEach((evt) =>
    element.removeEventListener(evt.name, evt.handler)
  );
}
