module.exports = {
    transform: {
        '^.+\\.[tj]sx?$': 'babel-jest',  // Transpile JS and JSX files using Babel
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\](?!axios/)',  // Transpile ES6 modules in axios and other dependencies
    ],
    testEnvironment: 'jsdom',  // Use jsdom environment for React components
};
