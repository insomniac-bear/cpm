import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ProjectsPage } from './pages/ProjectsPage.jsx';
import { CreateProjectPage } from './pages/CreateProject.jsx';
import { AuthPage } from './pages/AuthPage.jsx';
import { ProjectDetail } from './pages/ProjectDetail.jsx';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/projects" exact>
          <ProjectsPage />
        </Route>
        <Route path="/create" exact>
          <CreateProjectPage />
        </Route>
        <Route path="/detail/:id">
          <ProjectDetail />
        </Route>
        <Redirect to="/projects" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
};
