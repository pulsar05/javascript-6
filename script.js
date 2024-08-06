const cells = document.querySelectorAll('.cell');
const statusTextInput = document.getElementById('statusText');
const btn = document.getElementById('restartBtn');
const winconditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options = ["","","","","","","","",""];
let currentPlayer = 'x';
let running = false;


initializeGame();

function initializeGame(){

    cells.forEach(cell => cell.addEventListener("click",cellClicked));
    restartBtn.addEventListener("click",restartGame);
    statusTextInput.textContent =`${currentPlayer}'s turn`;
    running = true;

}

function cellClicked(){

    const cellIndex = this.getAttribute('cellIndex');
    if(options[cellIndex] != "" || !running){
        return;

    }
    updateCell(this,cellIndex);
    checkWinner();
    

}

function updateCell(cell,index){
     options[index] = currentPlayer;
     cell.textContent = currentPlayer;
}


function changePlayer(){
    currentPlayer = (currentPlayer == "x") ? "o": "x";
    statusTextInput.textContent = `${currentPlayer}'s turn `;

}


function checkWinner(){
    let roundWon = false;
     for(let i=0; i<winconditions.length;i++ ){
        const condition = winconditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;

        }
     }
     if(roundWon){
        statusTextInput.textContent = `${currentPlayer} wins!`;
        running = false;
     }
     else if(!options.includes("")){
        statusTextInput.textContent = `Draw !`;
        running = false;
     }
     else{
        changePlayer();
     }

}

function restartGame(){
    currentPlayer = "x";
    options = ["","","","","","","","",""]; 
    statusTextInput.textContent = `${currentPlayer}' s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;

}