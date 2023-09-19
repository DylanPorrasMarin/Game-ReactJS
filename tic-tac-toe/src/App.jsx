/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import confetti from 'canvas-confetti'
import { Square } from "./components/Square"
import { TURNS, WINNER_COMBOS } from "./constants"
import { checkWinner, checkEndGame } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"
import { saveGameToStorage, resetGameStorage } from "./logic/storage"

function App() {

  const [board, setBoard] = useState(()=>{

    const  boardFromStorage = window.localStorage.getItem('board')

    if(boardFromStorage) return JSON.parse(boardFromStorage)

    return Array(9).fill(null)

  })

  const [turn, setTurn]= useState(()=>{

    const turnFromStorage = window.localStorage.getItem('turn')
    
    return turnFromStorage ?? TURNS.X

  })

  const [winner, setWinner]= useState(null) //NUll no hay ganador, false hay un empate, true como ganador


  const resetGame =()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()

  }



  const updateBoard = (index)=>{

    //Validar que no se sobreescriba el indice en el board, es decir que se ponga una x donde ya hay una o
    if(board[index] || winner) return

    //Actualizar el tablero
    //Se hace una copia del array con el spread diciendo que agregue todo lo que tenga el board al nuevo array que es el newBoard de esta manera [...board] ya que los useStes son inmutables
    //Ya como es inmutable el estado se debe simepre crear una copia del board para cambiarle el estado, esto siemrpe se hace ya sea un objeto, array o lo que sea que teng un estado
    const newBoard = [...board]
    newBoard[index]= turn
    setBoard(newBoard)

    //Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Guardar partida
    saveGameToStorage({
      board: newBoard, 
      turn: newTurn
    })

    //revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }

  }

  //El useeffect se ejecuta cada vez que se ejecuta el componenete, si no hace poir medio de dependdencias y espeficiar cuando se tiene que ejecutar
  useEffect(()=>{
    console.log('useEffect')
  }, [turn, board])

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
       {
        board.map((_, index)=>{
          return(
            <Square key={index} index={index} updateBoard={updateBoard}>
             {board[index]}
            </Square>
          )
        })
       }
      </section>

      <section className="turn">
      <Square isSelected={turn === TURNS.X}>
        {TURNS.X}
     </Square>

     <Square isSelected={turn === TURNS.O}>
        {TURNS.O}
     </Square>
      </section>

    <WinnerModal resetGame={resetGame} winner={winner}/>

    </main>
  )
}

export default App
