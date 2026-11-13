import getAccessData from "./getAccessData";
import getCtiData from "./getCtiData";
import getProfileData from "./getProfileData";
import getTeamData from "./getTeamData";

const getData = {
    accesses: getAccessData,
    'cti tool': getCtiData,
    profile: getProfileData,
    team: getTeamData
};

export default getData;