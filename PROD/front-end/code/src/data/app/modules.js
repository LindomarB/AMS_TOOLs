import AppModules from "../../classes/AppModules";
import applicationCatalogModule from "./modules/applicationCatalog";
import ctiToolModule from "./modules/ctiToolModule";
import homeModule from "./modules/homeModule";
import accountModule from "./modules/accountModule";
import slaModule from "./modules/slaModule";
import supportModule from "./modules/supportModule";
import teamManagerModule from "./modules/teamManagerModule";

const appModules = new AppModules();

appModules.add(homeModule);
appModules.add(ctiToolModule);
appModules.add(applicationCatalogModule);
appModules.add(slaModule);
appModules.add(teamManagerModule);
appModules.add(accountModule);
appModules.add(supportModule);

// console.log(appModules)
// console.log(appModules.get('team manager', 'manage team').getRoute('member details', 'account', 'accesses'))

function modules(moduleName, submoduleName) {
    const names = [];
    moduleName && names.push(moduleName);
    submoduleName && names.push(submoduleName);
    return appModules.get(...names);
}

export default modules;