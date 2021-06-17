export const player1 = {
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

export const player2 = {
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

export function updateHP (player, val) {
  player.changeHP(val);
  player.renderHP();
};