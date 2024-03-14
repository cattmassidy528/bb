import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./visitable/home";
import Deposit from "./visitable/deposit";
import Withdraw from "./visitable/withdraw";
import Navigation from "./visitable/navigation";
// import AllData from "./visitable/alldata";
import Profile from "./visitable/profile";
import Logout from "./visitable/logout";
import AccountContextProvider from "./visitable/context";
import "react-tooltip/dist/react-tooltip.css";



const App = () => {
  const username = JSON.parse(localStorage.getItem("currentUser"))

  return (
    <div className="App">
      <HashRouter>
        <AccountContextProvider>
          <Routes>
            <Route path="/" element={<Navigation username={username} />}>
              <Route index element={<Home />} />
              <Route path="/visitable/profile/:username" element={<Profile />} />
              <Route path="/visitable/deposit/" element={<Deposit />} />
              <Route path="/visitable/withdraw/" element={<Withdraw />} />
              {/* <Route path="/visitable/alldata/" element={<AllData />} /> */}
              <Route path="/visitable/logout/" element={<Logout />} />
            </Route>
          </Routes>
        </AccountContextProvider>
      </HashRouter>
    </div>
  );
};

export default App;
