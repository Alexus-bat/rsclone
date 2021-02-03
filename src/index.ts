import './sass/style.scss';
import {register} from './components/authorization/script.ts';
import {signIn} from './components/authorization/script.ts';

register();
signIn();

import start from './components/orc-game/orc-game.ts';

document.querySelector('.header__btn-play')?.addEventListener('click', () => {
    document.querySelector('.header')!.style.opacity = '0';
    document.querySelector('.header')!.style.visibility = 'hidden';
    document.querySelector('.footer')!.style.opacity = '0';
    document.querySelector('.footer')!.style.visibility = 'hidden';
    start();
})


