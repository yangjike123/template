import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import dayjs from 'dayjs';
import zhCN from 'antd/locale/zh_CN';
import './index.css';
import 'dayjs/locale/zh-cn';
import { BrowserRouter } from 'react-router-dom';
dayjs.locale('zh-cn');
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN} theme={{
    components: {
      Modal: {
        titleLineHeight: 2.5,
      }
    }
  }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
  ,
)
