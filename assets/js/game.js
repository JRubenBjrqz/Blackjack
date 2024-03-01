const gameModule =  (() => {
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
        playersPoints = [];

        for (let i = 0; i < numberPlayers; i++) {
            playersPoints.push(0);
        }

        displayPoints.forEach( element => element.innerHTML = 0 );

        cardsPlayersDiv.forEach( element => element.innerHTML = '' );

        hitButton.disabled = false;
        hitButton.classList.add('disabled:opacity-75');
        standButton.disabled = false;
        standButton.classList.add('disabled:opacity-75');

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
        
        return deck.pop();
    }

    const cardValue = ( card ) => {
        const value = card.substring( 0, card.length - 1 );

        return ( isNaN(value) ) ?
            ( value === 'A' ) ? 11 : 10
            : value * 1;
    }

    const accumulatePoints = ( card, turn ) => {

        playersPoints[turn] = playersPoints[turn] + cardValue( card );
        displayPoints[turn].innerText = playersPoints[turn];

        return playersPoints[turn];
    }

    const createCard = ( card, turn ) => {
        const imgCard = document.createElement('img');

        imgCard.src = `assets/img/cards/${card}.png`;
        imgCard.classList.add('card');
        cardsPlayersDiv[turn].append( imgCard );
    }

    const winner = () => {

        const [ pcPoints, minimumPoints ] = playersPoints;

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

    const pcTurn = ( minimumPoints ) => {
        let pcPoints = 0;
        
        do {
            const card = hitCard();
            pcPoints = accumulatePoints( card, 0 );
            createCard( card, 0 );

        } while( pcPoints < minimumPoints && minimumPoints <= 21 );

        winner();

    }

    // Events

    hitButton.addEventListener('click', () => {
        const card = hitCard();

        const playerPoints = accumulatePoints( card, playersPoints.length - 1 );
        createCard( card, playersPoints.length - 1 );

        if ( playerPoints > 21 ) {
            console.log('Loser');
            hitButton.disabled = true;
            hitButton.classList.add('disabled:opacity-75');
            standButton.disabled = true;
            standButton.classList.add('disabled:opacity-75');
            pcTurn( playerPoints );

        } else if ( playerPoints === 21 ) {
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

        pcTurn( playersPoints[0] );

    });

    newGameButton.addEventListener('click', () => {

        startGame();

    });

    return {
        newGame: startGame
    };

})();
