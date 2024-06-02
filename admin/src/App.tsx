import { Routes, Route, useNavigate } from "react-router-dom";
import { Suspense, useEffect, useState } from 'react';
import { PageContainer, PageLoading, ProCard, ProLayout, ProSettings, SettingDrawer } from '@ant-design/pro-components';
import { getUserInfo, logout } from "./api/login";
import { ELoginStatus } from "../utils/Enum";
import { IAccount, IAccountDetail } from "../../types/IAccount";
import { IMenu } from "../../types/IMenu";
import { Dropdown, Input, Modal, message } from "antd";
import { LogoutOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import defaultRoute from '../router';
import './App.css';
import { changePassword } from "./api/account";
import { UserInfoData } from '../Provider'
enum DropdownItem {
  userinfo = 'userinfo',
  changePassword = 'changePassword',
  logout = 'logout',
}
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
      onNav('/login'); // 如果未登录，跳转到登录页面
      setIsLogin(ELoginStatus.NotAuthorization);
    }
  }
  function onMenuNavigate(path: string) {
    const findRoute = defaultRoute.route.routes.find(item => item.path === path);
    const children = findRoute?.children;
    if (children) {
      onNav(children[0].path);
    } else {
      onNav(path);
    }
  }
  function onSelectDropdownItem({ key }: { key: string }) {
    switch (key) {
      case DropdownItem.userinfo:
        onNav('/userinfo');
        break;
      case DropdownItem.changePassword:
        let inputValue = '';
        Modal.confirm({
          title: '修改密码',
          maskClosable: false,
          keyboard: false,
          content: (<Input.Password onChange={(value) => inputValue = value.target.value} placeholder="请输入新密码 6-12位" />),
          onOk: async () => {
            const password = inputValue.trim();
            if (password.length < 6 || password.length > 12) {
              message.error('密码长度必须为6-12位');
              return Promise.reject(false);
            }
            await changePassword({ password });
            message.success('修改成功');
            return Promise.resolve(true);
          },
          onCancel: () => { inputValue = ''; }
        });
        break;
      case DropdownItem.logout:
        Modal.confirm({
          title: '确定要退出登录吗?',
          onOk: async () => {
            await logout();
            message.success('退出登录成功');
            setTimeout(() => {
              onNav('/login');
              location.reload();
            }, 1000);
          }
        });
        break;
    }
  }

  useEffect(() => {
    getUserInfoData();
  }, [])

  const routerRender = (data: Omit<IMenu, 'id'>[]) => {
    if (isLogin === ELoginStatus.NotAuthorization) {
      return data.filter(t => ['/login', '*'].includes(t.path)).map(item => {
        return (
          <Route
            key={item.path}
            path={item.path}
            element={item.component && <item.component />}
          ></Route>
        )
      })
    } else if (isLogin === ELoginStatus.Authorization) {
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

  }
  if (isLogin === ELoginStatus.Loading) {
    return <PageLoading />;
  } else if (isLogin === ELoginStatus.NotAuthorization) {
    return (
      <Suspense fallback={<PageLoading />}>
        <Routes>
          {routerRender(defaultRoute.route.routes)}
        </Routes>
      </Suspense>
    )
  } else if (isLogin === ELoginStatus.Authorization) {
    return (
      <div
        id="pro-layout"
        style={{
          height: '100vh',
        }}>
        <ProLayout
          avatarProps={{
            src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
            title: userInfo?.data?.username,
            render: (_, dom) => {
              return (
                <Dropdown
                  menu={{
                    onClick: onSelectDropdownItem,
                    items: [
                      {
                        key: DropdownItem.userinfo,
                        icon: <UserOutlined />,
                        label: '个人信息',
                      },
                      {
                        key: DropdownItem.changePassword,
                        icon: <LockOutlined />,
                        label: '修改密码',

                      },
                      {
                        key: DropdownItem.logout,
                        icon: <LogoutOutlined />,
                        label: '退出登录',
                      },
                    ],
                  }}
                >{dom}</Dropdown>
              )
            }
          }}
          menuItemRender={(item, dom) => {
            return <div onClick={() => onMenuNavigate(item.path as string)}>{dom}</div>
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
              <UserInfoData.Provider value={userInfo?.data as unknown as IAccount}>
                <Suspense fallback={<PageLoading />}>
                  <Routes>
                    {routerRender(defaultRoute.route.routes)}
                  </Routes>
                </Suspense>
              </UserInfoData.Provider>
            </ProCard>
          </PageContainer>
        </ProLayout>
        <SettingDrawer
          pathname={window.location.pathname}
          enableDarkTheme
          getContainer={() => document.getElementById('pro-layout')}
          settings={settings}
          onSettingChange={(changeSetting) => setSetting(changeSetting)}
          disableUrlParams={false}
        />
      </div>
    )
  }
}

export default App
