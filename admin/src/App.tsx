import { Routes, Route, useNavigate } from "react-router-dom";
import { Suspense, useEffect, useState } from 'react';
import { getToken } from '../utils/request';
import { PageLoading } from '@ant-design/pro-components';
import NotFound from "./404";
import router from '../router';
import './App.css';
import { getUserInfo } from "./api/login";
import { ELoginStatus } from "../utils/Enum";
import { IAccount } from "../../types/IAccount";

function App() {
  const notShowMenu = ['/login', '/404'];
  const token = getToken();
  const onNav = useNavigate();
  const [isLogin, setIsLogin] = useState(ELoginStatus.Loading);
  const [userInfo, setUserInfo] = useState<IAccount | null>(null);
  
  async function getUserInfoData() {
    try {
      setIsLogin(ELoginStatus.Loading);
      const data = await getUserInfo();
      setUserInfo(data);
      setIsLogin(ELoginStatus.Authorization);
    } catch (error) {
      setIsLogin(ELoginStatus.NotAuthorization);
    }
  }
  useEffect(() => {
    if (!token) onNav('/login');
    getUserInfoData();
  }, [])
  return (
    <>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          {
            router.map((item) => {
              return (
                <Route
                  key={item.path}
                  path={item.path}
                  element={<item.component></item.component>}
                ></Route>
              )
            })
          }
          {/* 默认404界面 */}
          <Route path="*" element={NotFound()}></Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
