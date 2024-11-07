import { useLayoutEffect, useState } from "react";
import "./assets/styles/styles.scss";
import ArticlesComp from "./components/ArticlesComp";
import FormComp from "./components/FormComp";
import MainComp from "./components/MainComp";
import TheFooter from "./components/footer/TheFooter";
import TheHeader from "./components/header/TheHeader";
import WebinarsComp from "./components/WebinarsComp";

type logo = String;
type header = Array<{ label: String; url: "#" }>;
type items = Array<{
  label: String;
  url: String;
}>;
export type footer = Array<{
  label: String;
  items: items;
}>;
type UrlDB =
  | "http://localhost:8000/menu"
  | "http://localhost:8000/contacts"
  | "http://localhost:8000/sections";
type menu = {
  logo: logo;
  header: header;
  footer: footer;
};
export type contacts = {
  email: String;
  facebook: String;
  instagram: String;
  linkedin: String;
  links: Array<{ label: String; url: String }>;
  phone: String;
  subscription: {};
  whatsapp: String;
  youtube: String;
};

const getDataFromDB = async (url: UrlDB, func: CallableFunction) => {
  fetch(url)
    .then((res) => res.json())
    .then(
      (result) => {
        func(result);
      },
      (error) => {
        console.log(error);
      }
    );
};

function App() {
  const [menu, setMenu] = useState<menu>({ logo: "", header: [], footer: [] });
  const [contacts, setContacts] = useState<contacts>({
    email: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    links: [],
    phone: "",
    subscription: {},
    whatsapp: "",
    youtube: "",
  });

  useLayoutEffect(() => {
    getDataFromDB("http://localhost:8000/menu", setMenu);
    getDataFromDB("http://localhost:8000/contacts", setContacts);
  }, []);

  console.log(menu);
  console.log(contacts);

  return (
    <div className="wrapped">
      <TheHeader header={menu.header} logo={menu.logo} />
      <MainComp />
      <ArticlesComp />
      <WebinarsComp />
      <FormComp />
      <TheFooter footer={menu.footer} contacts={contacts} />
    </div>
  );
}

export default App;
