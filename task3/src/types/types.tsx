type header = Array<{ label: string; url: string }>;
type items = Array<{
  label: string;
  url: string;
}>;
type footer = Array<{
  label: string;
  items: items;
}>;
type UrlDB =
  | "http://localhost:8000/menu"
  | "http://localhost:8000/contacts"
  | "http://localhost:8000/sections";
type menu = {
  logo: string;
  header: header;
  footer: footer;
};
type contacts = {
  email: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  links: Array<{ label: string; url: string }>;
  phone: string;
  subscription: { ["email-placeholder"]: string; ["submit-text"]: string };
  whatsapp: string;
  youtube: string;
};

type sections = {
  content: content;
  main: content;
  proposals: proposals;
  subscription: subscription;
};

type content = {
  items: Array<{
    title: string;
    text: string;
    tags: Array<string>;
    date: string;
    duration: string;
    ["browse-text"]: string;
    img: { shape: string; url: string };
    size: string;
    stamp: { position: string; type: string; word: string };
  }>;
  ticker: {
    color: string;
    text: string;
  };
};

type proposals = {
  title: string;
  ["browse-all-text"]: string;
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

type subscription = {
  ["agreement-text"]: string;
  ["email-placeholder"]: string;
  ["submit-text"]: string;
  text: string;
  ticker: { text: string; color: string };
  title: string;
};

export type {
  UrlDB,
  menu,
  header,
  footer,
  content,
  contacts,
  proposals,
  subscription,
  sections,
};
