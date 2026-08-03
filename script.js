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
    {
        name: "Password Generator",
        url: "password.html",
        keywords: ["password","generate password","strong password","secure password"]
    },
    {
        name: "QR Code Generator",
        url: "qr.html",
        keywords: ["qr","qr code","barcode"]
    },
    {
        name: "Word Counter",
        url: "wordcounter.html",
        keywords: ["word counter","count words","words"]
    },
    {
        name: "Age Calculator",
        url: "age.html",
        keywords: ["age","birthday","calculate age"]
    },
    {
        name: "Percentage Calculator",
        url: "percentage.html",
        keywords: ["percentage","percent","calculate percentage"]
    },
    {
        name: "Random Number",
        url: "random.html",
        keywords: ["random number","random"]
    },
    {
        name: "Coin Flip",
        url: "coin.html",
        keywords: ["coin","flip coin","heads","tails"]
    },
    {
        name: "Colour Picker",
        url: "color.html",
        keywords: ["colour","color","pick color","hex"]
    },
    {
        name: "Unit Converter",
        url: "converter.html",
        keywords: ["convert","unit","converter"]
    },
    {
        name: "Stopwatch & Timer",
        url: "stopwatch.html",
        keywords: ["timer","stopwatch","countdown"]
    },
    {
        name: "Text Case Converter",
        url: "textcase.html",
        keywords: ["uppercase","lowercase","title case","text case"]
    },
    {
        name: "Character Counter",
        url: "charactercount.html",
        keywords: ["characters","letters","character counter"]
    },
    {
        name: "JSON Formatter",
        url: "jsonformatter.html",
        keywords: ["json","format json","beautify json"]
    },
    {
        name: "URL Encoder / Decoder",
        url: "urltool.html",
        keywords: ["url","encode","decode"]
    },
    {
        name: "Image Resizer",
        url: "resizer.html",
        keywords: ["resize image","image","photo","resize photo"]
    }
];
// Hubby conversation memory
let chatHistory = [
    {
        role: "system",
        content: "You are Hubby AI, the friendly assistant for ToolHub. Be helpful, accurate, and concise. If someone asks about ToolHub's tools, answer using the tools available on the website."
    }
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

    const input = text.toLowerCase();

    for (const tool of toolData) {

        for (const keyword of tool.keywords) {

            if (input.includes(keyword)) {

                return tool;

            }

        }

    }

    return null;

}

async function hubbyReply(userText) {

    try {

        const response = await fetch("https://broken-water-7b92.toolhub-help.workers.dev", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: userText
            })
        });

        const data = await response.json();

        return data.reply || "I couldn't think of an answer.";

    } catch (err) {
        return "⚠️ Hubby AI is offline.";
    }

}
async function handleHubbySend() {
    if (!hubbyInput) return;

    const userText = hubbyInput.value.trim();
    if (!userText) return;

    addHubbyMessage(userText, "user");
    hubbyInput.value = "";

    // Remember what the user said
    chatHistory.push({
        role: "user",
        content: userText
    });
const tool = findMatchingTool(userText);

if (tool) {

    addHubbyMessage(
        `🛠️ I found the perfect tool!\nOpening ${tool.name}...`,
        "bot"
    );

    setTimeout(() => {
        window.location.href = tool.url;
    }, 1500);

    return;

}
    try {
        const response = await fetch("https://broken-water-7b92.toolhub-help.workers.dev", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: chatHistory
            })
        });

        const data = await response.json();

        const reply = data.reply || "I couldn't think of an answer.";

        addHubbyMessage(reply, "bot");

        // Remember Hubby's reply
        chatHistory.push({
            role: "assistant",
            content: reply
        });

    } catch (error) {
        console.error(error);
        addHubbyMessage("⚠️ Hubby is offline right now.", "bot");
    }
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
