const min = document.getElementById("min");
const max = document.getElementById("max");
const generateBtn = document.getElementById("generateBtn");
const answer = document.getElementById("answer");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

generateBtn.addEventListener("click", () => {

    const minValue = parseInt(min.value);
    const maxValue = parseInt(max.value);

    if (isNaN(minValue) || isNaN(maxValue)) {
        alert("Please enter both numbers.");
        return;
    }

    if (minValue > maxValue) {
        alert("Minimum number cannot be greater than the maximum number.");
        return;
    }

    const randomNumber =
        Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

    answer.textContent = randomNumber;

});

copyBtn.addEventListener("click", () => {

    if (answer.textContent === "0") {
        alert("Generate a number first!");
        return;
    }

    navigator.clipboard.writeText(answer.textContent);

    copyBtn.textContent = "✅ Copied!";

    setTimeout(() => {
        copyBtn.textContent = "📋 Copy";
    }, 2000);

});

clearBtn.addEventListener("click", () => {

    min.value = "";
    max.value = "";
    answer.textContent = "0";

});