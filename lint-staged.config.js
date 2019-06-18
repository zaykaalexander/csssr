module.exports = {
	"src/*.(ts|tsx)": [
		"yarn prettier",
		"yarn lint",
		"git add .",
	],
};
