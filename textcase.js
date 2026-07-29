const textInput = document.getElementById("textInput");

const upperBtn = document.getElementById("upperBtn");
const lowerBtn = document.getElementById("lowerBtn");
const titleBtn = document.getElementById("titleBtn");
const sentenceBtn = document.getElementById("sentenceBtn");
const invertBtn = document.getElementById("invertBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const downloadBtn = document.getElementById("downloadBtn");
const textStats = document.getElementById("textStats");

// Update character and word count
function updateStats() {

    const text = textInput.value;

    const characters = text.length;

    const words = text.trim() === ""
        ? 0
        : text.trim().split(/\s+/).length;

    textStats.textContent =
        `Characters: ${characters} | Words: ${words}`;
}

textInput.addEventListener("input", updateStats);

// UPPERCASE
upperBtn.onclick = () => {
    textInput.value = textInput.value.toUpperCase();
    updateStats();
};

// lowercase
lowerBtn.onclick = () => {
    textInput.value = textInput.value.toLowerCase();
    updateStats();
};

// Title Case
titleBtn.onclick = () => {

    textInput.value = textInput.value
        .toLowerCase()
        .replace(/\b\w/g, letter => letter.toUpperCase());

    updateStats();
};

// Sentence case
sentenceBtn.onclick = () => {

    const text = textInput.value.toLowerCase();

    textInput.value =
        text.charAt(0).toUpperCase() + text.slice(1);

    updateStats();
};

// Invert Case
invertBtn.onclick = () => {

    let result = "";

    for (let letter of textInput.value) {

        if (letter === letter.toUpperCase()) {

            result += letter.toLowerCase();

        } else {

            result += letter.toUpperCase();

        }

    }

    textInput.value = result;

    updateStats();
};

// Copy
copyBtn.onclick = async () => {

    try {

        await navigator.clipboard.writeText(textInput.value);

        alert("✅ Text copied!");

    } catch {

        alert("❌ Copy failed.");

    }

};
// Download Text
downloadBtn.onclick = () => {

    const blob = new Blob(
        [textInput.value],
        { type: "text/plain" }
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "toolhub-text.txt";

    link.click();

    URL.revokeObjectURL(link.href);

};
// Clear
clearBtn.onclick = () => {

    textInput.value = "";

    updateStats();

};

updateStats();
