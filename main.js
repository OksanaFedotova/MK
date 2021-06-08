const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["gun", "knife"],
    attack: function() {
        console.log(player1.name + ' Fight')
    }
};

const player2 = {
    player: 2,
    name: "Kitana",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
    weapon: ["bomb", "sword"],
    attack: function() {
        console.log(player2.name + ' Fight')
    }
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    
    return $tag;
};

function createPlayer(playerData) {

    const $player = createElement('div', `player${playerData.player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life =  createElement('div', 'life');
    const $name =  createElement('div', 'name');
    const $img = document.createElement('img');

    $life.style.width = playerData.hp + '%';
    $name.innerText = playerData.name;
    $img.src = playerData.img;

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);
    $arenas.appendChild($player);

    return $player;
};

const $player1 = createPlayer(player1);
const $player2 = createPlayer(player2);

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    const damage = getRandom(1,20);
    player.hp -= Math.ceil(damage);
    if (player.hp < 0) {
        player.hp = 0;
    };
    $playerLife.style.width = player.hp + '%';
    return player.hp;
};

const playerWins = (name) => {
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerText = name + ' wins!';

    return $winTitle;
}
$randomButton.addEventListener('click', function() {
    changeHP(player1);
    changeHP(player2);
    if (changeHP(player1) === 0) {
        $arenas.appendChild(playerWins(player2.name));
        $randomButton.disabled = true
    } else if (changeHP(player2) === 0) {
        $arenas.appendChild(playerWins(player1.name));
        $randomButton.disabled = true;
    };
});

