import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs';
import { App as AntdApp, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { setHtmlRem } from './plugins/plugin-set-rem';
import routes, { transformRoutes } from './routes';

dayjs.locale('zh-cn');

const App = () => {
  const pages = useRoutes(transformRoutes(routes));
  const [px2rem, setPx2rem] = useState(
    px2remTransformer({
      rootValue: 16,
    }),
  );

  // 设置rem执行函数
  const handleSetRem = () => {
    setHtmlRem();
    setPx2rem(px2remTransformer({ rootValue: document.documentElement.style.fontSize.replace('px', '') }));
  };

  // 改变窗口大小时重新设置单位大小
  useEffect(() => {
    handleSetRem();

    const resizeFun = window.addEventListener('resize', handleSetRem);

    return () => {
      window.removeEventListener('resize', resizeFun);
    };
  }, []);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#00b96b',
          borderRadius: 4,
        },
      }}
    >
      <AntdApp message={{ maxCount: 1 }} style={{ width: '100%', height: '100%' }}>
        <StyleProvider transformers={[px2rem]}>{pages}</StyleProvider>
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
