const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let EMPTY = " ";
let PLAYER_ONE = "X";
let PLAYER_TWO = "O";

// On initialise une matrice de 6x7 avec des espaces vides.
var board = Array.from({ length: 6 }, () => Array(7).fill(EMPTY));
var currentPlayer = PLAYER_ONE;

let messageJoueur = "Joueur 1";

function f() {
	console.log(" 0 1 2 3 4 5 6");
	for (let row of board) {
		console.log("|" + row.join("|") + "|");
	}
	console.log("---------------");
}

function isWinningMove(board, row, col, player) {
	// Vertical check
	let count = 0;
	for (let i = -3; i <= 3; i++) {
		let r = row + i;
		let c = col;
		if (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] == player) {
			count++;
			if (count === 4) return true;
		} else {
			count = 0;
		}
	}

	// Horizontal check
	count = 0;
	for (let i = -3; i <= 3; i++) {
		let r = row;
		let c = col + i;
		if (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] == player) {
			count++;
			if (count === 4) return true;
		} else {
			count = 0;
		}
	}

	// Diagonal \ check
	count = 0;
	for (let i = -3; i <= 3; i++) {
		let r = row + i;
		let c = col + i;
		if (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] == player) {
			count++;
			if (count === 4) return true;
		} else {
			count = 0;
		}
	}

	// Diagonal / check
	count = 0;
	for (let i = -3; i <= 3; i++) {
		let r = row + i;
		let c = col - i;
		if (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] == player) {
			count++;
			if (count === 4) return true;
		} else {
			count = 0;
		}
	}

	return false;
}

function uploadHighScore() {
	// TODO : Upload high score to server
	console.log("High score uploaded!");
}

function makeMove(column) {
	if (column < 0 || column >= 7 || board[0][column] != EMPTY) {
	return false;
	}

	for (let row = 6 - 1; row >= 0; row--) {
	if (board[row][column] == EMPTY) {
	board[row][column] = currentPlayer;
	if (isWinningMove(board, row, column, currentPlayer)) {
	f();
	console.log(`Joueur ${currentPlayer} gagne!`);
	// Le jeu quitte après une victoire
	process.exit();
	}
	currentPlayer = currentPlayer == PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
	return true;
	}
	}

	return false;
}

function askMove() {
	f();
	// old version
	// rl.question(`Yo ${currentPlayer}, c'est à toi de choisir une colonne (0-6): `, (answer) => {
	rl.question(`Joueur ${currentPlayer}, choisissez une colonne (0-6): `, (answer) => {
		const column = parseInt(answer);
		if (isNaN(column) || !makeMove(column)) {
			console.log("Choix invalide. Recommencez.");
		}
		// Boucle infinie pour continuer à demander des mouvements
		askMove();
	});
}

console.log("Bienvenue à Connect 4!");
askMove();