import { useEffect, useState } from "react";
import "./assets/styles/styles.scss";
import ArticlesComp from "./components/ArticlesComp";
import FormComp from "./components/FormComp";
import MainComp from "./components/MainComp";
import TheFooter from "./components/TheFooter";
import TheHeader from "./components/TheHeader";
import WebinarsComp from "./components/WebinarsComp";
import DbLoader from "./containers/dbloader";

type header = Array<{ label: String; url: "#" }> | [];
type logo = String;
type menu = {
  logo: logo;
  header: header;
  footer: Array<{}>;
};

function App() {
  const [menu, setMenu] = useState<menu>({ logo: "", header: [], footer: [] });

  useEffect(() => {
    fetch("http://localhost:8000/menu")
      .then((res) => res.json())
      .then(
        (result) => {
          setMenu(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  console.log(menu);

  return (
    <div className="wrapped">
      <TheHeader header={menu.header} logo={menu.logo} />
      <MainComp />
      <ArticlesComp />
      <WebinarsComp />
      <FormComp />
      {/* <TheFooter /> */}
      <DbLoader url="http://localhost:8000/menu" />
    </div>
  );
}

export default App;
