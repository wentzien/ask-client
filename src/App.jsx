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
                    <Route exact path="/events/:id/:key" component={Events}/>
                    <Route exact path="/events/:id" component={Events}/>
                    <Route exact path="/admin" component={ManageEvents}/>
                    <Route exact path="/404" component={NotFound}/>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/*">
                        <Redirect to="/404"/>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;