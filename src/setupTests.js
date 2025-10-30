// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Provide a basic mock for IntersectionObserver (used by framer-motion) in the
// jsdom test environment which doesn't implement it by default.
if (typeof window !== 'undefined' && typeof window.IntersectionObserver === 'undefined') {
	class IntersectionObserverMock {
		constructor() {}
		observe() {}
		unobserve() {}
		disconnect() {}
		takeRecords() { return []; }
	}
	window.IntersectionObserver = IntersectionObserverMock;
}
