const texts = [
    "I love everyone",
    "💝9/7💝",
    "Kim Đồng",
    "2021-2025",
    "Đậu Nguyện Vọng 1",
    "Wǒ ài nǐ",
    "Mãi nhớ mng ",
    "Cố gắng nhé !",
];

let images = [
    "https://drive.google.com/file/d/1iY7cZhSSXQMFMJ5Kjf9NJL8UL5fWcyWC/view?usp=drivesdk",
    "https://drive.google.com/file/d/1hOzwCosCFc2CPVi93OudvZvg3RmcWmEc/view?usp=drivesdk",
    "https://drive.google.com/file/d/1ebXy5QIsrRatvzqPMlwawOTPCI1dY3A2/view?usp=drivesdk",
];

const scene = document.getElementById("scene");
let rotateX = 0, rotateY = 0;
let targetRotateX = 0, targetRotateY = 0;
const maxRotate = 30;

document.addEventListener("mousemove", (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    targetRotateY = ((e.clientX - centerX) / centerX) * maxRotate;
    targetRotateX = ((e.clientY - centerY) / centerY) * maxRotate;
});

let touchStartX = 0, touchStartY = 0;
document.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    targetRotateY = ((touchX - centerX) / centerX) * maxRotate;
    targetRotateX = ((touchY - centerY) / centerY) * maxRotate;
});

function updateRotation() {
    rotateX += (targetRotateX - rotateX) * 0.1;
    rotateY += (targetRotateY - rotateY) * 0.1;
    scene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    requestAnimationFrame(updateRotation);
}
updateRotation();

function createFallingText(initial = false) {
    const text = document.createElement("div");
    text.className = `falling-text text-${Math.floor(Math.random() * 3) + 1}`;
    text.innerText = texts[Math.floor(Math.random() * texts.length)];

    const startX = Math.random() * window.innerWidth;
    const zLayer = Math.random() * 400 - 200;
    text.style.left = startX + "px";
    text.style.fontSize = `${Math.random() * 20 + 18}px`;
    text.style.transform = `translateZ(${zLayer}px)`;

    // Xuất hiện ở vị trí ngẫu nhiên hoặc ở trên cùng
    const randomStart = Math.random() < 0.5; // 50% bắt đầu từ vị trí ngẫu nhiên
    const startY = randomStart
        ? Math.random() * window.innerHeight // Ngẫu nhiên trong màn hình
        : -50; // Từ trên rơi xuống

    text.style.top = startY + "px";
    scene.appendChild(text);

    let posY = startY;
    const speed = Math.random() * 2 + 0.5;

    function animate() {
        posY += speed;
        text.style.top = posY + "px";

        if (posY > window.innerHeight + 50) {
            text.remove();
        } else {
            requestAnimationFrame(animate);
        }
    }

    animate();
}


function createHeart(initial = false, initialY = -50) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = `<img src="${images[Math.floor(Math.random() * images.length)]}" alt="♡" />`;//"♡";

    const startX = Math.random() * window.innerWidth;
    const zLayer = Math.random() * 400 - 200;
    heart.style.left = startX + "px";
    heart.style.top = initial ? (Math.random() * window.innerHeight) + "px" : "-50px";
    heart.style.transform = `translateZ(${zLayer}px)`;

    scene.appendChild(heart);

    let posY = initial ? parseFloat(heart.style.top) : -50;
    const speed = Math.random() * 1.5 + 1;

    function animateHeart() {
        posY += speed;
        heart.style.top = posY + "px";

        if (posY > window.innerHeight + 50) {
            heart.remove();
        } else {
            requestAnimationFrame(animateHeart);
        }
    }
    animateHeart();
}

function createRose(initial = false, initialY = -50) {
    const rose = document.createElement("div");
    rose.className = "rose";
    rose.innerText = "🌺";

    const startX = Math.random() * window.innerWidth;
    const zLayer = Math.random() * 400 - 200;
    rose.style.left = startX + "px";
    rose.style.top = initial ? (Math.random() * window.innerHeight) + "px" : "-50px";
    rose.style.transform = `translateZ(${zLayer}px) rotate(${Math.random() * 360}deg)`;

    scene.appendChild(rose);

    let posY = initial ? parseFloat(rose.style.top) : -50;
    const speed = Math.random() * 1.5 + 1;

    function animateRose() {
        posY += speed;
        rose.style.top = posY + "px";

        if (posY > window.innerHeight + 50) {
            rose.remove();
        } else {
            requestAnimationFrame(animateRose);
        }
    }
    animateRose();
}

// Initialize with a higher density of elements
for (let i = 0; i < 30; i++) {
    createFallingText(true);
}
for (let i = 0; i < 10; i++) {
    createHeart(true);
}
for (let i = 0; i < 5; i++) {
    createRose(true);
}

// Increase frequency of new elements
setInterval(createFallingText, 300);
setInterval(createHeart, 1000);
setInterval(createRose, 1000);