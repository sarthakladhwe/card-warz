let deckId
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")

const cardValues = {
    JACK: 11,
    QUEEN: 12,
    KING: 13,
    ACE: 14
}

function handleClick() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id;
        })
}

function drawCards() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            winningCard(data.cards[0], data.cards[1])
            const imageHtml = data.cards.map(card => `<div class="card-slot"><img class="card" src=${card.image} alt=${card.code} /></div>`)
            cardsContainer.innerHTML = imageHtml

        })
}

function winningCard(card1, card2) {

    console.log("card1.value", Object.hasOwnProperty(card1.value))
    
    const card1Value = cardValues.hasOwnProperty(card1.value) ? cardValues[card1.value] : parseInt(card1.value)
    const card2Value = cardValues.hasOwnProperty(card2.value) ? cardValues[card2.value] : parseInt(card2.value)

    console.log("Card 1", card1Value)
    console.log("Card 2", card2Value)

    if(card1Value > card2Value) {
        console.log("Card 1 wins!")
    } else if(card2Value > card1Value) {
        console.log("Card 2 wins!")
    } else {
        console.log("TIEEEE!")
    }
}

newDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", drawCards)


/**
 * Challenge:
 * 
 * Try to determine which of the 2 cards is the "winner" (has higher value)
 * Aces are the card with the highest "score"
 * 
 * In parts:
 * 
 * 1. Create a function that takes 2 card objects as parameters, 
 * `card1` and `card2`. These card objects have a property called
 * `value`, which can be any one of the following strings, in
 * order of rising "score":
 * 
 * "2", "3", "4", "5", "6", "7", "8", "9", 
 * "10", "JACK", "QUEEN", "KING", "ACE"
 * 
 * I.e. "2" is the lowest score and "ACE" is the highest.
 * 
 * The function should determine which of the 2 cards (`card1`
 * or `card2`) has the higher score, or if they have the same score.
 * 
 * Log which card wins (or "It's a tie!" 
 * if they're the same) to the console
 */