import { createBrowserRouter } from "react-router";
import HomePage from "../App";
import ProjectPage, { ProjectNotFound } from "../ProjectPage";
import SiteLayout from "../components/SiteLayout";

export const router = createBrowserRouter([
  {
    Component: SiteLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "work/:projectId", Component: ProjectPage },
      { path: "*", Component: ProjectNotFound },
    ],
  },
]);
