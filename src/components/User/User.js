import React from "react";
import { useParams } from "react-router-dom";
import Avatar from "../Avatar/Avatar";

function User() {

    const {userId} = useParams();
    return(
        <div>
            User !!! {userId}
            <Avatar avatarId={0}/>
        </div>
    )
}
export default User;