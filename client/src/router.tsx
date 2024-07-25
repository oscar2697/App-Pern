import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, { loader as ProductsLoader, action as UpdateAvailabilityAction } from "./views/Products";
import NewProduct, { action as NewProductAction } from "./views/NewProduct";
import EditProduct, { loader as EditProductLoader, action as editProductAction} from "./views/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Products/>,
                loader: ProductsLoader,
                action: UpdateAvailabilityAction
            },
            {
                path: 'products/new',
                element: <NewProduct/>,
                action: NewProductAction
            },
            {
                path: 'products/:id/edit',
                element: <EditProduct/>,
                loader: EditProductLoader,
                action: editProductAction
            },
            {
                path: 'products/:id/delete',
                action: deleteProductAction
            }
        ]
    }
])