import { BrowserRouter as Router } from "react-router-dom";
import MainBar from "./components/navigation/MainBar";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <MainBar />
      <Home />
    </Router>
  );
}

export default App;
