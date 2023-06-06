<p align="center">
<img src="./ReadMe-Images/Front-End-Project-banner.png">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML-E34F26.svg" alt="HTML badge" style="height: 25px;">
  <img src="https://img.shields.io/badge/CSS-1572B6.svg" alt="CSS badge" style="height: 25px;"> 
  <img src="https://img.shields.io/badge/JS-F7DF1E.svg" alt="JS badge" style="height: 25px;">
  <img src="https://img.shields.io/badge/REACT-4DB33D.svg" alt="React badge" style="height: 25px;">
</p>


# Project Name: Simple React TicTacToe Program
Experience the classic game of TicTacToe on the web with an added twist of game backtracking. Step into the past with interactive buttons that allow you to revisit previous game states, enhancing your strategic gameplay.<br /><br />


# Project ScreenShot
<img src="./ReadMe-Images/tic-tac-toe-screenshot.png" style="width:600px; height:auto" alt="Project Screenshot">
<br /><br />


# Project UI's
<img src="./ReadMe-Images/tic-tac-toe-UI.png" style="width:600px; height:auto" alt="Project Screenshot">
<br /><br />


# Project Components
<img src="./ReadMe-Images/tic-tac-toe-Component.png" style="width:600px; height:auto" alt="Project Screenshot">
<br /><br />


# Project Use-Case
<img src="./ReadMe-Images/tic-tac-toe-usecase.png" style="width:600px; height:auto" alt="Project Screenshot">
<br /><br />


# Project Description
## The GameManager Component
### What it returns
```jsx
  <Board
      xIsNext = {xIsNext}
      squares = {currentSquares}
      onPlay = {handlePlay}
  />
```
the board UI is modelled as an array such as; <br />
["X", "O", null, "X", "O", "O", null, null, null]<br />
this is called squares. <br />

the GameManger Component tells the Board Component<br />
the squares (board data) to display through the property called "squares"<br />
```jsx
squares={currentSquares}
```

since this game is play between two players,<br />
the GameManger Component tells the Board Component<br />
whose turn it is to play; "X" turn OR "O" turn<br />
through the property called "xIsNext" which is a boolean variable<br />
since GameManger Component keeps track of every move.<br />

GameManger Component keeps track of every move made on the board via a count.<br />
even count means its X turns<br />
odd count means it's O turn<br />
```jsx
xIsNext={xIsNext}
```

the onPlay property holds a function called "handlePlay"<br />
when a move is made on the board UI,<br />
the Board Component creates a new squares (board data)<br />
then throught the handlePlay function, <br />
it sends the data to the App component WHY??<br />
this is because the GameManger Component stores a history of all board data.<br />
also the GameManger Component keeps a count of the number of moves made on the board.<br />

```jsx
  <div className="game-tracker">
      <ol>{moves}</ol>
  </div>
```

one interesting functionality of the game is to be able to jump to a past move; <br />
such that you return the board state to what it ways before that move was made.<br />

beside the board UI is the game back-tracking UI<br />
which is basically a list of buttons with tags "Go to Move #1", "Go to Move #2",...<br />
when it is clicked, it changes the value of "currentSquares" <br /><br />
to the squares data before that move was made.<br />
remembe the GameManger Component stores squares data for every move that is made.<br />

basically, "moves" is a list of li tags <br />
which when cliked, moves the game to a past status.<br />
telling the board to render a past "squares" instead.<br /><br />


### What it has
```jsx
const [history, setHistory] = useState([Array(9).fill(null)])
``` 
the GameManger Component has a state called "history".<br />
this models the database for all squares data through out the game.<br />

the history state is a 2D array, since each squares is an array itself.<br />
therefore, when the board status changes, the history state would be updated.<br />

```jsx
const [currentMove, setCurrentMove] = useState(0)
``` 
remember, the GameManger Component keeps count of board moves. <br />
this is done by the "currentMove" state <br />

this is a key state for the backtracking functionality.<br />
the "currentSquares" and "xIsNext" value depends on the "currentMove" state<br />

```jsx
const xIsNext = currentMove % 2 === 0
``` 
        
remember, xIsNext is how the App Component tells the Board Component whose turn it is to play "X" or "O"<br />
it is dependent on the "currentMove" state. <br />
since 'X" is the first to play, its move would always be even<br />
that is "move 0", "move 2", "move 4" e.t.c<br />

```jsx
const currentSquares = history[currentMove]
``` 
        
remember "currentSquares" is what is passed to the boards "squares" property.<br />
this is how the GameManger Component instruct Board Component what to display.<br />

```jsx
function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove+1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length 1)
}
``` 

remember the handlePlay function is set by the GameManger Component, called by the Board Component<br />
it is the way the Board Component communicate with the GameManger Component.<br />
telling it the board status has changed, <br />
giving it data of the current board status called "nextSquares"<br />

Once GameManger Component receives this data, it updates its history and currentMove state.<br />
this in turn automatically changes the "xIsNext" and "squares" variables<br />
telling the Board Component to change display of the board UI & game-info UI.<br />

```jsx
function jumpTo(nextMove){
    setCurrentMove(nextMove)
}
``` 

the "currentMove" state is the heart of this project.<br />
the "game-info UI", "board UI" depends directly on this state<br />
via the "xIsNext" and "currentSquares" variable.<br />
since these variables are computed from this state and they control how these UI displays.<br />
therefore changing "currentMove" changes parts of the Game UI<br />

the idea of the back-tracking functionality is that<br />
we can click a button and make the board status go back to how it was before a certain move<br />
all we need to do is to change the "currentMove" state.<br />

```jsx
const moves = history.map( (squares, moves) => {
        ...
} )
``` 

remember the GameManger Component renders the game back tracking UI via the code 
```jsx
<div className="game-info">
  <ol>{moves}</ol>
</div>
```

the idea of the game backtracking UI is a list of buttons for each move<br />
such that we can change the board status to a past status <br />
before that move was made. <br />

therefore the moves variable woutl be a li tags which embodies a button element.

```jsx
const moves = history.map( (squares, moves) => {
        let description;
        if (move > 0) description = "Go to move #" + move;
        else description = "Go to game start";

        return (
                <li key={move}>
                        <button onClick={()=>jumpTo(move)}>{description}</button>
                </li>
        );
} )
``` 


