import { Route, Routes } from "react-router-dom";
import ProductsList from "./components/ProductsList";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AllProductsPage from "./pages/AllProductsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<AllProductsPage />} />
          <Route path=":id" element={<ProductDetailsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
