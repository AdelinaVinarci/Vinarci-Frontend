import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./Components/Header/Header";
import Makeup from "./pages/Makeup/Makeup";
import Contact from "./pages/Contact/Contact";
import Products from "./pages/Products/Products";
import DressesMain from "./pages/DressesMain/DressesMain";
import Thankyou from "./pages/thankyou/thankyou";
import Page404 from "./pages/404/404";
import ProductSingle from "./pages/productSingle/productSingle";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/makeup" element={<Makeup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/products/:id" element={<ProductSingle />} />
        <Route path="/thank-you" element={<Thankyou />} />
        <Route path="/*" element={<Page404 />} />{" "}
        <Route path="/dresses" element={<DressesMain />} />
      </Routes>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
