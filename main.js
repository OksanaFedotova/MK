const $arenas = document.querySelector('.arenas');

const $formFight = document.querySelector('.control');

const $chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

const player1 = {
    player: 1,
    name: "Kitana",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
    weapon: ["bomb", "sword"],
    attack: function() {
        console.log(player1.name + ' Fight')
    }, 
    changeHP,
    elHP,
    renderHP

};

const player2 = {
    player: 2,
    name: 'Scorpion',
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["gun", "knife"],
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
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function enemyAttack() {
    const hit = ATTACK[getRandom(0,2)];
    const defence = ATTACK[getRandom(0,2)];

    return {
        value: getRandom(0,HIT[hit]),
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

function updateHP (player, val) {
    player.changeHP(val);
    player.renderHP();
};


function playerAttack() {

    const attack = {}

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(0,HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        };
        item.checked = false;
    };
    return attack;
};

function generateLogs(type, player1, player2, damage, rest) {

    const time = new Date().toLocaleTimeString();
    let num = 0;
    let text = '';
    let el = '';
        switch (type) {
            case 'start':
                text = logs[type]
                .replace('[time]', time)
                .replace('[player1]', player1.name)
                .replace('[player2]', player2.name);
                el = `<p>${text}</p>`;
                break;
            case 'end':
                num = getRandom(0,logs[type].length-1);
                text = logs[type][num]
                .replace('[playerWins]', player1.name)
                .replace('[playerLose]', player2.name);
                el = `<p>${text}</p>`;
                break;
            case 'hit':
                num = getRandom(0,logs[type].length-1);
                text = logs[type][num]
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name);
                el = `<p>${time}: ${text} -${damage} [${rest}/100]</p>`;
                break;
            case 'defence':
                num = getRandom(0,logs[type].length-1);
                text = logs[type][num]
                .replace('[playerKick]', player2.name)
                .replace('[playerDefence]', player1.name);
                el = `<p>${time}: ${text} ${player2.name}-${damage} [${rest}/100]</p>`;
                break;
            case 'draw':
                el = `<p>${logs[type]}</p>`;
                break;
        };
   
    $chat.insertAdjacentHTML('afterbegin', el);

 };


$formFight.addEventListener('submit', (e) => {
    e.preventDefault();

    const enemy = enemyAttack();
    const player = playerAttack();

    if(player1.hp === 100 && player2.hp === 100) {
        generateLogs('start', player1, player2)
    };
    
    if (enemy.defence !== player.hit) {
        updateHP(player2, player.value);
        generateLogs('hit', player1, player2, player.value, player2.hp);
    };
    if (enemy.defence == player.hit) {
        generateLogs('defence', player1, player2, player.value, player2.hp);
    }
    if (player.defence !== enemy.hit) {
        updateHP(player1, enemy.value);
        generateLogs('hit', player2, player1, enemy.value, player1.hp);
    };
    if(player.defence == enemy.hit) {
        generateLogs('defense', player2, player1, enemy.value, player1.hp);
    }
    if (player1.hp === 0 || player2.hp === 0) {
        createReloadButton();
    };
    if (player1.hp === 0 && player2.hp === 0) {
        generateLogs('draw');
        $arenas.appendChild(playerWins());
    } else if (player1.hp === 0) {
        generateLogs('end', player2, player1);
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0) {
        generateLogs('end', player1, player2);
        $arenas.appendChild(playerWins(player1.name));
    };
});


 
