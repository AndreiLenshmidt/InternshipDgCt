import { findCurrentIndex } from "./deleteFile";

const map = new Map();
map
  .set("#name-ascending", (a, b) => a.name.localeCompare(b.name))
  .set("#name-descending", (a, b) => b.name.localeCompare(a.name))
  .set("#size-ascending", (a, b) => a.size - b.size)
  .set("#size-descending", (a, b) => b.size - a.size);

export function sortFiles(id, loadImages) {
  const sorted = [...Object.values(loadImages.files)];
  sorted.sort(map.get(id));
  loadImages.items.clear();
  for (const file of sorted) {
    loadImages.items.add(file);
  }
  changeActiveFilter(id);
  changeOrderFilesInDom(loadImages);
}

export function changeOrderFilesInDom(loadImages) {
  const fileBox = document.querySelector(".form__uploaded");
  const items = [].slice.call(fileBox.children, 1);
  items.forEach(
    (item) => (item.style.order = findCurrentIndex(loadImages, item.id))
  );
}

export function sortByDragAndDrop(dragOrder, dropOrder, loadImages) {
  const sorted = [...Object.values(loadImages.files)];
  [sorted[dragOrder], sorted[dropOrder]] = [
    sorted[dropOrder],
    sorted[dragOrder],
  ];
  loadImages.items.clear();
  for (const file of sorted) {
    if (file) loadImages.items.add(file);
  }
}

export function changeActiveFilter(id) {
  document.querySelectorAll(".form__sort-icon").forEach((elem) => {
    elem.classList.remove("form__sort-icon_active");
  });
  if (id) document.querySelector(id).classList.add("form__sort-icon_active");
}
