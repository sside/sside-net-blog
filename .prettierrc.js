module.exports = {
    tabWidth: 4,
    printWidth: 120,
    trailingComma: "all",
    overrides: [
        {
            files: ["*.yml", "*.yaml"],
            options: {
                tabWidth: 2,
            },
        },
        {
            files: "*.md",
            options: {
                tabWidth: 2,
                proseWrap: "never",
            },
        },
        {
            files: "*.json",
            options: {
                parser: "json",
            },
        },
    ],
};
