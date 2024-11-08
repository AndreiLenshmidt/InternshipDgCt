import { useLayoutEffect, useState } from "react";
import ArticlesComp from "../components/sectionComponents/articles/ArticlesComp";
import FormComp from "../components/sectionComponents/formSection/FormComp";
import MainComp from "../components/sectionComponents/main/MainComp";
import WebinarsComp from "../components/sectionComponents/webinars/WebinarsComp";

type sections = {
  content: content;
  main: content;
  proposals: proposals;
  subscription: subscription;
};

export type content = {
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

export type proposals = {
  title: string;
  browsealltext: string;
  items: Array<{
    background: string;
    author: {
      img: string;
      name: string;
      position: string;
    };
    text: string;
    tags: [string, string];
    date_from: string;
    date_to: string;
    time: string;
  }>;
  ticker: { text: string; color: string };
};

export type subscription = {
  agreementtext: string;
  emailplaceholder: string;
  submittext: string;
  text: string;
  ticker: { text: string; color: string };
  title: string;
};

export default function MainPage(prop: {
  url: string;
  getDataFromDB: CallableFunction;
}) {
  const [sections, setSections] = useState<sections>({
    content: {
      items: [],
      ticker: {
        color: "",
        text: "",
      },
    },
    main: {
      items: [],
      ticker: {
        color: "",
        text: "",
      },
    },
    proposals: {
      title: "",
      browsealltext: "",
      items: [
        {
          background: "",
          author: {
            img: "",
            name: "",
            position: "",
          },
          text: "",
          tags: ["", ""],
          date_from: "",
          date_to: "",
          time: "",
        },
      ],
      ticker: { text: "", color: "" },
    },
    subscription: {
      agreementtext: "",
      emailplaceholder: "",
      submittext: "",
      text: "",
      ticker: { text: "", color: "" },
      title: "string;",
    },
  });

  useLayoutEffect(() => {
    prop.getDataFromDB(prop.url, setSections);
  }, []);

  console.log(sections);

  return (
    <>
      <MainComp main={sections.main} />
      <ArticlesComp content={sections.content} />
      <WebinarsComp proposals={sections.proposals} />
      <FormComp subscription={sections.subscription} />
    </>
  );
}
