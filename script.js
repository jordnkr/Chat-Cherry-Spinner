const canvas = document.getElementById("spinnerCanvas");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");

const spinnerOptions = [
  { value: 1, color: '#000', label: '1' },
  { value: 2, color: '#f00', label: '2' },
  { value: 3, color: '#000', label: '3' },
  { value: 4, color: '#f00', label: '4' },
  { value: -2, color: '#000', label: 'Bird/Dog' },
  { value: 'reset', color: '#f00', label: 'Spilled Bucket' },
];

function drawSpinner(angle) {
  const radius = canvas.width / 2;
  const sections = spinnerOptions.length;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < sections; i++) {
    const option = spinnerOptions[i];
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius, (angle + (i * 2 * Math.PI) / sections), (angle + ((i + 1) * 2 * Math.PI) / sections), false);
    ctx.closePath();
    ctx.fillStyle = option.color;
    ctx.fill();

    // Draw the label
    const labelAngle = angle + ((i + 0.5) * 2 * Math.PI) / sections;
    const labelX = radius + (radius / 2) * Math.cos(labelAngle);
    const labelY = radius + (radius / 2) * Math.sin(labelAngle);
    ctx.fillStyle = '#fff';
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(option.label, labelX, labelY);
  }
}

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
