import { createElement, lazy } from 'react';
import { IRouter } from './types';
import * as icons from '@ant-design/icons';
import { IRouters } from '../../types/IMenu';

function Icon(props: { icon: string }) {
    const { icon } = props;
    const antIcon: { [key: string]: any } = icons;
    return createElement(antIcon[icon]);
};

const defaultRouters: IRouters[] = [
    {
        path: '/',
        component: lazy(() => import('../src/pages/home')),
        name: '首页',
        icon: Icon({ icon: 'HomeOutlined' }),
    },
    {
        path: '/system',
        name: '系统管理',
        icon: Icon({ icon: 'SettingOutlined' }),
        children: [
            {
                name: '账号管理',
                path: '/system/account',
                icon: Icon({ icon: 'UserOutlined' }),
                component: lazy(() => import('../src/pages/system/account')),
            },
            {
                name: '角色管理',
                path: '/system/role',
                icon: Icon({ icon: 'UsergroupAddOutlined' }),
                component: lazy(() => import('../src/pages/system/role')),
            }
        ]
    },
    {
        path: '/login',
        component: lazy(() => import('../src/pages/login')),
        name: '登录',
        hideInMenu: true,
    },
    {
        path: '*',
        component: lazy(() => import('../src/404')),
        name: '404',
        hideInMenu: true,
    }

]

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
