import {Login} from './components/login/Login';
import {Noteapp} from './components/noteapp/Noteapp';

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

function App() {
  return (
    <Router>
        <div className="App">
            <Switch>
                <Route exact path="/">
                    {Login().isSignedIn ? <Noteapp/> : <Login />}
                </Route>
                <Route path="/login" component={Login} />
            </Switch>
        </div>
    </Router>
  );
}

export default App;
