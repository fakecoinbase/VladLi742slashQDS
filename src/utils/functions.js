function randomKey() {
  function randomNumber() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    randomNumber() +
    randomNumber() +
    "-" +
    randomNumber() +
    "-" +
    randomNumber() +
    "-" +
    randomNumber() +
    "-" +
    randomNumber() +
    randomNumber() +
    randomNumber()
  );
}

function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues);
}

export { randomKey, updateObject };
