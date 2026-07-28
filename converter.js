const category = document.getElementById("category");
const from = document.getElementById("from");
const to = document.getElementById("to");
const value = document.getElementById("value");
const convertBtn = document.getElementById("convertBtn");
const answer = document.getElementById("answer");

const units = {
    length: ["Metres", "Kilometres", "Centimetres"],
    weight: ["Kilograms", "Grams", "Pounds"],
    temperature: ["Celsius", "Fahrenheit"],
    time: ["Seconds", "Minutes", "Hours"]
};

function loadUnits() {

    from.innerHTML = "";
    to.innerHTML = "";

    units[category.value].forEach(unit => {

        const option1 = document.createElement("option");
        option1.value = unit;
        option1.textContent = unit;
        from.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = unit;
        option2.textContent = unit;
        to.appendChild(option2);

    });

}

category.addEventListener("change", loadUnits);

loadUnits();

convertBtn.addEventListener("click", () => {

    const num = parseFloat(value.value);

    if (isNaN(num)) {
        alert("Please enter a value.");
        return;
    }

    let result = num;

    // LENGTH
    if(category.value === "length"){

        if(from.value === "Metres" && to.value === "Kilometres")
            result = num / 1000;

        else if(from.value === "Kilometres" && to.value === "Metres")
            result = num * 1000;

        else if(from.value === "Metres" && to.value === "Centimetres")
            result = num * 100;

        else if(from.value === "Centimetres" && to.value === "Metres")
            result = num / 100;

    }

    // WEIGHT
    else if(category.value === "weight"){

        if(from.value === "Kilograms" && to.value === "Grams")
            result = num * 1000;

        else if(from.value === "Grams" && to.value === "Kilograms")
            result = num / 1000;

        else if(from.value === "Kilograms" && to.value === "Pounds")
            result = num * 2.20462;

        else if(from.value === "Pounds" && to.value === "Kilograms")
            result = num / 2.20462;

    }

    // TEMPERATURE
    else if(category.value === "temperature"){

        if(from.value === "Celsius" && to.value === "Fahrenheit")
            result = (num * 9/5) + 32;

        else if(from.value === "Fahrenheit" && to.value === "Celsius")
            result = (num - 32) * 5/9;

    }

    // TIME
    else if(category.value === "time"){

        if(from.value === "Seconds" && to.value === "Minutes")
            result = num / 60;

        else if(from.value === "Minutes" && to.value === "Seconds")
            result = num * 60;

        else if(from.value === "Minutes" && to.value === "Hours")
            result = num / 60;

        else if(from.value === "Hours" && to.value === "Minutes")
            result = num * 60;

    }

    answer.textContent = `${num} ${from.value} = ${result.toFixed(2)} ${to.value}`;

});