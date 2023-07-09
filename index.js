let searchInput = document.querySelector("#search-input");
const chooseAnswer = document.querySelector("#choose-answer");
const showData = document.querySelector(".show-data");
const displayData = document.querySelector("#display");
const setToLocal = document.querySelector("#learned")

//   const item = document.createElement("label"); 
//   item.classList.add("learned");
//   item.textContent = "learned"
//  const btn = document.createElement("input");
//  btn.setAttribute("type", "text")
//  btn.classList.add("learn")

chooseAnswer.addEventListener("change", async function (e) {
  let select = e.target.value;
  let query = searchInput.value.toLowerCase();


  if (!query) return alert("No matching word found");
  const request = await fetch('words.json');
  const response = await request.json();
  const info = response.find(res => res.word.toLowerCase() === query);
  previousWords.push(info);
  
  if (select === "All") {
    showData.innerHTML = `
      <div>
        <h1>${info.word}</h1>
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
    displayData.innerHTML = `<p>${info.definition}</p> `;
  } else if (select === "Examples") {
    displayData.innerHTML =` ${info.examples.map(res => `<p>${res}</p>`)} `;
  } else if (select === "Synonyms") {
    displayData.innerHTML = `${info.synonyms.map(res => `<p>${res}</p>`)} `;
  } else if (select === "Antonyms") {
    showData.innerHTML = `${info.antonyms.map(res => `<p>${res}</p>`)} `;
  }
 
  
});




     setToLocal.addEventListener("change", function() { 
      localStorage.setItem("learnedWords", JSON.stringify(previousWords));
    });
    
    let previousWords = localStorage.getItem("learnedWords");
    if (previousWords) {
      previousWords = JSON.parse(previousWords);
    } else {
      previousWords = [];
    }


    if (setToLocal.checked && info) {
      let alreadyStored = previousWords.find(prevWord => prevWord.info == info.word);
  
      if (!alreadyStored) {
        previousWords.push(info);
        localStorage.setItem("learnedWords", JSON.stringify(previousWords));
      } else {
        alert("The concept is already saved to the memorizing page!");
      }
    }