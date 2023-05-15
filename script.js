const canvas = document.getElementById("spinnerCanvas");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");

// Possible outcomes
const outcomes = ["1", "2", "3", "4", "Bird/Dog", "Spilled Bucket"];

// Draw the spinner
function drawSpinner(angle) {
    const radius = canvas.width / 2;
    const sections = outcomes.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < sections; i++) {
        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, (angle + (i * 2 * Math.PI) / sections), (angle + ((i + 1) * 2 * Math.PI) / sections), false);
        ctx.closePath();
        ctx.fillStyle = i % 2 === 0 ? "#000" : "#ff0000";
        ctx.fill();

        // Draw outcome text
        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(angle + ((i + 0.5) * 2 * Math.PI) / sections);
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.fillText(outcomes[i], radius / 2, 0);
        ctx.restore();
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
        } else {
            // Calculate result
            const resultIndex = Math.floor(((endAngle % (Math.PI * 2)) / (Math.PI * 2)) * outcomes.length);
            const result = outcomes[resultIndex];
            displayResult(result);
        }
    }

    requestAnimationFrame(animate);
}

// Display the spin result
function displayResult(result) {
    const resultElement = document.getElementById("result");
    resultElement.textContent = `Result: ${result}`;
}

spinBtn.addEventListener("click", spin);

// Initialize the spinner
drawSpinner(0);
