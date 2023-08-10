import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AppRoutes } from './Routes';

function App() {
  return (
    <div className="App">
      <Routes>
        {AppRoutes.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page/>}/>
        })}
      </Routes>
    </div>
  );
}

export default App;
