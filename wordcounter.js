/* =========================================================
   TOOLHUB — WORD COUNTER MEGA JS 📝⚡
   Advanced Writing & Text Analysis Engine
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const text = document.getElementById("text");

    const words = document.getElementById("words");
    const characters = document.getElementById("characters");
    const noSpaces = document.getElementById("noSpaces");
    const sentences = document.getElementById("sentences");
    const paragraphs = document.getElementById("paragraphs");
    const reading = document.getElementById("reading");

    const copyBtn = document.getElementById("copyBtn");
    const clearBtn = document.getElementById("clearBtn");

    if (!text) {
        console.error("ToolHub Word Counter: textarea #text was not found.");
        return;
    }


    /* =====================================================
       SETTINGS
    ===================================================== */

    const WORDS_PER_MINUTE = 200;
    const SPEECH_WORDS_PER_MINUTE = 130;


    /* =====================================================
       TEXT ANALYSIS
    ===================================================== */

    function analyzeText(value) {

        const trimmed = value.trim();

        /* -----------------------------
           Characters
        ----------------------------- */

        const characterCount = value.length;

        const charactersWithoutSpaces =
            value.replace(/\s/g, "").length;


        /* -----------------------------
           Words
        ----------------------------- */

        const wordList = trimmed === ""
            ? []
            : trimmed.match(/\S+/g) || [];

        const wordCount = wordList.length;


        /* -----------------------------
           Sentences
        ----------------------------- */

        const sentenceList = trimmed === ""
            ? []
            : trimmed.match(/[^.!?]+(?:[.!?]+|$)/g) || [];

        const sentenceCount = sentenceList
            .map(sentence => sentence.trim())
            .filter(Boolean)
            .length;


        /* -----------------------------
           Paragraphs
        ----------------------------- */

        const paragraphList = trimmed === ""
            ? []
            : trimmed
                .split(/\n\s*\n+/)
                .map(p => p.trim())
                .filter(Boolean);

        /*
           If the user separates lines without blank
           lines, still count them as paragraphs.
        */

        let paragraphCount = paragraphList.length;

        if (trimmed !== "" && paragraphCount === 0) {
            paragraphCount = 1;
        }


        /* -----------------------------
           Reading Time
        ----------------------------- */

        const readingMinutes =
            wordCount === 0
                ? 0
                : Math.ceil(wordCount / WORDS_PER_MINUTE);


        /* -----------------------------
           Speaking Time
        ----------------------------- */

        const speakingMinutes =
            wordCount === 0
                ? 0
                : Math.ceil(wordCount / SPEECH_WORDS_PER_MINUTE);


        /* -----------------------------
           Average Word Length
        ----------------------------- */

        const lettersOnly =
            value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]/g, "");

        const averageWordLength =
            wordCount === 0
                ? 0
                : lettersOnly.length / wordCount;


        /* -----------------------------
           Longest Word
        ----------------------------- */

        let longestWord = "";

        wordList.forEach(word => {

            const cleanWord =
                word.replace(/[^\p{L}\p{N}'-]/gu, "");

            if (cleanWord.length > longestWord.length) {
                longestWord = cleanWord;
            }

        });


        /* -----------------------------
           Unique Words
        ----------------------------- */

        const normalizedWords =
            wordList.map(word =>
                word
                    .toLowerCase()
                    .replace(/[^\p{L}\p{N}'-]/gu, "")
            )
            .filter(Boolean);

        const uniqueWords =
            new Set(normalizedWords);

        const uniqueWordCount = uniqueWords.size;


        /* -----------------------------
           Repeated Words
        ----------------------------- */

        const frequency = {};

        normalizedWords.forEach(word => {

            frequency[word] =
                (frequency[word] || 0) + 1;

        });

        const repeatedWords =
            Object.entries(frequency)
                .filter(([word, count]) => count > 1)
                .sort((a, b) => b[1] - a[1]);


        /* -----------------------------
           Numbers
        ----------------------------- */

        const numberCount =
            (value.match(/\b\d+(?:[.,]\d+)*\b/g) || []).length;


        /* -----------------------------
           Letters
        ----------------------------- */

        const letterCount =
            (value.match(/[A-Za-zÀ-ÖØ-öø-ÿ]/g) || []).length;


        /* -----------------------------
           Digits
        ----------------------------- */

        const digitCount =
            (value.match(/\d/g) || []).length;


        /* -----------------------------
           Whitespace
        ----------------------------- */

        const whitespaceCount =
            (value.match(/\s/g) || []).length;


        return {
            value,
            trimmed,
            wordList,
            wordCount,
            characterCount,
            charactersWithoutSpaces,
            sentenceCount,
            paragraphCount,
            readingMinutes,
            speakingMinutes,
            averageWordLength,
            longestWord,
            uniqueWordCount,
            repeatedWords,
            numberCount,
            letterCount,
            digitCount,
            whitespaceCount
        };

    }


    /* =====================================================
       UPDATE EXISTING UI
    ===================================================== */

    function updateStats() {

        const data = analyzeText(text.value);


        /* Words */

        if (words) {
            words.textContent = data.wordCount;
        }


        /* Characters */

        if (characters) {
            characters.textContent = data.characterCount;
        }


        /* Characters without spaces */

        if (noSpaces) {
            noSpaces.textContent =
                data.charactersWithoutSpaces;
        }


        /* Sentences */

        if (sentences) {
            sentences.textContent =
                data.sentenceCount;
        }


        /* Paragraphs */

        if (paragraphs) {
            paragraphs.textContent =
                data.paragraphCount;
        }


        /* Reading */

        if (reading) {

            reading.textContent =
                data.readingMinutes === 0
                    ? "0 min"
                    : `${data.readingMinutes} min`;

        }


        /*
           Update any optional advanced elements
           if they exist in future HTML.
        */

        updateOptionalStats(data);

    }


    /* =====================================================
       OPTIONAL ADVANCED STATS
    ===================================================== */

    function updateOptionalStats(data) {

        const optionalElements = {

            uniqueWords:
                data.uniqueWordCount,

            averageWordLength:
                data.averageWordLength.toFixed(1),

            longestWord:
                data.longestWord || "—",

            numbers:
                data.numberCount,

            letters:
                data.letterCount,

            digits:
                data.digitCount,

            spaces:
                data.whitespaceCount,

            speakingTime:
                data.speakingMinutes === 0
                    ? "0 min"
                    : `${data.speakingMinutes} min`

        };


        Object.entries(optionalElements)
            .forEach(([id, value]) => {

                const element =
                    document.getElementById(id);

                if (element) {
                    element.textContent = value;
                }

            });


        updateOptionalProgress(data);

    }


    /* =====================================================
       TEXT PROGRESS
    ===================================================== */

    function updateOptionalProgress(data) {

        /*
           If Claude adds a progress bar with
           id="textProgress", automatically update it.
        */

        const progress =
            document.getElementById("textProgress");

        if (progress) {

            const percentage =
                Math.min(
                    100,
                    (data.wordCount / 1000) * 100
                );

            progress.style.width =
                percentage + "%";

        }

    }


    /* =====================================================
       COPY
    ===================================================== */

    async function copyText() {

        const value = text.value;

        if (!value.trim()) {

            showMessage(
                "Nothing to copy!",
                "warning"
            );

            return;

        }


        try {

            await navigator.clipboard.writeText(value);

            setButtonState(
                copyBtn,
                "✅ Copied!",
                "📋 Copy",
                2000
            );

        }

        catch {

            /*
               Fallback for browsers where
               Clipboard API is unavailable.
            */

            try {

                text.focus();

                text.select();

                document.execCommand("copy");

                window.getSelection()?.removeAllRanges();

                setButtonState(
                    copyBtn,
                    "✅ Copied!",
                    "📋 Copy",
                    2000
                );

            }

            catch {

                showMessage(
                    "Copy failed. Please copy manually.",
                    "error"
                );

            }

        }

    }


    if (copyBtn) {
        copyBtn.addEventListener(
            "click",
            copyText
        );
    }


    /* =====================================================
       CLEAR
    ===================================================== */

    function clearText() {

        if (!text.value) {
            return;
        }


        text.value = "";

        updateStats();

        text.focus();


        if (clearBtn) {

            setButtonState(
                clearBtn,
                "✅ Cleared!",
                "🗑️ Clear",
                1200
            );

        }

    }


    if (clearBtn) {

        clearBtn.addEventListener(
            "click",
            clearText
        );

    }


    /* =====================================================
       BUTTON STATE
    ===================================================== */

    function setButtonState(
        button,
        temporaryText,
        originalText,
        duration
    ) {

        if (!button) {
            return;
        }

        button.textContent =
            temporaryText;

        button.disabled = true;


        setTimeout(() => {

            button.textContent =
                originalText;

            button.disabled = false;

        }, duration);

    }


    /* =====================================================
       MESSAGE SYSTEM
    ===================================================== */

    function showMessage(message, type = "info") {

        /*
           Use an existing ToolHub notification system
           if one exists.
        */

        if (
            typeof window.showToast === "function"
        ) {

            window.showToast(
                message,
                type
            );

            return;

        }


        /*
           Fallback.
        */

        alert(message);

    }


    /* =====================================================
       LIVE INPUT
    ===================================================== */

    text.addEventListener(
        "input",
        updateStats
    );


    /* =====================================================
       PASTE DETECTION
    ===================================================== */

    text.addEventListener(
        "paste",
        () => {

            /*
               Wait for pasted text to actually
               enter the textarea.
            */

            setTimeout(
                updateStats,
                0
            );

        }
    );


    /* =====================================================
       DRAG & DROP TEXT
    ===================================================== */

    text.addEventListener(
        "dragover",
        event => {

            event.preventDefault();

        }
    );


    text.addEventListener(
        "drop",
        event => {

            event.preventDefault();

            const droppedText =
                event.dataTransfer?.getData("text/plain");

            if (droppedText) {

                text.value +=
                    droppedText;

                updateStats();

            }

        }
    );


    /* =====================================================
       KEYBOARD SHORTCUTS
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            /*
               Ctrl/CMD + Enter
               → copy text
            */

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key === "Enter"
            ) {

                event.preventDefault();

                copyText();

            }


            /*
               Ctrl/CMD + Shift + X
               → clear
            */

            if (
                (event.ctrlKey || event.metaKey) &&
                event.shiftKey &&
                event.key.toLowerCase() === "x"
            ) {

                event.preventDefault();

                clearText();

            }

        }
    );


    /* =====================================================
       WORD FREQUENCY
    ===================================================== */

    function getWordFrequency() {

        const data =
            analyzeText(text.value);

        return data.repeatedWords;

    }


    /*
       Expose safely for future ToolHub
       features / UI components.
    */

    window.ToolHubWordCounter = {

        analyze() {
            return analyzeText(text.value);
        },

        getWordFrequency,

        getWordCount() {
            return analyzeText(text.value).wordCount;
        },

        getCharacterCount() {
            return analyzeText(text.value).characterCount;
        },

        clear() {
            clearText();
        },

        copy() {
            copyText();
        }

    };


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateStats();

});
