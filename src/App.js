import LandingPage from "./react/pages/LandingPage";
import PrivatePage from "./react/pages/PrivatePage";
import TopMenu from "./react/components/TopMenu";
import { useSelector } from "react-redux";
function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <>
      <TopMenu />
      {!isLoggedIn && <LandingPage />}
      {isLoggedIn && <PrivatePage />}
    </>
  );
}

export default App;
