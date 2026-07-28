const password = document.getElementById("password");
const generate = document.getElementById("generate");
const copy = document.getElementById("copy");

const length = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const strength = document.getElementById("strength");
const strengthFill = document.getElementById("strengthFill");
const history = document.getElementById("history");
const statLength = document.getElementById("statLength");
const statUpper = document.getElementById("statUpper");
const statLower = document.getElementById("statLower");
const statNumber = document.getElementById("statNumber");
const statSymbol = document.getElementById("statSymbol");
const healthScore = document.getElementById("healthScore");
const healthTips = document.getElementById("healthTips");
let passwordHistory = [];
// Update slider value
length.addEventListener("input", () => {
    lengthValue.textContent = length.value;
});

// Generate password
generate.addEventListener("click", () => {

    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const sym = "!@#$%^&*()_-+=<>?/{}[]";

    let allChars = "";
    let pass = "";

    if (uppercase.checked) {
        allChars += upper;
        pass += upper[Math.floor(Math.random() * upper.length)];
    }

    if (lowercase.checked) {
        allChars += lower;
        pass += lower[Math.floor(Math.random() * lower.length)];
    }

    if (numbers.checked) {
        allChars += nums;
        pass += nums[Math.floor(Math.random() * nums.length)];
    }

    if (symbols.checked) {
        allChars += sym;
        pass += sym[Math.floor(Math.random() * sym.length)];
    }

    if (allChars === "") {
        alert("Please select at least one option.");
        return;
    }

    while (pass.length < Number(length.value)) {
        pass += allChars[Math.floor(Math.random() * allChars.length)];
    }

    pass = pass
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");

    password.value = pass;
updateHealth(pass);
statLength.textContent = pass.length;

statUpper.textContent = (pass.match(/[A-Z]/g) || []).length;

statLower.textContent = (pass.match(/[a-z]/g) || []).length;

statNumber.textContent = (pass.match(/[0-9]/g) || []).length;

statSymbol.textContent = (pass.match(/[^A-Za-z0-9]/g) || []).length;
passwordHistory.unshift(pass);

if(passwordHistory.length > 5){
    passwordHistory.pop();
}

history.innerHTML = "";

passwordHistory.forEach(item =>{

    const div = document.createElement("div");

    div.className = "history-item";

    div.textContent = item;

    div.onclick = () =>{

        navigator.clipboard.writeText(item);

        alert("Password copied!");

    };

    history.appendChild(div);

});
    if (length.value < 8) {

        strength.textContent = "Weak 🔴";
        strength.style.color = "red";
        strengthFill.style.width = "33%";
        strengthFill.style.background = "red";

    } else if (length.value < 14) {

        strength.textContent = "Medium 🟠";
        strength.style.color = "orange";
        strengthFill.style.width = "66%";
        strengthFill.style.background = "orange";

    } else {

        strength.textContent = "Strong 🟢";
        strength.style.color = "green";
        strengthFill.style.width = "100%";
        strengthFill.style.background = "green";

    }

});

// Copy password
copy.addEventListener("click", () => {

    if (password.value === "") {
        alert("Generate a password first!");
        return;
    }

    navigator.clipboard.writeText(password.value);

    copy.textContent = "✅ Copied!";

    setTimeout(() => {
        copy.textContent = "📋 Copy";
    }, 2000);

});
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {

    if(password.type === "password"){
        password.type = "text";
        togglePassword.textContent = "🙈 Hide";
    }else{
        password.type = "password";
        togglePassword.textContent = "👁️ Show";
    }

});
function updateHealth(pass){

    let score = 0;
    let tips = [];

    if(pass.length >= 12){
        score += 30;
        tips.push("✅ Good password length");
    }else{
        tips.push("❌ Use at least 12 characters");
    }

    if(/[A-Z]/.test(pass)){
        score += 20;
        tips.push("✅ Contains uppercase letters");
    }else{
        tips.push("❌ Add uppercase letters");
    }

    if(/[a-z]/.test(pass)){
        score += 20;
        tips.push("✅ Contains lowercase letters");
    }else{
        tips.push("❌ Add lowercase letters");
    }

    if(/[0-9]/.test(pass)){
        score += 15;
        tips.push("✅ Contains numbers");
    }else{
        tips.push("❌ Add numbers");
    }

    if(/[^A-Za-z0-9]/.test(pass)){
        score += 15;
        tips.push("✅ Contains symbols");
    }else{
        tips.push("❌ Add symbols");
    }

    healthScore.textContent = score;

    healthTips.innerHTML = "";

    tips.forEach(tip => {

        const li = document.createElement("li");
        li.textContent = tip;
        healthTips.appendChild(li);

    });

}