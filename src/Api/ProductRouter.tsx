import { Routes, Route } from "react-router-dom";
import { Products as ProductsList } from "../modules/Products/views/index";
import { ProductDetails } from "../modules/Products/views/ProductDetails";

export const ProductRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/:productId" element={<ProductDetails />} />
        </Routes>
    );
};
