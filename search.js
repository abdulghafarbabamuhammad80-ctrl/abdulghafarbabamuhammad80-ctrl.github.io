// ======================
// TOOL SEARCH
// ======================

const search = document.getElementById("search");

if (search) {

    search.addEventListener("input", () => {

        const value = search.value.trim().toLowerCase();

        document.querySelectorAll(".tool-card").forEach(card => {

            const text = card.innerText.toLowerCase();

            card.style.display = text.includes(value)
                ? ""
                : "none";

        });

    });

}
