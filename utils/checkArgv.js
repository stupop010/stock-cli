const checkArgv = (argv) => {
  let checkedArgv = [];

  if (argv) {
    argv.forEach((i) => checkedArgv.push(i));
  }

  if (checkedArgv.length > 2) {
    throw new Error(
      `Only allow one stock symbol and one market name. You have input ${argv.length} arguments`
    );
  }

  return {
    stock: checkedArgv[0],
    market: checkedArgv[1] ? checkedArgv[1] : null,
  };
};

module.exports = checkArgv;
