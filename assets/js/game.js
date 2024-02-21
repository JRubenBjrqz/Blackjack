let deck = [];
const suits = ['C','D','H','S'];
const courtCards = ['A','J','Q','K'];

const createDeck = () => {
    for( let i = 2; i <= 10; i++) {
        for( let suit of suits ) {
            deck.push( i + suit );
        }
    }

    for( let suit of suits ) {
        for( let courtCard of courtCards) {
            deck.push( courtCard + suit);
        }
    }
    deck = _.shuffle( deck );
    return deck;
}

createDeck();

const hitCard = () => {
    if( deck.length === 0 ) {
        throw 'Empty deck';
    }
    const card = deck.pop();
    return card;
}

const cardValue = ( card ) => {
    const value = card.substring( 0, card.length - 1 );
    return ( isNaN( value ) ) ?
            ( value === 'A' ) ? 11 : 10
            : value * 1;
    // points = 0;

    // if( isNaN( value ) ){
    //     points = ( value === 'A' ) ? 11 : 10;
    // } else {
    //     points = value * 1;
    // }
}

cardValue('2D');
