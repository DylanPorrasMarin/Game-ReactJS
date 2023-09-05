
export  const TURNS ={
    X : 'X',
    O : 'O'
  }
  
  

  //Guardar posiciones del array donde se saben que se completna las 3 x u o
export const WINNER_COMBOS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,5],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]