const transformRow = (row, mapping) => {
  const newRow = {};

  for (let key in row) {
    const trimmed = key.trim();
    if (mapping[trimmed]) {
      newRow[mapping[trimmed]] = row[key];
    }
  }

  return newRow;
};

module.exports = { transformRow };
