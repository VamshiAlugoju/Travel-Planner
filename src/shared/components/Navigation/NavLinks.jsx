import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
 
import "./NavLinks.css"
 
const NavLinks = props => {
    const auth  = useContext(AuthContext)
  return (
    <ul className='nav-links' >

<li>
    <NavLink to="/" exact>All users</NavLink>
</li>
 { auth.isLoggedIn &&  
<li>
    <NavLink to={`/${auth.userId}/places`} >my places</NavLink>
</li>
 }
 {auth.isLoggedIn  && 
<li>
    <NavLink to="/places/new" exact>Add place</NavLink>
</li>
 }
 {!auth.isLoggedIn  && 
 
<li>
    <NavLink to="/auth" exact> Authenticate</NavLink>
</li>
 }  
  {auth.isLoggedIn &&   <li>
        <button  onClick={auth.logout} >LogOut</button>
     </li>
  }
    
    </ul>
  )
}

export default NavLinks