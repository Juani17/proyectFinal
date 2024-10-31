import { Home } from "./components/screens/Home/Home";
import { Header } from "./components/ui/Header/Header";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Home />
    </Provider>
  );
}

export default App;
