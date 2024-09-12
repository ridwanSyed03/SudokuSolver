import React from "react"
import {useState} from "react"

export default function Solve({board,setBoard}){  

    const[timeTaken,setTimeTaken]=useState(null);

    const isValid = (board, row, col, num) => {
        // Check horizontally
        for (let j = 0; j < 9; j++) {
          if (j !== col && board[row][j] === num) return false;
        }
      
        // Check vertically
        for (let i = 0; i < 9; i++) {
          if (i !== row && board[i][col] === num) return false;
        }
      
        // Check the 3x3 grid
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
          for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === num && (i !== row || j !== col)) return false;
          }
        }
      
        return true;
      };
      
      // Function to check if the current Sudoku board is valid
      const isValidBoard = (board) => {
        for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
            if (board[row][col] !== '') {
              const temp = board[row][col];
              board[row][col] = ''; // Temporarily remove the number
              if (!isValid(board, row, col, temp)) {
                board[row][col] = temp; // Restore if not valid
                return false;
              }
              board[row][col] = temp; // Restore the number
            }
          }
        }
        return true;
      };
      
      // Backtracking function to solve the Sudoku
      const solveSudoku = (board, row = 0, col = 0) => {
        if (row === 9) return true; // Solved the board when row reaches 9
        let nextRow = row, nextCol = col + 1;
        if (nextCol === 9) {
          nextRow = row + 1;
          nextCol = 0;
        }
      
        if (board[row][col] !== '') {
          return solveSudoku(board, nextRow, nextCol); // Skip filled cells
        }
      
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num.toString())) {
            board[row][col] = num.toString(); // Place the number
            if (solveSudoku(board, nextRow, nextCol)) return true;
            board[row][col] = ''; // Backtrack if it doesn't lead to a solution
          }
        }
      };
      
      const handleSolve = () => {
        const newBoard = [...board];

        const startTime=Date.now();

        if(isValidBoard(newBoard)){
            solveSudoku(newBoard);
            setBoard(newBoard);
        }
        else{
            alert("The given Sudoku is inValid");
        }

        const endTime=Date.now();
        const time=endTime-startTime;

        setTimeTaken(time);
        
      };
      
    return(
        <div className="Grid">
            
            <button onClick={handleSolve}  >Solve</button>
            <div>{timeTaken !== null && <h3>Time taken: {timeTaken} ms</h3>}</div>
        </div>
    )
}