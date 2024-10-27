console.log('Sono connesso');

//Prendo il form dall'HTML
const myForm = document.getElementById('my-form');
//console.log(myForm);

// Dichiaro le variabili che mi servono con i dati che sono stati forniti nel testo della milestone
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

// Aggiungo l'evento al click di Submit al form
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
    let standardPrice = hourPrice[jobType] * workingHours
    console.log(`Prezzo: ${standardPrice}€`);

    // Creata una variabile che cambia nel tempo, inizialmente è uguale al prezzo standard e poi può essere modificata con lo sconto
    let finalPrice = standardPrice

    //Verifico il codice promozionale se è valido, quindi se è incluso nell'arrey validPromoCodes
    // Calcolo del preventivo con evenuale sconto se il codice è valido
    // Se il codice non è valido: alert che avvisa l'utente.
    if (validPromoCodes.includes(userPromoCode)) {
        finalPrice = standardPrice * (1 - discountRate);
        console.log(`Prezzo scontato del 25%: ${finalPrice}€`);
    } else if (userPromoCode) {
        alert("Codice promozionale non valido");
    }

    // Formattare il prezzo finale in modo leggibile con due decimali
    const formattedPrice = finalPrice.toFixed(2).replace(".", ",") + " €";
    // console.log(formattedPrice);

    // Aggiornare il prezzo finale nel DOM
    const showPriceText = document.getElementById('final-price')
    showPriceText.innerHTML = `€ ${formattedPrice}`

    // Mostrarlo nel DOM 
    const resultContainer = document.getElementById('result-container')

    resultContainer.classList.remove('d-none');

    // Svuoltare i campi del form
    event.target.reset();

})

