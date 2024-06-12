import React, { useState } from "react";
import axios from "axios";
import styles from "./Contact.module.scss";
import Background from "../../assets/images/contactBackgroundImage.jpg";
import Button from "../../Components/GeneralButton/Button";

const Contact = () => {
  const [inputJson, setInputJson] = useState(
    new Map([
      ["emri", ""],
      ["mbiemri", ""],
      ["email", ""],
      ["subjekti", ""],
      ["mesazhi", ""],
    ])
  );

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const updateValue = (key, input) => {
    input.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
    const updatedJson = new Map(inputJson);
    updatedJson.set(key, input.target.value);
    setInputJson(updatedJson);
  };

  const buttonPress = async () => {
    let checkPassed = true;

    if (inputJson.get("emri") === "") {
      checkPassed = false;
      document.getElementById("EmriEntry").style.borderColor = "#bf0000";
    }

    if (
      inputJson.get("mbiemri") === "" ||
      /\s/g.test(inputJson.get("mbiemri"))
    ) {
      checkPassed = false;
      document.getElementById("MbiemriEntry").style.borderColor = "#bf0000";
    }

    if (
      inputJson.get("email") === "" ||
      !validateEmail(inputJson.get("email"))
    ) {
      checkPassed = false;
      document.getElementById("EmailEntry").style.borderColor = "#bf0000";
    }

    if (inputJson.get("subjekti") === "") {
      checkPassed = false;
      document.getElementById("SubjektiEntry").style.borderColor = "#bf0000";
    }

    if (inputJson.get("mesazhi") === "") {
      checkPassed = false;
      document.getElementById("MesazhiEntry").style.borderColor = "#bf0000";
    }

    if (checkPassed) {
      try {
        const response = await axios.post(
          "https://vinarci-backend.onrender.com/api/contact-forms",
          {
            data: Object.fromEntries(inputJson),
          }
        );
        const responseMail = await axios.post(
          "https://vinarci-backend.onrender.com/api/sendForm",
          {
            data: Object.fromEntries(inputJson),
          }
        );

        if (response.status === 200 && responseMail.status === 200) {
          console.log("check passed, goto next page");
          window.open("./thank-you", "_self");
        } else {
          console.error("Error submitting form");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div className={styles.contactWrapper}>
      <img src={Background} alt="background img" />
      <div className={styles.backdrop} />
      <div className={styles.contactPage}>
        <div className={styles.information}>
          <h1>Contact Us</h1>
          <div className={styles.contactInformation}>
            <a href="tel:+383 49 131-423">
              <span>Tel:</span> +383 49 131-423
            </a>
            <p>
              <span>Instragram:</span>{" "}
              <a
                target="_blank"
                href="https://www.instagram.com/adelinavinarci_dresses/?hl=en"
              >
                @adelinavinarci_dresses
              </a>
              <br />
              <a
                target="_blank"
                href="https://www.instagram.com/adelinavinarci_makeup/"
              >
                {" "}
                @adelinavinarci_makeup
              </a>
            </p>
            <p>
              <span>Facebook:</span>{" "}
              <a target="_blank" href="https://www.facebook.com/thureclothes">
                Adelina Vinarci Dresses
              </a>
            </p>
          </div>
        </div>
        <div className={styles.entriesWrapper}>
          <div className={styles.entries}>
            <div className={styles.namesEntries}>
              <input
                value={inputJson.get("emri")}
                id="EmriEntry"
                placeholder="First Name"
                onChange={(e) => updateValue("emri", e)}
              />
              <input
                value={inputJson.get("mbiemri")}
                id="MbiemriEntry"
                placeholder="Last Name"
                onChange={(e) => updateValue("mbiemri", e)}
              />
            </div>
            <input
              value={inputJson.get("email")}
              id="EmailEntry"
              placeholder="E-mail"
              onChange={(e) => updateValue("email", e)}
            />
            <input
              value={inputJson.get("subjekti")}
              id="SubjektiEntry"
              placeholder="Subject"
              onChange={(e) => updateValue("subjekti", e)}
            />
            <textarea
              value={inputJson.get("mesazhi")}
              id="MesazhiEntry"
              className={styles.messageEntry}
              placeholder="Message..."
              onChange={(e) => updateValue("mesazhi", e)}
            />
            <div className={styles.buttonWrapper}>
              <Button text="Send message" onClick={buttonPress} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
