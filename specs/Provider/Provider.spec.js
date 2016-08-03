import { node } from 'vidom';
import Provider from '../../src/Provider';

describe('Provider', () => {
    it('should render passed node if a single child is passed', () => {
        expect(node(Provider).children([node('a')]).renderToDom())
            .to.be.an(Element);

        expect(node(Provider).children(node('a')).renderToDom())
            .to.be.an(Element);
    });

    it('should wrap rendering result to a fragment node if multiple children are passed', () => {
        expect(node(Provider).children([node('a'), node('b')]).renderToDom())
            .to.be.a(DocumentFragment);
    });

    it('should pass a store from attrs to a child context', done => {
        const store = {};

        node(Provider)
            .attrs({ store })
            .children(node((attrs, children, ctx) => {
                expect(ctx.store).to.be.equal(store);
                done();
            }))
            .renderToDom();
    });
});
