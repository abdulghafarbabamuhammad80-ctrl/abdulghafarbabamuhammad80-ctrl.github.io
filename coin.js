const coin = document.getElementById("coin");
const result = document.getElementById("result");

const flipBtn = document.getElementById("flipBtn");
const resetBtn = document.getElementById("resetBtn");

const heads = document.getElementById("heads");
const tails = document.getElementById("tails");
const total = document.getElementById("total");

const history = document.getElementById("history");

let headsCount = 0;
let tailsCount = 0;
let totalCount = 0;
let flipHistory = [];

flipBtn.addEventListener("click", () => {

    const flip = Math.random() < 0.5 ? "Heads" : "Tails";

    if(flip === "Heads"){

        coin.textContent = "🙂";
        result.textContent = "Heads";
        headsCount++;

    }else{

        coin.textContent = "🦅";
        result.textContent = "Tails";
        tailsCount++;

    }

    totalCount++;

    heads.textContent = headsCount;
    tails.textContent = tailsCount;
    total.textContent = totalCount;

    flipHistory.unshift(flip);

    if(flipHistory.length > 5){
        flipHistory.pop();
    }

    history.innerHTML = "";

    flipHistory.forEach(item =>{

        const li = document.createElement("li");
        li.textContent = item;
        history.appendChild(li);

    });

});

resetBtn.addEventListener("click", () => {

    headsCount = 0;
    tailsCount = 0;
    totalCount = 0;
    flipHistory = [];

    heads.textContent = 0;
    tails.textContent = 0;
    total.textContent = 0;

    coin.textContent = "🪙";
    result.textContent = "Press Flip";

    history.innerHTML = "<li>No flips yet.</li>";

});