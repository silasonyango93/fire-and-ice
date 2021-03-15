import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bulma/css/bulma.css";
import Home from "./views/Home";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Home} />
            {/*<Route path="/staff_home" exact component={StaffHome} />*/}
            {/*<Route path="/fee_statement" exact component={FeeStatementView} />*/}
        </div>
      </Router>
    );
  }
}

export default App;
