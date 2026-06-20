import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import LoginSignup from "./pages/LoginSignup/LoginSignup.jsx";
import ShoppingList from "./pages/ShoppingList/ShoppingList.jsx";
import ListInfo from "./pages/ListInfo/ListInfo.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            // {
            //     index: true,
            //     element: <LoginSignup />
            // },
            {
                index: true,
                // path: "/lists",
                element: <ShoppingList />
            },
            {
                path: "list/:listId",
                element: < ListInfo />
            }
        ]
    }
])

export default router;