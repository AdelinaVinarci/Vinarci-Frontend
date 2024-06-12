import React, { useEffect, useRef, useState } from "react";
import styles from "./DressesMain.module.scss";
import { Link } from "react-router-dom";
import { fetchProductsMain } from "../../services";

const DressesMain = () => {
  const sliderRef = useRef(null);
  const [products, setProducts] = useState();

  useEffect(() => {
    const handleWheel = (event) => {
      const slider = sliderRef.current;
      if (slider) {
        event.preventDefault();
        const scrollAmount = event.deltaY * 0.5;
        slider.scrollLeft -= scrollAmount;

        const slideItems = Array.from(slider.children);
        const slideWidth = slideItems[0]?.clientWidth;
        const slideCount = slideItems.length / 3; // Since we have cloned items
        const totalSlides = slideCount * 3;
        const initialScrollPosition = slideWidth * slideCount;

        if (slider.scrollLeft >= slideWidth * (totalSlides - slideCount)) {
          slider.scrollLeft = initialScrollPosition;
        } else if (slider.scrollLeft <= 0) {
          slider.scrollLeft = slideWidth * (slideCount - 1);
        }
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      const slideItems = Array.from(slider.children);
      const slideCount = slideItems.length;
      const slideWidth = slideItems[0]?.clientWidth;

      slideItems.forEach((item) => {
        const clone = item.cloneNode(true);
        slider.appendChild(clone);
      });
      slideItems.reverse().forEach((item) => {
        const clone = item.cloneNode(true);
        slider.insertBefore(clone, slider.firstChild);
      });

      const initialScrollPosition = slideWidth * slideCount;
      slider.scrollLeft = initialScrollPosition;

      slider.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        slider.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await fetchProductsMain();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className={styles.dressesMain}>
      <div className={styles.content}>
        <div>
          <h1>Fustanet</h1>
          <p className={styles.contentParag}>
            Lorem ipsum dolor sit amet consectetur. Et molestie sed ornare
            fermentum nunc ipsum dolor sit
          </p>
          <p className={styles.scroll}>
            SCROLL Down
            <svg
              style={{ rotate: "-90deg", marginTop: -2 }}
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <g filter="url(#filter0_b_42_409)">
                <circle
                  cx="12.5"
                  cy="12.5"
                  r="12.5"
                  transform="rotate(90 12.5 12.5)"
                  fill="white"
                  fill-opacity="0.2"
                />
              </g>
              <path
                d="M8.33342 13.6501C10.6346 13.6501 12.5001 15.4671 12.5001 17.7085M12.5001 17.7085C12.5001 15.4671 14.3656 13.6501 16.6667 13.6501M12.5001 17.7085L12.5001 7.29183"
                stroke="white"
              />
              <defs>
                <filter
                  id="filter0_b_42_409"
                  x="-7"
                  y="-7"
                  width="39"
                  height="39"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="3.5" />
                  <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_42_409"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1.backgroundBlur_42_409"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </p>
        </div>
        <Link to={"/products"}>
          SEE ALL{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="90"
            height="90"
            viewBox="0 0 90 90"
            fill="none"
          >
            <g filter="url(#filter0_b_205_61)">
              <circle
                cx="45"
                cy="45"
                r="44.5"
                stroke="white"
                strokeOpacity="0.2"
              />
            </g>
            <path
              d="M49.1397 60C49.1397 51.7158 55.681 45 63.7501 45M63.7501 45C55.681 45 49.1397 38.2843 49.1397 30M63.7501 45L26.2501 45"
              stroke="white"
            />
            <defs>
              <filter
                id="filter0_b_205_61"
                x="-7"
                y="-7"
                width="104"
                height="104"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="3.5" />
                <feComposite
                  in2="SourceAlpha"
                  operator="in"
                  result="effect1_backgroundBlur_205_61"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1.backgroundBlur_205_61"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </Link>
      </div>
      <div className={styles.slider} ref={sliderRef}>
        {products?.slice(0, 5).map((product, index) => (
          <div className={styles.wrapper} key={index}>
            <div className={styles.overlay}>
              <p className={styles.dressTitle}>{product?.title}</p>
              <div className={styles.contentWrapper}>
                <p>SIZE : {product?.category[0]?.thumbnailSize}</p>
                <p> COLOR : {product?.color}</p>
              </div>
            </div>
            <img loading="preload" src={product?.thumbnailImage?.url} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DressesMain;
