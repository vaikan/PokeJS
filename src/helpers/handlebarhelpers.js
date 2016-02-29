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
      correctedCase = stringArr[0]+'-'+stringArr[1];
    } else {
      firstLetter = data.substr(0,1);
      otherLetters = data.substr(1, data.length);
      capitalCase = firstLetter.toUpperCase();

      correctedCase = capitalCase+otherLetters;
    }
    return correctedCase;
  }
});
