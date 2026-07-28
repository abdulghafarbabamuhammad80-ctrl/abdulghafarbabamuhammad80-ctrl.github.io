const colorPicker = document.getElementById("colorPicker");
const preview = document.getElementById("preview");
const hex = document.getElementById("hex");
const rgb = document.getElementById("rgb");

const copyHex = document.getElementById("copyHex");
const copyRgb = document.getElementById("copyRgb");
const resetBtn = document.getElementById("resetBtn");

updateColor();

colorPicker.addEventListener("input", updateColor);

function updateColor(){

    const color = colorPicker.value;

    preview.style.background = color;

    hex.value = color.toUpperCase();

    const r = parseInt(color.substring(1,3),16);
    const g = parseInt(color.substring(3,5),16);
    const b = parseInt(color.substring(5,7),16);

    rgb.value = `rgb(${r}, ${g}, ${b})`;

}

copyHex.addEventListener("click",()=>{

    navigator.clipboard.writeText(hex.value);

    copyHex.textContent="✅ Copied!";

    setTimeout(()=>{

        copyHex.textContent="📋 Copy HEX";

    },2000);

});

copyRgb.addEventListener("click",()=>{

    navigator.clipboard.writeText(rgb.value);

    copyRgb.textContent="✅ Copied!";

    setTimeout(()=>{

        copyRgb.textContent="📋 Copy RGB";

    },2000);

});

resetBtn.addEventListener("click",()=>{

    colorPicker.value="#007bff";

    updateColor();

});