const qrText = document.getElementById("qrText");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");
const qrCode = document.getElementById("qrcode");

generateBtn.addEventListener("click", () => {

    if (qrText.value.trim() === "") {
        alert("Please enter some text or a website link.");
        return;
    }

    qrCode.innerHTML = "";

    new QRCode(qrCode, {
        text: qrText.value,
        width: 200,
        height: 200
    });

});

downloadBtn.addEventListener("click", () => {

    const img = qrCode.querySelector("img");

    if (!img) {
        alert("Generate a QR code first!");
        return;
    }

    const link = document.createElement("a");
    link.href = img.src;
    link.download = "ToolHub-QRCode.png";
    link.click();

});

clearBtn.addEventListener("click", () => {

    qrText.value = "";
    qrCode.innerHTML = "";

});