// ======================
// TOOLHUB VISITOR COUNTER
// ======================

document.addEventListener("DOMContentLoaded", async () => {

    const counter = document.getElementById("visitor-counter");

    if (!counter) return;

    counter.textContent = "👥 Visitors: Loading...";

    try {

        const response = await fetch(
            "https://api.countapi.xyz/hit/toolhub-abdulghafar/visits",
            {
                cache: "no-store"
            }
        );

        if (!response.ok) throw new Error();

        const data = await response.json();

        counter.textContent = `👥 Visitors: ${data.value}`;

    } catch (err) {

        console.warn("Visitor counter offline");

        let local = Number(localStorage.getItem("toolhub_offline_visitors") || 0);

        local++;

        localStorage.setItem("toolhub_offline_visitors", local);

        counter.textContent = `👥 Visitors: ${local} (offline)`;

    }

});
