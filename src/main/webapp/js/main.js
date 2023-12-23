import { router } from './router.js';
import { Chat } from './components/chat.js';

router.register('/', Chat);

router.navigate('/');
