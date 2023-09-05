/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react"
import swal from 'sweetalert';

const TURNS ={
  X : 'X',
  O : 'O'
}



//Se pone en mayuscual porque es un componente

const Square =({children,isSelected, updateBoard, index})=>{
  const className = `square ${isSelected ? 'is-selected':''}`

  const handleClick = ()=>{
    updateBoard(index)
  }
  
  return(
   <div onClick={handleClick} className={className}>
    {children}
   </div>
  )
}

//Guardar posiciones del array donde se saben que se completna las 3 x u o
const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,5],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn]= useState(TURNS.X)

  const [winner, setWinner]= useState(null) //NUll no hay ganador, false hay un empate, true como ganador

  const checkWinner=(boardToCheck)=>{

    //revisar todoas las combinaciones posibles ganadoras
    //para ver si X u O gana
    for(const combo of WINNER_COMBOS){
      const[a,b,c]= combo
      if(boardToCheck[a]&&
         boardToCheck[a] === boardToCheck[b]&&
         boardToCheck[a] === boardToCheck[c] ){
          swal("Winner", `${boardToCheck[a]}`);
          return boardToCheck[a] //devuleve x u o
         }
    }
    // Si no hay un ganador retonar null
    return null
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

    //revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
    }

  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
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

    </main>
  )
}

export default App
