export const asyncEvery = async <T>(arr: Array<T>, predicate: (element: T) => Promise<Boolean>) => {
	for (let e of arr) {
		if (!await predicate(e)) return false;
	}
	return true;
};