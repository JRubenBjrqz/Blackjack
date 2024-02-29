
(() => {
    'use strict'

    let deck = [];
    const suits = ['C', 'D', 'H', 'S'];
    const courtCards = ['A', 'J', 'Q', 'K'];

    let playerPoints = 0,
        pcPoints = 0;

    const hitButton = document.querySelector('#hitButton');
    const standButton = document.querySelector('#standButton');
    const newGameButton = document.querySelector('#newGameButton');

    const displayPlayerCards = document.querySelector('#playerCards');
    const displayPCCards = document.querySelector('#pcCards');

    const displayPoints = document.querySelectorAll('strong');

    const createDeck = () => {
        for (let i = 2; i <= 10; i++) {
            for (let suit of suits) {
                deck.push(i + suit);
            }
        }

        for (let suit of suits) {
            for (let courtCard of courtCards) {
                deck.push(courtCard + suit);
            }
        }
        deck = _.shuffle(deck);
        console.log(deck);
        return deck;
    }

    createDeck();

    const hitCard = () => {
        if (deck.length === 0) {
            throw 'Empty deck';
        }
        const card = deck.pop();
        return card;
    }

    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1);

        return (isNaN(value)) ?
            (value === 'A') ? 11 : 10
            : value * 1;
        // points = 0;

        // if( isNaN( value ) ){
        //     points = ( value === 'A' ) ? 11 : 10;
        // } else {
        //     points = value * 1;
        // }
    }

    // PC Turn

    const pcTurn = ( minimumPoints ) => {
        
        do {
            const card = hitCard();

            pcPoints = pcPoints + cardValue(card);
            displayPoints[0].innerText = pcPoints;

            const imgCard = document.createElement('img');

            imgCard.src = `assets/img/cards/${card}.png`;
            imgCard.classList.add('card');
            displayPCCards.append(imgCard);

            if( minimumPoints > 21 ) {
                break;
            }

        } while( ( pcPoints < minimumPoints && minimumPoints <= 21 ) );

        setTimeout(() => {

            if( pcPoints === minimumPoints ) {
                alert('Tie');
            } else if ( minimumPoints > 21 ) {
                alert('PC Win');
            } else if( pcPoints > 21 ){
                alert('Player Win');
            } else {
                alert('PC Win');
            }

        }, 250 );

    }

    // Events

    hitButton.addEventListener('click', () => {
        const card = hitCard();

        playerPoints = playerPoints + cardValue(card);
        displayPoints[1].innerText = playerPoints;

        const imgCard = document.createElement('img');

        imgCard.src = `assets/img/cards/${card}.png`;
        imgCard.classList.add('card');
        displayPlayerCards.append(imgCard);

        if (playerPoints > 21) {
            console.log('Loser');
            hitButton.disabled = true;
            hitButton.classList.add('disabled:opacity-75');
            standButton.disabled = true;
            standButton.classList.add('disabled:opacity-75');
            pcTurn( playerPoints );

        } else if (playerPoints === 21) {
            console.log('Winner');
            hitButton.disabled = true;
            hitButton.classList.add('disabled:opacity-75');
            standButton.disabled = true;
            standButton.classList.add('disabled:opacity-75');
            pcTurn( playerPoints );

        }
    });

    standButton.addEventListener('click', () => {

        hitButton.disabled = true;
        hitButton.classList.add('disabled:opacity-75');
        standButton.disabled = true;
        standButton.classList.add('disabled:opacity-75');

        pcTurn( playerPoints );

    });

    newGameButton.addEventListener('click', () => {

        deck = []
        createDeck();
        
        playerPoints = 0;
        pcPoints = 0;

        displayPoints[0].innerText = 0;
        displayPoints[1].innerText = 0;

        displayPCCards.innerHTML = '';
        displayPlayerCards.innerHTML = '';
        hitButton.disabled = false;
        hitButton.classList.remove('disabled:opacity-75');
        standButton.disabled = false;
        standButton.classList.remove('disabled:opacity-75');

    });

})();
