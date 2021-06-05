const player1 = {
    name: 'Scorpion',
    hp: 50,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["gun", "knife"],
    attack: function() {
        console.log(player1.name + ' Fight')
    }
};

const player2 = {
    name: "Kitana",
    hp: 80,
    img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
    weapon: ["bomb", "sword"],
    attack: function() {
        console.log(player2.name + ' Fight')
    }
};

function createPlayer(playerClass, playerData) {
    const $player = document.createElement('div');
    $player.classList.add(playerClass);
    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');
    const $character = document.createElement('div');
    $character.classList.add('character');
    $player.appendChild($progressbar);
    $player.appendChild($character);
    const $life =  document.createElement('div');
    $life.style.width = '100%';
    $life.classList.add('life');
    const $name =  document.createElement('div');
    $name.innerHTML = playerData.name;
    $name.classList.add('name');
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    const $img = document.createElement('img');
    $img.src = playerData.img;
    $character.appendChild($img);
} 
const player1 = createPlayer('player1', player1);
const player2 = createPlayer('player2', player2);

const arenas = document.querySelector('.arenas');
arenas.appendChild(player1);
arenas.appendChild(player2);
