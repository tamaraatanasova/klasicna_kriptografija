function atbashEncrypt() {
    let inputText = document.getElementById('inputText').value.toUpperCase();
    let result = '';
    
    for (let i = 0; i < inputText.length; i++) {
        if (/[A-Z]/.test(inputText[i])) {
            result += String.fromCharCode(155 - inputText.charCodeAt(i));
        } else {
            result += inputText[i];
        }
    }
    
    document.getElementById('result').innerText = result;
}
