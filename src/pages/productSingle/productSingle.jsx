import React, { useEffect, useState } from "react";
import styles from "./productsingle.module.scss";
import Button from "../../Components/GeneralButton/Button";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../services";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductSingle = () => {
  const [product, setProduct] = useState({});
  const params = useParams();

  const getProduct = async () => {
    const res = await fetchProduct(params.id);
    setProduct(res?.data);
  };

  useEffect(() => {
    getProduct();
  }, [params.id]);

  const getCategoryString = (categories) => {
    if (!categories || categories.length === 0) return "";
    return categories.map((cat) => cat.category).join(" / ");
  };

  return (
    <div className={styles.page}>
      <div className={styles.background} />
      <div className={styles.information}>
        <div className={styles.textContent}>
          <h1>{product?.title}</h1>
          <p>{product?.dressDescription}</p>
        </div>
        <div className={styles.dropdownandbuttonSpacing}>
          <div className={styles.dressInformation}>
            <div className={styles.detajetTitle}>DETAJET</div>
            <div className={styles.horizontalLine} />
            <div className={styles.dressDetajetContent}>
              <strong>Masa:</strong> {getCategoryString(product?.category)}{" "}
              <br />
              <strong>Ngjyra:</strong> {product?.color} <br />
              <strong>Instructions:</strong> {product?.instructions} <br />
              <strong>SKU:</strong> {product?.sku}
            </div>
            <div className={styles.detajetTitle}></div>
          </div>
          <Button
            text={"Contact Dealer"}
            optClassName={styles.button}
            onClick={() => {
              window.open("/contact", "_self");
            }}
          />
        </div>
      </div>
      <Swiper
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className={styles.galleryWrapper}
      >
        {product?.dressImages?.map((data, index) => (
          <SwiperSlide key={index}>
            <img src={data.url} className={styles.dressSliderImage} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSingle;
