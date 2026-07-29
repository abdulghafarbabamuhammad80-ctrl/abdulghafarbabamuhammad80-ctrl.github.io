// ======================
// HUBBY BRAIN v1.0
// ======================

const HubbyBrain = {

    version: "1.0",

    name: "Hubby",

    greeting: "Hello, human 👋",

    knowledge: [

        {
    keywords: ["password"],
    answer: "🔑 Opening Password Generator...",
    tool: "password.html"
        },

        {
    keywords: ["qr"],
    answer: "📱 Opening QR Generator...",
    tool: "qr.html"
        },
        {
    keywords: ["age", "birthday"],
    answer: "🎂 Opening the Age Calculator...",
    tool: "age.html"
        },

        {
            keywords: ["word", "words", "count"],
            answer: "📝 The Word Counter counts both words and characters."
        },

        {
            keywords: ["text case", "uppercase", "lowercase"],
            answer: "📝 The Text Case Converter can change your text instantly."
        },

        {
            keywords: ["colour", "color"],
            answer: "🎨 The Colour Picker helps you choose colours."
        },

        {
            keywords: ["timer", "stopwatch"],
            answer: "⏱️ Use the Stopwatch & Timer."
        }

    ],

    experience: 0,

    adaptation: 0

};

// ======================
// SEARCH BRAIN
// ======================

function searchHubbyBrain(message) {

    const text = message.toLowerCase();

    for (const fact of HubbyBrain.knowledge) {

        for (const keyword of fact.keywords) {

            if (text.includes(keyword)) {

                HubbyBrain.experience++;

                return fact.answer;

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
