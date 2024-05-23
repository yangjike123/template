import { lazy } from 'react';
const defaultRouter = [
    {
        path: '/',
        component: lazy(() => import('../src/pages/home')),
        name: '首页',
        icon: 'home',
    },
    {
        path: '/login',
        component: lazy(() => import('../src/pages/login')),
        name: '登录',
        icon: 'login',
    }
]

const router = [
    ...defaultRouter,
];

export default router;