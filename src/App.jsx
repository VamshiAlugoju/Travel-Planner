 import {BrowserRouter as Router , Route , Redirect,Switch} from "react-router-dom"

import User from "./pages/User"
import MainNavigation from "./shared/components/Navigation/MainNavigation"
import PlaceList from "./places/components/PlaceList"
import UserPlaces from "./places/pages/UserPlaces"
import NewPlace from "./places/pages/NewPlace"

function App() {
  return (
   <Router>
    <MainNavigation />

    <main >
    <Switch >  

   <Route path={"/"}  exact>
      <User />
   </Route>

   <Route  path = "/:userId/places">
   <UserPlaces />
   </Route>

   <Route  path = "/places/new">
    <NewPlace />
   </Route>

   <Redirect  to={"/"} />
   </Switch>
   </main>
     </Router>
  )
}

export default App
