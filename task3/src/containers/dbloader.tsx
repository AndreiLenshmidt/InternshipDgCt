type Url =
  | "http://localhost:8000/menu"
  | "http://localhost:8000/sections"
  | "http://localhost:8000/contacts";

export default function DbLoader(props: {
  url: Url;
  components: Array<React.ReactNode>;
}) {
  const dbjson = async (): Promise<void> => {
    try {
      const response = await fetch(props.url);
      const data: JSON = await response.json();
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  dbjson();

  const listItems = props.components.map((comp) => comp);

  return <>{listItems}</>;
}

// {
//   "compilerOptions": {
//                "strict": true,
//                "useUnknownInCatchVariables": "false"
//         },
// }
