let lastScroll = 0;
const defaultOffset = 150;

export function hideHeader(): void {
  const header = document.querySelector(".header");
  const scrollPosition = () =>
    window.pageYOffset || document.documentElement.scrollTop;
  const containHide = () => header?.classList.contains("hide");
  if (
    scrollPosition() > lastScroll &&
    !containHide() &&
    scrollPosition() > defaultOffset
  ) {
    header?.classList.add("hide");
  } else if (scrollPosition() < lastScroll && containHide()) {
    header?.classList.remove("hide");
  }

  lastScroll = scrollPosition();
}
