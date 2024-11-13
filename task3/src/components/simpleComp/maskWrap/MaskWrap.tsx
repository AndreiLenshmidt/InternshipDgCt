import "./mask.scss";

export default function MaskWrap(prop: {
  imgBoxClassName: string;
  imgClassName: string;
  stikerClassName: string;
  imgUrl: { shape?: string; url?: string; img?: string };
  stikerUrl?: { position: string; type: string; word: string };
}) {
  return (
    <figure className={prop.imgBoxClassName}>
      <img
        className={prop.imgClassName}
        src={prop.imgUrl?.url || prop.imgUrl?.img}
        alt={prop.imgUrl?.shape}
      />
      <svg className={prop.stikerClassName}>
        <use xlinkHref={`#${prop.stikerUrl?.word}`} />
      </svg>
    </figure>
  );
}
