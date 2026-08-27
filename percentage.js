const calculatorType = document.getElementById("calculatorType");
const value1 = document.getElementById("value1");
const value2 = document.getElementById("value2");

const calculateBtn = document.getElementById("calculateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

const answer = document.getElementById("answer");
const label1 = document.getElementById("label1");
const label2 = document.getElementById("label2");


// ============================================================
// CALCULATE
// ============================================================

calculateBtn.addEventListener("click", () => {

    const type = calculatorType.value;

    const num1 = parseFloat(value1.value);
    const num2 = parseFloat(value2.value);

    if (isNaN(num1) || isNaN(num2)) {
        alert("Please enter both numbers.");
        return;
    }

    let result = "";

    switch (type) {

        case "percentOf":
            result =
                `${num1}% of ${num2} = ${(num1 / 100 * num2).toFixed(2)}`;
            break;


        case "whatPercent":

            if (num2 === 0) {
                alert("The total cannot be zero.");
                return;
            }

            result =
                `${num1} is ${((num1 / num2) * 100).toFixed(2)}% of ${num2}`;
            break;


        case "increase":

            result =
                `Result = ${(num1 + (num1 * num2 / 100)).toFixed(2)}`;
            break;


        case "decrease":

            result =
                `Result = ${(num1 - (num1 * num2 / 100)).toFixed(2)}`;
            break;


        case "discount": {

            const finalPrice =
                num1 - (num1 * num2 / 100);

            result =
                `Final Price = ${finalPrice.toFixed(2)}`;

            break;
        }


        case "markup": {

            const sellingPrice =
                num1 + (num1 * num2 / 100);

            result =
                `Selling Price = ${sellingPrice.toFixed(2)}`;

            break;
        }


        case "score": {

            if (num2 === 0) {
                alert("Total marks cannot be zero.");
                return;
            }

            const percent =
                (num1 / num2) * 100;

            let grade;

            if (percent >= 90) {
                grade = "A";
            } else if (percent >= 80) {
                grade = "B";
            } else if (percent >= 70) {
                grade = "C";
            } else if (percent >= 60) {
                grade = "D";
            } else {
                grade = "F";
            }

            result =
                `${percent.toFixed(2)}% (Grade ${grade})`;

            break;
        }


        case "change": {

            if (num1 === 0) {
                alert("The old value cannot be zero.");
                return;
            }

            const change =
                ((num2 - num1) / num1) * 100;

            result =
                `${change.toFixed(2)}%`;

            break;
        }
    }

    answer.textContent = result;

});


// ============================================================
// UPDATE LABELS
// ============================================================

function updateLabels() {

    switch (calculatorType.value) {

        case "percentOf":
            label1.textContent = "Percentage (%)";
            label2.textContent = "Number";
            value1.placeholder = "Enter percentage";
            value2.placeholder = "Enter number";
            break;


        case "whatPercent":
            label1.textContent = "Value";
            label2.textContent = "Total";
            value1.placeholder = "Enter value";
            value2.placeholder = "Enter total";
            break;


        case "increase":
            label1.textContent = "Original Number";
            label2.textContent = "Increase (%)";
            value1.placeholder = "Enter original number";
            value2.placeholder = "Enter percentage";
            break;


        case "decrease":
            label1.textContent = "Original Number";
            label2.textContent = "Decrease (%)";
            value1.placeholder = "Enter original number";
            value2.placeholder = "Enter percentage";
            break;


        case "discount":
            label1.textContent = "Original Price";
            label2.textContent = "Discount (%)";
            value1.placeholder = "Enter original price";
            value2.placeholder = "Enter discount";
            break;


        case "markup":
            label1.textContent = "Cost Price";
            label2.textContent = "Markup (%)";
            value1.placeholder = "Enter cost price";
            value2.placeholder = "Enter markup";
            break;


        case "score":
            label1.textContent = "Score";
            label2.textContent = "Total Marks";
            value1.placeholder = "Enter score";
            value2.placeholder = "Enter total marks";
            break;


        case "change":
            label1.textContent = "Old Value";
            label2.textContent = "New Value";
            value1.placeholder = "Enter old value";
            value2.placeholder = "Enter new value";
            break;
    }
}

calculatorType.addEventListener(
    "change",
    updateLabels
);

updateLabels();


// ============================================================
// COPY RESULT
// ============================================================

copyBtn.addEventListener("click", async () => {

    if (answer.textContent === "0") {
        alert("Nothing to copy!");
        return;
    }

    try {

        await navigator.clipboard.writeText(
            answer.textContent
        );

        copyBtn.textContent = "✅ Copied!";

        setTimeout(() => {
            copyBtn.textContent = "📋 Copy Result";
        }, 2000);

    } catch (error) {

        alert("Unable to copy the result.");
    }

});


// ============================================================
// CLEAR
// ============================================================

clearBtn.addEventListener("click", () => {

    value1.value = "";
    value2.value = "";

    answer.textContent = "0";

    updateLabels();

});
