import { useLayoutEffect, useState } from "react";
import ArticlesComp from "../components/articles/ArticlesComp";
import FormComp from "../components/FormComp";
import MainComp from "../components/main/MainComp";
import WebinarsComp from "../components/WebinarsComp";

type sections = {
  content: {};
  main: main;
  proposals: {};
  subscription: {};
};

export type main = {
  items: Array<{
    title: string;
    text: string;
    tags: Array<string>;
    date: string;
    duration: string;
    browsetext: string;
    img: { shape: string; url: string };
    size: string;
    stamp: { position: string; type: string; word: string };
  }>;
  ticker: {
    color: string;
    text: string;
  };
};

export default function MainPage(prop: {
  url: string;
  getDataFromDB: CallableFunction;
}) {
  const [sections, setSections] = useState<sections>({
    content: {},
    main: {
      items: [],
      ticker: {
        color: "",
        text: "",
      },
    },
    proposals: {},
    subscription: {},
  });

  useLayoutEffect(() => {
    prop.getDataFromDB(prop.url, setSections);
  }, []);

  console.log(sections);

  return (
    <>
      <MainComp main={sections.main} />
      <ArticlesComp />
      <WebinarsComp />
      <FormComp />
    </>
  );
}
