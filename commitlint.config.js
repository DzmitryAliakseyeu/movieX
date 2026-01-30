module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern:
      /^(\w+):\s(.+)$/,
      headerCorrespondence: ['type', 'subject', 'timestamp'],
    },
  },
  rules: {
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'header-max-length': [2, 'always', 300],
  },
};
