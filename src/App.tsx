import ModeSwitcher from './features/modeSwitcher/ModeSwitcher/ModeSwitcher';
import Header from './layout/Header/Header';
import Main from './pages/Main/Main';

function App() {
  return (
    <div className="App">
      <Header>
        <ModeSwitcher />
      </Header>
      <Main />
    </div>
  );
}

export default App;
