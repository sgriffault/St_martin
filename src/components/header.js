import React from 'react';
import imgChamp from '../images/random_champ.jpg';
import {Link, withRouter} from "react-router-dom";

// const BACKEND_URL = "http://localhost:8081";

/**
 * Contains the header's HTML code.
 */
class Header extends React.Component {


  render() {
    return (
      <div id="header">
          <div className="w3-display-container w3-text-black">
                <img src={imgChamp} className="img_header" alt="Lights"/>
                <div className="w3-padding w3-display-topmiddle w3-xxlarge">Hop le site</div>
            </div>
         <nav>
            <ul className="navBar">
                <li className="header_li">
                  <Link to="/home">
                    Accueil
                  </Link>  
                </li>
                <li className="header_li">
                  <Link  to="/news">
                  Actualités
                  </Link>  
                </li>
                <li className="header_li">
                  <Link to="/calendrier">
                  Calendrier
                  </Link>  
                </li>
            </ul>            
        </nav> 
      </div>
    );
  }
}

export default withRouter(Header);