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

Handlebars.registerHelper("Paginate", function() {
  var listElement = $('#pokemon-table');
  var perPage = 25;
  var numItems = listElement.children().size();
  var numPages = Math.ceil(numItems/perPage);
  console.log(numPages);

  $('.pager').data("curr",0);

  var curr = 0;
  while(numPages > curr){
    $('<li><a href="#" class="page_link">'+(curr+1)+'</a></li>').appendTo('.pager');
    curr++;
  }

  $('.pager .page_link:first').addClass('active');

  listElement.children().css('display', 'none');
  listElement.children().slice(0, perPage).css('display', 'block');

  $('.pager li a').click(function(){
    var clickedPage = $(this).html().valueOf() - 1;
    goTo(clickedPage,perPage);
  });

  function previous(){
    var goToPage = parseInt($('.pager').data("curr")) - 1;
    if($('.active').prev('.page_link').length === true){
      goTo(goToPage);
    }
  }

  function next(){
    goToPage = parseInt($('.pager').data("curr")) + 1;
    if($('.active_page').next('.page_link').length === true){
      goTo(goToPage);
    }
  }

  function goTo(page){
    var startAt = page * perPage,
      endOn = startAt + perPage;

    listElement.children().css('display','none').slice(startAt, endOn).css('display','block');
    $('.pager').attr("curr",page);
  }
});
