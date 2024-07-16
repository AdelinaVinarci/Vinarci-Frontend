import React, { useState, useEffect } from "react";
import styles from "./Makeup.module.scss";
import { fetchMakeUps } from "../../services";
import { fetchLogos } from "../../services";
import { fetchServices } from "../../services";
import Footer from "../../Components/Footer/Footer";
const Makeup = () => {
  const [makeUps, setMakeUps] = useState([]);
  const [Logos, setLogos] = useState([]);
  const [Services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMakeUps();

      setMakeUps(data);
    };

    fetchData();

    const fetchDataLogos = async () => {
      const data = await fetchLogos();

      setLogos(data);
    };

    fetchDataLogos();

    const fetchDataServices = async () => {
      const data = await fetchServices();

      setServices(data);
    };

    fetchDataServices();
  }, []);

  return (
    <div>
      <div className={styles.makeup}>
        <div className={styles.intro}>
          <h1>Makeup Studio</h1>
          <p>
            SCROLL DOWN
            <svg
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
                  fillOpacity="0.2"
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
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="3.5" />
                  <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_42_409"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_42_409"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </p>
        </div>
        <div className={styles.carousel}>
          {makeUps?.data && makeUps?.data.length > 0 ? (
            makeUps?.data.map((makeUp) => (
              <div className={styles.makeupRow} key={makeUp.id}>
                {makeUp?.makeupImages?.map((image) => (
                  <div className={styles.height600} key={image?.id}>
                    <img
                      src={image?.url}
                      alt={image?.alternativeText || "Makeup image"}
                    />
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div>No makeups found</div>
          )}
        </div>
        <p className={styles.introText}>WE USE QUALITY PRODUCTS</p>
        <div className={styles.products}>
          {Logos?.data && Logos?.data.length > 0 ? (
            Logos?.data.map((LogosData) => (
              <div className={styles.logosDiv} key={LogosData?.id}>
                {LogosData?.logos?.map((image) => (
                  <div key={image?.id}>
                    <img
                      src={image?.url}
                      alt={image?.alternativeText || "Logos image"}
                    />
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div>No makeups found</div>
          )}
        </div>
        <p className={styles.introText}>TYPES OF SERVICES</p>
        <div className={styles.services}>
          {Services?.data && Services?.data.length > 0 ? (
            Services?.data?.map((ServicesData) => (
              <div className={styles.servicesDiv} key={ServicesData?.id}>
                {ServicesData?.services?.map((service) => (
                  <p key={service?.id}>{service?.service}</p>
                ))}
              </div>
            ))
          ) : (
            <div>No makeups found</div>
          )}
        </div>
        <div className={styles.orari}>
          <p> Working hours: 08:00 - 19:00</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Makeup;
