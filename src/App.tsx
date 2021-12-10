import { BrowserRouter as Router } from "react-router-dom";
import MainFooter from "./components/footer/MainFooter";
import PageRoutes from "./router/PageRoutes";
import MainNavBar from "./components/navigation/MainNavBar";

function App() {
  return (
    <Router>
      <MainNavBar />
      <PageRoutes />
      <MainFooter />
    </Router>
  );
}

export default App;
