import styles from './uploader.module.scss';

export default function FileUploader() {
   const avatarInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      //    if (!e.target.files?.length) {
      //      setAvatar("Аватар не загружен");
      //      setAvatarView("options__upload-span invalid");
      //      return;
      //    }
      //    const fileIsValid = fileValidation(e.target.files[0]);
      //    if (fileIsValid) {
      //      setAvatar(fileIsValid);
      //      setAvatarView("options__upload-span invalid");
      //      return;
      //    }
      //    const fileReader = new FileReader();
      //    fileReader.readAsDataURL(e.target.files[0]);
      //    fileReader.onload = function () {
      //      avatarAsDataURL.push(fileReader.result);
      //    };
      //    fileReader.onerror = function () {
      //      setAvatar("Аватар не загружен");
      //      setAvatarView("options__upload-span invalid");
      //      return;
      //    };
      //    setAvatarView("options__upload-span valid");
      //    return e.target.files.length
      //      ? setAvatar("Аватар загружен")
      //      : setAvatar("Аватар не загружен");
   };

   return (
      <label className={styles.upload} htmlFor="image_uploads">
         <p className={styles.upload_text}>Выбери файлы или перетащи их сюда</p>
         <input
            onChange={(e) => avatarInputHandler(e)}
            id="image_uploads"
            className={styles.upload_input}
            name="avatar"
            type="file"
            multiple
            // accept="image/png, image/jpeg, image/jpg"
         />
      </label>
   );
}
