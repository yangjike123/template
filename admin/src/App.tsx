import { Routes, Route, useNavigate } from "react-router-dom";
import NotFound from "./404";
import { Suspense, useEffect } from 'react';
import router from '../router';
import { getToken } from '../utils/request';
import { PageLoading } from '@ant-design/pro-components';
import './App.css';
function App() {
  const notShowMenu = ['/login', '/404'];
  const token = getToken();
  const onNav = useNavigate();
  useEffect(() => {
    if (!token) onNav('/login');
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
