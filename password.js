/* =========================================================
   TOOLHUB — PASSWORD GENERATOR MEGA JS 🔐⚡
   FULL VERSION — 4 to 100 CHARACTERS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const password = document.getElementById("password");
    const generate = document.getElementById("generate");
    const copy = document.getElementById("copy");
    const togglePassword = document.getElementById("togglePassword");

    const length = document.getElementById("length");
    const lengthValue = document.getElementById("lengthValue");

    const uppercase = document.getElementById("uppercase");
    const lowercase = document.getElementById("lowercase");
    const numbers = document.getElementById("numbers");
    const symbols = document.getElementById("symbols");

    const excludeAmbiguous =
        document.getElementById("excludeAmbiguous");

    const excludeSimilar =
        document.getElementById("excludeSimilar");

    const strength = document.getElementById("strength");
    const strengthFill = document.getElementById("strengthFill");
    const strengthScore = document.getElementById("strengthScore");
    const entropy = document.getElementById("entropy");

    const history = document.getElementById("history");
    const clearHistory = document.getElementById("clearHistory");

    const securityStatus =
        document.getElementById("securityStatus");

    const statLength =
        document.getElementById("statLength");

    const statUpper =
        document.getElementById("statUpper");

    const statLower =
        document.getElementById("statLower");

    const statNumber =
        document.getElementById("statNumber");

    const statSymbol =
        document.getElementById("statSymbol");

    const statPool =
        document.getElementById("statPool");

    const healthScore =
        document.getElementById("healthScore");

    const healthScoreLabel =
        document.getElementById("healthScoreLabel");

    const healthLevel =
        document.getElementById("healthLevel");

    const healthSummary =
        document.getElementById("healthSummary");

    const healthTips =
        document.getElementById("healthTips");


    /* =====================================================
       CHARACTER SETS
    ===================================================== */

    const CHARACTERS = {

        uppercase:
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

        lowercase:
            "abcdefghijklmnopqrstuvwxyz",

        numbers:
            "0123456789",

        symbols:
            "!@#$%^&*()_+-=[]{}|;:,.<>?"

    };


    /* =====================================================
       HISTORY
    ===================================================== */

    let passwordHistory = [];


    /* =====================================================
       SECURE RANDOM NUMBER
    ===================================================== */

    function secureRandom(max) {

        if (
            window.crypto &&
            window.crypto.getRandomValues
        ) {

            const array =
                new Uint32Array(1);

            window.crypto.getRandomValues(array);

            return array[0] % max;
        }

        return Math.floor(
            Math.random() * max
        );
    }


    /* =====================================================
       RANDOM CHARACTER
    ===================================================== */

    function randomCharacter(chars) {

        if (!chars || chars.length === 0) {
            return "";
        }

        return chars[
            secureRandom(chars.length)
        ];
    }


    /* =====================================================
       SECURE SHUFFLE
    ===================================================== */

    function shuffle(array) {

        for (
            let i = array.length - 1;
            i > 0;
            i--
        ) {

            const j =
                secureRandom(i + 1);

            [
                array[i],
                array[j]
            ] = [
                array[j],
                array[i]
            ];
        }

        return array;
    }


    /* =====================================================
       UPDATE LENGTH
    ===================================================== */

    function updateLength() {

        lengthValue.textContent =
            length.value;

    }

    length.addEventListener(
        "input",
        updateLength
    );

    updateLength();


    /* =====================================================
       BUILD CHARACTER POOL
    ===================================================== */

    function getCharacterSets() {

        const sets = [];

        if (uppercase.checked) {

            sets.push({
                name: "uppercase",
                chars: CHARACTERS.uppercase
            });

        }

        if (lowercase.checked) {

            sets.push({
                name: "lowercase",
                chars: CHARACTERS.lowercase
            });

        }

        if (numbers.checked) {

            sets.push({
                name: "numbers",
                chars: CHARACTERS.numbers
            });

        }

        if (symbols.checked) {

            sets.push({
                name: "symbols",
                chars: CHARACTERS.symbols
            });

        }

        return sets;
    }


    /* =====================================================
       REMOVE EXCLUDED CHARACTERS
    ===================================================== */

    function applyExclusions(chars) {

        let result = chars;

        if (excludeAmbiguous.checked) {

            result =
                result.replace(
                    /[O0Il1]/g,
                    ""
                );

        }

        if (excludeSimilar.checked) {

            result =
                result.replace(
                    /[oO0iIlL1|]/g,
                    ""
                );

        }

        return result;
    }


    /* =====================================================
       GENERATE PASSWORD
    ===================================================== */

    function generatePassword() {

        const passwordLength =
            Number(length.value);

        const selectedSets =
            getCharacterSets();

        if (selectedSets.length === 0) {

            alert(
                "⚠️ Select at least one character type."
            );

            return;
        }


        /* Make sure the requested
           length can contain every
           selected category. */

        if (
            passwordLength <
            selectedSets.length
        ) {

            alert(
                `⚠️ Password length must be at least ${selectedSets.length} characters for the selected options.`
            );

            return;
        }


        const usableSets =
            selectedSets.map(set => {

                return {

                    name: set.name,

                    chars:
                        applyExclusions(
                            set.chars
                        )

                };

            });


        /* Check that exclusions did
           not empty a character set. */

        const invalidSet =
            usableSets.find(
                set => !set.chars.length
            );

        if (invalidSet) {

            alert(
                "⚠️ Your exclusion settings removed all characters from one selected category."
            );

            return;
        }


        /* =================================================
           GUARANTEE EACH SELECTED TYPE
        ================================================= */

        let characters = [];

        usableSets.forEach(set => {

            characters.push(
                randomCharacter(
                    set.chars
                )
            );

        });


        /* =================================================
           COMBINED CHARACTER POOL
        ================================================= */

        const combined =
            usableSets
                .map(set => set.chars)
                .join("");


        /* =================================================
           FILL REMAINING CHARACTERS
        ================================================= */

        while (
            characters.length <
            passwordLength
        ) {

            characters.push(
                randomCharacter(
                    combined
                )
            );

        }


        /* =================================================
           SHUFFLE
        ================================================= */

        shuffle(characters);


        /* =================================================
           FINAL PASSWORD
        ================================================= */

        const finalPassword =
            characters
                .slice(
                    0,
                    passwordLength
                )
                .join("");


        password.value =
            finalPassword;


        /* =================================================
           UPDATE EVERYTHING
        ================================================= */

        updateStatistics(
            finalPassword,
            combined.length
        );

        updateStrength(
            finalPassword,
            combined.length
        );

        updateHealth(
            finalPassword
        );

        addToHistory(
            finalPassword
        );


        /* =================================================
           SECURITY STATUS
        ================================================= */

        securityStatus.textContent =
            "● Generated";

        securityStatus.style.color =
            "#39ff88";

    }


    /* =====================================================
       GENERATE BUTTON
    ===================================================== */

    generate.addEventListener(
        "click",
        generatePassword
    );


    /* =====================================================
       PASSWORD STRENGTH
    ===================================================== */

    function calculateStrength(
        pass,
        poolSize
    ) {

        if (!pass) {
            return 0;
        }


        let score = 0;

        const len =
            pass.length;


        /* LENGTH */

        if (len >= 8)
            score += 15;

        if (len >= 12)
            score += 15;

        if (len >= 16)
            score += 15;

        if (len >= 24)
            score += 15;

        if (len >= 32)
            score += 10;

        if (len >= 50)
            score += 5;


        /* CHARACTER VARIETY */

        if (/[A-Z]/.test(pass))
            score += 7;

        if (/[a-z]/.test(pass))
            score += 7;

        if (/[0-9]/.test(pass))
            score += 5;

        if (/[^A-Za-z0-9]/.test(pass))
            score += 6;


        /* CHARACTER POOL */

        if (poolSize >= 60)
            score += 5;

        else if (poolSize >= 40)
            score += 3;


        /* PENALTIES */

        if (/(.)\1{2,}/.test(pass))
            score -= 5;

        if (
            /12345/.test(pass) ||
            /abcde/i.test(pass) ||
            /qwerty/i.test(pass)
        ) {
            score -= 10;
        }


        return Math.max(
            0,
            Math.min(100, score)
        );

    }


    function updateStrength(
        pass,
        poolSize
    ) {

        const score =
            calculateStrength(
                pass,
                poolSize
            );


        strengthScore.textContent =
            score;


        strengthFill.style.width =
            score + "%";


        /* =================================================
           ENTROPY
        ================================================= */

        let entropyValue = 0;

        if (
            pass &&
            poolSize > 1
        ) {

            entropyValue =
                Math.round(
                    pass.length *
                    Math.log2(poolSize)
                );

        }

        entropy.textContent =
            entropyValue;


        /* =================================================
           STRENGTH LEVEL
        ================================================= */

        if (score < 35) {

            strength.textContent =
                "Weak 🔴";

            strength.style.color =
                "#ff3b3b";

            strengthFill.style.background =
                "linear-gradient(90deg,#ff3b3b,#ff6b6b)";

        }

        else if (score < 60) {

            strength.textContent =
                "Fair 🟠";

            strength.style.color =
                "#ff9f1c";

            strengthFill.style.background =
                "linear-gradient(90deg,#ff9f1c,#ffd166)";

        }

        else if (score < 80) {

            strength.textContent =
                "Strong 🟢";

            strength.style.color =
                "#39ff88";

            strengthFill.style.background =
                "linear-gradient(90deg,#39ff88,#00e5ff)";

        }

        else if (score < 95) {

            strength.textContent =
                "Very Strong 🛡️";

            strength.style.color =
                "#00e5ff";

            strengthFill.style.background =
                "linear-gradient(90deg,#00e5ff,#4dd0ff,#b026ff)";

        }

        else {

            strength.textContent =
                "Excellent ⚡";

            strength.style.color =
                "#b026ff";

            strengthFill.style.background =
                "linear-gradient(90deg,#00e5ff,#b026ff,#ff2f92)";

        }

    }


    /* =====================================================
       STATISTICS
    ===================================================== */

    function updateStatistics(
        pass,
        poolSize
    ) {

        statLength.textContent =
            pass.length;

        statUpper.textContent =
            (
                pass.match(/[A-Z]/g) || []
            ).length;

        statLower.textContent =
            (
                pass.match(/[a-z]/g) || []
            ).length;

        statNumber.textContent =
            (
                pass.match(/[0-9]/g) || []
            ).length;

        statSymbol.textContent =
            (
                pass.match(
                    /[^A-Za-z0-9]/g
                ) || []
            ).length;

        statPool.textContent =
            poolSize;

    }


    /* =====================================================
       PASSWORD HEALTH
    ===================================================== */

    function updateHealth(pass) {

        let score = 0;

        const tips = [];


        /* LENGTH */

        if (pass.length >= 32) {

            score += 30;

            tips.push(
                "✅ Excellent password length"
            );

        }

        else if (pass.length >= 16) {

            score += 25;

            tips.push(
                "✅ Strong password length"
            );

        }

        else if (pass.length >= 12) {

            score += 20;

            tips.push(
                "✅ Good password length"
            );

        }

        else {

            score += 10;

            tips.push(
                "⚠️ Consider using at least 12 characters"
            );

        }


        /* UPPERCASE */

        if (/[A-Z]/.test(pass)) {

            score += 20;

            tips.push(
                "✅ Uppercase letters included"
            );

        }

        else {

            tips.push(
                "❌ Add uppercase letters"
            );

        }


        /* LOWERCASE */

        if (/[a-z]/.test(pass)) {

            score += 20;

            tips.push(
                "✅ Lowercase letters included"
            );

        }

        else {

            tips.push(
                "❌ Add lowercase letters"
            );

        }


        /* NUMBERS */

        if (/[0-9]/.test(pass)) {

            score += 15;

            tips.push(
                "✅ Numbers included"
            );

        }

        else {

            tips.push(
                "❌ Add numbers"
            );

        }


        /* SYMBOLS */

        if (/[^A-Za-z0-9]/.test(pass)) {

            score += 15;

            tips.push(
                "✅ Symbols included"
            );

        }

        else {

            tips.push(
                "❌ Add symbols"
            );

        }


        /* REPEATED CHARACTERS */

        if (/(.)\1{2,}/.test(pass)) {

            score -= 10;

            tips.push(
                "⚠️ Avoid long repeated character patterns"
            );

        }


        /* PREDICTABLE PATTERNS */

        if (
            /12345/.test(pass) ||
            /abcde/i.test(pass) ||
            /qwerty/i.test(pass)
        ) {

            score -= 15;

            tips.push(
                "⚠️ Avoid predictable patterns"
            );

        }


        score =
            Math.max(
                0,
                Math.min(100, score)
            );


        /* =================================================
           DISPLAY SCORE
        ================================================= */

        healthScore.textContent =
            score;

        healthScoreLabel.textContent =
            score;


        /* =================================================
           HEALTH LEVEL
        ================================================= */

        if (score < 40) {

            healthLevel.textContent =
                "Needs Improvement 🔴";

            healthSummary.textContent =
                "This password could be significantly stronger.";

        }

        else if (score < 65) {

            healthLevel.textContent =
                "Fair 🟠";

            healthSummary.textContent =
                "Decent, but there are ways to improve it.";

        }

        else if (score < 85) {

            healthLevel.textContent =
                "Good 🟢";

            healthSummary.textContent =
                "This password has a solid security structure.";

        }

        else {

            healthLevel.textContent =
                "Excellent 🛡️";

            healthSummary.textContent =
                "This password has strong length and character diversity.";

        }


        /* =================================================
           TIPS
        ================================================= */

        healthTips.innerHTML = "";

        tips.forEach(tip => {

            const li =
                document.createElement("li");

            li.textContent =
                tip;

            healthTips.appendChild(li);

        });

    }


    /* =====================================================
       HISTORY
    ===================================================== */

    function addToHistory(pass) {

        passwordHistory.unshift(pass);


        /* Remove duplicates */

        passwordHistory =
            [...new Set(passwordHistory)];


        /* Keep only 5 */

        passwordHistory =
            passwordHistory.slice(0, 5);


        renderHistory();

    }


    function renderHistory() {

        history.innerHTML = "";


        if (
            passwordHistory.length === 0
        ) {

            history.innerHTML = `
                <div class="empty-history">
                    <span>🔐</span>
                    <p>No passwords generated yet.</p>
                </div>
            `;

            return;
        }


        passwordHistory.forEach(
            (item, index) => {

                const div =
                    document.createElement("div");

                div.className =
                    "history-item";

                div.textContent =
                    `${index + 1}. ${item}`;

                div.title =
                    "Click to copy this password";


                div.addEventListener(
                    "click",
                    async () => {

                        try {

                            await navigator.clipboard
                                .writeText(item);

                            div.textContent =
                                "✅ Password copied!";

                            setTimeout(() => {

                                div.textContent =
                                    `${index + 1}. ${item}`;

                            }, 1500);

                        }

                        catch {

                            alert(
                                "❌ Unable to copy password."
                            );

                        }

                    }
                );


                history.appendChild(div);

            }
        );

    }


    /* =====================================================
       🔥 CLEAR HISTORY — FIXED
    ===================================================== */

    clearHistory.addEventListener(
        "click",
        () => {

            if (
                passwordHistory.length === 0
            ) {

                return;

            }


            passwordHistory = [];


            renderHistory();


            securityStatus.textContent =
                "● History Cleared";

            securityStatus.style.color =
                "#ff2f92";


            setTimeout(() => {

                securityStatus.textContent =
                    "● Ready";

                securityStatus.style.color =
                    "";

            }, 1800);

        }
    );


    /* =====================================================
       COPY PASSWORD
    ===================================================== */

    copy.addEventListener(
        "click",
        async () => {

            if (!password.value) {

                alert(
                    "⚠️ Generate a password first!"
                );

                return;

            }


            try {

                await navigator.clipboard
                    .writeText(
                        password.value
                    );


                copy.textContent =
                    "✅ Copied!";


                setTimeout(() => {

                    copy.textContent =
                        "📋 Copy";

                }, 2000);

            }

            catch {

                alert(
                    "❌ Copy failed. Try selecting the password manually."
                );

            }

        }
    );


    /* =====================================================
       SHOW / HIDE
    ===================================================== */

    togglePassword.addEventListener(
        "click",
        () => {

            if (
                password.type ===
                "password"
            ) {

                password.type =
                    "text";

                togglePassword.textContent =
                    "🙈 Hide";

            }

            else {

                password.type =
                    "password";

                togglePassword.textContent =
                    "👁️ Show";

            }

        }
    );


    /* =====================================================
       KEYBOARD SHORTCUT
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.ctrlKey &&
                event.key.toLowerCase() ===
                "enter"
            ) {

                event.preventDefault();

                generatePassword();

            }

        }
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    renderHistory();

    generatePassword();

});
