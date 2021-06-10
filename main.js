const $arenas = document.querySelector('.arenas');

const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["gun", "knife"],
    attack: function() {
        console.log(player1.name + ' Fight')
    },
    changeHP,
    elHP,
    renderHP
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
    changeHP,
    elHP,
    renderHP

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
    return Math.ceil(Math.random() * (max - min) + min);
  }

function enemyAttack() {
    const hit = ATTACK[getRandom(0,2)];
    const defence = ATTACK[getRandom(0,2)];

    return {
        value: getRandom(0, HIT[hit]),
        hit,
        defence,
    }
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
    $reloadButton.addEventListener('click', () => { window.location.reload() });
    
    $reloadWrap.appendChild($reloadButton);
    $arenas.appendChild($reloadWrap);
    
};

$formFight.addEventListener('submit', (e) => {
    e.preventDefault();
    const enemy = enemyAttack();
    
    const attack = {}

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(0, HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        };
        item.checked = false;
    }
    if (enemy.defence !== attack.hit) {
        player1.changeHP(attack.value);
        player1.renderHP();
    };
    if (attack.defence !== enemy.hit) {
        player2.changeHP(attack.value);
        player2.renderHP();
    };
    
    if (player1.hp === 0 || player2.hp === 0) {
        createReloadButton();
    };
    if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    } else if (player1.hp === 0) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0) {
        $arenas.appendChild(playerWins(player1.name));
    };
});

