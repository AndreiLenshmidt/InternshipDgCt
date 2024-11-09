import { useLayoutEffect, useState } from "react";
import MainPage from "./containers/MainPage";
import TheHeader from "./components/sectionComponents/header/TheHeader";
import TheFooter from "./components/sectionComponents/footer/TheFooter";
import { hideHeader } from "./helpers/hide-header";
import "../public/styles/styles.css";

type logo = string;
export type header = Array<{ label: string; url: string }>;
type items = Array<{
  label: string;
  url: string;
}>;
export type footer = Array<{
  label: string;
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
  email: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  links: Array<{ label: string; url: string }>;
  phone: string;
  subscription: { emailplaceholder: string; submittext: string };
  whatsapp: string;
  youtube: string;
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
    subscription: { submittext: "", emailplaceholder: "" },
    whatsapp: "",
    youtube: "",
  });

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

  useLayoutEffect(() => {
    getDataFromDB("http://localhost:8000/menu", setMenu);
    getDataFromDB("http://localhost:8000/contacts", setContacts);
    window.addEventListener("scroll", hideHeader);
  }, []);

  return (
    <div className="wrapped">
      <TheHeader header={menu.header} logo={menu.logo} />
      <MainPage
        url="http://localhost:8000/sections"
        getDataFromDB={getDataFromDB}
      />
      <TheFooter footer={menu.footer} contacts={contacts} />
    </div>
  );
}

export default App;
