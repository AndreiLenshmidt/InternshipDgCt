// import { Fragment } from "react/jsx-runtime";

import { useEffect, useState } from "react";
import TheFooter from "../components/TheFooter";

type Url =
  | "http://localhost:8000/menu"
  | "http://localhost:8000/sections"
  | "http://localhost:8000/contacts";

type Items = {
  email: String;
  facebook: String;
  instagram: String;
  linkedin: String;
  links: Array<{}>;
  phone: String;
  subscription: {};
  whatsapp: String;
  youtube: String;
};

export default function DbLoader(props: { url: Url }) {
  //   const [items, setItems] = useState<Items>();
  //   useEffect(() => {
  //     fetch(props.url)
  //       .then((res) => res.json())
  //       .then(
  //         (result) => {
  //           setItems(result);
  //         },
  //         (error) => {
  //           console.log(error);
  //         }
  //       );
  //   }, []);

  //   console.log(items);

  //   if (!items) {
  //     return;
  //   } else {
  return <></>;
  //   }
}

// export default function DbLoader(props: {
//   url: Url;
//   components: Array<React.ReactNode>;
// }) {
//   const dbjson = async () => {
//     try {
//       const response = await fetch(props.url);
//       const data: JSON = await response.json();
//       return data;
//     } catch (error) {
//       if (error instanceof Error) {
//         console.log(error.message);
//       }
//     }
//   };

// const data = async () => {
//   const res = await dbjson();
//   return res;
// };
// const data = dbjson();
// data.then((res) => {
//   console.log(res);
// });

//   const listItems = props.components.map((comp) => comp);
//   console.log(listItems);

//   return <>{listItems}</>;
// }

// {
//   "compilerOptions": {
//                "strict": true,
//                "useUnknownInCatchVariables": "false"
//         },
// }
