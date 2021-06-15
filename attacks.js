import { getRandom } from './utils.js';

export const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

export const enemyAttack = () => {
    const enemyHit = ATTACK[getRandom(0,2)];
    const enemyDefence = ATTACK[getRandom(0,2)];

    return {
        enemyValue: getRandom(0,HIT[enemyHit]),
        enemyHit,
        enemyDefence,
    }
};

export const playerAttack = () => {

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
