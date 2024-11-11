import { useLayoutEffect, useState } from "react";
import MainPage from "@/containers/MainPage";
import TheHeader from "@sections/header/TheHeader";
import TheFooter from "@sections/footer/TheFooter";
import { hideHeader } from "@/helpers/hide-header";
import { UrlDB, menu, contacts } from "@/types/types";

function App() {
  const [menu, setMenu] = useState<menu>({ logo: "", header: [], footer: [] });
  const [contacts, setContacts] = useState<contacts>({
    email: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    links: [],
    phone: "",
    subscription: { ["submit-text"]: "", ["email-placeholder"]: "" },
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
