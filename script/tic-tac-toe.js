
function sumbitPlayer(divNo) {
    var pl1 = document.getElementById("div" + divNo).children;
    var node = document.createElement("p");
    var name = pl1[0].value;
    node.innerHTML = "Player " + divNo + " : " + name;
    pl1[0].remove();
    pl1[0].remove();
    document.getElementById("div" + divNo).appendChild(node);
    return name;
}
function submitPlayerOne() {
    var name = sumbitPlayer(1);
    player1.name = name;
}

function submitPlayerTwo() {
    var name = sumbitPlayer(2);
    player2.name = name;
}

const Player = function (name, sig) {
    var name = name;
    var score = 0;
    var sig = sig;
    const sayName = () => { console.log("Name : " + name) }
    const addMarkAt = (mark1, array1, posx, posy) => {
        array1[posx][posy] = mark1;
    }
    return { name, score, sayName, addMarkAt, sig }
}

const GameBoard = function () {
    const fill = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]
    const printBoard = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                console.log(fill[i][j] + " ")
            }
            console.log();
        }
    }

    const renderBoard = () => {
        count = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                document.getElementsByTagName("td")[count++].innerText = fill[i][j];
            }
        }
    }

    return { fill, printBoard, renderBoard }
}


var game = GameBoard();
var player1 = Player("Player 1");
var player2 = Player("Player 2");
game.renderBoard();


const GameMechanics = function () {
    var mark = "X";
    var timesPlayed = 0;

    var node = document.getElementById("turn");
    node.innerHTML = player1.name + "'s turn";
    const clickMechanics = () => {
        var temp = document.getElementsByTagName("td");
        for (let i = 0; i < 9; i++) {
            temp[i].onclick = () => {
                if (game.fill[Math.floor(i / 3)][i % 3] == " ") {

                    if (mark == "X") {
                        game.fill[Math.floor(i / 3)][i % 3] = mark;
                        game.renderBoard();
                        if (checkGameOver(mark, Math.floor(i / 3), i % 3) ==false){
                            timesPlayed++;
                        }
                        mark = "O";
                        node.innerHTML = player2.name + "'s turn";

                    }
                    else {
                        game.fill[Math.floor(i / 3)][i % 3] = mark;
                        game.renderBoard();
                        if (checkGameOver(mark, Math.floor(i / 3), i % 3)==false){
                            timesPlayed++;
                        }
                        mark = "X";
                        node.innerHTML = player1.name + "'s turn";

                    }
                }
                if (timesPlayed == 9) {
                    timesPlayed = 0;
                    document.getElementById("greetings").innerHTML = " Its a tie!";
                    document.getElementById("greetings").style.visibility = "visible";
                    console.log(mark + " is victorious");
                    setTimeout(() => {
                        document.getElementById("greetings").style.visibility = "";
                    }, 2000);
                    gameReset();

                }
            };
        }
    }


    const checkGameOver = (mark, x, y) => {
        matchRow = 0;
        for (let i = 0; i < 3; i++) {
            if (game.fill[x][i] == mark) {
                matchRow += 1;
            }
        }
        matchCol = 0;

        for (let i = 0; i < 3; i++) {
            if (game.fill[i][y] == mark) {
                matchCol += 1;
            }
        }

        matchDia = 0;
        if (x == y) {


            for (let i = 0; i < 3; i++) {
                if (game.fill[i][i] == mark) {
                    matchDia += 1;
                }
            }
        }
        matchRivDia = 0;
        if (Math.abs(x - y) >= 2) {

            for (let i = 0; i < 3; i++) {
                if (game.fill[2 - i][i] == mark) {
                    matchRivDia += 1;
                }
            }
        }

        if (matchCol > 2 || matchDia > 2 || matchRow > 2 || matchRivDia > 2) {
            var name = player2.name;
            if (mark == "X") {
                name = player1.name;
            }
            timesPlayed = 0;
            document.getElementById("greetings").innerHTML = name + " won!";
            document.getElementById("greetings").style.visibility = "visible";
            console.log(mark + " is victorious");
            setTimeout(() => {
                document.getElementById("greetings").style.visibility = "";
            }, 2000);
            gameReset();
            return true;

        }
        return false;


    }
    const gameReset = () => {
        setTimeout(() => {


            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    game.fill[i][j] = " ";
                }
            }
            game.renderBoard();
        }, 2000);
    }

    return { clickMechanics, mark }
};

gameMech = GameMechanics();
gameMech.clickMechanics();
