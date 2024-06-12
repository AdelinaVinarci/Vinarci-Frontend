import React, { useEffect } from "react";
import styles from "./Header.module.scss";
import burger from "../../assets/images/burger.svg";
import { Link } from "react-router-dom";

let headerOpen = false;
let TimeoutList = [];

function headerHandler() {
  headerOpen = !headerOpen;
  let closet = document.getElementById("closet");
  let gradient = document.getElementById("headerGradient");
  let hitbox = document.getElementById("closeHitBox");
  let linksList = closet.children;

  let textLeftPos = "144px";
  if (document.documentElement.clientWidth < 811) {
    textLeftPos = "70px";
  }
  if (headerOpen) {
    hitbox.style.display = "unset";
    closet.style.left = "0px";
    gradient.style.backgroundPositionX = "0px";

    TimeoutList = [];
    const firstid = setTimeout(() => {
      for (let i = 1; i < linksList.length + 1; i++) {
        const timeoutId = setTimeout(() => {
          linksList[i - 1].style.transition = "0.333s";
          linksList[i - 1].style.left = textLeftPos;
        }, i * 100);
        TimeoutList.push(timeoutId);
      }
    }, 200);
    TimeoutList.push(firstid);
  } else {
    hitbox.style.display = "none";
    closet.style.left = "-800px";
    gradient.style.backgroundPositionX = "-1600px";
    for (let link of linksList) {
      link.style.left = "-300px";
    }
    for (let id of TimeoutList) {
      clearTimeout(id);
    }
  }
}

const Header = () => {
  //since the elements arnt created until react is finished rendering (I LVOE REACT!!!1)
  //i use a useEffect that renders once to ensure that the elements im trying to get
  //isnt undefined. Here we are placing the <p> tags inside the header, the reason for why
  //its done like this is because i dont want a client who for some reason opens the header
  //immedietly to see the text move upwards. This would only happen in the first 500ms but
  //this method ensures that cant happen
  useEffect(() => {
    let linksList = document.getElementById("closet").children;
    for (let i = 0; i < linksList.length; i++) {
      linksList[i].style.left = "-300px";
      linksList[i].style.bottom = `${-21 + (31 + 60) * (i + 1)}px`;
    }
  }, []);

  return (
    <div className={styles.header} id="header">
      <div className={styles.innerHeader}>
        <Link to={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="40"
            viewBox="0 0 44 40"
            fill="none"
          >
            <path
              d="M0 0.00366692C0.417791 0.10624 0.795275 0.227135 1.12878 0.362678C1.89839 0.685052 2.75596 1.20891 3.6685 1.9196C5.06847 2.99662 6.41712 4.63047 7.74013 6.87609C7.79144 5.5866 8.05164 4.60116 8.27886 3.97839C8.33017 3.80621 8.39247 3.65967 8.44378 3.54611C8.48776 3.43621 8.54273 3.32998 8.5867 3.24206C8.68565 3.03325 8.75895 2.90503 8.79193 2.85008C9.35265 1.87197 10.0966 1.11366 10.9945 0.611782C11.4563 0.340695 11.8814 0.142877 12.2735 0.00733383H0V0.00366692ZM19.3943 32.5194L22.711 40H22.8392L39.0561 4.85392C39.6205 3.67433 40.2582 2.69256 40.9472 1.94158C41.6655 1.14663 42.5011 0.560498 43.432 0.190501C43.6152 0.120897 43.8021 0.0549501 44 0H29.916C30.2605 0.106237 30.5647 0.234453 30.8323 0.388313C31.7668 0.937814 32.2615 1.82435 32.2615 2.95998C32.2615 3.57909 32.1076 4.30809 31.7924 5.19828C31.4883 6.01154 30.8579 7.44757 29.916 9.46241L29.6522 10.0485C29.5679 10.2354 29.4873 10.4222 29.4103 10.5761L19.3943 32.5194Z"
              fill="white"
            />
          </svg>
        </Link>
        <div className={styles.burgerAndInsta}>
          <img src={burger} alt="" onClick={headerHandler} />
          <Link
            target="_blank"
            to={"https://www.instagram.com/adelinavinarci_dresses/?hl=en"}
            className={styles.instagramLogo}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                window.open(
                  "https://www.instagram.com/adelinavinarci_dresses/"
                );
              }}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 1.66663C7.73669 1.66663 7.45335 1.67607 6.56446 1.71663C5.67724 1.75718 5.07113 1.89829 4.54113 2.1044C3.98558 2.31329 3.48169 2.64107 3.06502 3.06551C2.64125 3.4817 2.31327 3.98523 2.10391 4.54107C1.89891 5.07107 1.75724 5.67774 1.71669 6.56496C1.67669 7.45329 1.66669 7.73607 1.66669 9.99996C1.66669 12.2638 1.67613 12.5466 1.71669 13.4355C1.75724 14.3227 1.89835 14.9288 2.10446 15.4588C2.31335 16.0144 2.64113 16.5183 3.06558 16.935C3.48177 17.3587 3.9853 17.6867 4.54113 17.8961C5.07113 18.1016 5.67724 18.2427 6.56446 18.2833C7.45335 18.3238 7.73669 18.3333 10 18.3333C12.2634 18.3333 12.5467 18.3238 13.4356 18.2833C14.3228 18.2427 14.9289 18.1016 15.4589 17.8955C16.0145 17.6866 16.5184 17.3588 16.935 16.9344C17.3588 16.5182 17.6868 16.0147 17.8961 15.4588C18.1017 14.9288 18.2428 14.3227 18.2834 13.4355C18.3239 12.5466 18.3334 12.2633 18.3334 9.99996C18.3334 7.73663 18.3239 7.45329 18.2834 6.5644C18.2428 5.67718 18.1017 5.07107 17.8956 4.54107C17.6864 3.98499 17.3584 3.48125 16.9345 3.06496C16.5183 2.64119 16.0147 2.31321 15.4589 2.10385C14.9289 1.89885 14.3222 1.75718 13.435 1.71663C12.5467 1.67663 12.2639 1.66663 10 1.66663ZM10 3.16829C12.225 3.16829 12.4889 3.17663 13.3678 3.21663C14.18 3.25385 14.6211 3.38885 14.915 3.50385C15.3039 3.6544 15.5817 3.83552 15.8734 4.12663C16.165 4.41829 16.3456 4.69607 16.4961 5.08496C16.6106 5.37885 16.7461 5.81996 16.7834 6.63218C16.8234 7.51107 16.8317 7.77496 16.8317 9.99996C16.8317 12.225 16.8234 12.4888 16.7834 13.3677C16.7461 14.18 16.6111 14.6211 16.4961 14.915C16.3628 15.2769 16.1499 15.6044 15.8734 15.8733C15.6045 16.1499 15.277 16.3628 14.915 16.4961C14.6211 16.6105 14.18 16.7461 13.3678 16.7833C12.4889 16.8233 12.2256 16.8316 10 16.8316C7.77446 16.8316 7.51113 16.8233 6.63224 16.7833C5.82002 16.7461 5.37891 16.6111 5.08502 16.4961C4.72305 16.3627 4.39558 16.1499 4.12669 15.8733C3.85012 15.6044 3.63731 15.2769 3.50391 14.915C3.38946 14.6211 3.25391 14.18 3.21669 13.3677C3.17669 12.4888 3.16835 12.225 3.16835 9.99996C3.16835 7.77496 3.17669 7.51107 3.21669 6.63218C3.25391 5.81996 3.38891 5.37885 3.50391 5.08496C3.65446 4.69607 3.83558 4.41829 4.12669 4.12663C4.39554 3.84998 4.72303 3.63717 5.08502 3.50385C5.37891 3.3894 5.82002 3.25385 6.63224 3.21663C7.51113 3.17663 7.77502 3.16829 10 3.16829Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 12.7805C9.63488 12.7805 9.27331 12.7086 8.93596 12.5689C8.59861 12.4291 8.29208 12.2243 8.03388 11.9661C7.77568 11.7079 7.57087 11.4014 7.43113 11.064C7.2914 10.7267 7.21948 10.3651 7.21948 9.99996C7.21948 9.63481 7.2914 9.27324 7.43113 8.93589C7.57087 8.59853 7.77568 8.29201 8.03388 8.03381C8.29208 7.77561 8.59861 7.5708 8.93596 7.43106C9.27331 7.29133 9.63488 7.2194 10 7.2194C10.7375 7.2194 11.4447 7.51235 11.9662 8.03381C12.4876 8.55526 12.7806 9.26251 12.7806 9.99996C12.7806 10.7374 12.4876 11.4447 11.9662 11.9661C11.4447 12.4876 10.7375 12.7805 10 12.7805ZM10 5.71663C8.86402 5.71663 7.77454 6.1679 6.97126 6.97118C6.16798 7.77447 5.7167 8.86395 5.7167 9.99996C5.7167 11.136 6.16798 12.2255 6.97126 13.0287C7.77454 13.832 8.86402 14.2833 10 14.2833C11.136 14.2833 12.2255 13.832 13.0288 13.0287C13.8321 12.2255 14.2834 11.136 14.2834 9.99996C14.2834 8.86395 13.8321 7.77447 13.0288 6.97118C12.2255 6.1679 11.136 5.71663 10 5.71663ZM15.5295 5.63885C15.5295 5.90738 15.4228 6.16491 15.2329 6.35479C15.043 6.54467 14.7855 6.65135 14.517 6.65135C14.2484 6.65135 13.9909 6.54467 13.801 6.35479C13.6112 6.16491 13.5045 5.90738 13.5045 5.63885C13.5045 5.37032 13.6112 5.11278 13.801 4.9229C13.9909 4.73302 14.2484 4.62635 14.517 4.62635C14.7855 4.62635 15.043 4.73302 15.2329 4.9229C15.4228 5.11278 15.5295 5.37032 15.5295 5.63885Z"
                fill="white"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className={styles.gradient} id="headerGradient" />
      <div
        className={styles.closeHitBox}
        id="closeHitBox"
        onClick={headerHandler}
      />
      <div className={styles.closet} id="closet">
        <Link
          onClick={headerHandler}
          className={styles.closetLink}
          to={"/contact"}
        >
          Contact Us
        </Link>{" "}
        {/*order is reversed due to how they are placed*/}
        <Link
          onClick={headerHandler}
          className={styles.closetLink}
          to={"/makeup"}
        >
          Makeup
        </Link>
        <Link
          onClick={headerHandler}
          className={styles.closetLink}
          to={"/dresses"}
        >
          Dresses
        </Link>
      </div>
    </div>
  );
};

export default Header;
