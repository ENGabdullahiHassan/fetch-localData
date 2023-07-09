const showData = document.querySelector(".show-data");
const displayData = document.querySelector("#display");

let wordsData = localStorage.getItem("learnedWords");

if (wordsData) {
  wordsData = JSON.parse(wordsData);
} else {
  wordsData = [];
}

let learnHtmlMarkup = "";

wordsData.forEach((info) => {
  learnHtmlMarkup += `
    <div class="show-data">
      <h1>${info.word}</h1>
      <h2>Definition</h2>
      <p>${info.definition}</p>
      <h2>Examples</h2>
      ${info.examples.map((res) => `<p>${res}</p>`).join('')}
      <h2>Synonyms</h2>
      ${info.synonyms.map((res) => `<span><p>${res}</p></span>`).join('')}
      <h2>Antonyms</h2>
      ${info.antonyms.map((res) => `<span><p>${res}</p></span>`).join('')}
    </div>`;
});

displayData.innerHTML = learnHtmlMarkup;