import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

    let userId =1;

    return(
        <div>
            <li><Link to ="/">Home</Link></li>
            <li><Link to ={{pathname : '/users/' + userId}}>User</Link></li>
        </div>
    )
}

export default Navbar;
