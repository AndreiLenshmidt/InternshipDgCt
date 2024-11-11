import "./search.scss";

export function BlockSearch() {
  return (
    <div className="header__search">
      <svg
        className="header__search-img"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.93983 0.0238375C7.8763 0.0331704 7.66836 0.063202 7.47776 0.0905539C6.66372 0.207446 5.69465 0.515848 4.91661 0.905658C2.35426 2.1894 0.636913 4.49181 0.0997044 7.36361C0.00391619 7.87545 -0.0328187 9.24863 0.0340436 9.81632C0.399083 12.9162 2.27922 15.5516 5.06521 16.8683C7.97393 18.2431 11.4682 17.9188 14.034 16.036L14.3754 15.7855L16.4832 17.8927L18.591 20L19.2955 19.2956L20 18.5912L17.8903 16.4814L15.7807 14.3717L15.9206 14.1942C16.2146 13.8213 16.5987 13.1836 16.8562 12.6408C17.6944 10.8736 17.9236 8.97137 17.5292 7.05466C16.8924 3.95955 14.6423 1.42969 11.6479 0.442155C10.6134 0.10095 9.89575 -0.00924344 8.77277 0.000597692C8.3782 0.00406288 8.00337 0.0145508 7.93983 0.0238375ZM10.0192 2.05545C10.615 2.15225 11.463 2.44027 12.041 2.74207C13.9305 3.72877 15.2416 5.51362 15.6394 7.64083C15.7555 8.26175 15.7552 9.49572 15.6388 10.0879C15.0836 12.9124 13.0145 15.0119 10.1877 15.6193C9.56444 15.7532 8.26966 15.7653 7.63948 15.6431C6.24623 15.373 4.98343 14.7182 4.01875 13.7656C1.32554 11.1061 1.25762 6.81445 3.86576 4.09747C4.81953 3.10393 5.93618 2.46093 7.26312 2.14116C8.14573 1.92849 9.06249 1.89998 10.0192 2.05545Z"
        />
      </svg>
      <p className="header__search-span">EBAC</p>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="header__search-arrow"
          clip-rule="evenodd"
          d="M0.633692 15.3663L1.26738 16L7.72816 9.53912L14.1889 3.07824L14.1889 9.22633L14.1889 15.3744L15.0945 15.3744L16 15.3744L15.9916 8.0082L15.9831 0.641973L15.8973 0.477365C15.8006 0.292015 15.5663 0.0944198 15.3753 0.0372022C15.2847 0.0100415 13.2779 3.73278e-07 7.93839 6.06676e-07L0.62556 9.2633e-07L0.62556 0.905347L0.62556 1.81069L6.77349 1.81069L12.9214 1.81069L6.46071 8.27164L-5.54006e-08 14.7326L0.633692 15.3663Z"
        />
      </svg>
    </div>
  );
}
