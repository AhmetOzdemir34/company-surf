import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Company from './comps/Company';
import Home from './comps/Home';
import Index from './comps/Index';
import Product from './comps/Product';
import GuardedRoute from './GuardedRoute';
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'} component={Index} />
        <GuardedRoute path={'/home'} component={Home} />
        <GuardedRoute path={'/company'} component={Company} />
        <GuardedRoute path={'/product'} component={Product} />
      </Switch>
    </Router>
  );
}

export default App;
