export const fileValidation = (file: File) => {
  const fileSize = 524288;
  const FILES_FORMAT_REG = /.jpg|.PNG|.JPG|.png|.JPEG|.jpeg/;
  if (file.size > fileSize) {
    return "Слишком большой файл";
  } else if (!FILES_FORMAT_REG.test(file.name)) {
    return "Неверное расширение";
  } else {
    return false;
  }
};
