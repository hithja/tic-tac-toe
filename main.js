const prompt = require("prompt-sync")({ sigint: true });

// Checking is board null
function isBoardNull(board, pos) {
    let isBoardNull;

    let posArray = pos.split(':');

    if (board[posArray[0]-1][posArray[1]-1] == ' ') {
        isBoardNull = true;
    }
    else {
        isBoardNull = false;
    }

    return isBoardNull;
}

// Putting sym if board null
function putSym(board, sym, pos) {
    let posArray = pos.split(':');
    board[posArray[0]-1][posArray[1]-1] = sym;
    return board;
}

// Printing board
function printBoard(board) {
    let boardStr = "";
    for (let i = 0; i < board[0].length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            boardStr += `${board[i][j]} | `;
        }
        boardStr += '\n———————————\n';
    }
    return boardStr;
}

// Getting curr sym
function getCurrSym(lastSym) {
    let currSym = ':(';
    if (lastSym == 'X') {
        currSym = 'O';
    }
    else if (lastSym == 'O') {
        currSym = 'X';
    }
    else {
        console.log('incorrect symbol :(');
    }
    return currSym;
}

// Winner
function checkingWinner(board) {
    for (let i = 0; i < board.length; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== ' ') {
            return `${board[i][0]} wins!`;
        }
    }
    for (let i = 0; i < board[0].length; i++) {
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== ' ') {
            return `${board[0][i]} wins!`;
        }
    }

    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' ') {
        return `${board[0][0]} wins!`;
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== ' ') {
        return `${board[0][2]} wins!`;
    }

    for (let i = 0; i < board[0].length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === ' ') {
                return '0';
            }
        }
    }
    return 'Draw';
}

// Board
let board = [[' ', ' ', ' '],
             [' ', ' ', ' '],
             [' ', ' ', ' ']];

let currSym = 'X';

// Game loop
while (true) {
    let pos = prompt(`[${currSym}] Write position (1-3:1-3): `);

    if (pos.split(':')[0] > 3 || pos.split(':')[1] > 3 || pos.split(':')[0] < 1 || pos.split(':')[1] < 1) {
        console.log('Write correct position!');
    }
    else if (pos.toLocaleLowerCase() == 'quit') {
        process.exit(0);
    }
    else if (pos.toLocaleLowerCase() == 'reset') {
        board = [[' ', ' ', ' '],
                 [' ', ' ', ' '],
                 [' ', ' ', ' ']];
        currSym = 'X';
    }
    else {
        // Checking is board null or not
        if (isBoardNull(board, pos)) {
            // Checking for a winner
            if (checkingWinner(board) == '0') {
                board = putSym(board, currSym, pos);

                console.log(printBoard(board));
                currSym = getCurrSym(currSym);
            }
            else {
                // If someone is winning
                console.log(checkingWinner(board));
                board = [[' ', ' ', ' '],
                         [' ', ' ', ' '],
                         [' ', ' ', ' ']];
                currSym = 'X';
            }
        }
        else {
            console.log('This position is not free!');
        }
    }
}