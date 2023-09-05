import { WINNER_COMBOS } from "../constants"

export const checkWinner=(boardToCheck)=>{

    //revisar todoas las combinaciones posibles ganadoras
    //para ver si X u O gana
    for(const combo of WINNER_COMBOS){
      const[a,b,c]= combo
      if(boardToCheck[a]&&
         boardToCheck[a] === boardToCheck[b]&&
         boardToCheck[a] === boardToCheck[c] ){
          return boardToCheck[a] //devuleve x u o
         }
    }
    // Si no hay un ganador retonar null
    return null
  }
