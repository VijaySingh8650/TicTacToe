import React, { useState, useRef } from "react";
import styles from "./style/app.module.css";
import Button from "./common-components/button";
import axios from "axios";

let boxArr = new Array(9).fill(1);
let defaultArr = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

const App = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(""); // to select the symbol
  const [defaultSymbol, setdefaultSymbol] = useState(""); // to select the symbol
  const [winner, setWinner] = useState(""); // to select the winner

  const ref1 = useRef(""); // it doesn't re-render the component

  //select symbol
  const symbolSelection = (symbol) => {
    setSelectedSymbol(symbol);
    setdefaultSymbol(symbol === "O" ? "X" : "O");
  };

  const clickOnBox = (e) => {
    let name = e.target.getAttribute("name");
    getSymbol(name, selectedSymbol);

    if(calculateTheWinner()){
      return;
    }

    callToComputer();
    
  };

  const callToComputer = async () => {
    try {
      let response = await axios.post(
        "https://hiring-react-assignment.vercel.app/api/bot",
        [null, "X", "O", null, "X", "O", "X", "O", null],
        {
          "Content-Type": "application/json",
        }
      );

      getSymbol(response?.data?.toString(), defaultSymbol);
      if(calculateTheWinner()){
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSymbol = (name, symbol, firstBox, secondBox, thirdBox) => {

    ref1.current.querySelectorAll("div").forEach((item) => {
      // to highlight the winning sequence
      if(firstBox && secondBox && thirdBox){
        item.getAttribute("name") === firstBox.toString() && (item.style.border = "2px solid #6558f5");
        item.getAttribute("name") === secondBox.toString() && (item.style.border = "2px solid #6558f5");
        item.getAttribute("name") === thirdBox.toString() && (item.style.border = "2px solid #6558f5");
      }

      else if(item.getAttribute("name") === name) {
        item.innerText = symbol;
        defaultArr[Number(name)-1]= symbol;
      }
    });

    

  };

  const calculateTheWinner = () => {
   
      return (winnerFun(0, 1, 2) ||
      winnerFun(3, 4, 5) ||
      winnerFun(6, 7, 8) ||
      winnerFun(0, 3, 6) ||
      winnerFun(1, 4, 7) ||
      winnerFun(2, 5, 8) ||
      winnerFun(0, 4, 8) ||
      winnerFun(2, 4, 6));

  };


  const winnerFun = (i,j,k) =>{
    if(defaultArr[i]!==null && defaultArr[i]===defaultArr[j] && defaultArr[i]===defaultArr[k]){
       setWinner(defaultArr[i]);
       getSymbol("", "", i+1, j+1, k+1);
       return true;
    }
    return false;
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <h1 className={styles.header}>Let's Play Tic-Tac-Toe</h1>

      {
        winner &&  (winner === selectedSymbol ? <p className={styles.winner}>You Won</p> : <p className={styles.winner}>Computer won</p>)
      }

      {/* buttons */}
      <div className={styles.buttons}>
        <div className={styles.btnWithText}>
          <p>
            {selectedSymbol && (selectedSymbol === "X" ? "You" : "Computer")}
          </p>
          <Button
            selectedSymbol={selectedSymbol}
            symbolSelection={symbolSelection}
          >
            X
          </Button>
        </div>

        <div className={styles.btnWithText}>
          <p>
            {selectedSymbol && (selectedSymbol === "O" ? "You" : "Computer")}
          </p>
          <Button
            selectedSymbol={selectedSymbol}
            symbolSelection={symbolSelection}
          >
            O
          </Button>
        </div>
      </div>

      {/* Boxes */}
      {selectedSymbol && (
        <div className={styles.boxContainer}>
          <div ref={ref1} onClick={(e) => clickOnBox(e)}>
            {boxArr?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={styles.boxes}
                  name={index + 1}
                ></div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
