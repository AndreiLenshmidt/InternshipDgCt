// import { useState } from "react";
import arrow from "../assets/images/icons/arrow.svg";
import search from "../assets/images/icons/search.svg";

type header = Array<{ label: String; url: "#" }>;

export default function TheHeader(prop: { header: header; logo: String }) {
  return (
    <header className="header">
      <div className="wrap header__box">
        <a href="#">
          <svg
            className="header__logo"
            viewBox="0 0 109 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_525_459)">
              <path d="M1.4069 0.475384L2.85172 1.67883V7.10297H10.6621L11.7241 8.4409L10.6586 9.71332H2.85172V14.8995L1.4069 16.103L0 14.8995V1.67883L1.4069 0.475384ZM5.63103 14.1444H11.5862L12.5828 15.4133L11.5207 16.7547H5.63103L4.66897 15.5168L5.63103 14.1444ZM5.83793 0.165039H11.5172L12.5793 1.50297L11.5172 2.77538H5.9069L4.77241 1.5409L5.83793 0.165039ZM37.4897 2.7409L38.7621 4.11332L37.4897 5.48918H18.2586L17.0207 4.11332L18.2586 2.7409H37.4897ZM15.9897 8.44435L17.1897 7.41332L18.3931 8.44435V9.95814C18.3931 12.4995 19.0793 14.5926 22.1379 14.5926H22.7552C25.5034 14.5926 27.0138 12.7375 27.0138 9.85125V8.40987L28.1828 7.37883L29.3862 8.37538V9.95469C29.3862 12.5306 30.1414 14.4547 33.0966 14.4547H33.6103C36.4966 14.4547 37.0103 12.2547 37.0448 9.85125V8.30642L38.2138 7.34435L39.4483 8.3409V9.88573C39.4138 13.2168 38.5207 17.0306 33.7138 17.0306H33.2C30.3483 17.0306 28.8034 15.7581 28.1862 14.1788C27.4655 15.7926 25.5414 17.203 22.931 17.203H22.3103C17.3655 17.203 16.0276 14.2168 15.9931 10.0237V8.44435H15.9897ZM25.8138 33.3064L25.1276 31.4512L26.9138 30.9375L33.2 33.7857V27.9133L34.4724 26.8478L35.7759 27.9133V35.0237L38.1103 36.0892L38.7621 37.8064L36.9414 38.4581L25.8138 33.3064ZM37.0103 20.7685L38.7276 21.5581L38.1793 23.3099L22.7207 30.4892L20.8655 29.7685L21.6207 27.9823L37.0103 20.7685ZM14.7069 30.5581L16.2172 31.7961C16.0793 36.1581 12.3345 38.4581 7.9069 38.4581H7.45862C5.25862 38.4581 2.68621 37.634 1.03793 36.0547L1.21034 34.303L2.82414 34.0961C4.02759 35.1271 5.71034 35.8478 7.28966 35.8478H7.77241C10.7621 35.8478 13.0621 34.6133 13.3034 31.6926L14.7069 30.5581ZM13.2966 27.7064C13.1586 24.6823 10.8931 23.4823 7.76552 23.4823H7.28276C5.42759 23.4823 4.02069 24.203 2.81724 25.234L1.20345 25.0271L1.03103 23.2754C2.67931 21.6616 4.97931 20.9064 7.38621 20.9064H7.86552C12.331 20.9064 16.0759 23.1754 16.2103 27.603L14.7 28.8064L13.2966 27.7064Z" />
              <path d="M53.8048 4.993H50.2944C50.3737 5.67576 50.8496 6.17921 51.5496 6.17921C51.9737 6.17921 52.3703 6.01024 52.5979 5.66542L53.7151 5.69645C53.3186 6.57576 52.4979 7.04128 51.5496 7.04128C50.2255 7.04128 49.2462 6.05162 49.2462 4.68955C49.2462 3.32404 50.2048 2.34473 51.522 2.34473C52.7186 2.34473 53.8048 3.14473 53.8048 4.98611V4.993ZM50.2944 4.27231H52.6979C52.6496 3.6999 52.1841 3.20335 51.5324 3.20335C50.8668 3.20335 50.4117 3.63783 50.2944 4.27231Z" />
              <path d="M57.2358 3.66886C56.8979 3.34128 56.4048 3.18611 56.0703 3.18611C55.6841 3.18611 55.4875 3.393 55.4875 3.5999C55.4875 3.84817 55.5979 3.96542 55.9013 4.07576L56.6737 4.34128C57.5048 4.62749 57.8496 5.08266 57.8496 5.63783C57.8496 6.35162 57.3048 7.04128 56.1875 7.04128C55.4565 7.04128 54.7324 6.74473 54.3082 6.33783L54.891 5.57576C55.2289 5.91024 55.7496 6.15852 56.1668 6.15852C56.5634 6.15852 56.8186 5.98955 56.8186 5.72404C56.8186 5.43783 56.6806 5.32059 56.1841 5.15162L55.4427 4.893C54.8186 4.67576 54.4737 4.21024 54.4737 3.65852C54.4737 3.0068 55.0358 2.34473 56.1048 2.34473C56.6289 2.34473 57.3324 2.55162 57.7944 2.98611L57.2358 3.66886Z" />
              <path d="M60.8428 6.17973C61.3565 6.17973 61.7531 5.93145 61.9807 5.528L62.8324 5.96249C62.4772 6.62456 61.6945 7.0418 60.8462 7.0418C59.5221 7.0418 58.4841 6.06249 58.4841 4.69697C58.4841 3.32111 59.5221 2.3418 60.8462 2.3418C61.6979 2.3418 62.4772 2.75559 62.8324 3.42111L61.9807 3.85559C61.7531 3.44869 61.3565 3.20387 60.8428 3.20387C60.0324 3.20387 59.4772 3.84525 59.4772 4.69697C59.4772 5.54869 60.0324 6.17973 60.8428 6.17973Z" />
              <path d="M63.6393 5.29984V2.46191H64.6289V5.17226C64.6289 5.87571 65.0945 6.1895 65.6772 6.1895C66.26 6.1895 66.7255 5.87226 66.7255 5.17226V2.46191H67.7048V5.29984C67.7048 6.23778 66.9634 7.04122 65.6772 7.04122C64.391 7.04122 63.6393 6.23778 63.6393 5.29984Z" />
              <path d="M73.1427 4.993H69.6324C69.7117 5.67576 70.1876 6.17921 70.8876 6.17921C71.3117 6.17921 71.7082 6.01024 71.9358 5.66542L73.0531 5.69645C72.6565 6.57576 71.8358 7.04128 70.8876 7.04128C69.5634 7.04128 68.5841 6.05162 68.5841 4.68955C68.5841 3.32404 69.5427 2.34473 70.86 2.34473C72.0565 2.34473 73.1427 3.14473 73.1427 4.98611V4.993ZM69.6324 4.27231H72.0358C71.9876 3.6999 71.522 3.20335 70.8703 3.20335C70.2048 3.20335 69.7496 3.63783 69.6324 4.27231Z" />
              <path d="M75.0393 6.92069H74.06V0H75.0393V6.92069Z" />
              <path d="M78.8462 3.92404C78.8462 3.44817 78.491 3.20335 77.9152 3.20335C77.4324 3.20335 76.9945 3.41024 76.66 3.67921L76.1945 2.94817C76.5703 2.62059 77.2014 2.34473 77.9841 2.34473C79.16 2.34473 79.8324 2.99645 79.8324 3.94817V6.92404H78.8427V6.45852C78.5841 6.87231 78.0324 7.04128 77.5669 7.04128C76.5496 7.04128 75.9565 6.45852 75.9565 5.63783C75.9565 4.76886 76.5703 4.27231 77.5669 4.27231H78.5255C78.7531 4.27231 78.8427 4.17231 78.8427 3.99645V3.92404H78.8462ZM78.8462 5.28955V4.90335C78.7565 4.97231 78.5979 5.00335 78.3703 5.00335H77.7772C77.2531 5.00335 76.9876 5.23093 76.9876 5.6068C76.9876 5.95162 77.2462 6.26886 77.7772 6.26886C78.3324 6.26886 78.8462 5.98266 78.8462 5.28955Z" />
              <path d="M50.522 17.3728H49.5427V10.4521H50.522V13.5763C50.76 13.1315 51.3807 12.7935 52.0358 12.7935C53.3324 12.7935 54.2703 13.7728 54.2703 15.1384C54.2703 16.5039 53.3117 17.4901 52.0151 17.4901C51.3738 17.4901 50.7703 17.1728 50.522 16.728V17.3728ZM50.491 15.1384C50.491 15.9901 51.0531 16.6418 51.8738 16.6418C52.6841 16.6418 53.2565 15.9901 53.2565 15.1384C53.2565 14.2866 52.6841 13.6453 51.8738 13.6453C51.0531 13.6453 50.491 14.2901 50.491 15.1384Z" />
              <path d="M57.7599 13.7827H57.2462C56.6117 13.7827 56.1979 14.1482 56.1979 15.1586V17.3724H55.2186V12.9138H56.1772V13.6275C56.3462 13.1344 56.791 12.8379 57.4117 12.8379C57.522 12.8379 57.6393 12.8482 57.7565 12.8689V13.7827H57.7599Z" />
              <path d="M59.7566 17.3724H58.7669V13.7241H58.0945V12.9138H59.7566V17.3724ZM59.2014 10.6104C59.5876 10.6104 59.9048 10.9276 59.9048 11.3138C59.9048 11.7 59.5876 12.0069 59.2014 12.0069C58.8152 12.0069 58.5083 11.7 58.5083 11.3138C58.5083 10.9276 58.8152 10.6104 59.2014 10.6104Z" />
              <path d="M62.2565 11.1143V12.9143H63.3048V13.7246H62.2565V16.2246C62.2565 16.5315 62.4841 16.5901 62.7117 16.5901C63.0565 16.5901 63.3151 16.5487 63.3151 16.5487V17.3694C63.3151 17.3694 62.8289 17.4177 62.4634 17.4177C61.9289 17.4177 61.2669 17.3074 61.2669 16.4384V13.7246H60.5358V12.9143H61.2669V11.1143H62.2565Z" />
              <path d="M66.7462 14.3797C66.7462 13.9039 66.391 13.659 65.8151 13.659C65.3289 13.659 64.8944 13.8659 64.56 14.1349L64.0944 13.4039C64.4703 13.0763 65.1013 12.8004 65.8841 12.8004C67.06 12.8004 67.7324 13.4521 67.7324 14.4039V17.3797H66.7427V16.9142C66.4841 17.328 65.9324 17.497 65.4669 17.497C64.4496 17.497 63.8565 16.9142 63.8565 16.0935C63.8565 15.2246 64.4703 14.728 65.4669 14.728H66.4255C66.6531 14.728 66.7427 14.628 66.7427 14.4521V14.3797H66.7462ZM66.7462 15.7418V15.3556C66.6565 15.4246 66.4979 15.4556 66.2703 15.4556H65.6772C65.1531 15.4556 64.8875 15.6832 64.8875 16.059C64.8875 16.4039 65.1462 16.7211 65.6772 16.7211C66.2324 16.7211 66.7462 16.4349 66.7462 15.7418ZM65.6082 10.4521H66.8358L65.9841 12.1246H65.0358L65.6082 10.4521Z" />
              <path d="M69.891 13.1727C69.891 13.3003 69.891 13.3796 69.8806 13.4693C70.2565 13.0348 70.7703 12.7969 71.3358 12.7969C72.3841 12.7969 72.9979 13.4486 72.9979 14.4693V17.3762H72.0082V14.6072C72.0082 13.9727 71.622 13.6762 71.1289 13.6762C70.7048 13.6762 70.2875 13.8934 69.9117 14.3279V17.3727H68.9324V12.9141H69.891V13.1727Z" />
              <path d="M75.3772 17.3724H74.3876V13.7241H73.7151V12.9138H75.3772V17.3724ZM74.822 10.6104C75.2083 10.6104 75.5255 10.9276 75.5255 11.3138C75.5255 11.7 75.2083 12.0069 74.822 12.0069C74.4358 12.0069 74.1289 11.7 74.1289 11.3138C74.1324 10.9276 74.4358 10.6104 74.822 10.6104Z" />
              <path d="M78.6806 16.6309C79.1944 16.6309 79.591 16.3826 79.8186 15.9792L80.6703 16.4137C80.3151 17.0757 79.5324 17.493 78.6841 17.493C77.36 17.493 76.322 16.5137 76.322 15.1481C76.322 13.7723 77.36 12.793 78.6841 12.793C79.5358 12.793 80.3151 13.2068 80.6703 13.8723L79.8186 14.3068C79.591 13.8999 79.1944 13.655 78.6806 13.655C77.8703 13.655 77.3151 14.2964 77.3151 15.1481C77.3151 15.9999 77.8669 16.6309 78.6806 16.6309Z" />
              <path d="M84.0772 14.3791C84.0772 13.9033 83.722 13.6584 83.1462 13.6584C82.6634 13.6584 82.2255 13.8653 81.891 14.1343L81.4255 13.4033C81.8014 13.0757 82.4324 12.7998 83.2151 12.7998C84.391 12.7998 85.0634 13.4515 85.0634 14.4033V17.3791H84.0738V16.9136C83.8152 17.3274 83.2634 17.4964 82.7979 17.4964C81.7807 17.4964 81.1876 16.9136 81.1876 16.0929C81.1876 15.2239 81.8014 14.7274 82.7979 14.7274H83.7565C83.9841 14.7274 84.0738 14.6274 84.0738 14.4515V14.3791H84.0772ZM84.0772 15.7412V15.355C83.9876 15.4239 83.8289 15.455 83.6014 15.455H83.0083C82.4841 15.455 82.2186 15.6826 82.2186 16.0584C82.2186 16.4033 82.4772 16.7205 83.0083 16.7205C83.5634 16.7205 84.0772 16.4343 84.0772 15.7412Z" />
              <path d="M91.8289 16.7206C91.591 17.1654 90.9876 17.493 90.3358 17.493C89.0393 17.493 88.091 16.5034 88.091 15.1413C88.091 13.7758 89.022 12.7965 90.3151 12.7965C90.9772 12.7965 91.591 13.1344 91.8393 13.5792C91.8289 13.2723 91.8289 12.9068 91.8289 12.562V10.4551H92.8186V17.3758H91.8289V16.7206ZM89.1013 15.1378C89.1013 15.9896 89.6634 16.6413 90.4841 16.6413C91.2945 16.6413 91.8669 15.9896 91.8669 15.1378C91.8669 14.2861 91.2945 13.6447 90.4841 13.6447C89.6634 13.6447 89.1013 14.2896 89.1013 15.1378Z" />
              <path d="M98.3255 15.4452H94.8151C94.8944 16.1279 95.3703 16.6314 96.0703 16.6314C96.4944 16.6314 96.891 16.4624 97.1186 16.1176L98.2358 16.1486C97.8393 17.0279 97.0186 17.4934 96.0703 17.4934C94.7462 17.4934 93.7668 16.5038 93.7668 15.1417C93.7668 13.7762 94.7255 12.7969 96.0427 12.7969C97.2393 12.7969 98.3255 13.5969 98.3255 15.4383V15.4452ZM94.8151 14.7245H97.2186C97.1703 14.152 96.7048 13.6555 96.0531 13.6555C95.3875 13.6555 94.9324 14.09 94.8151 14.7245Z" />
              <path d="M52.0737 24.8313C52.0737 24.3554 51.7186 24.1106 51.1427 24.1106C50.6565 24.1106 50.222 24.3175 49.8875 24.5864L49.422 23.8554C49.7979 23.5278 50.4289 23.252 51.2117 23.252C52.3875 23.252 53.0599 23.9037 53.0599 24.8554V27.8313H52.0703V27.3657C51.8117 27.7795 51.2599 27.9485 50.7944 27.9485C49.7772 27.9485 49.1841 27.3657 49.1841 26.5451C49.1841 25.6761 49.7979 25.1795 50.7944 25.1795H51.753C51.9806 25.1795 52.0703 25.0795 52.0703 24.9037V24.8313H52.0737ZM52.0737 26.1933V25.8071C51.9841 25.8761 51.8255 25.9071 51.5979 25.9071H51.0048C50.4806 25.9071 50.2151 26.1347 50.2151 26.5106C50.2151 26.8554 50.4737 27.1726 51.0048 27.1726C51.5599 27.1726 52.0737 26.8864 52.0737 26.1933Z" />
              <path d="M56.7979 24.2383H56.2841C55.6496 24.2383 55.2358 24.6038 55.2358 25.6142V27.828H54.2565V23.3659H55.2152V24.0797C55.3841 23.5866 55.8289 23.29 56.4496 23.29C56.56 23.29 56.6772 23.3004 56.7945 23.3211V24.2383H56.7979Z" />
              <path d="M58.8669 21.5659V23.3659H59.9151V24.1763H58.8669V26.6763C58.8669 26.9832 59.0945 27.0418 59.322 27.0418C59.6669 27.0418 59.9255 27.0004 59.9255 27.0004V27.8211C59.9255 27.8211 59.4393 27.8694 59.0738 27.8694C58.5393 27.8694 57.8772 27.7591 57.8772 26.8901V24.1728H57.1462V23.3625H57.8772V21.5625H58.8669V21.5659Z" />
              <path d="M65.0841 25.8963H61.5738C61.6531 26.5791 62.129 27.0825 62.829 27.0825C63.2531 27.0825 63.6497 26.9136 63.8772 26.5687L64.9945 26.5998C64.5979 27.4791 63.7772 27.9446 62.829 27.9446C61.5048 27.9446 60.5255 26.9549 60.5255 25.5929C60.5255 24.2274 61.4841 23.248 62.8014 23.248C63.9979 23.248 65.0841 24.048 65.0841 25.8894V25.8963ZM61.5738 25.1756H63.9772C63.929 24.6032 63.4634 24.1067 62.8117 24.1067C62.1497 24.1067 61.6945 24.5446 61.5738 25.1756Z" />
              <path d="M68.5152 24.5722C68.1772 24.2446 67.6841 24.0894 67.3497 24.0894C66.9634 24.0894 66.7669 24.2963 66.7669 24.5032C66.7669 24.7515 66.8772 24.8687 67.1807 24.9791L67.9531 25.2446C68.7841 25.5308 69.129 25.986 69.129 26.5412C69.129 27.2549 68.5841 27.9446 67.4669 27.9446C66.7359 27.9446 66.0117 27.648 65.5876 27.2412L66.1703 26.4791C66.5083 26.8136 67.029 27.0618 67.4462 27.0618C67.8428 27.0618 68.0979 26.8929 68.0979 26.6274C68.0979 26.3412 67.96 26.2239 67.4634 26.0549L66.7221 25.7963C66.0979 25.5791 65.7531 25.1136 65.7531 24.5618C65.7531 23.9101 66.3152 23.248 67.3841 23.248C67.9083 23.248 68.6117 23.4549 69.0738 23.8894L68.5152 24.5722Z" />
              <path d="M73.8531 27.083C74.3669 27.083 74.7634 26.8348 74.991 26.4313L75.8427 26.8658C75.4875 27.5279 74.7048 27.9451 73.8565 27.9451C72.5324 27.9451 71.4944 26.9658 71.4944 25.6003C71.4944 24.2244 72.5324 23.2451 73.8565 23.2451C74.7082 23.2451 75.4875 23.6589 75.8427 24.3244L74.991 24.7589C74.7634 24.352 74.3669 24.1072 73.8531 24.1072C73.0427 24.1072 72.4876 24.7486 72.4876 25.6003C72.491 26.452 73.0427 27.083 73.8531 27.083Z" />
              <path d="M79.2634 24.2383H78.7496C78.1152 24.2383 77.7014 24.6038 77.7014 25.6142V27.828H76.722V23.3659H77.6807V24.0797C77.8496 23.5866 78.2945 23.29 78.9151 23.29C79.0255 23.29 79.1427 23.3004 79.26 23.3211V24.2383H79.2634Z" />
              <path d="M84.2359 25.8963H80.7255C80.8048 26.5791 81.2807 27.0825 81.9807 27.0825C82.4048 27.0825 82.8014 26.9136 83.029 26.5687L84.1462 26.5998C83.7497 27.4791 82.929 27.9446 81.9807 27.9446C80.6566 27.9446 79.6772 26.9549 79.6772 25.5929C79.6772 24.2274 80.6359 23.248 81.9531 23.248C83.1497 23.248 84.2359 24.048 84.2359 25.8894V25.8963ZM80.7255 25.1756H83.129C83.0807 24.6032 82.6152 24.1067 81.9634 24.1067C81.2979 24.1067 80.8462 24.5446 80.7255 25.1756Z" />
              <path d="M87.6565 24.8313C87.6565 24.3554 87.3013 24.1106 86.7255 24.1106C86.2427 24.1106 85.8048 24.3175 85.4703 24.5864L85.0048 23.8554C85.3806 23.5278 86.0117 23.252 86.7944 23.252C87.9703 23.252 88.6427 23.9037 88.6427 24.8554V27.8313H87.6531V27.3657C87.3944 27.7795 86.8427 27.9485 86.3772 27.9485C85.3599 27.9485 84.7668 27.3657 84.7668 26.5451C84.7668 25.6761 85.3806 25.1795 86.3772 25.1795H87.3358C87.5634 25.1795 87.6531 25.0795 87.6531 24.9037V24.8313H87.6565ZM87.6565 26.1933V25.8071C87.5668 25.8761 87.4082 25.9071 87.1806 25.9071H86.5875C86.0634 25.9071 85.7979 26.1347 85.7979 26.5106C85.7979 26.8554 86.0565 27.1726 86.5875 27.1726C87.1427 27.1726 87.6565 26.8864 87.6565 26.1933Z" />
              <path d="M91.0978 21.5659V23.3659H92.146V24.1763H91.0978V26.6763C91.0978 26.9832 91.3254 27.0418 91.5529 27.0418C91.8978 27.0418 92.1564 27.0004 92.1564 27.0004V27.8211C92.1564 27.8211 91.6702 27.8694 91.3047 27.8694C90.7702 27.8694 90.1081 27.7591 90.1081 26.8901V24.1728H89.3771V23.3625H90.1081V21.5625H91.0978V21.5659Z" />
              <path d="M94.2427 27.828H93.253V24.1763H92.5806V23.3659H94.2427V27.828ZM93.6875 21.0625C94.0737 21.0625 94.391 21.3797 94.391 21.7659C94.391 22.1522 94.0737 22.4591 93.6875 22.4591C93.3013 22.4591 92.9944 22.1522 92.9944 21.7659C92.9944 21.3797 93.3013 21.0625 93.6875 21.0625Z" />
              <path d="M97.2772 26.8859L98.4738 23.3652H99.5221L97.8807 27.8239H96.6359L95.0531 23.3652H96.1496L97.2772 26.8859Z" />
              <path d="M102.725 24.8313C102.725 24.3554 102.37 24.1106 101.794 24.1106C101.308 24.1106 100.874 24.3175 100.539 24.5864L100.074 23.8554C100.45 23.5278 101.081 23.252 101.863 23.252C103.039 23.252 103.712 23.9037 103.712 24.8554V27.8313H102.722V27.3657C102.463 27.7795 101.912 27.9485 101.446 27.9485C100.429 27.9485 99.8358 27.3657 99.8358 26.5451C99.8358 25.6761 100.45 25.1795 101.446 25.1795H102.405C102.632 25.1795 102.722 25.0795 102.722 24.9037V24.8313H102.725ZM102.725 26.1933V25.8071C102.636 25.8761 102.477 25.9071 102.25 25.9071H101.657C101.132 25.9071 100.867 26.1347 100.867 26.5106C100.867 26.8554 101.125 27.1726 101.657 27.1726C102.212 27.1726 102.725 26.8864 102.725 26.1933Z" />
              <path d="M107.45 24.5722C107.112 24.2446 106.619 24.0894 106.284 24.0894C105.898 24.0894 105.701 24.2963 105.701 24.5032C105.701 24.7515 105.812 24.8687 106.115 24.9791L106.888 25.2446C107.719 25.5308 108.063 25.986 108.063 26.5412C108.063 27.2549 107.519 27.9446 106.401 27.9446C105.67 27.9446 104.946 27.648 104.522 27.2412L105.105 26.4791C105.443 26.8136 105.963 27.0618 106.381 27.0618C106.777 27.0618 107.032 26.8929 107.032 26.6274C107.032 26.3412 106.894 26.2239 106.398 26.0549L105.657 25.7963C105.032 25.5791 104.688 25.1136 104.688 24.5618C104.688 23.9101 105.25 23.248 106.319 23.248C106.843 23.248 107.546 23.4549 108.008 23.8894L107.45 24.5722Z" />
              <path d="M50.8876 38.2789H50.691L49.0979 33.8203H50.2048L51.322 37.3307L52.4876 33.8203H53.5462L51.6565 39.0031C51.4186 39.6445 51.0427 40.0031 50.2531 40.0031H49.56V39.1927H50.1048C50.46 39.1927 50.6289 39.0755 50.7565 38.6893L50.8876 38.2789Z" />
              <path d="M57.4703 32.021V33.821H58.5186V34.6314H57.4703V37.1314C57.4703 37.4383 57.6979 37.4969 57.9255 37.4969C58.2703 37.4969 58.5289 37.4555 58.5289 37.4555V38.2762C58.5289 38.2762 58.0427 38.3245 57.6772 38.3245C57.1427 38.3245 56.4807 38.2141 56.4807 37.3452V34.6279H55.7496V33.8176H56.4807V32.0176H57.4703V32.021Z" />
              <path d="M63.691 36.3485H60.1807C60.26 37.0312 60.7358 37.5347 61.4358 37.5347C61.86 37.5347 62.2565 37.3657 62.4841 37.0209L63.6013 37.0519C63.2048 37.9312 62.3841 38.3967 61.4358 38.3967C60.1117 38.3967 59.1324 37.4071 59.1324 36.045C59.1324 34.6795 60.091 33.7002 61.4082 33.7002C62.6048 33.7002 63.691 34.5002 63.691 36.3416V36.3485ZM60.1807 35.6278H62.5841C62.5358 35.0554 62.0703 34.5588 61.4186 34.5588C60.7531 34.5588 60.2979 34.9967 60.1807 35.6278Z" />
              <path d="M66.6358 37.5381C67.1496 37.5381 67.5462 37.2898 67.7738 36.8864L68.6255 37.3209C68.2703 37.983 67.4876 38.4002 66.6393 38.4002C65.3151 38.4002 64.2772 37.4209 64.2772 36.0554C64.2772 34.6795 65.3151 33.7002 66.6393 33.7002C67.491 33.7002 68.2703 34.114 68.6255 34.7795L67.7738 35.214C67.5462 34.8071 67.1496 34.5623 66.6358 34.5623C65.8255 34.5623 65.2703 35.2036 65.2703 36.0554C65.2738 36.9036 65.8255 37.5381 66.6358 37.5381Z" />
              <path d="M70.4634 34.0761C70.4634 34.2036 70.4634 34.283 70.4531 34.3726C70.829 33.9381 71.3428 33.7002 71.9083 33.7002C72.9565 33.7002 73.5703 34.3519 73.5703 35.3726V38.2795H72.5807V35.5105C72.5807 34.8761 72.1945 34.5795 71.7014 34.5795C71.2772 34.5795 70.86 34.7967 70.4841 35.2312V38.2761H69.5048V33.8174H70.4634V34.0761Z" />
              <path d="M76.8321 33.7002C78.1459 33.7002 79.2149 34.6795 79.2149 36.045C79.2149 37.4105 78.1459 38.3967 76.8321 38.3967C75.5183 38.3967 74.4597 37.4071 74.4597 36.045C74.4563 34.6795 75.5149 33.7002 76.8321 33.7002ZM76.8321 34.5588C76.0218 34.5588 75.4563 35.1933 75.4563 36.0416C75.4563 36.8933 76.0183 37.5347 76.8321 37.5347C77.6425 37.5347 78.208 36.8933 78.208 36.0416C78.2046 35.1933 77.6425 34.5588 76.8321 34.5588Z" />
              <path d="M81.16 38.2796H80.1807V31.3555H81.16V38.2796Z" />
              <path d="M84.5048 33.7002C85.8186 33.7002 86.8876 34.6795 86.8876 36.045C86.8876 37.4105 85.8186 38.3967 84.5048 38.3967C83.191 38.3967 82.1324 37.4071 82.1324 36.045C82.1289 34.6795 83.1876 33.7002 84.5048 33.7002ZM84.5048 34.5588C83.6945 34.5588 83.1289 35.1933 83.1289 36.0416C83.1289 36.8933 83.691 37.5347 84.5048 37.5347C85.3152 37.5347 85.8807 36.8933 85.8807 36.0416C85.8772 35.1933 85.3152 34.5588 84.5048 34.5588Z" />
              <path d="M92.2462 33.817V38.6308C92.2462 39.3239 91.9013 39.9963 90.8427 39.9963H88.9738V39.1859H90.6944C90.96 39.1859 91.2565 39.117 91.2565 38.7101V37.6135C91.0186 38.048 90.4151 38.3756 89.7634 38.3756C88.4772 38.3756 87.5289 37.4066 87.5289 36.0411C87.5289 34.6653 88.46 33.6963 89.7531 33.6963C90.4048 33.6963 91.0186 34.0342 91.2669 34.479C91.2669 34.379 91.2565 34.2721 91.2565 34.1342V33.817H92.2462ZM89.9117 37.5377C90.7324 37.5377 91.2945 36.8963 91.2945 36.0446C91.2945 35.1825 90.7324 34.5411 89.9117 34.5411C89.1013 34.5411 88.5358 35.1825 88.5358 36.0446C88.5358 36.8928 89.1013 37.5377 89.9117 37.5377Z" />
              <path d="M94.6772 38.2796H93.6979V34.6313H93.0151V33.821H94.6772V38.2796ZM93.7875 31.3555H95.0151L94.1634 33.0279H93.2151L93.7875 31.3555Z" />
              <path d="M98.4531 35.2824C98.4531 34.8066 98.0979 34.5617 97.522 34.5617C97.0358 34.5617 96.6013 34.7686 96.2669 35.0376L95.8013 34.3066C96.1772 33.979 96.8082 33.7031 97.591 33.7031C98.7669 33.7031 99.4393 34.3548 99.4393 35.3066V38.2824H98.4496V37.8169C98.191 38.2307 97.6393 38.3997 97.1738 38.3997C96.1565 38.3997 95.5634 37.8169 95.5634 36.9962C95.5634 36.1273 96.1772 35.6307 97.1738 35.6307H98.1324C98.36 35.6307 98.4496 35.5307 98.4496 35.3548V35.2824H98.4531ZM98.4531 36.648V36.2617C98.3634 36.3307 98.2048 36.3617 97.9772 36.3617H97.3841C96.86 36.3617 96.5944 36.5893 96.5944 36.9652C96.5944 37.31 96.8531 37.6273 97.3841 37.6273C97.9393 37.6238 98.4531 37.3376 98.4531 36.648Z" />
            </g>
            <defs>
              <clipPath id="clip0_525_459">
                <rect width="108.076" height={40} />
              </clipPath>
            </defs>
          </svg>
        </a>
        <nav className="header__nav">
          {prop.header?.map((item, index) => (
            <a
              href={item.url}
              key={index}
              className={`header__link button__${index}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header__search">
          <img src={search} alt="search" className="header__search-img" />
          <p className="header__search-span">EBAC</p>
          <img src={arrow} />
        </div>
      </div>
    </header>
  );
}
