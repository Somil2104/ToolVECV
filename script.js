const qrReader = new Html5Qrcode("qr-reader");

qrReader.start(
    { facingMode: "environment" }, 
    {
        fps: 10, 
        qrbox: { width: 250, height: 250 }, 
    },
    (decodedText) => {
        document.getElementById("result").innerHTML = `
            <p>Scanned URL: <a href="${decodedText}" target="_blank">${decodedText}</a></p>
        `;
        qrReader.stop();
    },
    (error) => {
        console.log(`QR code scan failed: ${error}`);
    }
).catch((err) => {
    console.error(`Error initializing QR scanner: ${err}`);
});
