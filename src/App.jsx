 import {BrowserRouter as Router , Route , Redirect,Switch} from "react-router-dom"
import React from 'react';

import User from "./pages/User"
import MainNavigation from "./shared/components/Navigation/MainNavigation"
import PlaceList from "./places/components/PlaceList"
import UserPlaces from "./places/pages/UserPlaces"
import NewPlace from "./places/pages/NewPlace"
import UpdatePlace from "./places/pages/UpdatePlace"
import Auth from "./pages/Auth"
import { AuthContext } from "./shared/context/auth-context"
import { useCallback , useState } from "react"
   


const App = () => {
   
  const [token, settoken] = useState(false);
  const [userId , setuserId] = useState()

  const login = useCallback((uId , token) => {
    settoken(token);
    setuserId(uId)
    console.log(userId)
  }, []);

  const logout = useCallback(() => {
    settoken(null)
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <User />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <User />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token:token, userId:userId , login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

 