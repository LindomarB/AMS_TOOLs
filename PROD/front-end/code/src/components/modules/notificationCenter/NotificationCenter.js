import React from "react";
import LastNotifications from "./lastNotifications/LastNotifications";
import ModuleHomePage from "../../Interface/moduleHomePage/ModuleHomePage";

function NotificationCenter(props) {
    return (
        <ModuleHomePage module='notification center'>
            <LastNotifications />
        </ModuleHomePage>
    );
}

export default NotificationCenter;