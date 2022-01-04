import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "../Menu/Layout";
import EntityPage from "../../pages/EntityPage";
import EntitiesPage from "../../pages/EntitiesPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/entities" exact component={EntitiesPage} />
          <Route path="/entities/:id" exact component={EntityPage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
