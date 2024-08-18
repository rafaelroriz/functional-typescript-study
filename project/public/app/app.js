import { notasService as service } from './notas/service.js'
import './utils/array-helpers.js'
import { timeoutPromise, retry} from './utils/promise-helpers.js';
import { partialize, takeUntil, debounceTime, pipe } from './utils/operators.js';
import { EventEmitter, KEYS } from './utils/event-emiter.js';

const operations = pipe(
    partialize(takeUntil, 3),
    partialize(debounceTime, 500), 
);

const action = operations(() => 
    retry(3, 3000, () => timeoutPromise(1000, service.sumItensByCode('2143')))
    .then(total => EventEmitter.emit(KEYS.ITENS_TOTALIZADOS, total))
    .catch(console.log)
);

document
.querySelector('#myButton')
.onclick = action;