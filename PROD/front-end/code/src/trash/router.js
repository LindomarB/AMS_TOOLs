import Router from "../classes/Router";

const router = new Router();

router.addRoute({
    name: 'portal',
    path: '/portal',
    relativePath: 'portal',
    nestedRoutes: [
        {name: 'forgot password', relativePath: 'forgot-password'},
        {name: 'account request', relativePath: 'account-request'},
        {name: 'password creation', relativePath: 'password-creation'}
    ]
});

router.addRoute({name: 'home', path: '/home', relativePath: 'home'});

export default router;