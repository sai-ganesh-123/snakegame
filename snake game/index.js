const playboard = document.querySelector(".play-board");
const scoreelement = document.querySelector(".score");
const highscoreelement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i")

 let foodx, foody;
 let snakex = 5,snakey =10;
 let snakebody = [];
 let gameover = false;
 let velocityx = 0 ,velocityy = 0;
 let setintervalid;
 let score =0;
 let highscore = localStorage.getItem("high-score") || 0;

 highscoreelement.innerText = `High score: ${highscore}`;

 const changefoodposition = () =>{
    foodx = Math.floor(Math.random() * 30) + 1;
    foody = Math.floor(Math.random() * 30) + 1;
}

const handlegameover = ()=>{
    clearInterval(setintervalid);
    alert("Game over ! Press oK to reply");
    location.reload();
}

const changedirection = (e) => {
    if(e.key === "ArrowUp" &&  velocityy != 1){
        velocityx = 0;
        velocityy = -1
    }
    else if(e.key === "ArrowDown" &&  velocityy != -1){
        velocityx = 0;
        velocityy = 1;
    }
    else if(e.key === "ArrowLeft" && velocityx != 1){
        velocityx = -1;
        velocityy = 0;
    }
    else if(e.key === "ArrowRight" &&  velocityx != -1){
        velocityx = 1;
        velocityy = 0;
    }
}

controls.forEach(key =>{
    key.addEventListener("click",() => changedirection({key: key.dataset.key}));
});

 const initgame = () =>{
    if(gameover) return handlegameover();
    let htmlmarkup = `<div class="food" style="grid-area: ${foody} / ${foodx}"></div>`;

    if(snakex === foodx && snakey === foody){
        changefoodposition();
        snakebody.push([foodx,foody]);
        score++;
        highscore = score >= highscore ? score : highscore;
        localStorage.setItem("high-score",highscore);
        scoreelement.innerText = `Score: ${score}`;
       
    }

   for(let i = snakebody.length -1; i > 0; i--){
    snakebody[i] = snakebody[i-1];
   }

    snakebody[0] = [snakex,snakey];

    snakex += velocityx;
    snakey += velocityy;

    if(snakex <= 0 || snakex >= 30 || snakey <= 0 || snakey >= 30){
        gameover = true;
    }
    
    for(let i = 0; i < snakebody.length; i++){
        htmlmarkup += `<div class="head" style="grid-area: ${snakebody[i][1]} / ${snakebody[i][0]}"></div>`;
        if(i !==0 && snakebody[0][1] === snakebody[i][1] && snakebody[0][0] === snakebody[i][0]){
            gameover = true;
        }
    }

   
    playboard.innerHTML = htmlmarkup;
 }

changefoodposition();
setintervalid = setInterval(initgame,125);
document.addEventListener("keydown",changedirection);