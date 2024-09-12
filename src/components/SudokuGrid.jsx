import React from "react"
import {useState} from "react";
import "./SudokuGrid.css"
import Solve from "./Solve";

export default function SudokuGrid(){
    const iniBoard=Array(9).fill().map(()=>Array(9).fill(''));
    const [board,setBoard]=useState(iniBoard);

    const handleInputChange=(row,col,val)=>{
        let newBoard=[...board];
        newBoard[row][col]=val;
        setBoard(newBoard);
    }

    const handleInputClear=()=>{
        setBoard(iniBoard);
    }

    return(
      <div className="sudokuGrid">
        {board.map((row,rowIndex)=>(
            <div key={rowIndex} className="sudokuRow">
                {row.map((value,colIndex)=>(
                    <input type="text" key={colIndex} value={value}  maxLength="1" 
                     onChange={(e)=>handleInputChange(rowIndex,colIndex,e.target.value)}
                     className="sudokuCell"
                     />
                ))}
            </div>
        ))}
        <button onClick={handleInputClear} className="clearBtn">Clear</button>
        <Solve board={board} setBoard={setBoard} />
      </div>  
    );
};