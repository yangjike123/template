import { lazy } from 'react';
import { IRouters } from '../../types/IMenu';
import { Icon } from '../utils/common';
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
            },
            {
                name: '部门管理',
                path: '/system/department',
                icon: Icon({ icon: 'ApartmentOutlined' }),
                component: lazy(() => import('../src/pages/system/department')),
            },
            {
                name: '菜单管理',
                path: '/system/menu',
                icon: Icon({ icon: 'MenuOutlined' }),
                component: lazy(() => import('../src/pages/system/menu')),
            }
        ]
    },
    {
        path: 'userinfo',
        name: '用户信息',
        icon: Icon({ icon: 'UserOutlined' }),
        component: lazy(() => import('../src/pages/userinfo')),
        hideInMenu: true,
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
export default defaultRouters;