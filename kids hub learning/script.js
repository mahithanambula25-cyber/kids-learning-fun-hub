// --- TAB SWITCHING LOGIC ---
function switchTab(tabName) {
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('d-none'));
    document.querySelectorAll('.btn-group .btn').forEach(btn => btn.classList.remove('active', 'btn-primary', 'btn-success', 'btn-warning', 'btn-danger'));
    
    document.getElementById('section-' + tabName).classList.remove('d-none');
    
    const activeBtn = document.getElementById('tab-' + tabName);
    activeBtn.classList.add('active');
    if (tabName === 'english') activeBtn.classList.add('btn-primary');
    if (tabName === 'maths') activeBtn.classList.add('btn-success');
    if (tabName === 'telugu') activeBtn.classList.add('btn-warning');
    if (tabName === 'drawing') {
        activeBtn.classList.add('btn-danger');
        resizeCanvas();
    }
}

// --- SPEECH UTILITY (VOICE) ---
function speakText(text, lang = 'en-US') {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.75; // Slower, clear traditional Telugu cadence
        window.speechSynthesis.speak(utterance);
    }
}

// --- ENGLISH ALPHABET SETUP (A TO Z) ---
const alphabets = [
    {l: 'A', w: 'Apple 🍎'}, {l: 'B', w: 'Ball ⚽'}, {l: 'C', w: 'Cat 🐱'}, 
    {l: 'D', w: 'Dog 🐶'}, {l: 'E', w: 'Elephant 🐘'}, {l: 'F', w: 'Fish 🐟'},
    {l: 'G', w: 'Grapes 🍇'}, {l: 'H', w: 'House 🏠'}, {l: 'I', w: 'Ice Cream 🍦'},
    {l: 'J', w: 'Jug 🏺'}, {l: 'K', w: 'Kite 🪁'}, {l: 'L', w: 'Lion 🦁'},
    {l: 'M', w: 'Monkey 🐒'}, {l: 'N', w: 'Nest 🪺'}, {l: 'O', w: 'Owl 🦉'},
    {l: 'P', w: 'Parrot 🦜'}, {l: 'Q', w: 'Queen 👑'}, {l: 'R', w: 'Rose 🌹'},
    {l: 'S', w: 'Sun ☀️'}, {l: 'T', w: 'Tiger 🐅'}, {l: 'U', w: 'Umbrella ☂️'},
    {l: 'V', w: 'Van 🚐'}, {l: 'W', w: 'Watch ⌚'}, {l: 'X', w: 'Xylophone 🪘'},
    {l: 'Y', w: 'Yacht ⛵'}, {l: 'Z', w: 'Zebra 🦓'}
];

const alphabetGrid = document.getElementById('alphabetGrid');
alphabets.forEach(item => {
    let btn = document.createElement('button');
    btn.className = 'btn btn-outline-primary m-1 fw-bold fs-6 px-2 py-1';
    btn.innerText = item.l;
    btn.onclick = () => {
        document.getElementById('letterDisplay').innerText = item.l;
        document.getElementById('letterWord').innerText = item.w;
        speakText(item.l + ", " + item.w, 'en-US');
    };
    alphabetGrid.appendChild(btn);
});

// --- MATHS QUIZ SETUP ---
function generateMathQuiz() {
    let num1 = Math.floor(Math.random() * 5) + 1;
    let num2 = Math.floor(Math.random() * 5) + 1;
    let correctAnswer = num1 + num2;
    
    document.getElementById('mathProblem').innerText = `${num1} + ${num2} = ?`;
    document.getElementById('mathFeedback').innerText = '';
    
    let optionsContainer = document.getElementById('mathOptions');
    optionsContainer.innerHTML = '';
    
    let options = [correctAnswer, correctAnswer + 1, Math.max(1, correctAnswer - 1)].sort(() => Math.random() - 0.5);
    
    options.forEach(opt => {
        let btn = document.createElement('button');
        btn.className = 'btn btn-outline-success fw-bold px-4 py-2 fs-5';
        btn.innerText = opt;
        btn.onclick = () => {
            if (opt === correctAnswer) {
                document.getElementById('mathFeedback').innerText = '🎉 Correct! Great job!';
                speakText('Correct! Great job!', 'en-US');
            } else {
                document.getElementById('mathFeedback').innerText = '❌ Try again!';
                speakText('Try again', 'en-US');
            }
        };
        optionsContainer.appendChild(btn);
    });
}
generateMathQuiz();

// --- TELUGU SETUP (FULL ACHCHULU & HALLULU) ---
const achchulu = [
    {l: 'అ', w: 'అమ్మ (Amma)'}, {l: 'ఆ', w: 'ఆవు (Aavu)'}, 
    {l: 'ఇ', w: 'ఇల్లు (Illu)'}, {l: 'ఈ', w: 'ఈగ (Eega)'}, 
    {l: 'ఉ', w: 'ఉద్యమం (Udyamam)'}, {l: 'ఊ', w: 'ఊయల (Uyyala)'}, 
    {l: 'ఋ', w: 'ఋషి (Rushi)'}, {l: 'ఎ', w: 'ఎలక (Elaka)'}, 
    {l: 'ఏ', w: 'ఏనుగు (Enugu)'}, {l: 'ఐ', w: 'ఐదు (Aidu)'}, 
    {l: 'ఒ', w: 'ఒంటె (Onte)'}, {l: 'ఓ', w: 'ఓడ (Oda)'}, 
    {l: 'ఔ', w: 'ఔషధం (Aushadham)'}, {l: 'అం', w: 'అంపకం (Ampakam)'}, {l: 'అః', w: 'Visarga'}
];

const hallulu = [
    {l: 'క', w: 'కమలం (Kamalam)'}, {l: 'ఖ', w: 'ఖడ్గం (Khadgam)'}, {l: 'గ', w: 'గంప (Gampa)'}, {l: 'ఘ', w: 'ఘటం (Ghatam)'}, {l: 'ఙ', w: 'Nga'},
    {l: 'చ', w: 'చక్రం (Chakram)'}, {l: 'ఛ', w: 'ఛత్రం (Chhatram)'}, {l: 'జ', w: 'జ້ (Jada)'}, {l: 'ఝ', w: 'ఝరి (Jhari)'}, {l: 'ఞ', w: 'Nya'},
    {l: 'ట', w: 'టమోటా (Tomato)'}, {l: 'ఠ', w: 'Katha'}, {l: 'డ', w: 'డమరుకం (Damarukam)'}, {l: 'ఢ', w: 'Dhakka'}, {l: 'ణా', w: 'Bana'},
    {l: 'త', w: 'తల (Thala)'}, {l: 'థ', w: 'Ratham'}, {l: 'ద', w: 'దባ (Daba)'}, {l: 'ధ', w: 'ధనస్సు (Dhanassu)'}, {l: 'న', w: 'నಳ (Nala)'},
    {l: 'ప', w: 'పనస (Panasa)'}, {l: 'ఫ', w: 'Phalam'}, {l: 'బ', w: 'బబ (Bala)'}, {l: 'భ', w: 'భక్షణం (Bhakshanam)'}, {l: 'మ', w: 'మమ (Mama)'},
    {l: 'య', w: 'యజ్ఞం (Yagnam)'}, {l: 'ర', w: 'రథం (Ratham)'}, {l: 'ల', w: 'లత (Latha)'}, {l: 'వ', w: 'వనరు (Vanaru)'},
    {l: 'శ', w: 'శంఖం (Shankham)'}, {l: 'ష', w: 'షట్కోణం (Shatkonam)'}, {l: 'స', w: 'సంచి (Sanchi)'}, {l: 'హ', w: 'హనుమంతుడు (Hanumanthudu)'},
    {l: 'ళ', w: 'ఫళ (Phala)'}, {l: 'క్ష', w: 'క్షత్రియుడు (Kshatriyudu)'}, {l: 'ఱ', w: 'Erra'}
];

const achchuluGrid = document.getElementById('achchuluGrid');
achchulu.forEach(item => {
    let btn = document.createElement('button');
    btn.className = 'btn btn-outline-danger m-1 fw-bold fs-5 px-3 py-1';
    btn.innerText = item.l;
    btn.onclick = () => {
        document.getElementById('teluguDisplay').innerText = item.l;
        document.getElementById('teluguWord').innerText = item.w;
        speakText(item.l, 'te-IN');
    };
    achchuluGrid.appendChild(btn);
});

const halluluGrid = document.getElementById('halluluGrid');
hallulu.forEach(item => {
    let btn = document.createElement('button');
    btn.className = 'btn btn-outline-success m-1 fw-bold fs-6 px-2 py-1';
    btn.innerText = item.l;
    btn.onclick = () => {
        document.getElementById('teluguDisplay').innerText = item.l;
        document.getElementById('teluguWord').innerText = item.w;
        speakText(item.l, 'te-IN');
    };
    halluluGrid.appendChild(btn);
});

// --- DRAWING CANVAS & TOUCH SETUP ---
const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width > 0) {
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
}
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

let painting = false;
let currentTool = 'brush'; 
let currentShape = 'free'; 
let currentColor = '#ff0000';
let currentSize = 8;
let startX = 0;
let startY = 0;
let snapshot = null;

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishPosition);
canvas.addEventListener('mousemove', draw);

canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
canvas.addEventListener('touchend', finishPosition);
canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

function setBrush(tool) {
    currentTool = tool;
    if (tool !== 'eraser') currentShape = 'free';
    highlightActiveButton('btn-', tool);
}

function setShape(shape) {
    currentShape = shape;
    highlightActiveButton('shape-', shape);
}

function setColor(color) { currentColor = color; }
function setSize(size) { currentSize = parseInt(size); }

function highlightActiveButton(prefix, activeValue) {
    document.querySelectorAll(`[id^="${prefix}"]`).forEach(btn => {
        btn.classList.remove('btn-primary', 'btn-dark', 'btn-danger');
        btn.classList.add('btn-outline-secondary');
    });
    const activeBtn = document.getElementById(prefix + activeValue);
    if (activeBtn) {
        activeBtn.classList.remove('btn-outline-secondary');
        if (prefix === 'btn-' && activeValue === 'eraser') activeBtn.classList.add('btn-danger');
        else if (prefix === 'btn-') activeBtn.classList.add('btn-primary');
        else activeBtn.classList.add('btn-dark');
    }
}

function getCoords(e) {
    const rect = canvas.getBoundingClientRect();
    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.touches && e.touches[0]) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    }
    return { x: clientX - rect.left, y: clientY - rect.top };
}

function startPosition(e) {
    e.preventDefault();
    painting = true;
    const coords = getCoords(e);
    startX = coords.x;
    startY = coords.y;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    if (currentShape === 'free') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
    }
}

function finishPosition(e) {
    if (!painting) return;
    painting = false;
    ctx.beginPath();
}

function handleTouchStart(e) { startPosition(e); }
function handleTouchMove(e) { e.preventDefault(); draw(e); }

function draw(e) {
    if (!painting) return;
    const coords = getCoords(e);
    const mouseX = coords.x;
    const mouseY = coords.y;

    if (currentShape !== 'free') {
        ctx.putImageData(snapshot, 0, 0);
        drawShape(mouseX, mouseY);
    } else {
        ctx.lineWidth = currentSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (currentTool === 'eraser') {
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = currentSize * 2;
        } else if (currentTool === 'calligraphy') {
            ctx.strokeStyle = currentColor;
            ctx.lineWidth = currentSize;
            ctx.lineCap = 'square';
        } else if (currentTool === 'oil') {
            ctx.strokeStyle = currentColor;
            ctx.globalAlpha = 0.8;
            ctx.lineWidth = currentSize * 1.5;
        } else if (currentTool === 'watercolor') {
            ctx.strokeStyle = currentColor;
            ctx.globalAlpha = 0.3;
            ctx.lineWidth = currentSize * 2;
        } else if (currentTool === 'pencil') {
            ctx.strokeStyle = currentColor;
            ctx.globalAlpha = 0.9;
            ctx.lineWidth = Math.max(2, currentSize / 2);
        } else if (currentTool === 'crayon') {
            ctx.strokeStyle = currentColor;
            ctx.globalAlpha = 0.7;
            ctx.lineWidth = currentSize * 1.2;
            ctx.setLineDash([2, 2]);
        } else {
            ctx.strokeStyle = currentColor;
            ctx.globalAlpha = 1.0;
            ctx.setLineDash([]);
        }

        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(mouseX, mouseY);
        ctx.globalAlpha = 1.0;
        ctx.setLineDash([]);
    }
}

function drawShape(x2, y2) {
    ctx.strokeStyle = currentColor;
    ctx.fillStyle = currentColor;
    ctx.lineWidth = currentSize;
    ctx.globalAlpha = 1.0;
    ctx.beginPath();

    if (currentShape === 'rectangle') {
        ctx.strokeRect(startX, startY, x2 - startX, y2 - startY);
    } else if (currentShape === 'oval') {
        let rx = Math.abs(x2 - startX) / 2;
        let ry = Math.abs(y2 - startY) / 2;
        ctx.ellipse(startX + (x2 - startX) / 2, startY + (y2 - startY) / 2, rx, ry, 0, 0, 2 * Math.PI);
        ctx.stroke();
    } else if (currentShape === 'triangle') {
        ctx.moveTo(startX + (x2 - startX) / 2, startY);
        ctx.lineTo(x2, y2);
        ctx.lineTo(startX * 2 - x2, y2);
        ctx.closePath();
        ctx.stroke();
    } else if (currentShape === 'star') {
        let radius = Math.hypot(x2 - startX, y2 - startY) / 2;
        let cx = startX + (x2 - startX) / 2;
        let cy = startY + (y2 - startY) / 2;
        let spikes = 5, rot = Math.PI / 2 * 3, step = Math.PI / spikes;
        ctx.moveTo(cx, cy - radius);
        for (let i = 0; i < spikes; i++) {
            ctx.lineTo(cx + Math.cos(rot) * radius, cy + Math.sin(rot) * radius);
            rot += step;
            ctx.lineTo(cx + Math.cos(rot) * (radius / 2), cy + Math.sin(rot) * (radius / 2));
            rot += step;
        }
        ctx.lineTo(cx, cy - radius);
        ctx.closePath();
        ctx.stroke();
    } else if (currentShape === 'line') {
        ctx.moveTo(startX, startY);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    } else if (currentShape === 'arrow') {
        const angle = Math.atan2(y2 - startY, x2 - startX);
        const headLen = 15;
        ctx.moveTo(startX, startY);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - headLen * Math.cos(angle - Math.PI / 6), y2 - headLen * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(x2 - headLen * Math.cos(angle + Math.PI / 6), y2 - headLen * Math.sin(angle + Math.PI / 6));
        ctx.lineTo(x2, y2);
        ctx.fill();
    }
}

function clearCanvas() { ctx.clearRect(0, 0, canvas.width, canvas.height); }

function saveDrawing() {
    let link = document.createElement('a');
    link.download = 'my-drawing.png';
    link.href = canvas.toDataURL();
    link.click();
}