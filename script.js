const apiUrl = 'https://rickandmortyapi.com/api/character/';

async function fetchCharacters() {
try {
const response = await fetch(apiUrl);
if (!response.ok) {
  throw new Error('Não foi possível obter os dados dos personagens');
}
const data = await response.json();
return data.results;
} catch (error) {
console.error('Ocorreu um erro ao obter os dados dos personagens:', error);
return [];
}
}


async function displayCharacters() {
const characters = await fetchCharacters();
const characterSelectElement = document.getElementById('character-select');
const characterCardsElement = document.getElementById('character-cards');

characters.forEach(character => {
const optionElement = document.createElement('option');
optionElement.value = character.id; 
optionElement.textContent = character.name; 
characterSelectElement.appendChild(optionElement);
});

characterSelectElement.addEventListener('change', () => {
const selectedCharacterId = characterSelectElement.value;
const selectedCharacter = characters.find(character => character.id === parseInt(selectedCharacterId));
characterCardsElement.innerHTML = ''; 

const cardElement = document.createElement('div');
cardElement.classList.add('col');
cardElement.innerHTML = `
  <div class="card">
    <img src="${selectedCharacter.image}" class="card-img-top" alt="${selectedCharacter.name}">
    <div class="card-body">
      <h5 class="card-title">${selectedCharacter.name}</h5>
      <p class="card-text"><strong>Status:</strong> ${selectedCharacter.status}</p>
      <p class="card-text"><strong>Localização:</strong> ${selectedCharacter.location.name}</p>
      <p class="card-text"><strong>Episódios:</strong> ${selectedCharacter.episode.length}</p>
    </div>
  </div>
`;
characterCardsElement.appendChild(cardElement);
});
}

displayCharacters();
