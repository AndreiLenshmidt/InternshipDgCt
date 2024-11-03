import { deleteFileListener } from "./deleteFile";
import { addFileInDOM } from "./addFileInDOM";
import { filesIsValid } from "./fileValidator";
import { errorHandler } from "./errorHandler";
import { limitErrorHandler } from "./errorHandler";
import { dragDropListenner, dragDropSmartphone } from "./drag&drop";
import { BYTES_IN_MB, FILES_FORMAT_REG } from "../main";

export function addFiles(input, loadImages) {
  const filesAfterValidaton = filesIsValid(
    input,
    loadImages,
    BYTES_IN_MB,
    FILES_FORMAT_REG
  );
  for (const validFile of filesAfterValidaton.validFiles) {
    loadImages.items.add(validFile);
  }
  if (loadImages.items.length !== 0) {
    for (const validFile of filesAfterValidaton.validFiles) {
      const element = addFileInDOM(validFile, loadImages);
      dragDropListenner(loadImages, element);
      dragDropSmartphone(loadImages, element);
      deleteFileListener(loadImages, element);
    }
  }
  for (const invalidFile of filesAfterValidaton.invalidFiles) {
    errorHandler(invalidFile, BYTES_IN_MB);
  }
  if (filesAfterValidaton.limit) limitErrorHandler(filesAfterValidaton.limit);
}
