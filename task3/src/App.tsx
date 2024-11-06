// import { useState } from "react";
// import "./App.css";
import "./assets/styles/styles.scss";
import ArticlesComp from "./components/ArticlesComp";
import FormComp from "./components/FormComp";
import MainComp from "./components/MainComp";
import TheFooter from "./components/TheFooter";
import TheHeader from "./components/TheHeader";
import WebinarsComp from "./components/WebinarsComp";
import DbLoader from "./containers/dbloader";

function App() {
  // const main: React.ReactNode = <MainComp />;
  // const articles: React.ReactNode = <ArticlesComp />;
  // const webinars: React.ReactNode = <WebinarsComp />;
  // const form: React.ReactNode = <FormComp />;

  const components: Array<React.ReactNode> = [
    <MainComp />,
    <ArticlesComp />,
    <WebinarsComp />,
    <FormComp />,
  ];
  return (
    <div className="wrapped">
      <TheHeader />
      {/* <MainComp />
      <ArticlesComp />
      <WebinarsComp />
      <FormComp /> */}
      <DbLoader url="http://localhost:8000/contacts" components={components} />
      <TheFooter />
    </div>
  );
}

export default App;
