import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './header';
import App from './App copy';
import Read from './readMethods'
import Write from './writeMethods'


function router() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/read" component={Read} />
        <Route path="/write" component={Write} />

      </Switch>
    </Router>
  )
}