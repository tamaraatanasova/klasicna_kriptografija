const firstHalf = 'ABCDEFGHIJKLM';  
const secondHalf = 'NOPQRSTUVWXYZ'; 

function albamEncrypt() {
    let inputText = document.getElementById('inputText').value.toUpperCase();
    let result = '';

    for (let i = 0; i < inputText.length; i++) {
        let char = inputText[i];

        if (firstHalf.includes(char)) {
            result += secondHalf[firstHalf.indexOf(char)];
        }
        else if (secondHalf.includes(char)) {
            result += firstHalf[secondHalf.indexOf(char)];
        }
        else {
            result += char;  
        }
    }

    document.getElementById('result').innerText = result;
}