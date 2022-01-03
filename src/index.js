import React from "react";
import ReactDOM from "react-dom";
import {HashRouter, Route, Switch, Redirect} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route path="/admin" render={(props) => <AdminLayout {...props} />}/>
            <Redirect to="/admin/dashboard"/>
        </Switch>
    </HashRouter>,
    document.getElementById("root")
);
