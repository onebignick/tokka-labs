module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['/node_modules/', '<rootDir>/.next/'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'], // Add file extensions for ES module support
};
