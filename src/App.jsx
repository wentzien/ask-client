import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Events from "./components/events";
import ManageEvents from "./components/manageEvents";
import NotFound from "./components/notFound";
import Home from "./components/home";

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/questions/events/:id/:key" component={Events}/>
                    <Route path="/questions/events/:id" component={Events}/>
                    <Route path="/questions/admin" component={ManageEvents}/>
                    <Route path="/questions/404" component={NotFound}/>
                    <Route exact path="/questions/" component={Home}/>
                    <Route exact path="/questions/*">
                        <Redirect to="/questions/404"/>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;