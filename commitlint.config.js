export default {
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^(\w+):\s.+\s\([A-Za-z]{3},\s\d{2}\s[A-Za-z]{3},\s\d{4}\s\d{2}:\d{2}:\d{2}\s(AM|PM)\)$/,
    },
  },
  rules: {
    'header-max-length': [2, 'always', 120],
  },
};
