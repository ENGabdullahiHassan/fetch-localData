let searchInput = document.querySelector("#search-input");
const chooseAnswer = document.querySelector("#choose-answer");
const showData = document.querySelector(".show-data");
const displayData = document.querySelector("#display");

chooseAnswer.addEventListener("change", async function (e) {
  let select = e.target.value;
  let query = searchInput.value;

  if (!query) return alert("No matching word found");
  const request = await fetch('words.json');
  const response = await request.json();
  const info = response.find(res => res.word === query);
  console.log(info);

  if (select === "All") {
    displayData.innerHTML = `
      <div class="show-data">
        <h3>${info.word}</h3>
        <h2>Definition</h2>
        <p>${info.definition}</p>
        <h2>Examples</h2>
        ${info.examples.map(res => `<p>${res}</p>`).join('')}
        <h2>Synonyms</h2>
        ${info.synonyms.map(res => `<span><p>${res}</p></span>`).join('')}
        <h2>Antonyms</h2>
        ${info.antonyms.map(res => `<span><p>${res}</p></span>`).join('')}
      </div>`;
  } else if (select === "Definitions") {
    showData.innerHTML = `<p>${info.definition}</p>`;
  } else if (select === "Examples") {
    showData.innerHTML = info.examples.map(res => `<p>${res}</p>`).join('');
  } else if (select === "Synonyms") {
    showData.innerHTML = info.synonyms.map(res => `<p>${res}</p>`).join('');
  } else if (select === "Antonyms") {
    showData.innerHTML = info.antonyms.map(res => `<p>${res}</p>`).join('');
  }
});