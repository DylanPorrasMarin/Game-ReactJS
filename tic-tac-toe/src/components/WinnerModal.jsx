import { Square } from "./Square"
// eslint-disable-next-line react/prop-types
export function WinnerModal ({winner, resetGame}){
   if( winner === null) return

   const winnerText =      
   winner === false
   ?'Empate'
   :'Winner'

   return  (
        <section className="winner">
          <div className="text">
            <h2>
              { winnerText}
            </h2>

            <header>
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Start game</button>
            </footer>

          </div>

        </section>
      )

}