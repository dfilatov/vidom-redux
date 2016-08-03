import { createStore } from 'redux';
import { node } from 'vidom';
import connect from '../../src/connect';
import Provider from '../../src/Provider';

describe('connect', () => {
    let store, part1, part2, part3;

    beforeEach(() => {
        part1 = {};
        part2 = {};
        part3 = {};
        store = createStore(_ => { part1, part2, part3 });
    });

    it('should add mapped parts of store to attrs', done => {
        const C = ({ attr1, attr2 }) => {
                expect(attr1).to.be.equal(part1);
                expect(attr2).to.be.equal(part2);
                done();
            };

        node(Provider)
            .attrs({ store })
            .children(node(connect(state => ({ attr1 : part1, attr2 : part2 }))(C)))
            .renderToDom();
    });
});
