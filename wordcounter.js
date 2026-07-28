const text = document.getElementById("text");

const words = document.getElementById("words");
const characters = document.getElementById("characters");
const noSpaces = document.getElementById("noSpaces");
const sentences = document.getElementById("sentences");
const paragraphs = document.getElementById("paragraphs");
const reading = document.getElementById("reading");

const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

text.addEventListener("input", updateStats);

function updateStats(){

    const value = text.value;

    // Characters
    characters.textContent = value.length;

    // Characters without spaces
    noSpaces.textContent = value.replace(/\s/g,"").length;

    // Words
    const wordList = value.trim() === ""
        ? []
        : value.trim().split(/\s+/);

    words.textContent = wordList.length;

    // Sentences
    const sentenceList = value.match(/[^.!?]+[.!?]+/g);
    sentences.textContent = sentenceList ? sentenceList.length : 0;

    // Paragraphs
    const paragraphList = value.trim() === ""
        ? []
        : value.trim().split(/\n+/);

    paragraphs.textContent = paragraphList.length;

    // Reading time (about 200 words per minute)
    const minutes = Math.max(1, Math.ceil(wordList.length / 200));

    reading.textContent = wordList.length === 0
        ? "0 min"
        : minutes + " min";

}

copyBtn.addEventListener("click", () => {

    if(text.value.trim() === ""){
        alert("Nothing to copy!");
        return;
    }

    navigator.clipboard.writeText(text.value);

    copyBtn.textContent = "✅ Copied!";

    setTimeout(() => {
        copyBtn.textContent = "📋 Copy";
    }, 2000);

});

clearBtn.addEventListener("click", () => {

    text.value = "";
    updateStats();

});