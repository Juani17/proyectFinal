import { Home } from "./components/screens/Home/Home";
import { Header } from "./components/ui/Header/Header";
import { ModalProvider } from "./context/ModalContext";

function App() {
  return (
    <ModalProvider>
      <Header />
      <Home />
    </ModalProvider>
  );
}

export default App;
