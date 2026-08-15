/* =========================================================
   TOOLHUB — PASSWORD GENERATOR MEGA JS
   🔐⚡ PLUS ULTRA EDITION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const password = document.getElementById("password");
    const generateBtn = document.getElementById("generate");
    const copyBtn = document.getElementById("copy");

    const lengthSlider = document.getElementById("length");
    const lengthValue = document.getElementById("lengthValue");

    const uppercase = document.getElementById("uppercase");
    const lowercase = document.getElementById("lowercase");
    const numbers = document.getElementById("numbers");
    const symbols = document.getElementById("symbols");

    const togglePassword = document.getElementById("togglePassword");

    const strength = document.getElementById("strength");
    const strengthFill = document.getElementById("strengthFill");

    const statLength = document.getElementById("statLength");
    const statUpper = document.getElementById("statUpper");
    const statLower = document.getElementById("statLower");
    const statNumber = document.getElementById("statNumber");
    const statSymbol = document.getElementById("statSymbol");

    const healthScore = document.getElementById("healthScore");
    const healthTips = document.getElementById("healthTips");

    const historyBox = document.getElementById("history");

    /* =====================================================
       CHARACTER POOLS
    ===================================================== */

    const CHARACTERS = {
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        numbers: "0123456789",
        symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
    };

    /* =====================================================
       STATE
    ===================================================== */

    let passwordHistory = [];

    const MAX_HISTORY = 5;

    /* =====================================================
       SAFE RANDOM NUMBER
    ===================================================== */

    function randomNumber(max) {

        if (max <= 0) return 0;

        if (window.crypto && window.crypto.getRandomValues) {

            const array = new Uint32Array(1);

            window.crypto.getRandomValues(array);

            /*
             * Rejection sampling avoids the small bias caused
             * by simply using randomNumber % max.
             */

            const limit =
                Math.floor(0x100000000 / max) * max;

            let value = array[0];

            while (value >= limit) {

                window.crypto.getRandomValues(array);

                value = array[0];
            }

            return value % max;
        }

        return Math.floor(Math.random() * max);
    }

    /* =====================================================
       RANDOM CHARACTER
    ===================================================== */

    function randomCharacter(characters) {

        return characters[
            randomNumber(characters.length)
        ];
    }

    /* =====================================================
       SECURE SHUFFLE
    ===================================================== */

    function shuffle(array) {

        for (let i = array.length - 1; i > 0; i--) {

            const j = randomNumber(i + 1);

            [array[i], array[j]] =
            [array[j], array[i]];
        }

        return array;
    }

    /* =====================================================
       GET SELECTED CHARACTER SETS
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
       LENGTH DISPLAY
    ===================================================== */

    function updateLengthDisplay() {

        lengthValue.textContent =
            lengthSlider.value;
    }

    lengthSlider.addEventListener(
        "input",
        updateLengthDisplay
    );

    updateLengthDisplay();

    /* =====================================================
       GENERATE PASSWORD
    ===================================================== */

    function generatePassword() {

        const targetLength =
            Number(lengthSlider.value);

        const sets =
            getSelectedSets();

        /* No categories selected */

        if (sets.length === 0) {

            password.value = "";

            strength.textContent =
                "Select options ⚠️";

            strengthFill.style.width = "0%";

            updateStatistics("");

            updateHealth("");

            return;
        }

        /*
         * Normally HTML minimum is 4.
         * This protection keeps the function safe if
         * someone changes the minimum later.
         */

        if (targetLength < sets.length) {

            password.value = "";

            strength.textContent =
                "Length too short ⚠️";

            strengthFill.style.width = "0%";

            updateHealth("");

            return;
        }

        const combined =
            sets.join("");

        const result = [];

        /*
         * Guarantee one character from every
         * selected category.
         */

        sets.forEach(set => {

            result.push(
                randomCharacter(set)
            );

        });

        /*
         * Fill the remaining positions.
         */

        while (result.length < targetLength) {

            result.push(
                randomCharacter(combined)
            );

        }

        /*
         * Shuffle so the guaranteed characters
         * aren't always at the beginning.
         */

        shuffle(result);

        const finalPassword =
            result.join("");

        password.value =
            finalPassword;

        updateStatistics(finalPassword);

        updateStrength(finalPassword);

        updateHealth(finalPassword);

        addToHistory(finalPassword);

        /*
         * If password is currently visible,
         * keep it visible.
         */

        password.focus();
        password.setSelectionRange(
            password.value.length,
            password.value.length
        );
    }

    generateBtn.addEventListener(
        "click",
        generatePassword
    );

    /* =====================================================
       PASSWORD STRENGTH
    ===================================================== */

    function calculateStrength(pass) {

        if (!pass) return 0;

        let score = 0;

        const length = pass.length;

        /* Length */

        if (length >= 8) score += 15;
        if (length >= 12) score += 15;
        if (length >= 16) score += 15;
        if (length >= 20) score += 10;
        if (length >= 24) score += 5;

        /* Character variety */

        if (/[A-Z]/.test(pass)) {
            score += 10;
        }

        if (/[a-z]/.test(pass)) {
            score += 10;
        }

        if (/[0-9]/.test(pass)) {
            score += 10;
        }

        if (/[^A-Za-z0-9]/.test(pass)) {
            score += 10;
        }

        /* Diversity bonus */

        const types = [
            /[A-Z]/,
            /[a-z]/,
            /[0-9]/,
            /[^A-Za-z0-9]/
        ].filter(regex => regex.test(pass)).length;

        if (types === 4) {
            score += 5;
        }

        /* Penalize obvious repetition */

        if (/(.)\1{2,}/.test(pass)) {
            score -= 10;
        }

        /* Penalize obvious sequences */

        if (
            /1234/.test(pass) ||
            /2345/.test(pass) ||
            /3456/.test(pass) ||
            /abcd/i.test(pass) ||
            /bcde/i.test(pass) ||
            /qwerty/i.test(pass)
        ) {
            score -= 10;
        }

        return Math.max(
            0,
            Math.min(100, score)
        );
    }

    /* =====================================================
       UPDATE STRENGTH UI
    ===================================================== */

    function updateStrength(pass) {

        const score =
            calculateStrength(pass);

        strengthFill.style.width =
            score + "%";

        if (!pass) {

            strength.textContent =
                "No password";

            strength.style.color =
                "var(--muted)";

            return;
        }

        if (score < 35) {

            strength.textContent =
                "Weak 🔴";

            strength.style.color =
                "#ff3b3b";
        }

        else if (score < 60) {

            strength.textContent =
                "Fair 🟠";

            strength.style.color =
                "#ff9f1c";
        }

        else if (score < 80) {

            strength.textContent =
                "Strong 🟢";

            strength.style.color =
                "#39ff88";
        }

        else if (score < 95) {

            strength.textContent =
                "Very Strong 🔵";

            strength.style.color =
                "#00e5ff";
        }

        else {

            strength.textContent =
                "Excellent 🛡️";

            strength.style.color =
                "#b026ff";
        }
    }

    /* =====================================================
       STATISTICS
    ===================================================== */

    function updateStatistics(pass) {

        statLength.textContent =
            pass.length;

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

        if (!pass) {

            healthScore.textContent = "0";

            healthTips.innerHTML =
                "<li>Generate a password to analyze it.</li>";

            return;
        }

        let score = 0;

        const tips = [];

        /* LENGTH */

        if (pass.length >= 20) {

            score += 30;

            tips.push(
                "✅ Excellent length"
            );

        }

        else if (pass.length >= 16) {

            score += 27;

            tips.push(
                "✅ Great password length"
            );

        }

        else if (pass.length >= 12) {

            score += 23;

            tips.push(
                "✅ Good password length"
            );

        }

        else {

            score += 10;

            tips.push(
                "⚠️ Consider using 12+ characters"
            );
        }

        /* UPPERCASE */

        if (/[A-Z]/.test(pass)) {

            score += 17;

            tips.push(
                "✅ Uppercase letters detected"
            );

        } else {

            tips.push(
                "❌ Add uppercase letters"
            );
        }

        /* LOWERCASE */

        if (/[a-z]/.test(pass)) {

            score += 17;

            tips.push(
                "✅ Lowercase letters detected"
            );

        } else {

            tips.push(
                "❌ Add lowercase letters"
            );
        }

        /* NUMBERS */

        if (/[0-9]/.test(pass)) {

            score += 14;

            tips.push(
                "✅ Numbers detected"
            );

        } else {

            tips.push(
                "❌ Add numbers"
            );
        }

        /* SYMBOLS */

        if (/[^A-Za-z0-9]/.test(pass)) {

            score += 14;

            tips.push(
                "✅ Symbols detected"
            );

        } else {

            tips.push(
                "❌ Add symbols"
            );
        }

        /* REPETITION */

        if (/(.)\1{2,}/.test(pass)) {

            score -= 10;

            tips.push(
                "⚠️ Repeated characters detected"
            );
        }

        /* PATTERNS */

        if (
            /1234/.test(pass) ||
            /abcd/i.test(pass) ||
            /qwerty/i.test(pass)
        ) {

            score -= 10;

            tips.push(
                "⚠️ Avoid predictable patterns"
            );
        }

        score = Math.max(
            0,
            Math.min(100, score)
        );

        healthScore.textContent =
            score;

        healthTips.innerHTML = "";

        tips.forEach(tip => {

            const li =
                document.createElement("li");

            li.textContent = tip;

            healthTips.appendChild(li);
        });
    }

    /* =====================================================
       HISTORY — LOCAL STORAGE
    ===================================================== */

    function loadHistory() {

        try {

            const saved =
                localStorage.getItem(
                    "toolhub_password_history"
                );

            if (!saved) return;

            const parsed =
                JSON.parse(saved);

            if (Array.isArray(parsed)) {

                passwordHistory =
                    parsed.slice(0, MAX_HISTORY);
            }

        } catch {

            passwordHistory = [];
        }

        renderHistory();
    }

    function saveHistory() {

        try {

            localStorage.setItem(
                "toolhub_password_history",
                JSON.stringify(passwordHistory)
            );

        } catch {
            /* Storage unavailable — app still works */
        }
    }

    function addToHistory(pass) {

        if (!pass) return;

        passwordHistory =
            passwordHistory.filter(
                item => item !== pass
            );

        passwordHistory.unshift(pass);

        passwordHistory =
            passwordHistory.slice(
                0,
                MAX_HISTORY
            );

        saveHistory();

        renderHistory();
    }

    /* =====================================================
       RENDER HISTORY
    ===================================================== */

    function renderHistory() {

        historyBox.innerHTML = "";

        if (passwordHistory.length === 0) {

            const empty =
                document.createElement("p");

            empty.textContent =
                "No passwords generated yet.";

            historyBox.appendChild(empty);

            return;
        }

        passwordHistory.forEach(
            (item, index) => {

                const wrapper =
                    document.createElement("div");

                wrapper.className =
                    "history-item";

                wrapper.textContent =
                    `${index + 1}. ${item}`;

                wrapper.title =
                    "Tap to copy";

                wrapper.addEventListener(
                    "click",
                    async () => {

                        const success =
                            await copyText(item);

                        if (success) {

                            const oldText =
                                wrapper.textContent;

                            wrapper.textContent =
                                "✅ Copied!";

                            setTimeout(() => {

                                wrapper.textContent =
                                    oldText;

                            }, 1200);
                        }
                    }
                );

                historyBox.appendChild(wrapper);
            }
        );
    }

    /* =====================================================
       COPY HELPER
    ===================================================== */

    async function copyText(text) {

        try {

            if (
                navigator.clipboard &&
                window.isSecureContext
            ) {

                await navigator.clipboard.writeText(
                    text
                );

                return true;
            }

        } catch {
            /* Try fallback */
        }

        /* Older browser fallback */

        try {

            const textarea =
                document.createElement("textarea");

            textarea.value = text;

            textarea.style.position =
                "fixed";

            textarea.style.opacity = "0";

            document.body.appendChild(
                textarea
            );

            textarea.focus();

            textarea.select();

            const success =
                document.execCommand("copy");

            textarea.remove();

            return success;

        } catch {

            return false;
        }
    }

    /* =====================================================
       COPY CURRENT PASSWORD
    ===================================================== */

    copyBtn.addEventListener(
        "click",
        async () => {

            if (!password.value) {

                copyBtn.textContent =
                    "⚠️ Generate First";

                setTimeout(() => {

                    copyBtn.textContent =
                        "📋 Copy";

                }, 1500);

                return;
            }

            const success =
                await copyText(password.value);

            if (success) {

                copyBtn.textContent =
                    "✅ Copied!";

            } else {

                copyBtn.textContent =
                    "❌ Copy Failed";
            }

            setTimeout(() => {

                copyBtn.textContent =
                    "📋 Copy";

            }, 1800);
        }
    );

    /* =====================================================
       SHOW / HIDE
    ===================================================== */

    togglePassword.addEventListener(
        "click",
        () => {

            const showing =
                password.type === "text";

            password.type =
                showing ? "password" : "text";

            togglePassword.textContent =
                showing
                    ? "👁️ Show"
                    : "🙈 Hide";
        }
    );

    /* =====================================================
       KEYBOARD SHORTCUT
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            /*
             * Ctrl + Enter
             * or
             * Enter while focused on generator controls
             */

            if (
                event.ctrlKey &&
                event.key === "Enter"
            ) {

                event.preventDefault();

                generatePassword();
            }
        }
    );

    /* =====================================================
       LIVE PREVIEW WHEN OPTIONS CHANGE
    ===================================================== */

    [
        uppercase,
        lowercase,
        numbers,
        symbols
    ].forEach(input => {

        input.addEventListener(
            "change",
            () => {

                /*
                 * Don't automatically generate
                 * if no password exists yet.
                 */

                if (password.value) {
                    generatePassword();
                }
            }
        );
    });

    /* =====================================================
       INITIALIZE
    ===================================================== */

    loadHistory();

    updateLengthDisplay();

    updateStatistics("");

    updateHealth("");

    /*
     * Generate the first password automatically.
     */

    generatePassword();

});
