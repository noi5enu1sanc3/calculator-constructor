import { Layout } from 'antd';

import ModeSwitcher from '../../components/ModeSwitcher/ModeSwitcher';

const { Header, Sider, Content } = Layout;

function MainLayout() {
  return (
    <Layout>
      <Header>
        <ModeSwitcher />
      </Header>
      <Sider></Sider>
      <Content></Content>
    </Layout>
  );
}

export default MainLayout;
