// =================================================================
// ELEMENTI DEL DOM
// =================================================================
const body = document.body;
const inputView = document.getElementById('input-view');
const gridView = document.getElementById('grid-view');
const dataForm = document.getElementById('data-form');
const resetButton = document.getElementById('reset-button');
const nameInput = document.getElementById('name-input');
const mainSubtitle = document.getElementById('main-subtitle');
const gridTitle = document.getElementById('grid-title');
const gridQuote = document.getElementById('grid-quote');
const tooltip = document.getElementById('tooltip');
const weeksGridContainer = document.getElementById('weeks-grid-container');
const weeksLivedSpan = document.getElementById('weeks-lived');

const MAX_YEARS = 90;

const QUOTES = [
    "La finitezza è ciò che rende il tempo utile.",
    "L'efficienza è una trappola. Non potrai mai fare tutto.",
    "Accetta i tuoi limiti. È l'unica vera fonte di libertà.",
    "La distrazione è la scelta di non affrontare la realtà della nostra vita limitata.",
    "Il futuro è solo un pensiero. L'unica cosa che hai è il momento presente.",
    "La gioia di perdersi le cose (JOMO) è più sana della paura di perdersi le cose (FOMO).",
    "Smettila di sgombrare il campo. Le cose importanti della vita non possono essere affrettate.",
    "Scegliere cosa non fare è importante tanto quanto scegliere cosa fare."
];

// =================================================================
// FUNZIONI DI GESTIONE VISTE
// =================================================================
function showInputView() {
    body.classList.remove('grid-view-active');
    mainSubtitle.classList.remove('hidden');
    gridQuote.classList.add('hidden');
    gridView.classList.add('hidden');
    setTimeout(() => {
        inputView.classList.remove('hidden');
        nameInput.focus();
    }, 100);
}

function showGridView() {
    body.classList.add('grid-view-active');
    mainSubtitle.classList.add('hidden');
    gridQuote.classList.remove('hidden');
    inputView.classList.add('hidden');
    setTimeout(() => {
        gridView.classList.remove('hidden');
    }, 100);
}

// =================================================================
// LOGICA DELLA GRIGLIA
// =================================================================
function calculateWeeksLived(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const now = new Date();
    const diffMilliseconds = now - dob;
    return Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24 * 7));
}

function generateGrid(weeksLived, dateOfBirth) {
    weeksGridContainer.innerHTML = '';
    const totalWeeks = MAX_YEARS * 52;
    const dob = new Date(dateOfBirth);

    for (let i = 0; i < totalWeeks; i++) {
        const weekBox = document.createElement('div');
        weekBox.classList.add('week-box');
        if (i < weeksLived) {
            setTimeout(() => { weekBox.classList.add('lived'); }, i * 2.5);
        }
        
        weekBox.addEventListener('mouseover', () => {
            const weekIndex = i;
            const weekDate = new Date(dob.getTime() + weekIndex * 7 * 24 * 60 * 60 * 1000);
            const year = weekDate.getFullYear();
            const weekNumber = Math.floor(weekIndex % 52) + 1;
            const age = Math.floor(weekIndex / 52);
            tooltip.textContent = `Anno ${age}, Settimana ${weekNumber} (${year})`;
            tooltip.classList.remove('hidden');
        });
        weekBox.addEventListener('mousemove', (event) => {
            const tooltipWidth = tooltip.offsetWidth;
            const tooltipHeight = tooltip.offsetHeight;
            const cursorPadding = 15;
            let x = event.clientX + cursorPadding;
            let y = event.clientY + cursorPadding;
            if (x + tooltipWidth > window.innerWidth) { x = event.clientX - tooltipWidth - cursorPadding; }
            if (y + tooltipHeight > window.innerHeight) { y = event.clientY - tooltipHeight - cursorPadding; }
            tooltip.style.left = `${x}px`;
            tooltip.style.top = `${y}px`;
        });
        weekBox.addEventListener('mouseout', () => {
            tooltip.classList.add('hidden');
        });

        weeksGridContainer.appendChild(weekBox);
    }
    weeksLivedSpan.textContent = weeksLived;
}

// =================================================================
// GESTIONE EVENTI E FLUSSO PRINCIPALE
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        showInputView();
    }, 0); 
    
    dataForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = nameInput.value;
        const dob = document.getElementById('dob-input').value;

        if (name) {
            gridTitle.textContent = `Le Settimane di ${name}`;
        } else {
            gridTitle.textContent = ''; 
        }

        const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        gridQuote.textContent = `“${randomQuote}”`;
        
        const weeksLived = calculateWeeksLived(dob);
        generateGrid(weeksLived, dob);
        
        showGridView();
    });

    resetButton.addEventListener('click', () => {
        showInputView(); 
    });
});