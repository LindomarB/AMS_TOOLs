import React, { useContext } from "react";
import UserContext from "../../context/userContext/UserContext";
import ModuleHomePage from "../../Interface/moduleHomePage/ModuleHomePage";
import YourTeam from "./home/yourTeam/YourTeam";

function TeamManager(props) {
    const user = useContext(UserContext).user;

    return (
        <ModuleHomePage module='team manager'>
            <YourTeam accountable={user._id}/>
        </ModuleHomePage>
    );
}

export default TeamManager;