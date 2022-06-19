let deckId = ""

function handleClick() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id;
            console.log(deckId)
        })
}

function drawCards() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const imageHtml = data.cards.map(card => `<img src=${card.image} alt=${card.code} />`)
            document.getElementById('cards').innerHTML = imageHtml
        })
}

document.getElementById("new-deck").addEventListener("click", handleClick)

document.getElementById('draw-cards').addEventListener("click", drawCards)
