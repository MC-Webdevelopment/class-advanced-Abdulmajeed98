// all the magic will happen now !

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
    this.arrayOfCharacters.push(newCharacter);
  }

  getData() {
    return this.arrayOfCharacters;
  }
  searchByName(name) {
    return this.arrayOfCharacters.find((item) => {
      if (item.name.includes(name)) return item;
    });
  }
}
const characters = new Characters();
fetch("../marvel.json")
  .then((response) => response.json())
  .then((json) => loadDataToCharacters(json))
  .catch((err) => console.log(err));

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

const btn1 = document.getElementById("search");
const btn2 = document.getElementById("check-align");
const nameInput = document.getElementById("name");
const body = document.querySelector("body");
const data = characters.getData();

btn1.addEventListener("click", (e) => {
  e.preventDefault();
  const nameTxt = nameInput.value;

  if (nameTxt === "") return;
  const foundObject = searchByName(data, nameTxt);
  console.log(foundObject);
  body.innerHTML += `<p><strong>${foundObject.name}</strong></p>`;
});

btn2.addEventListener("click", (e) => {
  e.preventDefault();
  if (nameInput.value === "") {
    alert("please enter a character name!");
    return;
  }
  const foundObject = searchByName(data, nameInput.value);
  body.innerHTML += `<p><strong>${
    foundObject.name
  }</strong> <em>${foundObject.checkCharacter()}</em></p>`;
});

function searchByName(data, name) {
  return data.find((element) => {
    if (element.name.toLowerCase().includes(name.toLowerCase())) return element;
  });
}
