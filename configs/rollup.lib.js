import babel from 'rollup-plugin-babel';

export default {
    format : 'cjs',
    entry : 'src/index.js',
    dest : 'lib/index.js',
    plugins : [
        babel({
            babelrc : false,
            presets : ['es2015-loose-rollup'],
            plugins : ['transform-object-rest-spread']
        })
    ]
};
