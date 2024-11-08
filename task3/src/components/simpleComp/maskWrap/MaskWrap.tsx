import "./mask.scss";

export default function MaskWrap(prop: {
  imgBoxClassName: string;
  imgClassName: string;
  stikerClassName: string;
  imgUrl: { shape?: string; url?: string; img?: string };
  stikerUrl?: { position: string; type: string; word: string };
}) {
  let src = prop.imgUrl?.url ? prop.imgUrl.url : prop.imgUrl?.img;
  src = src || "";
  const imgUrl = new URL(src, import.meta.url).href;
  const stikerUrl = new URL(prop.stikerUrl?.type || "", import.meta.url).href;
  const stiker = prop.stikerUrl?.type ? (
    <img
      className={prop.stikerClassName}
      src={stikerUrl}
      alt={prop.stikerUrl?.word}
    />
  ) : (
    <></>
  );

  return (
    <figure className={prop.imgBoxClassName}>
      <img
        className={prop.imgClassName}
        src={imgUrl}
        alt={prop.imgUrl?.shape}
      />
      {stiker}
    </figure>
  );
}
