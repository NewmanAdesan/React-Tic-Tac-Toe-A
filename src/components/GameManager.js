import React, { useState } from 'react'
import Board from './Board'

function GameManager() {
    // states members
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0)


    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove]


    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
    }


    function jumpTo(nextMove) {
        setCurrentMove(nextMove)
    }


    const moves = history.map((_, move) => {
        let description;
        if (move > 0) description = "Go to move #" + move;
        else description = "Go to game start";

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });


    return (
        <div className="game">
            <div className="game-board">
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
            </div>

            <div className="game-tracker">
                <ol>{moves}</ol>
            </div>
        </div>
    )
}



export default GameManager;




// class Clock extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             date: new Date()
//         };
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Hello, World</h1>
//                 <h2>It is {this.state.date.toLocaleTimeString()}</h2>
//             </div>
//         )
//     }
// }


// root.render(<Clock />)