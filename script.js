const canvas = document.getElementById('runic-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.onresize = resizeCanvas;
resizeCanvas();

const runes = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚻᛁᛉᛊᛏᛒᛖᛗᛚᛜᛟᛞ';
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(-1);

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#FFA500'; // Orange color
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = runes[Math.floor(Math.random() * runes.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

function animate() {
    draw();
    requestAnimationFrame(animate);
}

animate();

// Dropdown menu functionality
const dropdownBtn = document.getElementById('dropdown-btn');
const dropdownContent = document.getElementById('dropdown-content');

dropdownBtn.addEventListener('click', () => {
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    dropdownBtn.classList.add('explode');
    setTimeout(() => {
        dropdownBtn.classList.remove('explode');
    }, 500);
});

window.addEventListener('click', (event) => {
    if (!event.target.matches('#dropdown-btn')) {
        dropdownContent.style.display = 'none';
    }
});

// Cloudinary Gallery Functionality
const cloudinaryConfig = {
    cloudName: 'labradojo',
    apiKey: '824359521237755',
    apiSecret: 'nQQs4wW5HBGPd4_xY6tta-bEsho',
    folder: 'Recursed'
};

let galleryImages = [];
let currentIndex = 0;

async function fetchImages() {
    try {
        const response = await axios.get(`https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/list/${cloudinaryConfig.folder}.json`);
        galleryImages = response.data.resources.map(resource => resource.secure_url);
        updateGalleryImage();
    } catch (error)
