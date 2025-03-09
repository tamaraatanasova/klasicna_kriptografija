function caesarEncrypt() {
    let shift = parseInt(document.getElementById("shift").value);
    
    if (shift < 1 || shift > 26) {
        alert("Внесете број помеѓу 1 и 26!");
        return;
    }

    let text = document.getElementById("inputText").value.toUpperCase();
    let result = "";

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (char >= 'A' && char <= 'Z') {
            let newChar = String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
            result += newChar;
        } else {
            result += char;
        }
    }

    document.getElementById("result").innerText = result;
}

function caesarDecrypt() {
    let shift = parseInt(document.getElementById("shift").value);

    if (shift < 1 || shift > 26) {
        alert("Внесете број помеѓу 1 и 26!");
        return;
    }

    let text = document.getElementById("inputText").value.toUpperCase();
    let result = "";

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (char >= 'A' && char <= 'Z') {
            let newChar = String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
            result += newChar;
        } else {
            result += char;
        }
    }

    document.getElementById("result").innerText = result;
}
