import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuComp from "./components/MenuComp";
import GamePage from "./pages/GamePage";
import OptionsPage from "./pages/OptionsPage";
import ScorsPage from "./pages/ScorsPage";
import SpriteComp from "./components/SpriteComp";
import { GameContextProvider } from "./appContext/appContext";

function App() {
  // // const addFive = () => dispatch({ type: "setCount", value: state.count + 5 });
  // // console.log(dispatch);
  return (
    <GameContextProvider>
      <div className="wrapper">
        <BrowserRouter>
          <MenuComp />
          <Routes>
            <Route path="/" element={<GamePage />} />
            <Route path="/options" element={<OptionsPage />} />
            <Route path="/scors" element={<ScorsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <SpriteComp />
      </div>
    </GameContextProvider>
  );
}

export default App;

const NotFound = () => <h1 className="not-found">404 Страница не найдена</h1>;
