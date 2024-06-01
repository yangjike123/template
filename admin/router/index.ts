import { IRouter } from './types';
import defaultRouters from './defaultRouters';

const baseUrl = '../src/pages/';


const router: IRouter = {
    route: {
        path: '/',
        location: {
            pathname: '/',
        },
        routes: [
            ...defaultRouters
        ]
    }


};

export default router;
