const toNull = (value) => {
  if (value === "" || value === undefined || value === null) {
    return null;
  }
  return value;
};

const toNumberOrNull = (value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }
  const num = Number(value);
  return isNaN(num) ? null : num;
};

const toDateOrNull = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return isNaN(date.getTime())
    ? null
    : date.toISOString().split("T")[0];
};

module.exports = {
  toNull,
  toNumberOrNull,
  toDateOrNull
};

