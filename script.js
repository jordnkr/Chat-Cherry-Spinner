const canvas = document.getElementById("spinnerCanvas");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");

// Draw the spinner
function drawSpinner(angle) {
    const radius = canvas.width / 2;
    const sections = 10;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < sections; i++) {
        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, (angle + (i * 2 * Math.PI) / sections), (angle + ((i + 1) * 2 * Math.PI) / sections), false);
        ctx.closePath();
        ctx.fillStyle = i % 2 === 0 ? "#000" : "#ff0000";
        ctx.fill();
    }
}

// Spin the spinner
function spin() {
    const startAngle = Math.random() * Math.PI * 2;
    const endAngle = startAngle + Math.random() * Math.PI * 6 + Math.PI * 4;
    const duration = 3000;

    let startTime = null;

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const angle = startAngle + (endAngle - startAngle) * progress;
        drawSpinner(angle);
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

spinBtn.addEventListener("click", spin);

// Initialize the spinner
drawSpinner(0);
