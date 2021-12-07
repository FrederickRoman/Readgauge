import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import MainBar from "./components/navigation/MainBar";

function App() {
  return (
    <Router>
      <MainBar />
      <Home />
      <Footer />
    </Router>
  );
}

export default App;
