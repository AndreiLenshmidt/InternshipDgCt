export function updateCounter(loadImages) {
    const counter = document.querySelector(".form__upload-counter");
    counter.textContent = `Загружено: ${loadImages.items.length}`;
  }
  