import React from 'react'
import styles from "./thankyou.module.scss"
import Button from '../../Components/GeneralButton/Button'

const Page404 = () => {
  return (
    <div className={styles.page}>
        <div className={styles.textWrapper}>
            <h1>Thank You!</h1>
            <p>Our team will be in touch with you shortly</p>
        </div>
        <Button text="GO HOME" optClassName={styles.button} onClick={() => {window.open("/","_self")}}/>
    </div>
  )
}

export default Page404