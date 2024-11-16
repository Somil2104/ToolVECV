let qrReader;
let isScanning = false;
document.getElementById("start-scan-btn").addEventListener("click", () => {
    if (!isScanning) {
        startScan();
    }
});
document.getElementById("stop-scan-btn").addEventListener("click", () => {
    if (isScanning) {
        stopScan();
    }
});
function startScan() {
    qrReader = new Html5Qrcode("qr-reader");
    qrReader
        .start(
            { facingMode: "environment" },
            {
                fps: 10, 
                qrbox: { width: 250, height: 250 }, 
            },
            (decodedText) => {
                document.getElementById("result").innerHTML = `
                    <p>Scanned URL: <a href="${decodedText}" target="_blank">${decodedText}</a></p>
                `;
                stopScan();
            },
            (error) => {
                console.log(`Scanning error: ${error}`);
            }
        )
        .then(() => {
            document.getElementById("qr-reader").style.display = "block";
            document.getElementById("start-scan-btn").style.display = "none";
            document.getElementById("stop-scan-btn").style.display = "inline-block";
            isScanning = true;
        })
        .catch((err) => {
            console.error(`Error initializing scanner: ${err}`);
        });
}
function stopScan() {
    if (qrReader) {
        qrReader.stop().then(() => {
            document.getElementById("qr-reader").style.display = "none";
            document.getElementById("start-scan-btn").style.display = "inline-block";
            document.getElementById("stop-scan-btn").style.display = "none";
            isScanning = false;
        });
    }
}
