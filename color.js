const colorPicker = document.getElementById("colorPicker");

const preview = document.getElementById("preview");
const previewText = document.getElementById("previewText");

const hex = document.getElementById("hex");
const rgb = document.getElementById("rgb");
const hsl = document.getElementById("hsl");

const brightness = document.getElementById("brightness");
const lightness = document.getElementById("lightness");

const copyHex = document.getElementById("copyHex");
const copyRgb = document.getElementById("copyRgb");
const copyHsl = document.getElementById("copyHsl");

const randomBtn = document.getElementById("randomBtn");
const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");

const savedColors = document.getElementById("savedColors");
const savedEmpty = document.getElementById("savedEmpty");

const DEFAULT_COLOR = "#007bff";

let savedColorList = [];


// ============================================================
// UPDATE COLOUR
// ============================================================

function updateColor() {

    const color = colorPicker.value.toUpperCase();

    preview.style.background = color;

    previewText.textContent = color;

    hex.value = color;

    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);

    rgb.value = `rgb(${r}, ${g}, ${b})`;

    const hslValue = rgbToHsl(r, g, b);

    hsl.value =
        `hsl(${hslValue.h}, ${hslValue.s}%, ${hslValue.l}%)`;

    const bright =
        Math.round(((r * 299) + (g * 587) + (b * 114)) / 1000);

    brightness.textContent = `${bright}%`;

    lightness.textContent = `${hslValue.l}%`;

    // Automatically change preview text colour
    // so it stays readable.

    if (bright > 150) {

        previewText.style.color = "#05050d";

    } else {

        previewText.style.color = "#ffffff";

    }

}


// ============================================================
// RGB → HSL
// ============================================================

function rgbToHsl(r, g, b) {

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h;
    let s;

    const l = (max + min) / 2;

    if (max === min) {

        h = 0;
        s = 0;

    } else {

        const d = max - min;

        s = l > 0.5
            ? d / (2 - max - min)
            : d / (max + min);

        switch (max) {

            case r:

                h = ((g - b) / d) + (g < b ? 6 : 0);

                break;

            case g:

                h = ((b - r) / d) + 2;

                break;

            default:

                h = ((r - g) / d) + 4;

        }

        h /= 6;
    }

    return {

        h: Math.round(h * 360),

        s: Math.round(s * 100),

        l: Math.round(l * 100)

    };

}


// ============================================================
// RANDOM COLOUR
// ============================================================

randomBtn.addEventListener("click", () => {

    const randomNumber =
        Math.floor(Math.random() * 16777216);

    const randomColor =
        "#" + randomNumber
            .toString(16)
            .padStart(6, "0");

    colorPicker.value = randomColor;

    updateColor();

});


// ============================================================
// COPY HELPER
// ============================================================

async function copyValue(value, button, originalText) {

    try {

        await navigator.clipboard.writeText(value);

        button.textContent = "✅";

        setTimeout(() => {

            button.textContent = originalText;

        }, 1500);

    } catch {

        alert("Unable to copy this colour.");

    }

}


// ============================================================
// COPY BUTTONS
// ============================================================

copyHex.addEventListener("click", () => {

    copyValue(
        hex.value,
        copyHex,
        "📋"
    );

});


copyRgb.addEventListener("click", () => {

    copyValue(
        rgb.value,
        copyRgb,
        "📋"
    );

});


copyHsl.addEventListener("click", () => {

    copyValue(
        hsl.value,
        copyHsl,
        "📋"
    );

});


// ============================================================
// SAVE COLOUR
// ============================================================

saveBtn.addEventListener("click", () => {

    const color = colorPicker.value.toUpperCase();

    if (!savedColorList.includes(color)) {

        savedColorList.unshift(color);

        if (savedColorList.length > 12) {

            savedColorList.pop();

        }

        renderSavedColors();

    }

});


// ============================================================
// DISPLAY SAVED COLOURS
// ============================================================

function renderSavedColors() {

    savedColors.innerHTML = "";

    if (savedColorList.length === 0) {

        savedEmpty.style.display = "block";

        return;

    }

    savedEmpty.style.display = "none";


    savedColorList.forEach((color, index) => {

        const wrapper =
            document.createElement("div");

        wrapper.className = "saved-color";


        const swatch =
            document.createElement("button");

        swatch.className = "saved-swatch";

        swatch.style.background = color;

        swatch.title =
            `Use ${color}`;

        swatch.addEventListener("click", () => {

            colorPicker.value = color;

            updateColor();

        });


        const code =
            document.createElement("span");

        code.textContent = color;


        const remove =
            document.createElement("button");

        remove.className = "remove-color";

        remove.textContent = "×";

        remove.title = "Remove colour";


        remove.addEventListener("click", () => {

            savedColorList.splice(index, 1);

            renderSavedColors();

        });


        wrapper.appendChild(swatch);

        wrapper.appendChild(code);

        wrapper.appendChild(remove);

        savedColors.appendChild(wrapper);

    });

}


// ============================================================
// RESET
// ============================================================

resetBtn.addEventListener("click", () => {

    colorPicker.value = DEFAULT_COLOR;

    updateColor();

});


// ============================================================
// INITIALIZE
// ============================================================

updateColor();

renderSavedColors();
