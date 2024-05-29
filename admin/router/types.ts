import { IRouters } from '../../types/IMenu';

export interface ILocation {
    pathname: string;
}
export interface IRoute {
    routes: IRouters[];
    path: string;
    location: ILocation;
}
export interface IRouter {
    route: IRoute;
}