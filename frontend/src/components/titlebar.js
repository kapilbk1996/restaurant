import React from 'react';
import {NavLink, Link} from 'react-router-dom'
import '../stylesheets/titlebar.css'

const TitleBar = () => {
    return(
        <nav style={{"position": "sticky","top": "0", "z-index": "1000"}} className="nav-wrapper indigo">
            <div className="container">
                <img src={require('../images/k2io-logo.jpg')} width="50px" height="50px" alt=""></img>
                <Link to="/" className="brand-logo center nav-color">IntCode Automation Regression Testing</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink className="nav-color" exact to="/">Home</NavLink></li>
                    <li><NavLink className="nav-color" to="/builds">Builds</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default TitleBar
