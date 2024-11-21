import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuComp from "./components/MenuComp";
import GamePage from "./pages/GamePage";
import OptionsPage from "./pages/OptionsPage";
import ScorsPage from "./pages/ScorsPage";
import SpriteComp from "./components/SpriteComp";
import { GameContextProvider } from "./appContext/appContext";
import { PageWrapper } from "./pages/PageWrapper";
import ModalWindow from "./components/ModalWindow";

function App() {
  return (
    <GameContextProvider>
      <div className="wrapper">
        <BrowserRouter>
          <PageWrapper>
            <ModalWindow />
            <MenuComp />
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

const NotFound = () => <h1 className="not-found">404 Страница не найдена</h1>;
