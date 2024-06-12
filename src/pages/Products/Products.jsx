import React, { useState, useEffect } from "react";
import styles from "./Products.module.scss";
import dress from "../../assets/images/dress.png";
import { fetchProducts } from "../../services";
import Footer from "../../Components/Footer/Footer";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("Show all");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAvailable, setTotalAvailable] = useState(0);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const categories = ["Show all", "Small", "Medium", "Large"];

  const fetchProductsData = async (category = "", page = 1) => {
    try {
      setLoading(true);
      let query = `&pagination[page]=${page}&pagination[pageSize]=9`;
      if (category && category !== "Show all") {
        query += `&filters[category][category][$eq]=${category}`;
      }
      const response = await fetchProducts(query);
      if (page > 1) {
        setProducts((prevProducts) => [...prevProducts, ...response.data]);
      } else {
        setProducts(response.data);
        setCategoryTotal(response.meta.pagination.total);
      }
      setCurrentPage(page);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products", error);
      setLoading(false);
    }
  };

  const fetchAllProducts = async (category = "") => {
    let query = "";
    if (category && category !== "Show all") {
      query += `&filters[category][category][$eq]=${category}`;
    }
    const response = await fetchProducts(`${query}`);
    setTotalAvailable(response.meta.pagination.total);
  };

  useEffect(() => {
    fetchAllProducts();
    fetchProductsData(selectedCategory, 1);
  }, [selectedCategory]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    fetchProductsData(selectedCategory, nextPage);
  };

  return (
    <div>
      <div className={styles.productsWrapper}>
        <div className={styles.intro}>
          <h1>Show all dresses</h1>
          <div className={styles.cats}>
            {categories.map((category) => (
              <p
                key={category}
                className={category === selectedCategory ? styles.active : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.products}>
          {products?.map((product) => (
            <a
              href={`/products/${product?.id}`}
              key={product?.id}
              className={styles.product}
            >
              <img
                src={
                  product?.dressImages ? product?.dressImages[0]?.url : dress
                }
                alt=""
              />
              <p className={styles.title}>{product?.title}</p>
              <div className={styles.attributes}>
                <p className={styles.attribute}>
                  Size:{" "}
                  {product?.category
                    ?.map((cat) => cat.thumbnailSize)
                    .join(" / ")}
                </p>
                <p className={styles.attribute}>Color: {product?.color} </p>
              </div>
            </a>
          ))}
        </div>

        {products.length < categoryTotal && (
          <div className={styles.loadMoreWrapper}>
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className={styles.loadMoreButton}
            >
              {loading ? "Loading..." : "load more"}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
