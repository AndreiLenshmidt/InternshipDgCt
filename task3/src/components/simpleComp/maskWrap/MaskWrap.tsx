import "./mask.scss";

export default function MaskWrap(prop: {
  imgBoxClassName: string;
  imgClassName: string;
  stikerClassName: string;
  imgUrl: { shape?: string; url?: string; img?: string };
  stikerUrl?: { position: string; type: string; word: string };
}) {
  const stiker = prop.stikerUrl?.type ? (
    <img
      className={prop.stikerClassName}
      src={prop.stikerUrl?.type}
      alt={prop.stikerUrl?.word}
    />
  ) : (
    <></>
  );

  return (
    <figure className={prop.imgBoxClassName}>
      <img
        className={prop.imgClassName}
        src={prop.imgUrl?.url || prop.imgUrl?.img}
        alt={prop.imgUrl?.shape}
      />
      {stiker}
    </figure>
  );
}
