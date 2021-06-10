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
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
};

const player2 = {
    player: 2,
    name: "Kitana",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
    weapon: ["bomb", "sword"],
    attack: function() {
        console.log(player2.name + ' Fight')
    }, 
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP

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

  function changeHP(damage) {
      return this.hp > 0? this.hp -= damage: this.hp = 0;
  };

function elHP() {
    const $playerLife = document.querySelector('.player' + this.player + ' .life');
    return $playerLife;
};
function renderHP() {
    const $playerLife = this.elHP();
    $playerLife.style.width = this.hp + '%';
}
const playerWins = (name) => {
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerText = name + ' wins!';
    if(!name) {
        $winTitle.innerText = 'draw!'
    }
    return $winTitle;
};

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    
    $reloadButton.innerText = 'Restart';

    $reloadWrap.appendChild($reloadButton);

    return $reloadWrap;
};
const $reloadButton = createReloadButton();
$reloadButton.addEventListener('click', () => { window.location.reload() });

$randomButton.addEventListener('click', function() {
    let damage1 = Math.ceil(getRandom(1,20));
    let damage2 = Math.ceil(getRandom(1,20));
    
    player1.changeHP(damage1);
    player1.renderHP();
    player2.changeHP(damage2);
    player2.renderHP();

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        $arenas.appendChild($reloadButton);
    };
    if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    } else if (player1.hp === 0) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0) {
        $arenas.appendChild(playerWins(player1.name));
    };
});



