const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const upload = document.getElementById('upload');
const brightness = document.getElementById('brightness');
const contrast = document.getElementById('contrast');

let originalImage = new Image();

// Image Upload Logic
upload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
        originalImage.src = reader.result;
    }
    reader.readAsDataURL(file);
});

originalImage.onload = () => {
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;
    render();
};

// Rendering Function with Filters
function render() {
    ctx.filter = `brightness(${brightness.value}%) contrast(${contrast.value}%)`;
    ctx.drawImage(originalImage, 0, 0);
}

// Update on Slider Change
[brightness, contrast].forEach(slider => {
    slider.addEventListener('input', render);
});

// Download Function
document.getElementById('download').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'edited-photo.png';
    link.href = canvas.toDataURL();
    link.click();
});

function applyFilter(filterStr) {
    ctx.filter = filterStr;
    ctx.drawImage(originalImage, 0, 0);
}
