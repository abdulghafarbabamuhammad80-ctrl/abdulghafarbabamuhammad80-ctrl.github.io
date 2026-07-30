// ======================
// SEARCH BAR
// ======================

const search = document.getElementById("search");

if (search) {
    search.addEventListener("input", () => {
        const value = search.value.toLowerCase();
        const cards = document.querySelectorAll(".tool-card");

        cards.forEach(card => {
            const text = card.innerText.toLowerCase();
            card.style.display = text.includes(value) ? "block" : "none";
        });
    });
}


// ======================
// SMART HUBBY AI
// ======================

const hubby = document.getElementById("hubby");
const hubbyOverlay = document.getElementById("hubby-overlay");
const hubbyMessages = document.getElementById("hubby-messages");
const hubbyInput = document.getElementById("hubby-input");
const hubbySend = document.getElementById("hubby-send");
const closeHubby = document.getElementById("closeHubby");

const toolData = [
    { name: "Password Generator", url: "password.html", keywords: ["password", "pass", "secure", "strong"] },
    { name: "QR Code Generator", url: "qr.html", keywords: ["qr", "barcode", "code"] },
    { name: "Word Counter", url: "wordcounter.html", keywords: ["word", "count", "characters", "character"] },
    { name: "Age Calculator", url: "age.html", keywords: ["age", "birthday", "born"] },
    { name: "Percentage Calculator", url: "percentage.html", keywords: ["percentage", "percent", "%"] },
    { name: "Random Number", url: "random.html", keywords: ["random", "number"] },
    { name: "Coin Flip", url: "coin.html", keywords: ["coin", "flip", "head", "tails"] },
    { name: "Colour Picker", url: "color.html", keywords: ["colour", "color", "pick"] },
    { name: "Unit Converter", url: "converter.html", keywords: ["unit", "convert", "converter"] },
    { name: "Stopwatch & Timer", url: "stopwatch.html", keywords: ["stopwatch", "timer", "time"] },
    { name: "Text Case Converter", url: "textcase.html", keywords: ["case", "upper", "lower", "title"] },
    { name: "Character Counter", url: "charactercount.html", keywords: ["character", "letters", "count"] },
    { name: "JSON Formatter", url: "jsonformatter.html", keywords: ["json", "format", "formatter"] },
    { name: "URL Encoder / Decoder", url: "urltool.html", keywords: ["url", "encode", "decode", "link"] },
    { name: "Image Resizer", url: "resizer.html", keywords: ["image", "resize", "photo"] }
];

function addHubbyMessage(text, type = "bot") {
    if (!hubbyMessages) return;

    const msg = document.createElement("div");
    msg.className = `hubby-message ${type}`;
    msg.textContent = text;
    hubbyMessages.appendChild(msg);
    hubbyMessages.scrollTop = hubbyMessages.scrollHeight;
}

function openHubby() {
    if (!hubbyOverlay) return;

    hubbyOverlay.classList.add("show");

    document.body.style.overflow = "hidden";

    if (hubbyMessages.children.length === 0) {
        addHubbyMessage("👋 Hello, human!");
        addHubbyMessage("I'm Hubby AI. Ask me anything about ToolHub.");
    }
}

function closeHubbyChat() {
    if (!hubbyOverlay) return;

    hubbyOverlay.classList.remove("show");

    document.body.style.overflow = "";
}

function findMatchingTool(text) {
    const lower = text.toLowerCase();

    for (const tool of toolData) {
        if (tool.keywords.some(keyword => lower.includes(keyword))) {
            return tool;
        }
    }

    return null;
}

function hubbyReply(userText) {
    const text = userText.trim();
    const lower = text.toLowerCase();

    const brainAnswer = searchHubbyBrain(text);

    if (brainAnswer) {
        if (brainAnswer.tool) {
            setTimeout(() => {
                window.location.href = brainAnswer.tool;
            }, 1200);
        }
        return brainAnswer.answer;
    }

    if (!text) {
        return "Type a message and I’ll help you.";
    }

    if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
        return "👋 Hello, human! I’m Hubby AI.";
    }

    if (lower.includes("help") || lower.includes("tools") || lower.includes("what can you do")) {
        return "I can help you find ToolHub tools. Try typing password, qr, age, word, text case, contact, or privacy.";
    }

    return "I didn’t catch that one. Try typing a tool name or ask for help.";
}
function handleHubbySend() {
    if (!hubbyInput) return;

    const userText = hubbyInput.value.trim();
    if (!userText) return;

    addHubbyMessage(userText, "user");

    const reply = hubbyReply(userText);
    setTimeout(() => addHubbyMessage(reply, "bot"), 250);

    hubbyInput.value = "";
    hubbyInput.focus();
}

if (hubby) {
    hubby.addEventListener("click", openHubby);
}

if (closeHubby) {
    closeHubby.addEventListener("click", closeHubbyChat);
}

if (hubbySend) {
    hubbySend.addEventListener("click", handleHubbySend);
}

if (hubbyInput) {
    hubbyInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            handleHubbySend();
        }
    });
}


// ======================
// BACK BUTTON
// ======================

const backButton = document.getElementById("backButton");

if (backButton) {
    backButton.addEventListener("click", () => {
        window.history.back();
    });
}
// ======================
// GLOBAL VISITOR COUNTER
// ======================

document.addEventListener("DOMContentLoaded", async () => {
    const visitor = document.getElementById("visitor-counter");
    if (!visitor) return;

    visitor.textContent = "👥 Visitors: Loading...";

    const timeout = (ms) =>
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), ms)
        );

    try {
        const response = await Promise.race([
            fetch("https://api.countapi.xyz/hit/toolhub-abdulghafar/visits", {
                cache: "no-store"
            }),
            timeout(5000)
        ]);

        if (!response || !response.ok) {
            throw new Error("Counter request failed");
        }

        const data = await response.json();

        if (typeof data.value !== "number") {
            throw new Error("Bad counter response");
        }

        visitor.textContent = `👥 Visitors: ${data.value}`;

    } catch (error) {
        console.log("Visitor counter failed:", error);

        let fallback = localStorage.getItem("toolhub_visitors");

        fallback = fallback ? Number(fallback) + 1 : 1;
        localStorage.setItem("toolhub_visitors", fallback);

        visitor.textContent = `👥 Visitors: ${fallback} (offline)`;
    }
});
