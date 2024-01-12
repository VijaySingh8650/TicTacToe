import React from 'react';
import styles from "../style/button.module.css";

const Button = ({children, symbolSelection, selectedSymbol}) => {
  return (
    <button className={styles.btn} onClick={()=>symbolSelection(children)} disabled={selectedSymbol}>
       {children}
    </button>
  )
}

export default Button
