let gameTable = document.querySelector('#gameTable');
let activePlayer1 = document.querySelector('#playerOne');
let activePlayer2 = document.querySelector('#playerTwo');
let button = document.querySelector('#button');
let currentPlayer = activePlayer1; // Initialize with player 1

button.addEventListener("click", function () {
    resetGame()  // Reset game after button clicking
});

function switchPlayer() {
    activePlayer1.classList.remove('activePlayer1');
    activePlayer2.classList.remove('activePlayer2');

    if (currentPlayer === activePlayer1) {
        currentPlayer = activePlayer2;
    } else {
        currentPlayer = activePlayer1;
    }

    currentPlayer.classList.add(currentPlayer === activePlayer1 ? 'activePlayer1' : 'activePlayer2');  //If the condition is true (currentPlayer === activePlayer1), then the expression evaluates to the string 'activePlayer1'. If the condition is false, then the expression evaluates to the string 'activePlayer2'.
}

//Function checking wining line
function checkLine(cell1, cell2, cell3, className) {
    if (cell1.textContent !== '' && cell2.textContent !== '' && cell3.textContent !== '') {
        return cell1.classList.contains(className) && cell2.classList.contains(className) && cell3.classList.contains(className);
    }  //If cells are not empty and have the same class return true
    return false;  //else return false
}

function resetGame() {
    const cells = gameTable.querySelectorAll("td");

    for (const i = 0; i < cells.length; i++) {
        cells[i].classList.remove("clickedRed", "clickedBlue");
        cells[i].textContent = '';
    }
}

function isDraw() {
    const cells = gameTable.querySelectorAll("td");
    return Array.from(cells).every(cell => cell.textContent === 'X' || cell.textContent === 'O');  //If all cells are checked function return true to rese
}

gameTable.addEventListener("click", function (event) {
    if (event.target.tagName.toLowerCase() === "td" && !event.target.classList.contains("clickedRed") && !event.target.classList.contains("clickedBlue")) {
        if (currentPlayer === activePlayer1) {
            event.target.classList.add("clickedRed");
            event.target.textContent = 'X';
        } else {
            event.target.classList.add("clickedBlue");
            event.target.textContent = 'O';
        }  //If cell is not already clicked adding class acording to current player

        setTimeout(function () {
            // Check for horizontal and vertical wins
            for (let i = 0; i < 3; i++) {
                if (checkLine(gameTable.rows[i].cells[0], gameTable.rows[i].cells[1], gameTable.rows[i].cells[2], currentPlayer === activePlayer1 ? 'clickedRed' : 'clickedBlue') ||
                    checkLine(gameTable.rows[0].cells[i], gameTable.rows[1].cells[i], gameTable.rows[2].cells[i], currentPlayer === activePlayer1 ? 'clickedRed' : 'clickedBlue')) {
                    Swal.fire({
                        title: currentPlayer.textContent + ' wins!',
                        buttons: {
                            confirm: {
                                text: "OK",
                                value: true,
                                visible: true,
                                className: "swal-button",
                                closeModal: true,
                            },
                        },
                        //Reset game after clicking ok
                    }).then((value) => {
                        if (value) {
                            resetGame();
                        }
                    })
                }
            }
            // Check for diagonal wins
            if (checkLine(gameTable.rows[0].cells[0], gameTable.rows[1].cells[1], gameTable.rows[2].cells[2], currentPlayer === activePlayer1 ? 'clickedRed' : 'clickedBlue') ||
                checkLine(gameTable.rows[0].cells[2], gameTable.rows[1].cells[1], gameTable.rows[2].cells[0], currentPlayer === activePlayer1 ? 'clickedRed' : 'clickedBlue')) {
                Swal.fire({
                    title: currentPlayer.textContent + ' wins!',
                    buttons: {
                        confirm: {
                            text: "OK",
                            value: true,
                            visible: true,
                            className: "swal-button",
                            closeModal: true,
                        },
                    },
                }).then((value) => {
                    if (value) {
                        resetGame();
                    }
                });
            } else if (isDraw()) {
                Swal.fire({
                    title: "It's a draw!",
                    buttons: {
                        confirm: {
                            text: "OK",
                            value: true,
                            visible: true,
                            className: "swal-button",
                        },
                    },
                }).then((value) => {
                    if (value) {
                        resetGame();
                    }
                });
            } else {
                // Continue with the game
                switchPlayer();
            }
        }, 0);
    }
});