import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AdminPage, HomePage, MainPage } from "./pages";
import { ProductContext } from "./contexts";
import ProductContextProvider from "./contexts/ProductContext/ProductContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ProductContextProvider>
    <RouterProvider
      router={router}
      // fallbackElement={<BigSpinner />}
    />
  </ProductContextProvider>
);
