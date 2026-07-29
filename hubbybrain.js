// ======================
// HUBBY BRAIN v1.0
// ======================

const HubbyBrain = {

    version: "1.0",

    name: "Hubby",

    greeting: "Hello, human 👋",

    knowledge: [

        {
            keywords: ["password", "secure", "strong password"],
            answer: "🔑 You should use the Password Generator."
        },

        {
            keywords: ["qr", "qr code", "barcode"],
            answer: "📱 The QR Code Generator can create QR codes instantly."
        },

        {
            keywords: ["age", "birthday"],
            answer: "🎂 Use the Age Calculator."
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
