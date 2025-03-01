// Toggle Mobile Menu
function toggleMenu() {
    document.getElementById("menu").classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", function () {
    const words = ["Добредојдовте!", "Кој ја контролира енкрипцијата, ја контролира тајната.",
        "Тие што ја разбираат криптографијата, ја контролираат иднината"];
    const paragraphText = "Најмоќните зборови не се изговорени, туку шифрирани!";

    let i = 0;
    let j = 0;
    let currentWord = "";
    let isDeleting = false;
    const speed = 100;

    function typeEffect() {
        currentWord = words[i];

        if (!isDeleting) {
            document.querySelector(".typed").textContent = currentWord.slice(0, j++);
            if (j > currentWord.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1500);
            } else {
                setTimeout(typeEffect, speed);
            }
        } else {
            document.querySelector(".typed").textContent = currentWord.slice(0, j--);
            if (j === 0) {
                isDeleting = false;
                i = (i + 1) % words.length;
                setTimeout(typeEffect, 500);
            } else {
                setTimeout(typeEffect, speed / 2);
            }
        }
    }

    document.getElementById("hero-text").textContent = paragraphText;
    setTimeout(typeEffect, 1000);
});
function toggleContent(link) {
    var parent = link.closest(".cipher"); // Наоѓа родителскиот .cipher
    var moreContent = parent.querySelector("[class^='moreContent-']"); // Бара елемент кој почнува со 'moreContent-'

    if (moreContent.style.display === "none" || moreContent.style.display === "") {
        moreContent.style.display = "block";
        link.textContent = "Сокриј 🔽"; // Менува текст
    } else {
        moreContent.style.display = "none";
        link.textContent = "🔍 Види повеќе";
    }
}
