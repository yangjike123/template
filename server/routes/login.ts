import { Router } from 'express';
import serviceUser from '../service/login';
import loginParamsValidator from '../service/login/paramsValidator'
const route = Router();
// 用户登录
route.post('/login', loginParamsValidator.loginParams, serviceUser.login);

// 登录验证码code
route.get('/code', serviceUser.getCode);

// 用户信息
route.get('/userinfo', serviceUser.getUserInfo);

// 用户退出
route.post('/logout', serviceUser.logout);

export default route;