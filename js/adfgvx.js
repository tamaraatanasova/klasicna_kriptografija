let lastSteps = "";

function generatePolybiusSquare(key) {
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let uniqueKey = Array.from(new Set(key.toUpperCase().replace(/[^A-Z0-9]/g, "") + alphabet));
    let square = {};
    let reverseSquare = {};
    let adfgvx = "ADFGVX";
    let index = 0;
    let tableHTML = "<table border='1'><tr><th></th>";
    for (let col of adfgvx) {
        tableHTML += `<th>${col}</th>`;
    }
    tableHTML += "</tr>";
    for (let row of adfgvx) {
        tableHTML += `<tr><th>${row}</th>`;
        for (let col of adfgvx) {
            if (index < uniqueKey.length) {
                square[uniqueKey[index]] = row + col;
                reverseSquare[row + col] = uniqueKey[index];
                tableHTML += `<td>${uniqueKey[index]}</td>`;
                index++;
            }
        }
        tableHTML += "</tr>";
    }
    tableHTML += "</table>";
    lastSteps += "<h3>Полибиусов квадрат</h3>" + tableHTML + "<br>";
    return { square, reverseSquare };
}

function encrypt() {
    let text = document.getElementById("inputText").value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    let squareKey = document.getElementById("squareKey").value;
    let transpositionKey = document.getElementById("transpositionKey").value.toUpperCase();
    if (!squareKey || !transpositionKey) { alert("Внесете двата клуча!"); return; }
    
    lastSteps = `<h3>Внесен текст</h3><p>${text}</p>`;
    let { square } = generatePolybiusSquare(squareKey);
    let substitution = text.split('').map(c => square[c] || '').join('');
    
    let substitutionTable = "<table border='1'><tr><th>Оригинал</th><th>Енкрипција</th></tr>";
    text.split('').forEach(c => {
        substitutionTable += `<tr><td>${c}</td><td>${square[c] || ''}</td></tr>`;
    });
    substitutionTable += "</table>";
    lastSteps += "<h3>Шифрирање со Полибиусов квадрат</h3>" + substitutionTable + "<br>";
    
    let columns = transpositionKey.split('').map((c, i) => ({ letter: c, index: i }));
    columns.sort((a, b) => a.letter.localeCompare(b.letter));
    
    let transposition = new Array(substitution.length).fill('');
    let index = 0;
    for (let col of columns) {
        for (let i = col.index; i < substitution.length; i += transpositionKey.length) {
            transposition[i] = substitution[index++];
        }
    }
    let result = transposition.join('');
    document.getElementById("outputText").value = result;
    document.getElementById("showStepsBtn").style.display = "block";
    
    lastSteps += `<h3>Резултат по транспозиција</h3><p>${result}</p>`;
}

function decrypt() {
    let text = document.getElementById("inputText").value;
    let squareKey = document.getElementById("squareKey").value;
    let transpositionKey = document.getElementById("transpositionKey").value.toUpperCase();
    if (!squareKey || !transpositionKey) { alert("Внесете двата клуча!"); return; }
    
    lastSteps = `<h3>Шифриран текст</h3><p>${text}</p>`;
    let { reverseSquare } = generatePolybiusSquare(squareKey);
    let columns = transpositionKey.split('').map((c, i) => ({ letter: c, index: i }));
    columns.sort((a, b) => a.letter.localeCompare(b.letter));
    
    let transposition = new Array(text.length).fill('');
    let index = 0;
    for (let col of columns) {
        for (let i = col.index; i < text.length; i += transpositionKey.length) {
            transposition[index++] = text[i];
        }
    }
    let transposedText = transposition.join('');
    lastSteps += `<h3>Обратна транспозиција</h3><p>${transposedText}</p>`;
    
    let substitutionPairs = transposedText.match(/.{2}/g) || [];
    let originalText = substitutionPairs.map(pair => reverseSquare[pair] || '').join('');
    
    let decryptionTable = "<table border='1'><tr><th>Encrypted</th><th>Decrypted</th></tr>";
    substitutionPairs.forEach(pair => {
        decryptionTable += `<tr><td>${pair}</td><td>${reverseSquare[pair] || ''}</td></tr>`;
    });
    decryptionTable += "</table>";
    
    document.getElementById("outputText").value = originalText;
    document.getElementById("showStepsBtn").style.display = "block";
    lastSteps += "<h3>Декодирање со Полибиусов квадрат</h3>" + decryptionTable;
}

function showSteps() {
    document.getElementById("stepsTable").innerHTML = lastSteps;
    document.getElementById("stepsTable").style.display = "block";
}
