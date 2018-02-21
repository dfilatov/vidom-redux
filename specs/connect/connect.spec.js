import { elem, mount, unmount } from 'vidom';
import { createStore } from 'redux';
import connect from '../../src/connect';
import Provider from '../../src/Provider';
import sinon from 'sinon';

describe('connect', () => {
    let domNode, store, part1, part2, part3, part4, reducerSpy;

    beforeEach(() => {
        domNode = document.createElement('div');
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

    afterEach(done => {
        unmount(domNode, done);
    });

    it('should add mapped parts of store to attrs', done => {
        const C = ({ attr1, attr2 }) => {
            expect(attr1).to.be.equal(part1);
            expect(attr2).to.be.equal(part2);
            done();
        };

        mount(
            domNode,
            elem(
                Provider,
                null,
                { store },
                elem(connect(state => ({ attr1 : part1, attr2 : part2 }))(C))));
    });

    it('should add action creator to attrs and bind them to store', done => {
        const C = ({ actionCreator }) => {
            actionCreator();
            expect(reducerSpy.called).to.be.ok();
            done();
        };

        mount(
            domNode,
            elem(
                Provider,
                null,
                { store },
                elem(connect(null, ({ actionCreator() { return { type : 'no-update' }; } }))(C))));
    });

    it('should pass external attrs', done => {
        const C = ({ extAttr }) => {
            expect(extAttr).to.be.ok();
            done();
        };

        mount(
            domNode,
            elem(
                Provider,
                null,
                { store },
                elem(connect()(C), null, { extAttr : true })));
    });

    it('should rerender and pass new state if store has updated', done => {
        let counter = 0;
        const C = state => {
            if(++counter === 2) {
                expect(state).to.be.eql({ part1, part2, part3, part4 });
                done();
            }
        };

        mount(
            domNode,
            elem(
                Provider,
                null,
                { store },
                elem(connect(state => state)(C))),
            () => {
                store.dispatch({ type : 'update' });
            });
    });

    it('shouldn\'t rerender if store hasn\'t updated', done => {
        let counter = 0;
        const C = () => {
            expect(++counter).to.be.equal(1);
        };

        mount(
            domNode,
            elem(
                Provider,
                null,
                { store },
                elem(connect(state => state)(C))),
            () => {
                store.dispatch({ type : 'no-update' });
                setTimeout(done, 50);
            });
    });
});
