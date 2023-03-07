import { Layout } from 'antd';

import CalculatorBlocksContainer from '../../components/CalculatorBlocksContainer/CalculatorBlocksContainer';
import ModeSwitcher from '../../components/ModeSwitcher/ModeSwitcher';

const { Header, Sider, Content } = Layout;

function MainLayout() {
  return (
    <Layout>
      <Header>
        <ModeSwitcher />
      </Header>
      <Layout>
        <Sider>
          <CalculatorBlocksContainer />
        </Sider>
        <Content></Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
