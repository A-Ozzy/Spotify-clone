
import { useSelector } from 'react-redux';
import Login from '../Login';
import MainScreen from '../MainScreen';
import './App.scss';

function App() {
   
    const isToken = useSelector(state => state.login.token);
   
   return (
      <div className="app">
         {isToken ? <MainScreen/> : <Login />}
      </div>
   );
}

export default App;
