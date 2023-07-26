$(function() {
    const API = "https://deckofcardsapi.com/api/deck";

    //Part 1:
$.getJSON(`${API}/new/draw/`).then(data => {
    let { suit, value } = data.cards[0];
    console.log(`Part 1: ${value.toLowerCase()} of ${suit.toLowerCase()}`);
  });


  //Part 2:
  let card1 = null;
  $.getJSON(`${API}/new/draw`).then(data => {
    card1 = data.cards[0];
    let deckId = data.deck_id;
    return $.getJSON(`${API}/${deckId}/draw`);
  })
  .then(data => {
    let card2 = data.cards[0];
    [card1, card2].forEach(function(card) {
        console.log (`Part 2: ${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
    });
  });


  //Part 3:
  let deckId = null;
  let $button = $("button");
  let $cardDiv = $("#card-div");
  let $messageDiv = $("#message");

  $.getJSON(`${API}/new/shuffle`).then(data => {
    deckId = data.deck_id;
    $button.show();
  });

  let rotation = -18;
    let changeRotation = (num) => {
        return rotation = rotation + 18;
    };

  $button.on("click", function() {
    $.getJSON(`${API}/${deckId}/draw`).then(data => {
        let card = data.cards[0].image;
        
        $cardDiv.append(
            $('<img>', {
                src: card,
                css: {
                    transform: `rotate(${changeRotation(rotation)}deg)`
                }
            })
        );
        if (data.remaining === 0) $messageDiv.append("<h2>No More Cards In The Deck</h2>")
    });
  });
});