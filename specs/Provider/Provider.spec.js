import { elem } from 'vidom';
import Provider from '../../src/Provider';

describe('Provider', () => {
    const store = {};

    it('should render passed node if a single child is passed', () => {
        expect(elem(Provider, null, { store }, elem('a')).renderToDom(null))
            .to.be.an(Element);
    });

    it('should wrap rendering result to a fragment node if multiple children are passed', () => {
        expect(elem(Provider, null, { store }, [elem('a'), elem('b')]).renderToDom(null))
            .to.be.a(DocumentFragment);
    });

    it('should pass a store from attrs to a child context', done => {
        elem(
            Provider,
            null,
            { store },
            elem((attrs, children, ctx) => {
                expect(ctx.store).to.be.equal(store);
                done();
            })).renderToDom(null);
    });
});
