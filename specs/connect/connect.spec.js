import { createStore } from 'redux';
import { node } from 'vidom';
import connect from '../../src/connect';
import Provider from '../../src/Provider';
import sinon from 'sinon';

describe('connect', () => {
    let store, part1, part2, part3, part4, reducerSpy;

    beforeEach(() => {
        part1 = {};
        part2 = {};
        part3 = {};
        part4 = {};
        reducerSpy = sinon.spy();
        store = createStore((state = { part1, part2, part3 }, action) => {
            reducerSpy();

            return action.type === 'update'?
                { ...state, part4 } :
                state;
        });
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

    it('should add action creator to attrs and bind them to store', done => {
        const C = ({ actionCreator }) => {
            actionCreator();
            expect(reducerSpy.called).to.be.ok();
            done();
        };

        node(Provider)
            .attrs({ store })
            .children(node(connect(null, ({ actionCreator() { return { type : 'no-update' }; } }))(C)))
            .renderToDom();
    });
});
