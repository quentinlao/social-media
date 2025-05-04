import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/MainLayout/MainLayout";
import VideoUpload from "./components/VideoUpload/VideoUpload";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [{ index: true, element: <VideoUpload /> }],
    },
  ],
  {
    basename: "/crt/",
  }
);
