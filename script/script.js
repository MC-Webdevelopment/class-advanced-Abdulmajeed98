// all the magic will happen now !
document.addEventListener("DOMContentLoaded", (event) => {
  //the event occurred

  class Character {
    constructor(id, name, align, power, year) {
      this.id = id;
      this.name = name;
      this.align = align;
      this.power = power;
      this.year = year;
    }
    checkCharacter() {
      if (this.align.includes("good")) {
        return "good";
      } else if (this.align.includes("bad")) {
        return "bad";
      } else {
        return "natural";
      }
    }
  }

  class Characters {
    constructor() {
      this.arrayOfCharacters = [];
    }

    loadData(id, name, align, power, year) {
      const newCharacter = new Character(id, name, align, power, year);
      // console.log(newCharacter);
      this.arrayOfCharacters.push(newCharacter);
    }

    getData() {
      return this.arrayOfCharacters;
    }

    searchByName(name) {
      return this.getData().filter((person) =>
        person.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    searchByStatus(status) {
      return this.getData().filter((person) => person.align == status);
    }
    searchByBoth(name, status) {
      return this.getData().filter((person) => {
        if (
          person.align == status &&
          person.name.toLowerCase().includes(name.toLowerCase())
        ) {
          return person;
        }
      });
    }
  }

  const characters = new Characters();

  function loadDataToCharacters(json) {
    json.forEach((element) => {
      characters.loadData(
        element.id,
        element.name,
        element.align,
        element.power,
        element.year
      );
    });
  }

  fetch("../marvel.json")
    .then((response) => response.json())
    .then((json) => loadDataToCharacters(json))
    .catch((err) => console.log(err));

  const form = document.getElementById("form");
  let filter = document.querySelector("#filter");
  let totalResult = document.querySelector("#totalResult");
  let searchText = document.getElementById("name");
  const resultDiv = document.querySelector("#result");

  function renderHtml(data) {
    resultDiv.innerHTML = "";
    totalResult.parentElement.style.display = "block";
    totalResult.innerHTML = data.length;
    data.forEach((person, index) => {
      resultDiv.innerHTML += `<div>
      <p>${index + 1}</p>
      <div><label for="">Name: </label><strong>${person.name}</strong> </div>
      <div><label for="">Power: </label><strong> ${person.power}</strong></div>
      <div><label for="">align: </label><strong> ${person.align}</strong></div>
      <div><label for="">year: </label><strong> ${person.year}</strong></div>
      <hr/>
    </div>`;
    });
  }

  //search event
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    //filter by status
    if (searchText.value == "" && filter.value != "") {
      let filterRes = characters.searchByStatus(filter.value);
      renderHtml(filterRes);
      filter.value = "";
      return;
    }
    //filter by search text
    else if (searchText.value !== "" && filter.value == "") {
      let searchRes = characters.searchByName(searchText.value);
      renderHtml(searchRes);
      searchText.value = "";
      return;
    }
    //search by both
    else if (searchText.value !== "" && filter.value !== "") {
      let searchRes = characters.searchByBoth(searchText.value, filter.value);
      renderHtml(searchRes);
      searchText.value = "";
      filter.value = "";
      return;
    }
    alert("go to  kawar");
  });
});
