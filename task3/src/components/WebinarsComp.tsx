import imgCard1 from "../assets/images/picture/avatar-default.svg";
import imgCard2 from "../assets/images/picture/avatar2.webp";
import imgCard3 from "../assets/images/picture/avatar3.webp";
import star from "../assets/images/icons/star.svg";
import webinars from "../assets/images/running-string/Webinars.svg";
import subscribe from "../assets/images/running-string/Subscribe.svg";

export default function () {
  return (
    <section className="webinars">
      <div className="webinars__bkg">
        <div className="webinars__runnig-string-box">
          <div className="webinars__runnig-string">
            <div className="runnig-string__box">
              <img src={star} alt="star" />
              <img
                src={webinars}
                alt="webinars"
                className="runnig-string__text_webinars"
              />
              <img src={star} alt="star" />
              <img
                src={webinars}
                alt="webinars"
                className="runnig-string__text_webinars"
              />
              <img src={star} alt="star" />
              <img
                src={webinars}
                alt="webinars"
                className="runnig-string__text_webinars"
              />
              <img src={star} alt="star" />
              <img
                src={webinars}
                alt="webinars"
                className="runnig-string__text_webinars"
              />
              <img src={star} alt="star" />
              <img
                src={webinars}
                alt="webinars"
                className="runnig-string__text_webinars"
              />
              <img src={star} alt="star" />
              <img
                src={webinars}
                alt="webinars"
                className="runnig-string__text_webinars"
              />
              <img src={star} alt="star" />
              <img
                src={webinars}
                alt="webinars"
                className="runnig-string__text_webinars"
              />
              <img src={star} alt="star" />
              <img
                src={webinars}
                alt="webinars"
                className="runnig-string__text_webinars"
              />
              <img src={star} alt="star" />
              <img
                src={webinars}
                alt="webinars"
                className="runnig-string__text_webinars"
              />
              <img src={star} alt="star" />
              <img
                src={webinars}
                alt="webinars"
                className="runnig-string__text_webinars"
              />
              <img src={star} alt="star" />
              <img
                src={webinars}
                alt="webinars"
                className="runnig-string__text_webinars"
              />
              <img src={star} alt="star" />
              <img
                src={webinars}
                alt="webinars"
                className="runnig-string__text_webinars"
              />
              <img src={star} alt="star" />
              <img
                src={webinars}
                alt="webinars"
                className="runnig-string__text_webinars"
              />
              <img src={star} alt="star" />
              <img
                src={webinars}
                alt="webinars"
                className="runnig-string__text_webinars"
              />
              <img src={star} alt="star" />
              <img
                src={webinars}
                alt="webinars"
                className="runnig-string__text_webinars"
              />
              <img src={star} alt="star" />
              <img
                src={webinars}
                alt="webinars"
                className="runnig-string__text_webinars"
              />
              <img src={star} alt="star" />
              <img
                src={webinars}
                alt="webinars"
                className="runnig-string__text_webinars"
              />
              <img src={star} alt="star" />
              <img
                src={webinars}
                alt="webinars"
                className="runnig-string__text_webinars"
              />
              <img src={star} alt="star" />
              <img
                src={webinars}
                alt="webinars"
                className="runnig-string__text_webinars"
              />
              <img src={star} alt="star" />
            </div>
          </div>
        </div>
        <div className="webinars__bkg-black" />
        <div className="wrap">
          <div className="webinars__container">
            <h2 className="webinars__title">Webinars gratuitos</h2>
            <button className="webinars__btn">Todos os webinars</button>
          </div>
          <div className="webinars__container">
            <article className="webinars__card">
              <div className="webinars__card-header">
                <figure className="webinars__avatar-box">
                  <picture>
                    <img
                      className="webinars__avatar"
                      src={imgCard1}
                      alt="avatar"
                    />
                  </picture>
                </figure>
                <div className="webinars__user">
                  <p className="webinars__user-name">Julia Alvarez</p>
                  <p className="webinars__user-position">
                    Programador, consultor
                  </p>
                </div>
              </div>
              <p className="webinars__content">
                Cómo iniciar el calendario de publicaciones de&nbsp;tu marca
              </p>
              <div className="webinars__card-data">
                <div>
                  <span className="webinars__card-span">Próximamente</span>
                  <span className="webinars__card-span">Webinar</span>
                </div>
                <div className="webinars__date-box">
                  <svg
                    className="webinars__icon"
                    width={17}
                    height={17}
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.22413 0.55192C4.07338 0.622474 3.94907 0.765195 3.90726 0.915704C3.88998 0.977921 3.87577 1.16777 3.87568 1.33754L3.8755 1.64619L3.27462 1.65976C2.60206 1.67491 2.42672 1.71197 2.05004 1.91846C1.74665 2.08479 1.38898 2.46202 1.233 2.78023C0.979835 3.29668 1.0004 2.75872 1.0004 8.86311C1.0004 14.9564 0.980778 14.4314 1.22722 14.9343C1.45382 15.3968 1.89314 15.779 2.41154 15.9646L2.67374 16.0585H8.5H14.3263L14.5696 15.9728C15.2532 15.7322 15.7578 15.1892 15.9462 14.4916C15.9962 14.3065 15.9996 13.9459 15.9996 8.86311C15.9996 2.75698 16.0203 3.29705 15.7661 2.77825C15.5873 2.41355 15.225 2.05233 14.8587 1.87358C14.5019 1.69949 14.2405 1.65255 13.6278 1.65255H13.1245L13.1243 1.3407C13.1241 0.970285 13.0915 0.834532 12.9693 0.69534C12.7055 0.3949 12.2023 0.458304 12.0303 0.813661C11.9788 0.919933 11.9684 1.00171 11.9684 1.29707V1.65255H8.5024H5.03646L5.02642 1.26227C5.01735 0.908736 5.00951 0.861944 4.94309 0.765134C4.77673 0.522652 4.47672 0.433691 4.22413 0.55192ZM3.88092 3.16616C3.89467 3.58212 3.94103 3.71076 4.12519 3.84417C4.34668 4.00462 4.62856 3.98886 4.8388 3.80428C5.00196 3.66101 5.03162 3.5618 5.03162 3.15953V2.80867H8.5H11.9684V3.15953C11.9684 3.5618 11.998 3.66101 12.1612 3.80428C12.3757 3.99261 12.6707 4.00204 12.8991 3.82783C13.0604 3.70482 13.1058 3.56819 13.1191 3.16616L13.1309 2.80867H13.6134C14.0247 2.80867 14.1203 2.81783 14.262 2.87086C14.4713 2.94917 14.6583 3.12865 14.7628 3.3516L14.8435 3.52365L14.8534 4.45919L14.8633 5.39474H8.5H2.13666L2.14706 4.45919C2.1561 3.64233 2.16431 3.50822 2.21162 3.40195C2.29797 3.20809 2.41057 3.06317 2.54298 2.97555C2.76094 2.83131 2.85321 2.81312 3.37791 2.8108L3.86908 2.80867L3.88092 3.16616ZM14.8517 10.3767L14.8435 14.2026L14.764 14.3699C14.6687 14.5704 14.5046 14.7395 14.3141 14.8334L14.1741 14.9023H8.5H2.82586L2.68509 14.833C2.49046 14.7371 2.32991 14.5723 2.23596 14.372L2.15653 14.2026L2.14825 10.3767L2.13994 6.55087H8.5H14.8601L14.8517 10.3767Z"
                      fill="#FCFAF9"
                      stroke="#FCFAF9"
                      strokeWidth="0.2"
                    />
                  </svg>
                  <span className="webinars__span">
                    31 de maio, 01 e 02 de junho de 2022
                  </span>
                  <svg
                    className="webinars__icon"
                    viewBox="0 0 17 17"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.77824 0.518932C6.23305 0.670303 4.80492 1.23988 3.55276 2.20416C2.94299 2.67374 2.15111 3.55623 1.6935 4.27612C1.49586 4.58703 1.11115 5.37487 0.97333 5.75085C0.819236 6.17128 0.655001 6.81376 0.574183 7.31229C0.475272 7.92247 0.475272 9.08097 0.574183 9.69115C0.714035 10.5537 0.935268 11.2511 1.31394 12.0231C1.72768 12.8665 2.15788 13.4643 2.84677 14.1532C3.5357 14.8421 4.13355 15.2723 4.97695 15.6861C5.74895 16.0647 6.44627 16.286 7.30885 16.4258C7.91903 16.5247 9.07753 16.5247 9.68771 16.4258C10.5503 16.286 11.2476 16.0647 12.0196 15.6861C12.863 15.2723 13.4609 14.8421 14.1498 14.1532C14.8387 13.4643 15.2689 12.8665 15.6826 12.0231C15.9574 11.4628 16.0956 11.0957 16.2437 10.5327C16.4408 9.78289 16.4909 9.37188 16.4909 8.50172C16.4909 7.63156 16.4408 7.22055 16.2437 6.47077C16.0956 5.90776 15.9574 5.54061 15.6826 4.98038C15.2689 4.13699 14.8387 3.53914 14.1498 2.85021C13.4609 2.16131 12.863 1.73112 12.0196 1.31738C11.2484 0.939051 10.5372 0.713341 9.70336 0.58216C9.24327 0.509793 8.21592 0.47605 7.77824 0.518932ZM9.24289 1.77425C10.7692 1.94237 12.1664 2.61902 13.2737 3.72632C14.5728 5.02549 15.2592 6.67629 15.2592 8.50172C15.2592 10.3271 14.5728 11.978 13.2737 13.2771C11.9745 14.5763 10.3237 15.2627 8.49828 15.2627C6.67285 15.2627 5.02205 14.5763 3.72288 13.2771C2.42371 11.978 1.73732 10.3271 1.73732 8.50172C1.73732 6.67629 2.42371 5.02549 3.72288 3.72632C4.815 2.63421 6.22679 1.94443 7.71576 1.7755C8.06026 1.73644 8.89336 1.73575 9.24289 1.77425ZM8.22859 4.27339C8.07826 4.34166 7.95581 4.49068 7.90488 4.66738C7.8789 4.75759 7.87148 5.33934 7.87837 6.74888C7.88767 8.65434 7.88961 8.70843 7.95252 8.83038C8.00486 8.93182 8.25445 9.13559 9.26715 9.90381C9.95467 10.4253 10.58 10.8897 10.6568 10.9357C11.1802 11.2495 11.7988 10.6911 11.5339 10.1439C11.4705 10.0129 11.3446 9.90903 10.2938 9.12079L9.1243 8.24355V6.49925C9.1243 5.27849 9.11359 4.72303 9.08868 4.64857C8.99991 4.38348 8.77041 4.21489 8.49828 4.21489C8.42081 4.21489 8.29946 4.24122 8.22859 4.27339Z"
                      fill="#FCFAF9"
                      stroke="#FCFAF9"
                      strokeWidth="0.2"
                    />
                  </svg>
                  <span className="webinars__span">19:00</span>
                </div>
              </div>
            </article>
            <article className="webinars__card">
              <div className="webinars__card-header">
                <figure className="webinars__avatar-box">
                  <picture>
                    <img
                      className="webinars__avatar"
                      src={imgCard2}
                      alt="avatar"
                    />
                  </picture>
                </figure>
                <div className="webinars__user">
                  <p className="webinars__user-name">Diego Xochihuila</p>
                  <p className="webinars__user-position">Diseñadora, editora</p>
                </div>
              </div>
              <p className="webinars__content">
                Cloud Computing: Qué es y cuáles son sus ventajas en&nbsp;la
                industria
              </p>
              <div className="webinars__card-data">
                <div>
                  <span className="webinars__card-span">Próximamente</span>
                  <span className="webinars__card-span">Workshop</span>
                </div>
                <div className="webinars__date-box">
                  <svg
                    className="webinars__icon"
                    width={17}
                    height={17}
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.22413 0.55192C4.07338 0.622474 3.94907 0.765195 3.90726 0.915704C3.88998 0.977921 3.87577 1.16777 3.87568 1.33754L3.8755 1.64619L3.27462 1.65976C2.60206 1.67491 2.42672 1.71197 2.05004 1.91846C1.74665 2.08479 1.38898 2.46202 1.233 2.78023C0.979835 3.29668 1.0004 2.75872 1.0004 8.86311C1.0004 14.9564 0.980778 14.4314 1.22722 14.9343C1.45382 15.3968 1.89314 15.779 2.41154 15.9646L2.67374 16.0585H8.5H14.3263L14.5696 15.9728C15.2532 15.7322 15.7578 15.1892 15.9462 14.4916C15.9962 14.3065 15.9996 13.9459 15.9996 8.86311C15.9996 2.75698 16.0203 3.29705 15.7661 2.77825C15.5873 2.41355 15.225 2.05233 14.8587 1.87358C14.5019 1.69949 14.2405 1.65255 13.6278 1.65255H13.1245L13.1243 1.3407C13.1241 0.970285 13.0915 0.834532 12.9693 0.69534C12.7055 0.3949 12.2023 0.458304 12.0303 0.813661C11.9788 0.919933 11.9684 1.00171 11.9684 1.29707V1.65255H8.5024H5.03646L5.02642 1.26227C5.01735 0.908736 5.00951 0.861944 4.94309 0.765134C4.77673 0.522652 4.47672 0.433691 4.22413 0.55192ZM3.88092 3.16616C3.89467 3.58212 3.94103 3.71076 4.12519 3.84417C4.34668 4.00462 4.62856 3.98886 4.8388 3.80428C5.00196 3.66101 5.03162 3.5618 5.03162 3.15953V2.80867H8.5H11.9684V3.15953C11.9684 3.5618 11.998 3.66101 12.1612 3.80428C12.3757 3.99261 12.6707 4.00204 12.8991 3.82783C13.0604 3.70482 13.1058 3.56819 13.1191 3.16616L13.1309 2.80867H13.6134C14.0247 2.80867 14.1203 2.81783 14.262 2.87086C14.4713 2.94917 14.6583 3.12865 14.7628 3.3516L14.8435 3.52365L14.8534 4.45919L14.8633 5.39474H8.5H2.13666L2.14706 4.45919C2.1561 3.64233 2.16431 3.50822 2.21162 3.40195C2.29797 3.20809 2.41057 3.06317 2.54298 2.97555C2.76094 2.83131 2.85321 2.81312 3.37791 2.8108L3.86908 2.80867L3.88092 3.16616ZM14.8517 10.3767L14.8435 14.2026L14.764 14.3699C14.6687 14.5704 14.5046 14.7395 14.3141 14.8334L14.1741 14.9023H8.5H2.82586L2.68509 14.833C2.49046 14.7371 2.32991 14.5723 2.23596 14.372L2.15653 14.2026L2.14825 10.3767L2.13994 6.55087H8.5H14.8601L14.8517 10.3767Z"
                      fill="#FCFAF9"
                      stroke="#FCFAF9"
                      strokeWidth="0.2"
                    />
                  </svg>
                  <span className="webinars__span">
                    30 e 31 de maio e 01, 02 e&nbsp;03 de junho de 2022
                  </span>
                  <svg
                    className="webinars__icon"
                    viewBox="0 0 17 17"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.77824 0.518932C6.23305 0.670303 4.80492 1.23988 3.55276 2.20416C2.94299 2.67374 2.15111 3.55623 1.6935 4.27612C1.49586 4.58703 1.11115 5.37487 0.97333 5.75085C0.819236 6.17128 0.655001 6.81376 0.574183 7.31229C0.475272 7.92247 0.475272 9.08097 0.574183 9.69115C0.714035 10.5537 0.935268 11.2511 1.31394 12.0231C1.72768 12.8665 2.15788 13.4643 2.84677 14.1532C3.5357 14.8421 4.13355 15.2723 4.97695 15.6861C5.74895 16.0647 6.44627 16.286 7.30885 16.4258C7.91903 16.5247 9.07753 16.5247 9.68771 16.4258C10.5503 16.286 11.2476 16.0647 12.0196 15.6861C12.863 15.2723 13.4609 14.8421 14.1498 14.1532C14.8387 13.4643 15.2689 12.8665 15.6826 12.0231C15.9574 11.4628 16.0956 11.0957 16.2437 10.5327C16.4408 9.78289 16.4909 9.37188 16.4909 8.50172C16.4909 7.63156 16.4408 7.22055 16.2437 6.47077C16.0956 5.90776 15.9574 5.54061 15.6826 4.98038C15.2689 4.13699 14.8387 3.53914 14.1498 2.85021C13.4609 2.16131 12.863 1.73112 12.0196 1.31738C11.2484 0.939051 10.5372 0.713341 9.70336 0.58216C9.24327 0.509793 8.21592 0.47605 7.77824 0.518932ZM9.24289 1.77425C10.7692 1.94237 12.1664 2.61902 13.2737 3.72632C14.5728 5.02549 15.2592 6.67629 15.2592 8.50172C15.2592 10.3271 14.5728 11.978 13.2737 13.2771C11.9745 14.5763 10.3237 15.2627 8.49828 15.2627C6.67285 15.2627 5.02205 14.5763 3.72288 13.2771C2.42371 11.978 1.73732 10.3271 1.73732 8.50172C1.73732 6.67629 2.42371 5.02549 3.72288 3.72632C4.815 2.63421 6.22679 1.94443 7.71576 1.7755C8.06026 1.73644 8.89336 1.73575 9.24289 1.77425ZM8.22859 4.27339C8.07826 4.34166 7.95581 4.49068 7.90488 4.66738C7.8789 4.75759 7.87148 5.33934 7.87837 6.74888C7.88767 8.65434 7.88961 8.70843 7.95252 8.83038C8.00486 8.93182 8.25445 9.13559 9.26715 9.90381C9.95467 10.4253 10.58 10.8897 10.6568 10.9357C11.1802 11.2495 11.7988 10.6911 11.5339 10.1439C11.4705 10.0129 11.3446 9.90903 10.2938 9.12079L9.1243 8.24355V6.49925C9.1243 5.27849 9.11359 4.72303 9.08868 4.64857C8.99991 4.38348 8.77041 4.21489 8.49828 4.21489C8.42081 4.21489 8.29946 4.24122 8.22859 4.27339Z"
                      fill="#FCFAF9"
                      stroke="#FCFAF9"
                      strokeWidth="0.2"
                    />
                  </svg>
                  <span className="webinars__span">19:00</span>
                </div>
              </div>
            </article>
            <article className="webinars__card">
              <div className="webinars__card-header">
                <figure className="webinars__avatar-box">
                  <picture>
                    <img
                      className="webinars__avatar"
                      src={imgCard3}
                      alt="avatar"
                    />
                  </picture>
                </figure>
                <div className="webinars__user webinars__user_big">
                  <p className="webinars__user-name">Consuela Zacatelco</p>
                  <p className="webinars__user-position">
                    Empresario graduado de la Universidad de Harvard
                  </p>
                </div>
              </div>
              <p className="webinars__content webinars__content_big">
                Ilustración Digital: 3&nbsp;diferentes estilos de diseño
              </p>
              <div className="webinars__card-data">
                <div>
                  <span className="webinars__card-span">Próximamente</span>
                  <span className="webinars__card-span">Demonstração</span>
                </div>
                <div className="webinars__date-box webinars__date-box_big">
                  <div className="webinars__date-box_big_flex">
                    <svg
                      className="webinars__icon"
                      width={17}
                      height={17}
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.22413 0.55192C4.07338 0.622474 3.94907 0.765195 3.90726 0.915704C3.88998 0.977921 3.87577 1.16777 3.87568 1.33754L3.8755 1.64619L3.27462 1.65976C2.60206 1.67491 2.42672 1.71197 2.05004 1.91846C1.74665 2.08479 1.38898 2.46202 1.233 2.78023C0.979835 3.29668 1.0004 2.75872 1.0004 8.86311C1.0004 14.9564 0.980778 14.4314 1.22722 14.9343C1.45382 15.3968 1.89314 15.779 2.41154 15.9646L2.67374 16.0585H8.5H14.3263L14.5696 15.9728C15.2532 15.7322 15.7578 15.1892 15.9462 14.4916C15.9962 14.3065 15.9996 13.9459 15.9996 8.86311C15.9996 2.75698 16.0203 3.29705 15.7661 2.77825C15.5873 2.41355 15.225 2.05233 14.8587 1.87358C14.5019 1.69949 14.2405 1.65255 13.6278 1.65255H13.1245L13.1243 1.3407C13.1241 0.970285 13.0915 0.834532 12.9693 0.69534C12.7055 0.3949 12.2023 0.458304 12.0303 0.813661C11.9788 0.919933 11.9684 1.00171 11.9684 1.29707V1.65255H8.5024H5.03646L5.02642 1.26227C5.01735 0.908736 5.00951 0.861944 4.94309 0.765134C4.77673 0.522652 4.47672 0.433691 4.22413 0.55192ZM3.88092 3.16616C3.89467 3.58212 3.94103 3.71076 4.12519 3.84417C4.34668 4.00462 4.62856 3.98886 4.8388 3.80428C5.00196 3.66101 5.03162 3.5618 5.03162 3.15953V2.80867H8.5H11.9684V3.15953C11.9684 3.5618 11.998 3.66101 12.1612 3.80428C12.3757 3.99261 12.6707 4.00204 12.8991 3.82783C13.0604 3.70482 13.1058 3.56819 13.1191 3.16616L13.1309 2.80867H13.6134C14.0247 2.80867 14.1203 2.81783 14.262 2.87086C14.4713 2.94917 14.6583 3.12865 14.7628 3.3516L14.8435 3.52365L14.8534 4.45919L14.8633 5.39474H8.5H2.13666L2.14706 4.45919C2.1561 3.64233 2.16431 3.50822 2.21162 3.40195C2.29797 3.20809 2.41057 3.06317 2.54298 2.97555C2.76094 2.83131 2.85321 2.81312 3.37791 2.8108L3.86908 2.80867L3.88092 3.16616ZM14.8517 10.3767L14.8435 14.2026L14.764 14.3699C14.6687 14.5704 14.5046 14.7395 14.3141 14.8334L14.1741 14.9023H8.5H2.82586L2.68509 14.833C2.49046 14.7371 2.32991 14.5723 2.23596 14.372L2.15653 14.2026L2.14825 10.3767L2.13994 6.55087H8.5H14.8601L14.8517 10.3767Z"
                        fill="#FCFAF9"
                        stroke="#FCFAF9"
                        strokeWidth="0.2"
                      />
                    </svg>
                    <span className="webinars__span webinars__span_big">
                      01 e 02 de junho de 2022
                    </span>
                  </div>
                  <div className="webinars__date-box_big_flex">
                    <svg
                      className="webinars__icon"
                      viewBox="0 0 17 17"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.77824 0.518932C6.23305 0.670303 4.80492 1.23988 3.55276 2.20416C2.94299 2.67374 2.15111 3.55623 1.6935 4.27612C1.49586 4.58703 1.11115 5.37487 0.97333 5.75085C0.819236 6.17128 0.655001 6.81376 0.574183 7.31229C0.475272 7.92247 0.475272 9.08097 0.574183 9.69115C0.714035 10.5537 0.935268 11.2511 1.31394 12.0231C1.72768 12.8665 2.15788 13.4643 2.84677 14.1532C3.5357 14.8421 4.13355 15.2723 4.97695 15.6861C5.74895 16.0647 6.44627 16.286 7.30885 16.4258C7.91903 16.5247 9.07753 16.5247 9.68771 16.4258C10.5503 16.286 11.2476 16.0647 12.0196 15.6861C12.863 15.2723 13.4609 14.8421 14.1498 14.1532C14.8387 13.4643 15.2689 12.8665 15.6826 12.0231C15.9574 11.4628 16.0956 11.0957 16.2437 10.5327C16.4408 9.78289 16.4909 9.37188 16.4909 8.50172C16.4909 7.63156 16.4408 7.22055 16.2437 6.47077C16.0956 5.90776 15.9574 5.54061 15.6826 4.98038C15.2689 4.13699 14.8387 3.53914 14.1498 2.85021C13.4609 2.16131 12.863 1.73112 12.0196 1.31738C11.2484 0.939051 10.5372 0.713341 9.70336 0.58216C9.24327 0.509793 8.21592 0.47605 7.77824 0.518932ZM9.24289 1.77425C10.7692 1.94237 12.1664 2.61902 13.2737 3.72632C14.5728 5.02549 15.2592 6.67629 15.2592 8.50172C15.2592 10.3271 14.5728 11.978 13.2737 13.2771C11.9745 14.5763 10.3237 15.2627 8.49828 15.2627C6.67285 15.2627 5.02205 14.5763 3.72288 13.2771C2.42371 11.978 1.73732 10.3271 1.73732 8.50172C1.73732 6.67629 2.42371 5.02549 3.72288 3.72632C4.815 2.63421 6.22679 1.94443 7.71576 1.7755C8.06026 1.73644 8.89336 1.73575 9.24289 1.77425ZM8.22859 4.27339C8.07826 4.34166 7.95581 4.49068 7.90488 4.66738C7.8789 4.75759 7.87148 5.33934 7.87837 6.74888C7.88767 8.65434 7.88961 8.70843 7.95252 8.83038C8.00486 8.93182 8.25445 9.13559 9.26715 9.90381C9.95467 10.4253 10.58 10.8897 10.6568 10.9357C11.1802 11.2495 11.7988 10.6911 11.5339 10.1439C11.4705 10.0129 11.3446 9.90903 10.2938 9.12079L9.1243 8.24355V6.49925C9.1243 5.27849 9.11359 4.72303 9.08868 4.64857C8.99991 4.38348 8.77041 4.21489 8.49828 4.21489C8.42081 4.21489 8.29946 4.24122 8.22859 4.27339Z"
                        fill="#FCFAF9"
                        stroke="#FCFAF9"
                        strokeWidth="0.2"
                      />
                    </svg>
                    <span className="webinars__span webinars__span_big">
                      19:00
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div className="runnig-string_bottom">
          <div className="webinars__runnig-string webinars__runnig-string_bottom">
            <div className="runnig-string__box">
              <img src={star} alt="star" />
              <img
                src={subscribe}
                alt="Subscribe"
                className="runnig-string__text runnig-string__text_subscribe"
              />
              <img src={star} alt="star" />
              <img
                src={subscribe}
                alt="Subscribe"
                className="runnig-string__text runnig-string__text_subscribe"
              />
              <img src={star} alt="star" />
              <img
                src={subscribe}
                alt="Subscribe"
                className="runnig-string__text runnig-string__text_subscribe"
              />
              <img src={star} alt="star" />
              <img
                src={subscribe}
                alt="Subscribe"
                className="runnig-string__text runnig-string__text_subscribe"
              />
              <img src={star} alt="star" />
              <img
                src={subscribe}
                alt="Subscribe"
                className="runnig-string__text runnig-string__text_subscribe"
              />
              <img src={star} alt="star" />
              <img
                src={subscribe}
                alt="Subscribe"
                className="runnig-string__text runnig-string__text_subscribe"
              />
              <img src={star} alt="star" />
              <img
                src={subscribe}
                alt="Subscribe"
                className="runnig-string__text runnig-string__text_subscribe"
              />
              <img src={star} alt="star" />
              <img
                src={subscribe}
                alt="Subscribes"
                className="runnig-string__text runnig-string__text_subscribe"
              />
              <img src={star} alt="star" />
              <img
                src={subscribe}
                alt="Subscribe"
                className="runnig-string__text runnig-string__text_subscribe"
              />
              <img src={star} alt="star" />
              <img
                src={subscribe}
                alt="Subscribe"
                className="runnig-string__text runnig-string__text_subscribe"
              />
              <img src={star} alt="star" />
              <img
                src={subscribe}
                alt="Subscribe"
                className="runnig-string__text runnig-string__text_subscribe"
              />
              <img src={star} alt="star" />
              <img
                src={subscribe}
                alt="Subscribe"
                className="runnig-string__text runnig-string__text_subscribe"
              />
              <img src={star} alt="star" />
              <img
                src={subscribe}
                alt="Subscribe"
                className="runnig-string__text runnig-string__text_subscribe"
              />
              <img src={star} alt="star" />
              <img
                src={subscribe}
                alt="Subscribe"
                className="runnig-string__text runnig-string__text_subscribe"
              />
              <img src={star} alt="star" />
              <img
                src={subscribe}
                alt="Subscribe"
                className="runnig-string__text runnig-string__text_subscribe"
              />
              <img src={star} alt="star" />
              <img
                src={subscribe}
                alt="Subscribe"
                className="runnig-string__text runnig-string__text_subscribe"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
