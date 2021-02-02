import './sass/style.scss';
import {register} from './components/authorization/script.ts';
import {signIn} from './components/authorization/script.ts';

register();
signIn();

import start from './components/orc-game/orc-game.ts';

start();

