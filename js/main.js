console.log('Sono connesso');

// CAMPI HTML

// Accede al Form
const myForm = document.getElementById('my-form');

// Accede al campo di input email 
const emailInput = document.getElementById('user-email');
const emailLabel = document.getElementById('email-label');

// Accede al div che mostra il messaggio di errore per una email non valida
const emailInvalidText = document.getElementById('invalid-email-text')

// Accede al camput di input del codice promozionale e alla sua label
const promoInput = document.getElementById('user-promo-code');
const promoLable = document.getElementById('promo-lable');

// Accede al div che mostra il messaggio di errore per un codice promozionale non valido
const invalidPromoCodeText = document.getElementById('invalid-promo-code-text');

// Accedere al div che mostra il messaggio di conferma per un codice promozionale valido 
const validPromoCodeText = document.getElementById('valid-promo-code-text');

// Accede al button reset
const resetButton = document.getElementById('reset-button');

// Accede al container del prezzo finale
const ResultContainer = document.getElementById('result-container');

// VARIABILI
// Numero di ore lavorative richieste 
const workingHours = 10;

// Array di oggetti contenente i lavori selezionabili e i loro prezzi
const jobs = [
    { type: 'backend-development', price: 20.50 },
    { type: 'frontend-development', price: 15.30 },
    { type: 'project-analysis', price: 33.60 }
];

// Array con i codici promozionali validi
const validPromoCodes = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];

// Percentuale di sconto (25%)
const discountRate = 0.25;



//FUNZIONI

// Valida l'email inserita dall'utente
function validEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regex per validare l'email
    return emailPattern.test(email); // Restituisce true se l'email è valida, false altrimenti
}

// Mostra un messaggio di errore per email non valida (rosso)
function showInvalidUserEmail() {
    emailInvalidText.classList.remove('d-none');
    emailInput.classList.add('is-invalid');
    emailLabel.classList.add('text-danger');
}

// Nasconde il messaggio di errore per email non valida
function clearInvalidUserEmail() {
    emailInvalidText.classList.add('d-none')
    emailInput.classList.remove('is-invalid');
    emailLabel.classList.remove('text-danger');
}

// Genera dinamicamente le opzioni della select a partire dall'array di lavori
function populateJobSelect() {
    const jobSelect = document.getElementById('job-request');
    jobSelect.innerHTML = ''; // Pulisce le opzioni esistenti

    // Crea un'opzione predefinita
    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Seleziona il tipo di lavoro';
    defaultOption.value = '';
    jobSelect.appendChild(defaultOption);

    // Crea le opzioni per ciascun lavoro
    jobs.forEach(job => {
        const option = document.createElement('option');
        option.value = job.type; // valore dell'opzione
        option.textContent = capitalizeFirstLetter(job.type.replace(/-/g, ' ')); // testo visibile nell'opzione
        jobSelect.appendChild(option);
    });
}

// Capitalizza la prima lettera di ogni parola in una stringa
function capitalizeFirstLetter(string) {
    return string
        .split(' ') // Divide la stringa in parole
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalizza la prima lettera di ogni parola
        .join(' '); // Unisce di nuovo le parole in una stringa
}

// Calcola il prezzo di base per il lavoro selezionato
function calculateStandardPrice(jobType) {
    const job = jobs.find(job => job.type === jobType);
    return job ? job.price * workingHours : 0; // Restituisce il prezzo calcolato o 0 se non trovato
}

// Popola la select dei lavori una volta che il DOM è carico
document.addEventListener('DOMContentLoaded', () => {
    populateJobSelect();
});

// Verifica e applica uno sconto, se il codice promozionale è valido
function applyDiscount(price, promoCode) {
    if (isValidPromoCode(promoCode)) {
        return price * (1 - discountRate); // Restituisce il prezzo scontato
    }
    return price; // Restituisce il prezzo originale se il codice non è valido
}

// Verifica se il codice promozionale inserito è valido
function isValidPromoCode(promoCode) {
    const cleanedCode = promoCode.trim().toUpperCase().replace(/[^a-zA-Z0-9]/g, '');
    return validPromoCodes.includes(cleanedCode); // Restituisce true se il codice è valido

}

// Mostra un messaggio di validità per il codice promozionale (verde)
function showValidUserPromoCode() {
    validPromoCodeText.classList.remove('d-none');
    promoInput.classList.add('is-valid');
    promoLable.classList.add('text-success');
}

// Nasconde il messaggio di validità per il codice promozionale valido
function clearValidUserPromoCodeError() {
    validPromoCodeText.classList.add('d-none');
    promoInput.classList.remove('is-valid');
    promoLable.classList.remove('text-success');
}

// Mostra un messaggio di errore per il codice promozionale non valido (rosso)
function showInvalidUserPromoCode() {
    invalidPromoCodeText.classList.remove('d-none');
    promoInput.classList.add('is-invalid');
    promoLable.classList.add('text-danger');
}

// Nasconde il messaggio di errore per il codice promozionale non valido
function clearInvalidUserPromoCodeError() {
    invalidPromoCodeText.classList.add('d-none')
    promoInput.classList.remove('is-invalid');
    promoLable.classList.remove('text-danger');
}

// Mostra il prezzo finale formattato
function displayFinalPrice(price) {
    const formattedPrice = price.toFixed(2).replace(".", ",");
    const [units, decimals] = formattedPrice.split(',');

    // Mostra nel DOM con grassetto solo per la parte delle unità
    const resultPriceUnitsText = document.getElementById('final-price-units');
    const resultPriceDecimalsText = document.getElementById('final-price-decimals');
    resultPriceUnitsText.innerHTML = `€ ${units},`;
    resultPriceDecimalsText.innerHTML = `${decimals}`;

    // Rende visibile il prezzo finale rimuovendo classe d-none nel container del risultato
    const showResultContainer = document.getElementById('result-container');
    showResultContainer.classList.remove('d-none');

    // Mostra il pulsante di reset
    resetButton.classList.remove('d-none');

}

// Resetta il form
function resetForm(form) {
    form.reset();
}


// EVENT LISTENER PER IL SUBMIT DEL FORM

myForm.addEventListener('submit', function (event) {

    // Previene il refresh della pagina
    event.preventDefault();

    // Accede ai dati inseriti dall'utente 
    const userName = document.getElementById('user-name').value;
    console.log(`Nome: ${userName}`);

    const userSurname = document.getElementById('user-last-name').value;
    console.log(`Cognome: ${userSurname}`);

    // Accede all'input email
    const userEmail = emailInput.value;

    // Verifica se la mail è valida
    if (validEmail(userEmail)) {
        clearInvalidUserEmail(); // Nasconde il messaggio di errore se l'email è valida
        console.log(`Email: ${userEmail}`);
    } else {
        showInvalidUserEmail(); // Mostra il messaggio di errore se l'email non è valida
        return;
    }

    const userTextArea = document.getElementById('form-text-area').value;
    console.log(`Text Area: ${userTextArea}`);

    // Accede alla scelta del tipo di lavoro da commissionare
    const jobType = document.querySelector('select#job-request').value;
    console.log(`Lavoro richiesto: ${jobType}`);

    // Accede al codice promozionale inserito dall'utente in modo pulito
    const userPromoCode = document.getElementById('user-promo-code').value.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');

    // Calcola il preventivo base
    let standardPrice = calculateStandardPrice(jobType);
    console.log(`Prezzo: ${standardPrice}€`);
    clearInvalidUserPromoCodeError();

    // Variabile che inizialmente è uguale al prezzo standard e può essere modificata con lo sconto
    let finalPrice = standardPrice

    // Verifica se il codice promozionale è valido e applica lo sconto
    if (userPromoCode && !isValidPromoCode(userPromoCode)) {
        showInvalidUserPromoCode(); // Mostra il messaggio di invalidità codice
        displayFinalPrice(finalPrice); // Mostra il prezzo finale

        // se il codice è valido, applicare sconto del 25%  
    } else if (userPromoCode && isValidPromoCode(userPromoCode)) {
        finalPrice = applyDiscount(standardPrice, userPromoCode);
        showValidUserPromoCode(); // Mostra il messaggio di validità codice
        console.log(`Codice Promozionale: ${userPromoCode}`);
        console.log(`Sconto Applicato: ${discountRate}`);
        console.log(`Prezzo Finale: ${finalPrice}€`);

    }

    // Mostra il prezzo finale
    displayFinalPrice(finalPrice);


});


// EVENT LISTENER PER IL RESET DEL FORM
resetButton.addEventListener('click', function () {

    //Resetta il form
    resetForm(myForm);

    // Nasconde il prezzo finale
    ResultContainer.classList.add('d-none');

    // Rimuove le classi di errore o validità dal codice promozionale
    clearValidUserPromoCodeError();
    clearInvalidUserPromoCodeError();

    // Nasconde il pulsante di reset 
    resetButton.classList.add('d-none');

})



