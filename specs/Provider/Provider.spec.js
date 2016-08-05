import { node } from 'vidom';
import Provider from '../../src/Provider';

describe('Provider', () => {
    const store = {};

    it('should render passed node if a single child is passed', () => {
        expect(node(Provider).attrs({ store }).children([node('a')]).renderToDom())
            .to.be.an(Element);

        expect(node(Provider).attrs({ store }).children(node('a')).renderToDom())
            .to.be.an(Element);
    });

    it('should wrap rendering result to a fragment node if multiple children are passed', () => {
        expect(node(Provider).attrs({ store }).children([node('a'), node('b')]).renderToDom())
            .to.be.a(DocumentFragment);
    });

    it('should pass a store from attrs to a child context', done => {
        node(Provider)
            .attrs({ store })
            .children(node((attrs, children, ctx) => {
                expect(ctx.store).to.be.equal(store);
                done();
            }))
            .renderToDom();
    });
});
