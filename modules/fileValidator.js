import { invalidFile } from "./errorHandler";

const fileErMessages = new Map();
fileErMessages
  .set("limit", "Превышено допустимое количество файлов: 5")
  .set("repeat", "Файл уже добавлен")
  .set("big", "Превышен максимальный размер файла 10MB")
  .set("format", "Неверный формат файла");

export function filesIsValid(input, loadImages, BYTES_IN_MB, FILES_FORMAT_REG) {
  const allFiles = { validFiles: [], invalidFiles: [], limit: false };
  if (loadImages.items.length >= 5) {
    allFiles.limit = fileErMessages.get("limit");
    return allFiles;
  }
  for (let index = 0; index < input.files.length; index++) {
    const filesNotReapeat = fileIsAllreadyLoaded(
      input.files[index],
      loadImages,
      allFiles
    );
    const fileNotVeryBig = fileIsVeryBig(
      input.files[index],
      index,
      BYTES_IN_MB,
      allFiles
    );
    const filesFormatInvalid = isNonFormatFile(
      input.files[index],
      index,
      FILES_FORMAT_REG,
      allFiles
    );
    if (filesNotReapeat && fileNotVeryBig && filesFormatInvalid) {
      allFiles.validFiles.push(input.files[index]);
    }
  }
  const amount = loadImages.items.length + allFiles.validFiles.length;
  if (amount > 5) {
    allFiles.validFiles.splice(5 - loadImages.items.length, amount - 5);
    allFiles.limit = fileErMessages.get("limit");
  }
  return allFiles;
}

const fileIsAllreadyLoaded = (file, loadImages, allFiles) => {
  const names = [].map.call(loadImages.files, (element) => element.name);
  if (names.includes(file.name)) {
    allFiles.invalidFiles.push(
      invalidFile(file, fileErMessages.get("repeat"), false, false)
    );
    return false;
  }
  return true;
};

const fileIsVeryBig = (file, index, BYTES_IN_MB, allFiles) => {
  if (file.size > BYTES_IN_MB * 10) {
    allFiles.invalidFiles[index]
      ? (allFiles.invalidFiles[index].findVeryBigFile =
          fileErMessages.get("big"))
      : allFiles.invalidFiles.push(
          invalidFile(file, false, fileErMessages.get("big"), false)
        );
    return false;
  }
  return true;
};

const isNonFormatFile = (file, index, FILES_FORMAT_REG, allFiles) => {
  if (!FILES_FORMAT_REG.test(file.name)) {
    allFiles.invalidFiles[index]
      ? (allFiles.invalidFiles[index].isNonFormatFile =
          fileErMessages.get("format"))
      : allFiles.invalidFiles.push(
          invalidFile(file, false, false, fileErMessages.get("format"))
        );
    return false;
  }
  return true;
};
