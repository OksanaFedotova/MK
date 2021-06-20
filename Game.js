import { createElement, getRandom } from './utils.js';
import { enemyAttack, playerAttack } from './attacks.js';
import Player from './Player/index.js';

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

let player1;
let player2;

class Game {

    constructor(arenaSelector) {
        this.$arenas = document.querySelector('.arenas');
        this.$arenas.classList.add(`arena${arenaSelector}`);
        this.$formFight = document.querySelector('.control');
        this.$chat = document.querySelector('.chat');
    }

    getPlayer2 = async () => {
        const p2 = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose')
        .then((response) => response.json());
        return p2;
    }

    createPlayers = async () => {

        const p1 = JSON.parse(localStorage.getItem('player1'));
        const p2 = await this.getPlayer2();

        player1 = new Player({
            ...p1,
            player: 1,
            rootSelector: 'arenas' 
        });

        player2 = new Player({
            ...p2,
            player: 2,
            rootSelector: 'arenas' 
        });

        player1.createPlayer();
        player2.createPlayer();
    }
    playerWins = (name) => {
        const $winTitle = createElement('div', 'loseTitle');
        $winTitle.innerText = name + ' wins!';
        if(!name) {
            $winTitle.innerText = 'draw!'
        }
        return $winTitle;
    }

    createReloadButton = () => {
        const $reloadWrap = createElement('div', 'reloadWrap');
        const $reloadButton = createElement('button', 'button');
        
        $reloadButton.innerText = 'Restart';
        $reloadButton.addEventListener('click', () => { window.location.pathname = './SelectPlayer/index.html' });
        
        $reloadWrap.appendChild($reloadButton);
        this.$arenas.appendChild($reloadWrap);
    }

    generateLogs = (type, player1, player2, damage, rest) => {
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
                default: 
                el = `<p>Происходит что-то непонятное</p>`;
                break;
            };
       
        this.$chat.insertAdjacentHTML('afterbegin', el);
     }

     //Неудавшаяся попытка выполнить третье задание:
     
     /*
     getAttacks = async () => {

        const { hit, defence } = playerAttack();
        const response = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
                method: 'POST',
                body: JSON.stringify({
                hit,
                defence,
            })
        })

        .then(response => response.json())
        return response;
    } 
    */

     startFight = () => {
        this.$formFight.addEventListener('submit', (e) => {
            
            e.preventDefault();
            
            // const {p1, p2} = this.getAttacks(); получение данных, но приходит undefined

            const { value, hit, defence  } = playerAttack();
            const { value: enemyValue, hit: enemyHit, defence: enemyDefence } = enemyAttack();
        
            if(player1.hp === 100 && player2.hp === 100) {
                this.generateLogs('start', player1, player2)
            };
            
            if (enemyDefence !== hit) {
                player2.changeHP(value);
                player2.renderHP();
                this.generateLogs('hit', player1, player2, value, player2.hp);
            } else {
                this.generateLogs('defence', player2, player1, value, player2.hp);
            }
            if (defence !== enemyHit) {
                player1.changeHP(enemyValue);
                player1.renderHP();
                this.generateLogs('hit', player2, player1, enemyValue, player1.hp);
            } else {
                this.generateLogs('defence', player1, player2, enemyValue, player1.hp);
            }
            if (player1.hp === 0 || player2.hp === 0) {
                this.createReloadButton();
            };
            if (player1.hp === 0 && player2.hp === 0) {
                this.generateLogs('draw');
                this.$arenas.appendChild(this.playerWins());
            } else if (player1.hp === 0) {
                this.generateLogs('end', player2, player1);
                this.$arenas.appendChild(this.playerWins(player2.name));
            } else if (player2.hp === 0) {
                this.generateLogs('end', player1, player2);
                this.$arenas.appendChild(this.playerWins(player1.name));
            };
        });
     }


     start = () => {
         this.createPlayers();
         this.startFight();
     }
}

export default Game;
