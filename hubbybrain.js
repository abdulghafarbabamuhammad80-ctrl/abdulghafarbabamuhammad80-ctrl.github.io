// ======================
// HUBBY BRAIN v1.1
// ======================

const HubbyBrain = {
    version: "1.1",
    name: "Hubby",
    greeting: "Hello, human 👋",
    experience: 0,
    adaptation: 0,
    memory: [],
    knowledge: [
        {
            keywords: ["password", "secure", "strong password"],
            answer: "🔑 Opening Password Generator...",
            tool: "password.html"
        },
        {
            keywords: ["qr", "qr code", "barcode"],
            answer: "📱 Opening QR Code Generator...",
            tool: "qr.html"
        },
        {
            keywords: ["age", "birthday"],
            answer: "🎂 Opening the Age Calculator...",
            tool: "age.html"
        },
        {
            keywords: ["word", "words", "count"],
            answer: "📝 Opening the Word Counter...",
            tool: "wordcounter.html"
        },
        {
            keywords: ["text case", "uppercase", "lowercase", "title case"],
            answer: "📝 Opening the Text Case Converter...",
            tool: "textcase.html"
        },
        {
            keywords: ["colour", "color"],
            answer: "🎨 Opening the Colour Picker...",
            tool: "color.html"
        },
        {
            keywords: ["timer", "stopwatch"],
            answer: "⏱️ Opening the Stopwatch & Timer...",
            tool: "stopwatch.html"
        },
        {
            keywords: ["percentage", "percent"],
            answer: "📊 Opening the Percentage Calculator...",
            tool: "percentage.html"
        },
        {
            keywords: ["random", "number"],
            answer: "🎲 Opening the Random Number tool...",
            tool: "random.html"
        },
        {
            keywords: ["coin", "flip", "heads", "tails"],
            answer: "🪙 Opening the Coin Flip tool...",
            tool: "coin.html"
        },
        {
            keywords: ["unit", "convert", "converter"],
            answer: "📏 Opening the Unit Converter...",
            tool: "converter.html"
        },
        {
            keywords: ["about"],
            answer: "📄 Open the About page to learn more about ToolHub.",
            tool: "about.html"
        },
        {
            keywords: ["privacy"],
            answer: "🔒 Open the Privacy Policy page.",
            tool: "privacy.html"
        },
        {
            keywords: ["contact"],
            answer: "📬 Open the Contact page.",
            tool: "contact.html"
        }
    ]
};

function searchHubbyBrain(message) {
    const text = message.toLowerCase();

    for (const fact of HubbyBrain.knowledge) {
        for (const keyword of fact.keywords) {
            if (text.includes(keyword)) {
                HubbyBrain.experience++;
                HubbyBrain.adaptation++;
                return fact;
            }
        }
    }

    return null;
}

console.log(`
🤖 Hubby Brain Loaded

Version: ${HubbyBrain.version}

Knowledge: ${HubbyBrain.knowledge.length}

Status: Online 🟢
`);
