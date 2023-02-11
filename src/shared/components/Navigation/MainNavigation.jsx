import React from 'react'
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
 
import "./MainNavigation.css"


const MainNavigation = props=>{

    const [drawerIsopen,setdrawerIsopen] = React.useState(false);
    const  handleClick = ()=>setdrawerIsopen(prev=>!prev)
    

    return(
        <>
       { drawerIsopen ?  <SideDrawer >
            <nav className="main-navigation__drawer-nav">
                <NavLinks />
            </nav>
        </SideDrawer> : null}

        {drawerIsopen ? <Backdrop onClick={handleClick} />:null}
         
        <MainHeader >
            <button onClick={handleClick} className="main-navigation__menu-btn">
                <span />
                <span />
                <span /> 
            </button>
            <h1 className="main-navigation__title">
                <Link to="/" >Your Places</Link>
            </h1>
            <nav>
                <NavLinks />
            </nav>
        </MainHeader>
        </>
    )
}

export default MainNavigation;