import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Events from "./components/events";
import NotFound from "./components/notFound";
import Home from "./components/home";

class App extends Component {
    render() {
        const sub = process.env.REACT_APP_URL_SUBPATH;
        return (
            <div>
                <Switch>
                    <Route path={sub + "/events/:id/:key"} component={Events}/>
                    <Route path={sub + "/events/:id"} component={Events}/>
                    <Route path={sub + "/404"} component={NotFound}/>
                    <Route exact path={sub + "/"} component={Home}/>
                    <Route exact path={sub + "/*"}>
                        <Redirect to={sub + "/404"}/>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;