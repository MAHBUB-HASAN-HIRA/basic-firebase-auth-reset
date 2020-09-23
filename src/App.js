import React, { createContext, useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from "./Components/Header/Header";
import NotFound from "./Components/NotFound/NotFound";
import Shop from "./Components/Shop/Shop";
import Inventory from "./Components/Inventory/Inventory";
import Review from "./Components/Review/Review";
import Login from "./Components/Firebase/Login";
import Shipment from "./Components/Shipment/Shipment";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
      <Header/>
      <Switch>
      <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/review'>
          <Review/>
        </Route>
        <PrivateRoute path='/inventory'>
          <Inventory/>
        </PrivateRoute>
        <PrivateRoute path='/shipment'>
          <Shipment/>
        </PrivateRoute>
        <Route exact path='/'>
            <Shop/>
        </Route>
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
