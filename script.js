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

            if (text.includes(value)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });
}


// ======================
// HUBBY ROBOT
// ======================

const hubby = document.getElementById("hubby");
const hubbyChat = document.getElementById("hubby-chat");

if (hubby && hubbyChat) {

    hubby.addEventListener("click", () => {

        hubbyChat.innerHTML = `
            <h3>🤖 Hubby</h3>

            <p>Hello! I'm Hubby.</p>

            <p>I can help you find the right tool.</p>

            <button onclick="findTool()">🔍 Find Tool</button>

            <button onclick="aboutHubby()">🤖 About Me</button>

            <button id="closeHubby">❌ Close</button>
        `;

        hubbyChat.style.display = "block";

        document
            .getElementById("closeHubby")
            .addEventListener("click", () => {

                hubbyChat.style.display = "none";

            });

    });

}


// ======================
// HUBBY FUNCTIONS
// ======================

function findTool() {

    alert(`🤖 Available tools:

🔑 Password Generator
📱 QR Code Generator
📝 Word Counter
🎂 Age Calculator
📊 Percentage Calculator
🎲 Random Number
🪙 Coin Flip
🎨 Colour Picker
📏 Unit Converter
⏱️ Stopwatch`);

}

function aboutHubby() {

    alert(`🤖 Hi!

I'm Hubby.

I help visitors use ToolHub.

More updates are coming soon! 🚀`);

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
document.addEventListener("DOMContentLoaded", async () => {
    const visitor = document.getElementById("visitor-counter");
    if (!visitor || typeof Counter === "undefined") return;

    const counter = new Counter({
        workspace: "Abdulghafar Baba Muhammad's Workspace"
    });

    try {
        const result = await counter.up("first-counter-4853");
        visitor.textContent = `👥 Visitors: ${result.value}`;
    } catch (error) {
        console.error(error);
        visitor.textContent = "👥 Visitors: error";
    }
});

});
