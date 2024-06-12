import React from 'react'
import styles from "./404.module.scss"
import Button from '../../Components/GeneralButton/Button'

const Page404 = () => {
  return (
    <div className={styles.page}>
        <div className={styles.textWrapper}>
            <h1>404</h1>
            <p>The page you're looking for could not be found. Please return home.</p>
        </div>
        <Button text="GO HOME" optClassName={styles.button} onClick={() => {window.open("/","_self")}}/>
    </div>
  )
}

export default Page404