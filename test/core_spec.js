// /**
//  * Created by maximcherkasov on 16.02.17.
//  */
//
// import {List, Map} from 'immutable';
// import expect from 'chai';
//
// import {setEntries} from '../src/core';
// import {describe, it, to} from "mocha";
//
// describe('application logic', () => {
//
//     describe('setEntries', () => {
//
//         it('добавляет записи к состоянию', () => {
//             const state = Map();
//             const entries = List.of('Trainspotting', '28 Days Later');
//             const nextState = setEntries(state, entries);
//             expect(nextState).to.equal(Map({
//                 entries: List.of('Trainspotting', '28 Days Later')
//             }));
//         });
//
//     });
//
// });
