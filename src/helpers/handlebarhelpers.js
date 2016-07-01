/**
 * FirstStringUpperCase - changes first character of the string to upper case except the Roman numericals which are all changed to upper case
 * @param  {string} FirstStringUpperCase      name of the helper
 * @param  {Function} function(data)          callback function with data as parameter
 * @return {string} correctedCase             uppercased string
 */
Handlebars.registerHelper("FirstStringUpperCase", function(data) {
  var correctedCase;
  var stringArr = [];
  var firstLetter;
  var otherLetters;
  var capitalCase;

  if (data) {
    if (data.search('-') != -1) {
      var stringSplit = data.split('-');
      for (var a in stringSplit) {

        if (stringSplit[a].match(/^(i|ii|iii|iv|v|vi)$/)) {
          capitalCase = stringSplit[a].toUpperCase();
          stringArr.push(capitalCase);
        } else {
          firstLetter = stringSplit[a].substr(0,1);
          otherLetters = stringSplit[a].substr(1, stringSplit[a].length);
          capitalCase = firstLetter.toUpperCase();

          var newString = capitalCase+otherLetters;
          stringArr.push(newString);
        }
      }
      if (stringArr.length === 2) {
        correctedCase = stringArr[0]+'-'+stringArr[1];
      } else if (stringArr.length === 3) {
        correctedCase = stringArr[0]+'-'+stringArr[1]+'-'+stringArr[2];
      } else {
        correctedCase = stringArr[0]+'-'+stringArr[1]+'-'+stringArr[2]+'-'+stringArr[3];
      }
    } else {
      firstLetter = data.substr(0,1);
      otherLetters = data.substr(1, data.length);
      capitalCase = firstLetter.toUpperCase();

      correctedCase = capitalCase+otherLetters;
    }
    return correctedCase;
  }
});
