class Panel {
    private name: string;

    constructor(name) {
        this.name = name;
    }

    updatePlayerHealth(player) {
        const healthRange: any = document.querySelector('.game-panel__player-status-health__bar__range')
        const health: any = document.querySelector('.health');
        const avatar: any = document.querySelector('.game-panel__player-status-avatar');
        healthRange.style.width = `${player.health}%`;
        health.innerText = `${Math.floor(player.health)}Hp`;
        if (player.health <= 0) avatar.style.backgroundImage = 'url("./assets/img/death.jpg")';
    }
    updatePlayerWeapon(player) {
        const weaponPicture: any = document.querySelector('.game-panel__player-status-weapon')
        const weaponName: any = document.querySelector('.game-panel__player-status-weapon__bar');
        weaponPicture.style.backgroundImage = `url("./assets/img/${player.weaponName}-panel.jpg")`;
        weaponName.innerHTML = `${player.weaponFullName}`;
    }
}

export default Panel;
