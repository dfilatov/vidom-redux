import shallowEqual from '../../src/utils/shallowEqual';

describe('shallowEqual', () => {
    it('should return true if both arguments are the same object', () => {
        const obj = {};

        expect(shallowEqual(obj, obj)).to.be.ok();
    });

    it('should return true if arguments are equal', () => {
        expect(shallowEqual({ a : 1, b : 'b', c : true }, { a : 1, c : true, b : 'b' })).to.be.ok();

        const obj = {};

        expect(shallowEqual({ a : obj }, { a : obj })).to.be.ok();

        const fn = function() {};

        expect(shallowEqual({ a : fn }, { a : fn })).to.be.ok();
    });

    it('should return false if arguments aren\'t equal', () => {
        expect(shallowEqual({ a : 1, b : 'b' }, { a : 1, b : 'b', c : true })).not.to.be.ok();
        expect(shallowEqual({ a : 1, b : 'b', c : true }, { a : 1, b : 'b' })).not.to.be.ok();
        expect(shallowEqual({ a : 1, b : 'b', c : true }, { a : 1, b : 'b', c : false })).not.to.be.ok();
        expect(shallowEqual({ a : 1, b : 'b', c : true }, { a : 1, b : 'b', d : true })).not.to.be.ok();
        expect(shallowEqual({ a : {} }, { a : {} })).not.to.be.ok();
        expect(shallowEqual({ a : function() {} }, { a : function() {} })).not.to.be.ok();
    });
});
