let player1;
let player2;

const Player = (name, symbol) => {
    let chance = true;
    let score = 0;
    const getChance = () => chance;
    const setChance = (ch) => chance = ch;
    const resetScore = () => score = 0;
    const updateScore = () => ++score;
    return { name, symbol, getChance, setChance, updateScore, resetScore };
};

const gameBoard = (function () {
    let arr = new Array(9);
    arr.fill('');
    const getArray = () => arr;
    const setArray = (i, value) => arr[i] = value;
    const resetArray = () => arr.fill('');
    const getInfo = function () {
        const form = document.querySelector('form');
        window.onclick = function (event) {
            const modal = document.querySelector('.modal');
            if (event.target == modal) {
                modal.classList.add('submitted');
                modal.classList.remove('notsubmitted'); 
            }
        }
        form.onsubmit = function (e) {
            e.preventDefault();
            player1 = Player(form.children[0].value, 'X');
            player2 = Player(form.children[1].value, 'O');
            const playerone = document.querySelector('.playerone');
            const playertwo = document.querySelector('.playertwo');
            playerone.children[1].innerText = player1.name;
            playertwo.children[1].innerText = player2.name;
            const modal = document.querySelector('.modal');
            modal.classList.remove('notsubmitted');
            modal.classList.add('submitted');
        }
    }
    return { getArray, setArray, resetArray, getInfo, player1, player2 };
})();

const displayController = (function reset() {
    const container = document.querySelector('.container');
    const grid = document.createElement('div');
    grid.classList.add('grid');
    const playertwo = document.querySelector('.playertwo');
    container.insertBefore(grid, playertwo);

    for (let i = 0; i < 9; i++) {
        const grid_element = document.createElement('div');
        grid.append(grid_element);
        grid_element.classList.add('grid-element');
        grid_element.setAttribute('data-value', i);
        grid_element.innerText = gameBoard.getArray()[i];
    }
    return { reset }
})();



const addMark = function () {
    const reset = document.querySelector('#reset');
    reset.onclick = function () {
        gameBoard.resetArray();
        const grid = document.querySelector('.grid');
        grid.parentElement.removeChild(grid);
        displayController.reset();
        player1.setChance(true);
        addMark();
    }
    const grid_elements = document.querySelectorAll('.grid-element');
    let count = 0;
    for (let grid_element of grid_elements) {
        grid_element.addEventListener('click', function () {
            let data_value = grid_element.getAttribute('data-value');

            if (player1.getChance() && grid_element.innerText == '') {
                grid_element.innerText = player1.symbol;
                gameBoard.setArray(data_value, player1.symbol);
                player1.setChance(false);
                player2.setChance(true);
                count++;
            }
            else if (player2.getChance() && grid_element.innerText == '') {
                grid_element.innerText = player2.symbol;
                gameBoard.setArray(data_value, player2.symbol);
                player2.setChance(false);
                player1.setChance(true);
                count++;
            }
            checkWinCondition(count);
        })
    }
}

const checkWinCondition = function (count) {
    const arr = gameBoard.getArray();
    let conditionList = new Array(8);
    condition0 = arr[0] + arr[1] + arr[2];
    condition1 = arr[3] + arr[4] + arr[5];
    condition2 = arr[6] + arr[7] + arr[8];
    condition3 = arr[0] + arr[3] + arr[6];
    condition4 = arr[1] + arr[4] + arr[7];
    condition5 = arr[2] + arr[5] + arr[8];
    condition6 = arr[0] + arr[4] + arr[8];
    condition7 = arr[2] + arr[4] + arr[6];
    conditionList = [condition0, condition1, condition2, condition3, condition4, condition5, condition6, condition7];
    for (let condition of conditionList) {
        if (condition == 'XXX' || condition == 'OOO') {
            if (condition[0] == 'X') {
                window.alert(player1.name + " won!");
                const playerone_score = document.querySelector('#playerone_score');
                playerone_score.innerText = player1.updateScore();
            }
            else {
                const playertwo_score = document.querySelector('#playertwo_score');
                playertwo_score.innerText = player2.updateScore();
                window.alert(player2.name + " won!");
            }

            gameBoard.resetArray();
            const grid = document.querySelector('.grid');
            grid.parentElement.removeChild(grid);
            displayController.reset();
            player1.setChance(true);
            addMark();
            return;
        }
    }
    if (count == 9) {
        window.alert('Draw!');
        gameBoard.resetArray();
        const grid = document.querySelector('.grid');
        grid.parentElement.removeChild(grid);
        displayController.reset();
        player1.setChance(true);
        addMark();

    }
}



gameBoard.getInfo();
addMark();
