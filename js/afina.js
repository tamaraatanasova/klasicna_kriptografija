function modInverse(a, m) {
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x;
    }
    return -1;
}

function encrypt() {
    let textInput = document.getElementById("inputText").value;
    if (!textInput || textInput.trim() === "") {
        alert("Ве молиме внесете текст!");
        return;
    }
    
    if (/\d/.test(textInput)) {
        alert("Ве молиме внесете само букви, бројки не се дозволени!");
        return;
    }

    let text = textInput.toUpperCase().replace(/[^A-Z]/g, "");
    
    let keyAInput = document.getElementById("keyA").value;
    let keyBInput = document.getElementById("keyB").value;
    if (keyAInput === "" || keyBInput === "") {
        alert("Ве молиме внесете ги и двата клуча (A и B)!");
        return;
    }
    
    let a = parseInt(keyAInput);
    let b = parseInt(keyBInput);
    
    if (isNaN(a) || isNaN(b)) {
        alert("Клучевите мора да бидат броеви!");
        return;
    }
    
    if (modInverse(a, 26) === -1) {
        alert("Клучот A мора да биде инверзен по модул 26. Внесете друг клуч!");
        return;
    }
    
    let numericText = [];
    for (let i = 0; i < text.length; i++) {
        numericText.push(text.charCodeAt(i) - 65);
    }
    
    let step1 = "📌 1. Конверзија во броеви: " + numericText.join(", ");
    let step2 = "📌 2. Клучна формула: E(x) = (A * x + B) mod 26<br>" +
                "Клуч A = " + a + ", Клуч B = " + b;
    
    let encryptedText = "";
    let newNumbers = [];
    
    for (let i = 0; i < numericText.length; i++) {
        let x = numericText[i];
        let y = ((a * x + b) % 26 + 26) % 26;
        newNumbers.push(y);
        encryptedText += String.fromCharCode(y + 65);
    }
    
    let step3 = "📌 3. Пресметка (A * x + B) mod 26: " + newNumbers.join(", ");
    let step4 = "📌 4. Конверзија назад во букви: " + encryptedText;
    
    document.getElementById("result").innerText = encryptedText;
    document.getElementById("step1").innerHTML = step1;
    document.getElementById("step2").innerHTML = step2;
    document.getElementById("step3").innerHTML = step3;
    document.getElementById("step4").innerHTML = step4;
    
    document.getElementById("showStepsBtn").style.display = "inline-block";
    document.getElementById("steps").style.display = "none";
}

function decrypt() {
    let textInput = document.getElementById("inputText").value;
    if (!textInput || textInput.trim() === "") {
        alert("Ве молиме внесете шифриран текст!");
        return;
    }
    
    if (/\d/.test(textInput)) {
        alert("Ве молиме внесете само букви, бројки не се дозволени!");
        return;
    }
    
    let text = textInput.toUpperCase().replace(/[^A-Z]/g, "");
    
    let keyAInput = document.getElementById("keyA").value;
    let keyBInput = document.getElementById("keyB").value;
    if (keyAInput === "" || keyBInput === "") {
        alert("Ве молиме внесете ги и двата клуча (A и B)!");
        return;
    }
    
    let a = parseInt(keyAInput);
    let b = parseInt(keyBInput);
    
    if (isNaN(a) || isNaN(b)) {
        alert("Клучевите мора да бидат броеви!");
        return;
    }
    
    let a_inv = modInverse(a, 26);
    if (a_inv === -1) {
        alert("Клучот A не е инверзен мод 26. Внесете друг клуч!");
        return;
    }
    
    let numericText = [];
    for (let i = 0; i < text.length; i++) {
        numericText.push(text.charCodeAt(i) - 65);
    }
    
    let step1 = "📌 1. Конверзија во броеви: " + numericText.join(", ");
    let step2 = "📌 2. Клучна формула за дешифрирање: D(y) = A⁻¹ * (y - B) mod 26<br>" +
                "A⁻¹ = " + a_inv + ", Клуч B = " + b;
    
    let decryptedText = "";
    let newNumbers = [];
    
    for (let i = 0; i < numericText.length; i++) {
        let y = numericText[i];
        let x = ((a_inv * (y - b)) % 26 + 26) % 26;
        newNumbers.push(x);
        decryptedText += String.fromCharCode(x + 65);
    }
    
    let step3 = "📌 3. Пресметка A⁻¹ * (y - B) mod 26: " + newNumbers.join(", ");
    let step4 = "📌 4. Конверзија назад во букви: " + decryptedText;
    
    document.getElementById("result").innerText = decryptedText;
    document.getElementById("step1").innerHTML = step1;
    document.getElementById("step2").innerHTML = step2;
    document.getElementById("step3").innerHTML = step3;
    document.getElementById("step4").innerHTML = step4;
    
    document.getElementById("showStepsBtn").style.display = "inline-block";
    document.getElementById("steps").style.display = "none";
}

function showSteps() {
    let stepsDiv = document.getElementById("steps");
    if (stepsDiv.style.display === "none" || stepsDiv.innerHTML === "") {
        stepsDiv.style.display = "block";
    } else {
        stepsDiv.style.display = "none";
    }
}
