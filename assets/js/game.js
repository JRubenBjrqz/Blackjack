
(() => {
    'use strict'

    let deck = [];
    const suits = ['C', 'D', 'H', 'S'],
          courtCards = ['A', 'J', 'Q', 'K'];

    let playersPoints = [];

    const hitButton = document.querySelector('#hitButton'),
          standButton = document.querySelector('#standButton'),
          newGameButton = document.querySelector('#newGameButton');

    const cardsPlayersDiv = document.querySelectorAll('.cardsDiv'),
          displayPoints = document.querySelectorAll('strong');

    const startGame = ( numberPlayers = 2 ) => {
        deck = createDeck();

        for (let i = 0; i < numberPlayers; i++) {
            playersPoints.push(0);
        }
    }

    const createDeck = () => {
        deck = [];

        for ( let i = 2; i <= 10; i++ ) {
            for ( let suit of suits ) {
                deck.push( i + suit );
            }
        }

        for ( let suit of suits ) {
            for ( let courtCard of courtCards ) {
                deck.push( courtCard + suit );
            }
        }

        return _.shuffle( deck );
    }

    const hitCard = () => {
        
        if ( deck.length === 0 ) {
            throw 'Empty deck';
        }
        
        return card = deck.pop();
    }

    const cardValue = ( card ) => {
        const value = card.substring( 0, card.length - 1 );

        return ( isNaN(value) ) ?
            ( value === 'A' ) ? 11 : 10
            : value * 1;
    }

    const accumulatePoints = ( turn, card ) => {

        playersPoints[turn] = playersPoints[turn] + cardValue(card);
        playersPoints[turn].innerText = playersPoints[turn];

        return playersPoints[turn];
    }

    const createCard = ( turn, card ) => {
        const imgCard = document.createElement('img');

        imgCard.src = `assets/img/cards/${card}.png`;
        imgCard.classList.add('card');
        cardsPlayersDiv[turn].append( imgCard );
        displayPCCards.append(imgCard);
    }

    const pcTurn = ( minimumPoints ) => {
        let pcPoints = 0;
        
        do {
            const card = hitCard();
            pcPoints = accumulatePoints( card, playersPoints.length - 1 );
            createCard( card, playersPoints.length - 1 );

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

        accumulatePoints( card, 0 );
        createCard( card, playersPoints.length - 1 );

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

        // deck = []
        // createDeck();
        
        // playerPoints = 0;
        // pcPoints = 0;

        // displayPoints[0].innerText = 0;
        // displayPoints[1].innerText = 0;

        // displayPCCards.innerHTML = '';
        // displayPlayerCards.innerHTML = '';
        // hitButton.disabled = false;
        // hitButton.classList.remove('disabled:opacity-75');
        // standButton.disabled = false;
        // standButton.classList.remove('disabled:opacity-75');

    });

})();
