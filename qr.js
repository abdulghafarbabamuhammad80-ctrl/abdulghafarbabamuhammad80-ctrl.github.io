/* =========================================================
   TOOLHUB — QR CODE GENERATOR MEGA JS 📱⚡
   Full-featured QR workstation
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const qrText = document.getElementById("qrText");
    const generateBtn = document.getElementById("generateBtn");

    const downloadBtn = document.getElementById("downloadBtn");
    const copyBtn = document.getElementById("copyBtn");
    const shareBtn = document.getElementById("shareBtn");
    const clearBtn = document.getElementById("clearBtn");

    const qrCode = document.getElementById("qrcode");

    const qrStatus = document.getElementById("qrStatus");

    const charCount = document.getElementById("charCount");

    const qrInfoSize = document.getElementById("qrInfoSize");
    const qrInfoCharacters = document.getElementById("qrInfoCharacters");
    const qrInfoType = document.getElementById("qrInfoType");

    const qrSize = document.getElementById("qrSize");
    const qrSizeValue = document.getElementById("qrSizeValue");

    const foregroundColor =
        document.getElementById("foregroundColor");

    const backgroundColor =
        document.getElementById("backgroundColor");

    const foregroundValue =
        document.getElementById("foregroundValue");

    const backgroundValue =
        document.getElementById("backgroundValue");

    const errorCorrection =
        document.getElementById("errorCorrection");

    const includeMargin =
        document.getElementById("includeMargin");

    const livePreview =
        document.getElementById("livePreview");

    const qrHistory =
        document.getElementById("qrHistory");

    const clearHistoryBtn =
        document.getElementById("clearHistoryBtn");


    /* =====================================================
       EXTRA INPUTS
    ===================================================== */

    const urlInput =
        document.getElementById("urlInput");

    const emailInput =
        document.getElementById("emailInput");

    const emailSubject =
        document.getElementById("emailSubject");

    const phoneInput =
        document.getElementById("phoneInput");

    const wifiName =
        document.getElementById("wifiName");

    const wifiPassword =
        document.getElementById("wifiPassword");

    const wifiSecurity =
        document.getElementById("wifiSecurity");

    const wifiHidden =
        document.getElementById("wifiHidden");


    /* =====================================================
       QUICK TYPE BUTTONS
    ===================================================== */

    const typeButtons =
        document.querySelectorAll(".type-btn");


    /* =====================================================
       STATE
    ===================================================== */

    let currentType = "text";

    let generatedData = "";

    let qrHistoryData = [];

    let generationTimeout = null;


    /* =====================================================
       CHARACTER COUNTER
    ===================================================== */

    function updateCharacterCount() {

        const text = getRawInput();

        charCount.textContent = text.length;

        qrInfoCharacters.textContent =
            text.length;

    }


    /* =====================================================
       GET RAW INPUT
    ===================================================== */

    function getRawInput() {

        switch (currentType) {

            case "url":
                return urlInput?.value.trim() || "";

            case "email":
                return emailInput?.value.trim() || "";

            case "phone":
                return phoneInput?.value.trim() || "";

            case "wifi":
                return wifiName?.value.trim() || "";

            default:
                return qrText.value.trim();

        }

    }


    /* =====================================================
       BUILD QR CONTENT
    ===================================================== */

    function buildQRContent() {

        switch (currentType) {

            /* ---------------------------------------------
               TEXT
            --------------------------------------------- */

            case "text":

                return qrText.value.trim();


            /* ---------------------------------------------
               WEBSITE
            --------------------------------------------- */

            case "url": {

                let url =
                    urlInput.value.trim();

                if (!url) return "";

                if (
                    !url.startsWith("http://") &&
                    !url.startsWith("https://")
                ) {

                    url =
                        "https://" + url;

                }

                return url;
            }


            /* ---------------------------------------------
               EMAIL
            --------------------------------------------- */

            case "email": {

                const email =
                    emailInput.value.trim();

                if (!email) return "";

                const subject =
                    emailSubject.value.trim();

                if (subject) {

                    return (
                        "mailto:" +
                        email +
                        "?subject=" +
                        encodeURIComponent(subject)
                    );

                }

                return "mailto:" + email;
            }


            /* ---------------------------------------------
               PHONE
            --------------------------------------------- */

            case "phone": {

                const phone =
                    phoneInput.value.trim();

                if (!phone) return "";

                return "tel:" + phone;
            }


            /* ---------------------------------------------
               WIFI
            --------------------------------------------- */

            case "wifi": {

                const ssid =
                    wifiName.value.trim();

                const password =
                    wifiPassword.value;

                const security =
                    wifiSecurity.value;

                if (!ssid) return "";

                const hidden =
                    wifiHidden.checked
                        ? "true"
                        : "false";

                return (
                    "WIFI:" +
                    "T:" +
                    security +
                    ";" +
                    "S:" +
                    escapeWifi(ssid) +
                    ";" +
                    "P:" +
                    escapeWifi(password) +
                    ";" +
                    "H:" +
                    hidden +
                    ";;"
                );

            }

            default:

                return qrText.value.trim();
        }

    }


    /* =====================================================
       ESCAPE WI-FI CHARACTERS
    ===================================================== */

    function escapeWifi(value) {

        return String(value)
            .replace(/\\/g, "\\\\")
            .replace(/;/g, "\\;")
            .replace(/,/g, "\\,")
            .replace(/:/g, "\\:");

    }


    /* =====================================================
       QR TYPE LABEL
    ===================================================== */

    function getTypeLabel() {

        const labels = {

            text: "Text",
            url: "Website",
            email: "Email",
            phone: "Phone",
            wifi: "Wi-Fi"

        };

        return labels[currentType] || "Text";

    }


    /* =====================================================
       STATUS
    ===================================================== */

    function setStatus(text) {

        if (qrStatus) {

            qrStatus.textContent =
                "● " + text;

        }

    }


    /* =====================================================
       SHOW / HIDE OPTION PANELS
    ===================================================== */

    function updateInputPanels() {

        const panels = {

            url: document.getElementById("urlOptions"),
            email: document.getElementById("emailOptions"),
            phone: document.getElementById("phoneOptions"),
            wifi: document.getElementById("wifiOptions")

        };

        Object.values(panels).forEach(panel => {

            if (panel) {

                panel.classList.add("hidden");

            }

        });


        if (panels[currentType]) {

            panels[currentType]
                .classList
                .remove("hidden");

        }

        qrInfoType.textContent =
            getTypeLabel();

        updateCharacterCount();

    }


    /* =====================================================
       SWITCH TYPE
    ===================================================== */

    typeButtons.forEach(button => {

        button.addEventListener("click", () => {

            typeButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            currentType =
                button.dataset.type || "text";

            updateInputPanels();

            setStatus(
                getTypeLabel() + " mode"
            );

            if (livePreview.checked) {

                scheduleGenerate();

            }

        });

    });


    /* =====================================================
       GENERATE QR
    ===================================================== */

    function generateQR() {

        const content =
            buildQRContent();

        if (!content) {

            setStatus("Waiting for content");

            showMessage(
                "⚠️ Enter something first."
            );

            return false;

        }


        if (typeof QRCode === "undefined") {

            showMessage(
                "❌ QR library failed to load. Check your internet connection."
            );

            setStatus("Library unavailable");

            return false;

        }


        qrCode.innerHTML = "";


        const size =
            Number(qrSize.value);


        const margin =
            includeMargin.checked
                ? 16
                : 0;


        try {

            new QRCode(qrCode, {

                text: content,

                width: size,

                height: size,

                colorDark:
                    foregroundColor.value,

                colorLight:
                    backgroundColor.value,

                correctLevel:
                    getCorrectionLevel()

            });


            generatedData = content;


            qrInfoSize.textContent =
                `${size} × ${size}`;

            qrInfoCharacters.textContent =
                content.length;

            qrInfoType.textContent =
                getTypeLabel();


            setStatus("QR Generated ✓");


            addToHistory(
                content,
                getTypeLabel()
            );


            return true;

        }

        catch (error) {

            console.error(
                "QR generation error:",
                error
            );

            showMessage(
                "❌ Unable to generate this QR code."
            );

            setStatus("Generation failed");

            return false;

        }

    }


    /* =====================================================
       ERROR CORRECTION
    ===================================================== */

    function getCorrectionLevel() {

        if (
            typeof QRCode === "undefined" ||
            !QRCode.CorrectLevel
        ) {

            return 2;

        }


        const levels = {

            L: QRCode.CorrectLevel.L,

            M: QRCode.CorrectLevel.M,

            Q: QRCode.CorrectLevel.Q,

            H: QRCode.CorrectLevel.H

        };


        return (
            levels[errorCorrection.value] ??
            QRCode.CorrectLevel.M
        );

    }


    /* =====================================================
       GENERATE BUTTON
    ===================================================== */

    generateBtn.addEventListener(
        "click",
        generateQR
    );


    /* =====================================================
       MESSAGE INSIDE PREVIEW
    ===================================================== */

    function showMessage(message) {

        qrCode.innerHTML = "";

        const div =
            document.createElement("div");

        div.className =
            "qr-placeholder";

        const span =
            document.createElement("span");

        span.textContent = "▦";

        const p =
            document.createElement("p");

        p.textContent = message;

        div.appendChild(span);

        div.appendChild(p);

        qrCode.appendChild(div);

    }


    /* =====================================================
       DOWNLOAD QR
    ===================================================== */

    downloadBtn.addEventListener(
        "click",
        () => {

            const canvas =
                qrCode.querySelector("canvas");

            const image =
                qrCode.querySelector("img");


            if (!canvas && !image) {

                showMessage(
                    "⚠️ Generate a QR code first."
                );

                return;

            }


            let dataURL;


            if (canvas) {

                dataURL =
                    canvas.toDataURL(
                        "image/png"
                    );

            }

            else {

                dataURL =
                    image.src;

            }


            const link =
                document.createElement("a");

            link.href =
                dataURL;

            link.download =
                "ToolHub-QRCode.png";

            document.body.appendChild(link);

            link.click();

            link.remove();


            setStatus("Downloaded ✓");

        }
    );


    /* =====================================================
       COPY QR
    ===================================================== */

    copyBtn.addEventListener(
        "click",
        async () => {

            const canvas =
                qrCode.querySelector("canvas");


            if (!canvas) {

                showMessage(
                    "⚠️ Generate a QR code first."
                );

                return;

            }


            try {

                if (
                    navigator.clipboard &&
                    window.ClipboardItem
                ) {

                    const blob =
                        await new Promise(
                            resolve =>
                                canvas.toBlob(
                                    resolve,
                                    "image/png"
                                )
                        );


                    const item =
                        new ClipboardItem({

                            "image/png": blob

                        });


                    await navigator.clipboard.write([
                        item
                    ]);

                    copyBtn.textContent =
                        "✅ Copied!";

                    setTimeout(() => {

                        copyBtn.textContent =
                            "📋 Copy QR";

                    }, 1800);

                }

                else {

                    showMessage(
                        "⚠️ Your browser doesn't support copying QR images."
                    );

                }

            }

            catch (error) {

                console.error(error);

                showMessage(
                    "❌ Unable to copy QR image."
                );

            }

        }
    );


    /* =====================================================
       SHARE QR
    ===================================================== */

    shareBtn.addEventListener(
        "click",
        async () => {

            if (!generatedData) {

                showMessage(
                    "⚠️ Generate a QR code first."
                );

                return;

            }


            try {

                if (navigator.share) {

                    await navigator.share({

                        title:
                            "ToolHub QR Code",

                        text:
                            generatedData

                    });

                    setStatus("Shared ✓");

                }

                else {

                    await navigator.clipboard.writeText(
                        generatedData
                    );

                    shareBtn.textContent =
                        "📋 Content Copied";

                    setTimeout(() => {

                        shareBtn.textContent =
                            "📤 Share";

                    }, 1800);

                }

            }

            catch (error) {

                if (
                    error.name !==
                    "AbortError"
                ) {

                    console.error(error);

                }

            }

        }
    );


    /* =====================================================
       CLEAR CURRENT QR
    ===================================================== */

    clearBtn.addEventListener(
        "click",
        () => {

            qrText.value = "";

            urlInput.value = "";

            emailInput.value = "";

            emailSubject.value = "";

            phoneInput.value = "";

            wifiName.value = "";

            wifiPassword.value = "";

            wifiHidden.checked = false;

            generatedData = "";

            qrCode.innerHTML = "";

            showMessage(
                "No QR code generated yet."
            );

            updateCharacterCount();

            setStatus("Ready");

        }
    );


    /* =====================================================
       CLEAR HISTORY
    ===================================================== */

    clearHistoryBtn.addEventListener(
        "click",
        () => {

            qrHistoryData = [];

            renderHistory();

            setStatus(
                "History cleared"
            );

        }
    );


    /* =====================================================
       HISTORY
    ===================================================== */

    function addToHistory(
        content,
        type
    ) {

        const exists =
            qrHistoryData.some(
                item =>
                    item.content === content
            );


        if (exists) return;


        qrHistoryData.unshift({

            content,

            type,

            time:
                new Date().toLocaleTimeString(
                    [],
                    {
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                )

        });


        if (
            qrHistoryData.length > 8
        ) {

            qrHistoryData =
                qrHistoryData.slice(0, 8);

        }


        renderHistory();

    }


    function renderHistory() {

        qrHistory.innerHTML = "";


        if (
            qrHistoryData.length === 0
        ) {

            const empty =
                document.createElement("div");

            empty.className =
                "empty-history";

            const icon =
                document.createElement("span");

            icon.textContent = "▦";

            const text =
                document.createElement("p");

            text.textContent =
                "No QR codes generated yet.";

            empty.appendChild(icon);

            empty.appendChild(text);

            qrHistory.appendChild(empty);

            return;

        }


        qrHistoryData.forEach(
            (item, index) => {

                const card =
                    document.createElement("div");

                card.className =
                    "history-item";


                const title =
                    document.createElement("strong");

                title.textContent =
                    `${index + 1}. ${item.type}`;


                const content =
                    document.createElement("p");

                content.textContent =
                    item.content;


                const time =
                    document.createElement("small");

                time.textContent =
                    item.time;


                card.appendChild(title);

                card.appendChild(content);

                card.appendChild(time);


                card.addEventListener(
                    "click",
                    () => {

                        loadHistoryItem(
                            item
                        );

                    }
                );


                qrHistory.appendChild(card);

            }
        );

    }


    /* =====================================================
       LOAD HISTORY ITEM
    ===================================================== */

    function loadHistoryItem(item) {

        currentType =
            item.type.toLowerCase();

        const matchingButton =
            [...typeButtons]
                .find(
                    btn =>
                        btn.textContent
                            .toLowerCase()
                            .includes(
                                currentType
                            )
                );


        if (matchingButton) {

            typeButtons.forEach(
                btn =>
                    btn.classList.remove(
                        "active"
                    )
            );

            matchingButton.classList.add(
                "active"
            );

        }


        if (currentType === "website") {

            currentType = "url";

        }

        if (currentType === "text") {

            qrText.value =
                item.content;

        }

        else if (currentType === "url") {

            urlInput.value =
                item.content;

        }

        else {

            qrText.value =
                item.content;

        }


        updateInputPanels();

        generateQR();

    }


    /* =====================================================
       LIVE PREVIEW
    ===================================================== */

    function scheduleGenerate() {

        clearTimeout(
            generationTimeout
        );


        generationTimeout =
            setTimeout(() => {

                if (
                    buildQRContent()
                ) {

                    generateQR();

                }

            }, 350);

    }


    /* =====================================================
       INPUT EVENTS
    ===================================================== */

    const liveInputs =
        document.querySelectorAll(
            "input, textarea, select"
        );


    liveInputs.forEach(
        input => {

            input.addEventListener(
                "input",
                () => {

                    updateCharacterCount();

                    if (
                        input === qrSize
                    ) {

                        qrSizeValue.textContent =
                            `${qrSize.value}px`;

                    }


                    if (
                        input === foregroundColor
                    ) {

                        foregroundValue.textContent =
                            foregroundColor.value
                                .toUpperCase();

                    }


                    if (
                        input === backgroundColor
                    ) {

                        backgroundValue.textContent =
                            backgroundColor.value
                                .toUpperCase();

                    }


                    if (
                        livePreview.checked &&
                        buildQRContent()
                    ) {

                        scheduleGenerate();

                    }

                }
            );


            input.addEventListener(
                "change",
                () => {

                    updateCharacterCount();

                    if (
                        livePreview.checked &&
                        buildQRContent()
                    ) {

                        generateQR();

                    }

                }
            );

        }
    );


    /* =====================================================
       SIZE DISPLAY
    ===================================================== */

    qrSize.addEventListener(
        "input",
        () => {

            qrSizeValue.textContent =
                `${qrSize.value}px`;

        }
    );


    /* =====================================================
       ENTER / CTRL + ENTER
    ===================================================== */

    qrText.addEventListener(
        "keydown",
        event => {

            if (
                event.ctrlKey &&
                event.key === "Enter"
            ) {

                event.preventDefault();

                generateQR();

            }

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateInputPanels();

    updateCharacterCount();

    qrSizeValue.textContent =
        `${qrSize.value}px`;

    foregroundValue.textContent =
        foregroundColor.value.toUpperCase();

    backgroundValue.textContent =
        backgroundColor.value.toUpperCase();

    renderHistory();

    setStatus("Ready");

});
