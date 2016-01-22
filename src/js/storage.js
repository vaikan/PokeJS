function storeGameVersions(versionObj) {
  if(!window.localStorage) {
    console.log('no localstorage support!!');
  } else {
    var jsonString = JSON.stringify(versionObj);
    if (localStorage.getItem('ver') === '') {
        localStorage.setItem('ver', jsonString);
    } else {
      var prevData = localStorage.getItem('ver');
      if (prevData === null) {
        localStorage.setItem('ver', jsonString);
      } else {
        localStorage.setItem('ver', prevData + ',' + jsonString);
      }

    }
  }
}

function retrieveGameVersions() {
  if(!window.localStorage) {
    console.log('no localstorage support!!');
  } else {
    var data = '[' + localStorage.getItem('ver') + ']';
    var parseJSON = JSON.parse(data);
    return parseJSON;
  }
}
