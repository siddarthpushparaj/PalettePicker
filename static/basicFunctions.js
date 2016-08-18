function contains(array, item) {
	for (i = 0; i < array.length; i++) {
		if (array[i] == item) return true;
	}

	return false;
}