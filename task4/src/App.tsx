import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MenuComp from "./components/MenuComp";
import GamePage from "./pages/GamePage";
import OptionsPage from "./pages/OptionsPage";
import ScorsPage from "./pages/ScorsPage";
import SpriteComp from "./components/SpriteComp";
import { GameContextProvider } from "./appContext/appContext";
import { PageWrapper } from "./pages/PageWrapper";

function App() {
  return (
    <GameContextProvider>
      <div className="wrapper">
        <BrowserRouter>
          <MenuComp />
          <PageWrapper>
            <Routes>
              <Route path="/" element={<GamePage />} />
              <Route path="/options" element={<OptionsPage />} />
              <Route path="/scors" element={<ScorsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageWrapper>
        </BrowserRouter>
        <SpriteComp />
      </div>
    </GameContextProvider>
  );
}

export default App;

const NotFound = () => (
  <div className="not-found">
    <h1>404 Страница не найдена</h1>
    <Link to="/">
      <button className="modal__btn modal__btn-save">Вернутся в игру</button>
    </Link>
  </div>
);
