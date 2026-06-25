import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ShoppingList from "./pages/ShoppingList/ShoppingList.jsx";
import ListInfo from "./pages/ListInfo/ListInfo.jsx";
import Login from "./pages/LoginSignup/Login.jsx";
import Signup from "./pages/LoginSignup/Signup.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/lists",
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