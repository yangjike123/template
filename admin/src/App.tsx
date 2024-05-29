import { Routes, Route, useNavigate } from "react-router-dom";
import { Suspense, useEffect, useState } from 'react';
import { PageContainer, PageLoading, ProCard, ProLayout, ProSettings, SettingDrawer } from '@ant-design/pro-components';
import { getUserInfo } from "./api/login";
import { ELoginStatus } from "../utils/Enum";
import { IAccountDetail } from "../../types/IAccount";
import defaultRoute from '../router';
import Login from "./pages/login";
import './App.css';
import { IMenu } from "../../types/IMenu";

function App() {
  const onNav = useNavigate();
  const [isLogin, setIsLogin] = useState<ELoginStatus>(ELoginStatus.Loading);
  const [userInfo, setUserInfo] = useState<IAccountDetail | null>(null);
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    "fixSiderbar": true,
    "layout": "mix",
    "splitMenus": true,
    "navTheme": "light",
    "contentWidth": "Fluid",
    "colorPrimary": "#1677FF",
    "siderMenuType": "sub"
  });
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
  function onNavigate(path: string) {
    const findRoute = defaultRoute.route.routes.find(item => item.path === path);
    const children = findRoute?.children;
    if (children) {
      onNav(children[0].path);
    } else {
      onNav(path);
    }
  }
  useEffect(() => {
    getUserInfoData();
  }, [])

  const routerRender = (data: Omit<IMenu, 'id'>[]) => {
    return data.map((item) => {
      return (
        <Route
          key={item.path}
          path={item.path}
          element={item.component && <item.component />}
        >
          {item.children && item.children.length > 0 && routerRender(item.children)}
        </Route>
      )
    })
  }
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}>
      {
        isLogin === ELoginStatus.NotAuthorization ?
          <Login /> :
          <ProLayout
            avatarProps={{
              render: () => {
                return <div>{userInfo?.data?.account}</div>
              }
            }}
            menuItemRender={(item, dom) => {
              return <div onClick={() => onNavigate(item.path as string)}>{dom}</div>
            }}
            location={{
              pathname: window.location.pathname,
            }}
            menuFooterRender={(props) => {
              if (props?.collapsed) return undefined;
              return (
                <div
                  style={{
                    textAlign: 'center',
                    paddingBlockStart: 12,
                  }}
                >
                  <div>© 2024 Made with love</div>
                  <div>by Ant Design</div>
                </div>
              );
            }}
            {...defaultRoute}
            {...settings}
          >
            <PageContainer title={false}>
              <ProCard
                style={{
                  height: '100vh',
                  minHeight: 800,
                }}>
                <Suspense fallback={<PageLoading />}>
                  <Routes>
                    {routerRender(defaultRoute.route.routes)}
                  </Routes>
                </Suspense>
              </ProCard>
            </PageContainer>
          </ProLayout>
      }
      <SettingDrawer
        pathname={window.location.pathname}
        enableDarkTheme
        getContainer={() => document.getElementById('test-pro-layout')}
        settings={settings}
        onSettingChange={(changeSetting) => setSetting(changeSetting)}
        disableUrlParams={false}
      />
    </div>
  )
}

export default App
