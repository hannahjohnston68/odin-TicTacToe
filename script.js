const cells = document.querySelectorAll('.cell'); 
const restartButton = document.querySelector('.restartButton');
const playAgainButton = document.querySelector('#playAgainButton');
const turnMessage = document.querySelector('.turnMessage');
const winningMessage = document.querySelector('.winningMessage');
const winnerSpan = document.querySelector('.winner');
const drawMessage = document.querySelector('.drawMessage'); 
const overlay = document.querySelector('.overlay'); 
const winningMessageContainer = document.querySelector('.winningMessageContainer');
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let cellOptions = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = 'X';
let gameRunning = false;

startGame(); 

function startGame() {
    cells.forEach((cell, index) => {
        cell.setAttribute('data-index', index);
        cell.addEventListener('click', cellClicked);
    });
    restartButton.addEventListener('click', restartGame);
    playAgainButton.addEventListener('click', restartGame); 
    turnMessage.textContent = `It's Player ${currentPlayer}'s turn.`; 
    gameRunning = true; 
}

function cellClicked() {
    const cellIndex = this.getAttribute('data-index');
    if (cellOptions[cellIndex] !== "" || !gameRunning) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    cellOptions[index] = currentPlayer; 
    cell.textContent = currentPlayer; 
    
    if (currentPlayer === 'X') {
        cell.classList.add('x'); 
    } else {
        cell.classList.add('o'); 
    }

    cell.classList.add('hover-disabled'); 
    changePlayer();
}

function changePlayer() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    turnMessage.textContent = `It's Player ${currentPlayer}'s turn.`;
}

function restartGame() {
    cellOptions = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('hover-disabled', 'x', 'o'); 
        cell.style.opacity = "1"; 
        cell.classList.remove('bounce'); 
    });
    currentPlayer = 'X';
    turnMessage.textContent = `It's Player ${currentPlayer}'s turn.`;
    overlay.style.display = "none"; 
    winningMessageContainer.style.display = "none"; 
    winningMessage.style.display = "none"; 
    drawMessage.style.display = "none"; 
    gameRunning = true; 
}

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (cellOptions[a] && cellOptions[a] === cellOptions[b] && cellOptions[a] === cellOptions[c]) {
            winnerSpan.textContent = cellOptions[a]; 
            overlay.style.display = "block"; 
            winningMessageContainer.style.display = "block"; 
            winningMessage.style.display = "block"; 
            drawMessage.style.display = "none"; 
            return;
        }
    }
    
    if (!cellOptions.includes("")) {
        turnMessage.textContent = "It's a draw!";
        overlay.style.display = "block"; 
        winningMessageContainer.style.display = "block";
        winningMessage.style.display = "none"; 
        drawMessage.style.display = "block"; 
        gameRunning = false; 
    }
}
