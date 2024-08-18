import { handleStatus} from '../utils/promise-helpers.js';
import { pipe } from '../utils/operators.js';
import { Maybe } from '../utils/maybe.js';

const API = `http://localhost:3000/notas`;

const getItensFromNotas = notasM => notasM.map(notas => notas.flatMap(nota => nota.itens));
const filterItensByCode = code => itensM => itensM.map(itens => itens.filter(item => item.codigo == code));
const sumItensValue = itensM => itensM.map(itens => itens.reduce((a,b) => a + b.valor ,0));

export const notasService = {
    async listAll() {
        return fetch(API)
        // lida com o status da requisição
        .then(handleStatus)
        .then(Maybe.of)
        .catch(err => {
            // a responsável pelo logo é do serviço
            console.log(err);
            // retorna uma mensagem de alto nível
            return Promise.reject('Não foi possível obter as notas fiscais');
        });
    },
    async sumItensByCode(code) {

        const sumItens = pipe(
            getItensFromNotas,
            filterItensByCode(code),
            sumItensValue
        );

        return this
        .listAll()
        .then(sumItens)
        .then(result => result.getOrElse(0));
    }
};