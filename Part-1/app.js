let favoriteNum = 34;
let API = "http://numbersapi.com";

$.getJSON(`${API}/${favoriteNum}?json`).then(data => {
    console.log("Part 1, Step 1: ", data);
});

let multipleNums = [14, 22, 91, 320]
$.getJSON(`${API}/${multipleNums}?json`).then(data => {
    Object.keys(data).forEach(key => {
      $(".step-2").append(`<h4> Fun fact: ${data[key]}</h4>`)
    })
});

Promise.all(Array.from({length: 4}, () => {
    return $.getJSON(`${API}/${favoriteNum}?json`);
    })
).then(facts => {
    facts.forEach(data => $(".step-3").append(`<h4>Fun fact: ${data.text}</h4>`));
});