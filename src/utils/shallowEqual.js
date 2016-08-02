export default function shallowEqual(objA, objB) {
    if(objA === objB) {
        return true;
    }

    const keysA = Object.keys(objA),
        keysB = Object.keys(objB);

    if(keysA.length !== keysB.length) {
        return false;
    }

    for(let i = 0, len = keysA.length, key; i < len; i++) {
        key = keysA[i];
        if(objA[key] !== objB[key]) {
            return false;
        }
    }

    return true;
}
