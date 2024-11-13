import { useLayoutEffect, useState } from "react";
import ArticlesComp from "@sections/articles/ArticlesComp";
import MainComp from "@sections/main/MainComp";
import WebinarsComp from "@sections/webinars/WebinarsComp";
import FormComp from "@sections/formSection/FormSection";
import { sections } from "@/types/types";

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
      ["browse-all-text"]: "",
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
      ["agreement-text"]: "",
      ["email-placeholder"]: "",
      ["submit-text"]: "",
      text: "",
      ticker: { text: "", color: "" },
      title: "string;",
    },
  });

  useLayoutEffect(() => {
    prop.getDataFromDB(prop.url, setSections);
  }, []);

  return (
    <>
      <MainComp main={sections.main} />
      <ArticlesComp content={sections.content} />
      <WebinarsComp proposals={sections.proposals} />
      <FormComp subscription={sections.subscription} />
    </>
  );
}
