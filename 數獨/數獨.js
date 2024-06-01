// 史上最難的數獨題目
var maze = [
    [1, 2, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 5, 0, 0, 0],
    [4, 0, 6, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 7, 8, 9, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 5, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

var grid = new Sudoku(maze); //初始化


//-------------------- 破解題目的演算法 --------------------//

//「破解」按鈕按下時執行此函式
function autoplay () {
    count = 0;
    resolve();
    // console.log('遞迴嘗試了 ' + count + ' 次！');
}

function resolve () {

    //限制遞迴次數避免網頁癱瘓
    if (count >= 50000) return;
    count++;

    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
            if (grid[y][x] == 0) {
                var arr = [];
                for (var i = 0; i < 9; i++) {
                    arr.push(grid[y][i]);
                }
                for (var f = 0; f < 9; f++) {
                    arr.push(grid[f][x]);
                }
                var offsetX = x - x % 3;
                var offsetY = y - y % 3;

                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 3; j++) {
                        arr.push(grid[offsetY + i][offsetX + j]);
                    }
                }
                // console.log(arr);
                for (var k = 1; k <= 9; k++) {
                    if (arr.indexOf(k) == -1) {
                        grid[y][x] = k;
                        var result = resolve();
                        if (result == true) {
                            return true;
                        } else {
                            grid[y][x] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}
//-------------------- 產生題目的演算法 --------------------//

//「新遊戲」按鈕按下時執行此函式
function newGame () {
    count = 0;
    clearAll();
    generator();
    randomHide();
    console.log('遞迴嘗試了 ' + count + ' 次！');
}

function generator () {
    if (count >= 50000) return;
    count++;

    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
            if (grid[y][x] == 0) {
                var arr = [];
                for (var i = 0; i < 9; i++) {
                    arr.push(grid[y][i]);
                }
                for (var f = 0; f < 9; f++) {
                    arr.push(grid[f][x]);
                }
                var offsetX = x - x % 3;
                var offsetY = y - y % 3;

                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 3; j++) {
                        arr.push(grid[offsetY + i][offsetX + j]);
                    }
                }
                // console.log(arr);
                
                var randomarr = shuffle();
                for (var k = 0; k <= 8; k++) {
                    var hasci = randomarr[k];
                    if (arr.indexOf(hasci) == -1) {
                        grid[y][x] = hasci;
                        var result = generator();
                        if (result == true) {
                            return true;
                        } else {
                            grid[y][x] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// 清空數獨
function clearAll () {
    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
            grid[y][x] = 0;
        }
    }
}

// 洗牌演算法
function shuffle() {
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (var i = 0; i < 100; i++) {
        var id1 = Math.floor(Math.random()*9);
        var id2 = Math.floor(Math.random()*9);
        var tamp = arr[id1];
        arr[id1] = arr[id2];
        arr[id2] = tamp;
    }
    return arr;
}

// 隨機挖空完整的數獨
function randomHide() {
    var cnt = 0;
    
    while(cnt < 56){
        var randX = Math.floor(Math.random()*9);
        var randY = Math.floor(Math.random()*9);
        if (grid[randY][randX] != 0) {
            grid[randY][randX] = 0;
            cnt++;
        }
        
    }
    
    
    
    
}