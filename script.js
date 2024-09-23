const players = (() => {
    const PLAYER_X_CLASS = 'x';
    const PLAYER_O_CLASS = 'circle';
    return { PLAYER_O_CLASS, PLAYER_X_CLASS };
})();

const gameboard = (() => {
    const cellElements = document.querySelectorAll('[data-cell]');
    const boardElement = document.getElementById('board');
    const winningMessageElement = document.getElementById('winningMessage');
    const restartButton = document.getElementById('restartButton');
    const winningMessageTextElement = document.getElementById('winningMessageText');
    return { cellElements, boardElement, winningMessageElement, restartButton, winningMessageTextElement };
})(); 

const gamelogic = (({ cellElements, boardElement, winningMessageElement, winningMessageTextElement, restartButton, PLAYER_X_CLASS, PLAYER_O_CLASS }) => {
    const WINNING_COMBINATIONS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let isPlayer_O_Turn = false;

    restartButton.addEventListener('click', startGame);

    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass);
        cell.innerText = currentClass === players.PLAYER_X_CLASS ? 'X' : 'O'; 
    }


    function swapTurns() {
        isPlayer_O_Turn = !isPlayer_O_Turn;
    }

    function displayTurn() {
        const { PLAYER_X_CLASS, PLAYER_O_CLASS } = players;
        boardElement.classList.remove(PLAYER_X_CLASS, PLAYER_O_CLASS);
        const currentTurnText = document.getElementById('currentTurn');
        
        if (isPlayer_O_Turn) {
            boardElement.classList.add(PLAYER_O_CLASS);
            currentTurnText.innerText = "Current Turn: Player O"; 
        } else {
            boardElement.classList.add(PLAYER_X_CLASS);
            currentTurnText.innerText = "Current Turn: Player X"; 
        }
    }


    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination => 
            combination.every(index => cellElements[index].classList.contains(currentClass))
        );
    }

    function handleCellClick(e) {
        const cell = e.target;
        const currentClass = isPlayer_O_Turn ? players.PLAYER_O_CLASS : players.PLAYER_X_CLASS;
        placeMark(cell, currentClass);
        
        if (checkWin(currentClass)) {
            endGame(false); 
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            displayTurn();
        }
    }

    function startGame() {
        isPlayer_O_Turn = false;
        cellElements.forEach(cell => {
            cell.classList.remove(PLAYER_X_CLASS, PLAYER_O_CLASS);
            cell.innerText = ''; 
            cell.removeEventListener('click', handleCellClick);
            cell.addEventListener('click', handleCellClick, { once: true });
        });
        displayTurn();
        winningMessageElement.classList.remove('show');
    }

    function endGame(draw) {
        winningMessageTextElement.innerText = draw ? "It's a draw!" : `Player with ${isPlayer_O_Turn ? "O's" : "X's"} wins!`;
        winningMessageElement.classList.add('show'); 
    }

    function isDraw() {
        return [...cellElements].every(cell => 
            cell.classList.contains(players.PLAYER_X_CLASS) || cell.classList.contains(players.PLAYER_O_CLASS)
        );
    }

    startGame();
})(gameboard, players);
