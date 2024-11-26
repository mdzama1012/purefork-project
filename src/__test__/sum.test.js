// Just for learning purpose.

import sum from "../utils/sum";

test("should return the correct sum of two numbers", () => {
	const result = sum(5, 7);

	// Assertion.
	expect(result).toBe(12);
});
