 import {BrowserRouter as Router , Route , Redirect,Switch} from "react-router-dom"

import User from "./pages/User"
import MainNavigation from "./shared/components/Navigation/MainNavigation"
import PlaceList from "./places/components/PlaceList"
import UserPlaces from "./places/pages/UserPlaces"

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


   <Redirect  to={"/"} />
   </Switch>
   </main>
     </Router>
  )
}

export default App
