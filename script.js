const playerE1 = document.getElementById('player-1');
const playerE2 = document.getElementById('player-2');
const btnE1 = document.getElementById('submit');
const boardE1 = document.getElementById('tic-tac-toe');
let currentPlayer="X";
let gameActive=false;
let gameBoard=["","","","","","","","",""];

btnE1.addEventListener('click', () => {
	const player1=playerE1.value || 'player-1';
	const player2=playerE2.value || 'player-2';

    
    // Clear existing content before adding new elements
    boardE1.innerHTML = "";

    var h1 = document.createElement('h1');
    h1.textContent = "Tic Tac Toe";

    var message = document.createElement('div');
    message.classList.add('message');
    message.textContent = `${player1} (X) starts!`;

    boardE1.appendChild(h1);
    boardE1.appendChild(message);

    var board = document.createElement('div');
    board.classList.add('board');

    // Create 9 grid cells dynamically
    for (let i = 1; i <=9; i++) {
        var grid = document.createElement('div');
        grid.classList.add(`cell`); // Optional: for additional styling
		grid.dataset.index = i - 1;
        board.appendChild(grid);
    }

    boardE1.appendChild(board);
	currentPlayer="X";
	gameActive=true;
	gameBoard=["","","","","","","","",""];
	board.addEventListener('click',(event)=>{
		const clicked_cell=event.target;
		const clicked_index=clicked_cell.dataset.index;
		if(clicked_cell.textContent==="" && clicked_cell.classList.contains("cell")){
			clicked_cell.textContent=currentPlayer;
			gameBoard[clicked_index]=currentPlayer;
		}
		if(checkWins()){
			message.textContent=`${currentPlayer==="X"?player1:player2} congratulations you won! `;
			gameActive=false;
			return;
		}
		if(!gameBoard.includes("")){
			message.textContent="It's a Draw! 😐";
			gameActive=false;
			return;
		}
		if(currentPlayer==='X'){
			currentPlayer="O";
		}else{
			currentPlayer="X";
		}
		message.textContent=`${currentPlayer === "X" ? player1 : player2}'s Turn`
	})
});
function checkWins(){
	const win_possibilities=[
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] //Diagonals
	]
	return win_possibilities.some(pattern=>{
		const [a,b,c]=pattern; //Destructuring
		return gameBoard[a] && gameBoard[a]===gameBoard[b] && gameBoard[a]===gameBoard[c];
	})
}