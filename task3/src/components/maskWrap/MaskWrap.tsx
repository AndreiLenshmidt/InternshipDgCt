export default function MaskWrap(prop: {
  imgBoxClassName: string;
  imgClassName: string;
  stikerClassName: string;
  imgUrl: { shape: string; url: string };
  stikerUrl: { position: string; type: string; word: string };
}) {
  const imgUrl = new URL(prop.imgUrl.url, import.meta.url).href;
  const stikerUrl = new URL(prop.stikerUrl.word, import.meta.url).href;
  return (
    <figure className={prop.imgBoxClassName}>
      <img className={prop.imgClassName} src={imgUrl} alt="girl with laptop" />
      <img
        className={prop.stikerClassName}
        src={stikerUrl}
        alt="gaming sticker"
      />
    </figure>
  );
}
