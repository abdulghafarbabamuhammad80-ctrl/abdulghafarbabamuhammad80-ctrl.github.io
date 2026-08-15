/* =========================================================
   TOOLHUB — PASSWORD GENERATOR MEGA JS 🔐⚡
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

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

    const togglePassword = document.getElementById("togglePassword");

    let passwordHistory = [];

    const CHARACTERS = {
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        numbers: "0123456789",
        symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
    };

    /* =====================================================
       SLIDER
    ===================================================== */

    function updateLength() {
        lengthValue.textContent = length.value;
    }

    length.addEventListener("input", updateLength);

    updateLength();


    /* =====================================================
       SECURE RANDOM CHARACTER
    ===================================================== */

    function randomCharacter(chars) {

        if (window.crypto && crypto.getRandomValues) {

            const array = new Uint32Array(1);

            crypto.getRandomValues(array);

            return chars[array[0] % chars.length];

        }

        return chars[Math.floor(Math.random() * chars.length)];
    }


    /* =====================================================
       SHUFFLE
    ===================================================== */

    function shuffle(array) {

        for (let i = array.length - 1; i > 0; i--) {

            const random = new Uint32Array(1);

            let randomIndex;

            if (window.crypto && crypto.getRandomValues) {

                crypto.getRandomValues(random);

                randomIndex = random[0] % (i + 1);

            } else {

                randomIndex = Math.floor(Math.random() * (i + 1));

            }

            [array[i], array[randomIndex]] =
            [array[randomIndex], array[i]];
        }

        return array;
    }


    /* =====================================================
       GET ACTIVE CHARACTER SETS
    ===================================================== */

    function getSelectedSets() {

        const sets = [];

        if (uppercase.checked) {
            sets.push(CHARACTERS.uppercase);
        }

        if (lowercase.checked) {
            sets.push(CHARACTERS.lowercase);
        }

        if (numbers.checked) {
            sets.push(CHARACTERS.numbers);
        }

        if (symbols.checked) {
            sets.push(CHARACTERS.symbols);
        }

        return sets;
    }


    /* =====================================================
       GENERATE PASSWORD
    ===================================================== */

    function generatePassword() {

        const passwordLength = Number(length.value);

        const sets = getSelectedSets();

        if (sets.length === 0) {

            alert("⚠️ Please select at least one character type.");

            return;

        }

        let characters = [];

        /* Guarantee at least one character from
           every selected category */

        sets.forEach(set => {

            characters.push(randomCharacter(set));

        });

        let combined = sets.join("");

        while (characters.length < passwordLength) {

            characters.push(randomCharacter(combined));

        }

        characters = shuffle(characters);

        const finalPassword =
            characters.slice(0, passwordLength).join("");

        password.value = finalPassword;

        updateStatistics(finalPassword);

        updateStrength(finalPassword);

        updateHealth(finalPassword);

        addToHistory(finalPassword);

    }


    /* =====================================================
       GENERATE BUTTON
    ===================================================== */

    generate.addEventListener("click", generatePassword);


    /* =====================================================
       PASSWORD STRENGTH
    ===================================================== */

    function calculateStrength(pass) {

        let score = 0;

        const len = pass.length;

        if (len >= 8) score += 20;
        if (len >= 12) score += 20;
        if (len >= 16) score += 15;
        if (len >= 20) score += 10;

        if (/[A-Z]/.test(pass)) score += 10;

        if (/[a-z]/.test(pass)) score += 10;

        if (/[0-9]/.test(pass)) score += 7;

        if (/[^A-Za-z0-9]/.test(pass)) score += 8;

        return Math.min(score, 100);
    }


    function updateStrength(pass) {

        const score = calculateStrength(pass);

        strengthFill.style.width = score + "%";

        if (score < 40) {

            strength.textContent = "Weak 🔴";

            strength.style.color = "#ff3b3b";

            strengthFill.style.background =
                "linear-gradient(90deg,#ff3b3b,#ff6b6b)";

        }

        else if (score < 70) {

            strength.textContent = "Medium 🟠";

            strength.style.color = "#ff9f1c";

            strengthFill.style.background =
                "linear-gradient(90deg,#ff9f1c,#ffd166)";

        }

        else if (score < 90) {

            strength.textContent = "Strong 🟢";

            strength.style.color = "#00c853";

            strengthFill.style.background =
                "linear-gradient(90deg,#00c853,#69f0ae)";

        }

        else {

            strength.textContent = "Very Strong 🛡️";

            strength.style.color = "#00e5ff";

            strengthFill.style.background =
                "linear-gradient(90deg,#00e5ff,#b026ff)";

        }
    }


    /* =====================================================
       STATISTICS
    ===================================================== */

    function updateStatistics(pass) {

        statLength.textContent = pass.length;

        statUpper.textContent =
            (pass.match(/[A-Z]/g) || []).length;

        statLower.textContent =
            (pass.match(/[a-z]/g) || []).length;

        statNumber.textContent =
            (pass.match(/[0-9]/g) || []).length;

        statSymbol.textContent =
            (pass.match(/[^A-Za-z0-9]/g) || []).length;
    }


    /* =====================================================
       PASSWORD HEALTH
    ===================================================== */

    function updateHealth(pass) {

        let score = 0;

        const tips = [];

        /* Length */

        if (pass.length >= 16) {

            score += 30;

            tips.push("✅ Excellent password length");

        }

        else if (pass.length >= 12) {

            score += 25;

            tips.push("✅ Good password length");

        }

        else {

            score += 10;

            tips.push("⚠️ Try using at least 12 characters");

        }


        /* Uppercase */

        if (/[A-Z]/.test(pass)) {

            score += 20;

            tips.push("✅ Uppercase letters included");

        }

        else {

            tips.push("❌ Add uppercase letters");

        }


        /* Lowercase */

        if (/[a-z]/.test(pass)) {

            score += 20;

            tips.push("✅ Lowercase letters included");

        }

        else {

            tips.push("❌ Add lowercase letters");

        }


        /* Numbers */

        if (/[0-9]/.test(pass)) {

            score += 15;

            tips.push("✅ Numbers included");

        }

        else {

            tips.push("❌ Add numbers");

        }


        /* Symbols */

        if (/[^A-Za-z0-9]/.test(pass)) {

            score += 15;

            tips.push("✅ Symbols included");

        }

        else {

            tips.push("❌ Add symbols");

        }


        /* Repeated characters */

        if (/(.)\1{2,}/.test(pass)) {

            score -= 10;

            tips.push("⚠️ Avoid repeated characters");

        }


        /* Common patterns */

        if (
            /12345/.test(pass) ||
            /abcde/i.test(pass) ||
            /qwerty/i.test(pass)
        ) {

            score -= 15;

            tips.push("⚠️ Avoid predictable patterns");

        }


        score = Math.max(0, Math.min(100, score));

        healthScore.textContent = score;

        healthTips.innerHTML = "";

        tips.forEach(tip => {

            const li = document.createElement("li");

            li.textContent = tip;

            healthTips.appendChild(li);

        });

    }


    /* =====================================================
       PASSWORD HISTORY
    ===================================================== */

    function addToHistory(pass) {

        passwordHistory.unshift(pass);

        /* Remove duplicates */

        passwordHistory =
            [...new Set(passwordHistory)];

        /* Maximum 5 */

        if (passwordHistory.length > 5) {

            passwordHistory =
                passwordHistory.slice(0, 5);

        }

        renderHistory();

    }


    function renderHistory() {

        history.innerHTML = "";

        if (passwordHistory.length === 0) {

            history.innerHTML =
                "<p>No passwords generated yet.</p>";

            return;

        }

        passwordHistory.forEach((item, index) => {

            const div =
                document.createElement("div");

            div.className = "history-item";

            div.textContent =
                `${index + 1}. ${item}`;

            div.title =
                "Click to copy this password";

            div.addEventListener("click", async () => {

                try {

                    await navigator.clipboard.writeText(item);

                    div.textContent =
                        "✅ Password copied!";

                    setTimeout(() => {

                        div.textContent =
                            `${index + 1}. ${item}`;

                    }, 1500);

                }

                catch {

                    alert("Unable to copy password.");

                }

            });

            history.appendChild(div);

        });

    }


    /* =====================================================
       COPY CURRENT PASSWORD
    ===================================================== */

    copy.addEventListener("click", async () => {

        if (!password.value) {

            alert("⚠️ Generate a password first!");

            return;

        }

        try {

            await navigator.clipboard.writeText(
                password.value
            );

            copy.textContent = "✅ Copied!";

            setTimeout(() => {

                copy.textContent = "📋 Copy";

            }, 2000);

        }

        catch {

            alert("❌ Copy failed. Try selecting the password manually.");

        }

    });


    /* =====================================================
       SHOW / HIDE PASSWORD
    ===================================================== */

    togglePassword.addEventListener("click", () => {

        if (password.type === "password") {

            password.type = "text";

            togglePassword.textContent =
                "🙈 Hide";

        }

        else {

            password.type = "password";

            togglePassword.textContent =
                "👁️ Show";

        }

    });


    /* =====================================================
       KEYBOARD SHORTCUT
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "enter"
        ) {

            event.preventDefault();

            generatePassword();

        }

    });


    /* =====================================================
       START WITH A PASSWORD
    ===================================================== */

    generatePassword();

});
