export function errorHandler(invalidFile, BYTES_IN_MB) {
  const errorBox = document.querySelector(".form__error-box");
  const messageBox = document.createElement("div");
  messageBox.classList.add("form__error-box");
  const [file, reapeat, big, format] = Object.values(invalidFile);
  messageBox.innerHTML = `
    <p class="form__error-file">Name: ${file.name} Size: ${(
    file.size / BYTES_IN_MB
  ).toFixed(2)}</p>
    <p class="form__error-message ${!reapeat ? "none" : ""}">${reapeat}</p>
    <p class="form__error-message ${!big ? "none" : ""}">${big}</p>
    <p class="form__error-message ${!format ? "none" : ""}">${format}</p>
  `;
  errorBox.append(messageBox);
}

export function limitErrorHandler(message) {
  const errorBox = document.querySelector(".form__error-box");
  const messageBox = document.createElement("div");
  messageBox.classList.add("form__error-box");
  messageBox.innerHTML = `
    <p class="form__error-message">${message}</p>
  `;
  errorBox.prepend(messageBox);
}

export function invalidFile(
  file,
  fileIsAllreadyLoaded,
  findVeryBigFile,
  isNonFormatFile
) {
  return {
    file,
    fileIsAllreadyLoaded,
    findVeryBigFile,
    isNonFormatFile,
  };
}

export function cleanErrorBox(errorBox) {
  errorBox.innerHTML = "";
}
