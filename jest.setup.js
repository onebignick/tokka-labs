// jest.setup.js
import '@testing-library/jest-dom/extend-expect'; // Custom matchers for assertions

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}), // Mocking fetch responses
    })
);

// Any other global setup can go here
