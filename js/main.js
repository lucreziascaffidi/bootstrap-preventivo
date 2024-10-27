console.log('Sono connesso');


//PRENDE IL FORM DALL'HTML
const myForm = document.getElementById('my-form');
//console.log(myForm);

//VARIABILI
// Variabile che contiene le 10h richieste dal testo della milestone
const workingHours = 10;

// Variabile che contiene il prezzo orario per ciascun lavoro --> un oggetto che continene tutti i prezzi per ogni tipo di lavoro
const hourPrice = {
    'backend-development': 20.50,
    'frontend-development': 15.30,
    'project-analysis': 33.60
};
// console.log(hourPrice['backend-development']);
// console.log(hourPrice['frontend-development']);
// console.log(hourPrice['project-analysis']);


// Variabile che contiene i codici promozionali --> un array con i codici promozionali validi
const validPromoCodes = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];

// for (let i = 0; i < validPromoCodes.length; i++) {
//     console.log(validPromoCodes[i]);
// }

// Variabile sconto (25%)
const discountRate = 0.25;


//FUNZIONI

//Calcola il prezzo di base
function calculateStandardPrice(jobType) {
    return hourPrice[jobType] * workingHours;
}

//Verificare e applicare sconto
function applyDiscount(price, promoCode) {
    if (isValidPromoCode(promoCode)) {
        return price * (1 - discountRate);
    }
    return price;
}

//Funzione per verificare il codice promozionale inserito dall'utente
function isValidPromoCode(promoCode) {
    const cleanedCode = promoCode.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    return validPromoCodes.includes(cleanedCode);
}

// Funzione per mostrare il prezzo formattato
function displayFinalPrice(price) {
    const formattedPrice = price.toFixed(2).replace(".", ",");
    const [units, decimals] = formattedPrice.split(',');

    // Mostrare nel DOM con grassetto solo per la parte delle unità
    const resultPriceUnitsText = document.getElementById('final-price-units');
    const resultPriceDecimalsText = document.getElementById('final-price-decimals');
    resultPriceUnitsText.innerHTML = `€ ${units},`;
    resultPriceDecimalsText.innerHTML = `${decimals}`;

    // Rimuovere la classe d-none per rendere visibile il prezzo
    const showResultContainer = document.getElementById('result-container');
    showResultContainer.classList.remove('d-none');

}

// Funzione per resettare il form
function resetForm(form) {
    form.reset();
}


//ADD EVENT LISTENER AL SUBMIT DEL FORM

myForm.addEventListener('submit', function (event) {

    // Devo prevenire il refresh della pagina
    event.preventDefault();

    // Accedere ai dati inseriti dall'utente 
    const userName = document.getElementById('user-name').value;
    console.log(`Nome: ${userName}`);

    const userSurname = document.getElementById('user-last-name').value;
    console.log(`Cognome: ${userSurname}`);

    const userEmail = document.getElementById('user-email').value;
    console.log(`Email: ${userEmail}`);

    const userTextArea = document.getElementById('form-text-area').value;
    console.log(`Text Area: ${userTextArea}`);

    // Accedere alla scelta del tipo di lavoro da commissionare
    const jobType = document.querySelector('select#job-request').value;
    console.log(`Lavoro richiesto: ${jobType}`);

    // Accedere al codice promozionale inserito dall'utente in modo pulito
    const userPromoCode = document.getElementById('user-promo-code').value.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    console.log(`Codice Promozionale: ${userPromoCode}`);

    // Calcolato preventivo base
    let standardPrice = calculateStandardPrice(jobType);
    console.log(`Prezzo: ${standardPrice}€`);

    // Creata una variabile che cambia nel tempo, inizialmente è uguale al prezzo standard e poi può essere modificata con lo sconto
    let finalPrice = standardPrice

    //Verifico il codice promozionale se è valido, quindi se è incluso nell'arrey validPromoCodes
    //se il codice inserito non è incluso nella lista allora invita utente a riprovare
    if (userPromoCode && !isValidPromoCode(userPromoCode)) {
        alert("Codice promozionale non valido. Per favore, riprova");
        //Riporta il focus al campo di input del codice promozionale
        userPromoCode.focus();
        //interrompe il calcolo
        return;

        // se il codice è valido, applicare sconto del 25%  
    } else {
        finalPrice = applyDiscount(standardPrice, userPromoCode);
    }

    // Mostra il prezzo finale
    displayFinalPrice(finalPrice);

    // Resetta il form dopo il calcolo
    resetForm(event.target);

})

