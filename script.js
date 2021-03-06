let deckId
let computerScore = 0
let myScore = 0
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
drawCardBtn.disabled = true
const header = document.getElementById("header")
const remainingCards = document.getElementById("remaining-cards")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")

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
            deckId = data.deck_id
            drawCardBtn.disabled = false
            cardsContainer.children[0].innerHTML = ""
            cardsContainer.children[1].innerHTML = ""
            header.textContent = "Game of War"
            remainingCards.textContent = ""
            computerScore = 0
            myScore = 0
            computerScoreEl.textContent = `Computer score: ${computerScore}`
            myScoreEl.textContent = `My score: ${myScore}`
        })
}

function drawCards() { 
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const imageHtml = data.cards.map(card => `<img class="card" src=${card.image} alt=${card.code} />`)
            cardsContainer.children[0].innerHTML = imageHtml[0]
            cardsContainer.children[1].innerHTML = imageHtml[1]
            const winnerText = winningCard(data.cards[0], data.cards[1])
            header.textContent = winnerText
            remainingCards.textContent = "Remaining Cards: " + data.remaining
            if(data.remaining === 0) {
                drawCardBtn.disabled = true
                header.textContent = computerScore > myScore ? "Computer Won the Game." :
                computerScore < myScore ? "You Won the Game!" : "It is a TIE!"
            }
        })
}

function winningCard(card1, card2) {

    const card1Value = cardValues.hasOwnProperty(card1.value) ? cardValues[card1.value] : parseInt(card1.value)
    const card2Value = cardValues.hasOwnProperty(card2.value) ? cardValues[card2.value] : parseInt(card2.value)

    if(card1Value > card2Value) {
        computerScore++
        computerScoreEl.textContent = `Computer score: ${computerScore}`
        return "Computer wins!"
    } else if(card2Value > card1Value) {
        myScore++
        myScoreEl.textContent = `My score: ${myScore}`
        return "You win!"
    } else {
        return "TIEEEE!"
    }
}

newDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", drawCards)