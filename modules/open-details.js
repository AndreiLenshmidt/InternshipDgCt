export function openDatailsOnSmatphones(selectors) {
  if (window.innerWidth < 768) {
    for (const elem of selectors) {
      elem.removeAttribute("open");
    }
  }
}
