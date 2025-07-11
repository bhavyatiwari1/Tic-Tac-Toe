const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-Info");
const newGameBtn = document.querySelector(".btn");
const newGameBtn1 = document.querySelector(".btn1");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    newGameBtn1.classList.add("active");
    gameInfo.innerText = `Current player - ${currentPlayer}`;
}

initGame();
function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
function checkGameover(){
    //    newGameBtn.classList.add("active");
    let answer = "";
    winningPosition.forEach((position) =>{
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" )
        && (gameGrid[position[0]] === gameGrid[position[1]] ) &&  (gameGrid[position[1]] ===  gameGrid[position[2]])){
            
         if(gameGrid[position[0]] === "X"){
            answer = "X";
         }
         else
            answer = "0";

            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

         
    }
    });

    if(answer !== ""){
        gameInfo.innerText = `winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        newGameBtn1.classList.remove("active");
        return;
    }

    let fillCount = 0;
    gameGrid.forEach((box) =>{
        if(box !== "")
            fillCount++;
    });
    if(fillCount === 9){
        gameInfo.innerText = "Game-Tied!!";
        newGameBtn.classList.add("active");
        newGameBtn1.classList.remove("active");
    }
    

}
function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        swapTurn();

        checkGameover();
    }
}

boxes.forEach((box,index) =>{
    box.addEventListener("click",() =>{
        handleClick(index);
    })
});


newGameBtn.addEventListener("click",initGame);
newGameBtn1.addEventListener("click",initGame);

