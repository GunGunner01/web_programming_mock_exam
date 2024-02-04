import { router } from './router.js';
import { Home } from './components/home.js'; // Task 5
import { Chat } from './components/chat.js';

router.register('/', Home); // Task 5
router.register('/chat', Chat); // Task 5, changed
// router.register('/', Chat);  // old line

router.navigate('/');
