const toUpperCase = (data) => {
  let firstLetter;
  let otherLetters;
  let capitalCase;
  let stringArr = [];

  const stringSplit = data.split("-");

  for (let a in stringSplit) {
    if (stringSplit[a].match(/^(i|ii|iii|iv|v|vi)$/)) {
      capitalCase = stringSplit[a].toUpperCase();
      stringArr.push(capitalCase);
    } else {
      firstLetter = stringSplit[a].substr(0, 1);
      otherLetters = stringSplit[a].substr(1, stringSplit[a].length);
      capitalCase = firstLetter.toUpperCase();

      var newString = capitalCase + otherLetters;
      stringArr.push(newString);
    }
  }

  return stringArr;
};

const formatString = (stringArray, formatter) => {
  let correctedCase;

  for (let i = 0; i < stringArray.length; i++) {
    if (i === 0) {
      correctedCase = stringArray[i];
    } else {
      correctedCase = correctedCase + formatter + stringArray[i];
    }
  }

  return correctedCase;
};

/**
 * FirstStringUpperCase - changes first character of the string to upper case except the Roman numericals which are all changed to upper case
 * @param  {string} FirstStringUpperCase      name of the helper
 * @param  {Function} function(data)          callback function with data as parameter
 * @return {string} correctedCase             uppercased string
 */
Handlebars.registerHelper("FirstStringUpperCase", (data) => {
  let stringArr = [];
  let correctedCase;

  if (data) {
    stringArr = toUpperCase(data);

    correctedCase = formatString(stringArr, " ");

    return correctedCase;
  }
});

Handlebars.registerHelper("FirstStringUpperCaseTitle", (data) => {
  let stringArr = [];
  let correctedCase;

  if (data) {
    stringArr = toUpperCase(data);

    if (stringArr.length === 1) {
      correctedCase = stringArr[0];
    } else if (stringArr.length === 2) {
      correctedCase = stringArr[0] + ", " + stringArr[1];
    } else if (stringArr.length === 3) {
      correctedCase = stringArr[0] + "-" + stringArr[1] + "-" + stringArr[2];
    } else {
      correctedCase =
        stringArr[0] +
        " " +
        stringArr[1] +
        ", " +
        stringArr[2] +
        " " +
        stringArr[3];
    }
    return correctedCase;
  }
});
