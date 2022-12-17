const teardownTests = async (): Promise<void> => {
	// Close the server
	await global.APP.close();
};

export default teardownTests;
