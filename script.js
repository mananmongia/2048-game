	var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var sizeInput = document.getElementById('size');
var changeSize = document.getElementById('change-size');
var scoreLabel = document.getElementById('score');
var score = 0;
var width = 500 / 4 - 6;
var cells = [];
var fontSize;
var loss = false;
startGame();
function startGame() {
    createCells();
    drawAllCells();
    pasteNewCell();
    pasteNewCell();
}
										function cell(row, coll) {
										    this.value = 0;
										    this.x = coll * width + 5 * (coll + 1);
										    this.y = row * width + 5 * (row + 1);
}
function createCells() {
    var i, j;
    for(i = 0; i < 4; i++) {
        cells[i] = [];
        for(j = 0; j < 4; j++) {
            cells[i][j] = new cell(i, j);
        }
    }
}
function drawCell(cell) {
    ctx.beginPath();
    ctx.rect(cell.x, cell.y, width, width);
    switch (cell.value){
        case 0 : ctx.fillStyle = "#bbada0";break;
        case 2 : ctx.fillStyle = "#eee4da";break;
        case 4 : ctx.fillStyle = "#ede0c8";break;
        case 8 : ctx.fillStyle = "#f2b179";break;
        case 16 : ctx.fillStyle = "#f59563";break;
        case 32 : ctx.fillStyle = "#f67c5f";break;
        case 64 : ctx.fillStyle = "#f65e3b";break;
        case 128 : ctx.fillStyle = "#edcf72";break;
        case 256 : ctx.fillStyle = "#edcc61";break;
        case 512 : ctx.fillStyle = "#edc53f";break;
        case 1024 : ctx.fillStyle = "#edc83f";break;
        case 2048 : ctx.fillStyle = "#edc93e";break;
        case 4096 : ctx.fillStyle = "#edb815";break;

    }
    ctx.fill();
    if (cell.value) {
        fontSize = width / 2;
        ctx.font = fontSize + 'px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        								ctx.fillText(cell.value, cell.x + width / 2, cell.y + width / 2 + width/7);
    }
}
function drawAllCells() {
    var i, j;
    for(i = 0; i < 4; i++) {
        for(j = 0; j < 4; j++) {
            drawCell(cells[i][j]);
        }
    }
}
document.onkeydown = function (event) {
    if (!loss) {
        if (event.keyCode === 38 || event.keyCode === 87) { moveUp();}
        else if (event.keyCode === 39 || event.keyCode === 68) {moveRight();} 
        else if (event.keyCode === 40 || event.keyCode === 83) {moveDown();} 
        else if (event.keyCode === 37 || event.keyCode === 65) {moveLeft();}
        scoreLabel.innerHTML = 'Score : ' + score;
    }
}
function finishGame() {
    canvas.style.opacity = '0.5';
    alert('kuch nahi ho sakta tujse');
    location.reload();
    loss = true;
}
function pasteNewCell() {
    var countFree = 0;
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            if(!cells[i][j].value) {
                countFree++;
            }
        }
    }
    if(!countFree) {
        finishGame();
        return;
    }
    while(true) {
        var row = Math.floor(Math.random() * 4);
        var coll = Math.floor(Math.random() * 4);
        if(!cells[row][coll].value) {
            cells[row][coll].value = 2 * Math.ceil(Math.random() * 2);
            drawAllCells();
            return;
        }
    }
}
function moveRight () {
    for(var i = 0; i < 4; i++) {
        for(var j = 2; j >= 0; j--) {
            if(cells[i][j].value) {
                var coll = j;
                while (coll + 1 < 4) {
                    if (!cells[i][coll + 1].value) {
                        cells[i][coll + 1].value = cells[i][coll].value;
                        cells[i][coll].value = 0;
                        coll++;
                    } else if (cells[i][coll].value == cells[i][coll + 1].value) {
                        cells[i][coll + 1].value *= 2;
                        score +=  cells[i][coll + 1].value;
                        cells[i][coll].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    pasteNewCell();
}
function moveLeft() {
        for(var i = 0; i < 4; i++) {
        for(var j = 1; j < 4; j++) {
            if(cells[i][j].value) {
                var coll = j;
                while (coll - 1 >= 0) {
                    if (!cells[i][coll - 1].value) {
                        cells[i][coll - 1].value = cells[i][coll].value;
                        cells[i][coll].value = 0;
                        coll--;
                    } else if (cells[i][coll].value == cells[i][coll - 1].value) {
                        cells[i][coll - 1].value *= 2;
                        score +=   cells[i][coll - 1].value;
                        cells[i][coll].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    pasteNewCell();
}
function moveUp() {
    for(var j = 0; j < 4; j++) {
        for(var i = 1; i < 4; i++) {
            if(cells[i][j].value) {
                var row = i;
                while (row > 0) {
                    if(!cells[row - 1][j].value) {
                        cells[row - 1][j].value = cells[row][j].value;
                        cells[row][j].value = 0;
                        row--;
                    } else if (cells[row][j].value == cells[row - 1][j].value) {
                        cells[row - 1][j].value *= 2;
                        score +=  cells[row - 1][j].value;
                        cells[row][j].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    pasteNewCell();
}
function moveDown() {
    for(var j = 0; j < 4; j++) {
        for(var i = 2; i >= 0; i--) {
            if(cells[i][j].value) {
                var row = i;
                while (row + 1 < 4) {
                    if (!cells[row + 1][j].value) {
                        cells[row + 1][j].value = cells[row][j].value;
                        cells[row][j].value = 0;
                        row++;
                    } else if (cells[row][j].value == cells[row + 1][j].value) {
                        cells[row + 1][j].value *= 2;
                        score +=  cells[row + 1][j].value;
                        cells[row][j].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    pasteNewCell();
}