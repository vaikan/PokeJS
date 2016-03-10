/**
 * store pokemon gameversion to the local storage
 * @param  {Object} versionObj pokemon game version object
 */
function storeGameVersions(versionObj) {
  if (!window.localStorage) {
    console.log('no localstorage support!!');
  } else {
    var jsonString = JSON.stringify(versionObj);
    if (localStorage.getItem('Game-Version') === null) {
      localStorage.setItem('Game-Version', jsonString);
      console.log('New key "Game-Version" added to Local Storage');
    } else {
      console.log('"Game-Version" is already in Local Storage');
    }
  }
}

/**
 * store version details in the local storage
 * @param  {Object} versiongroup version details object
 */
function storeGameDetails(versiongroup) {
  if (!window.localStorage) {
    console.log('no localstorage support!!');
  } else {
    var jsonString = JSON.stringify(versiongroup);
    var versionName = versiongroup.name;
    if (localStorage.getItem('Game-Version-'+versionName) === null) {
      localStorage.setItem('Game-Version-'+versionName, jsonString);
      console.log('New key "Game-Version-'+ versionName +'" added to Local Storage');
    } else {
      console.log('"Game-Version-'+ versionName +'" is already in Local Storage');
    }
  }
}

/**
 * retrieve game version from the local storage
 */
function retrieveGameVersions() {
  if (!window.localStorage) {
    console.log('no localstorage support!!');
  } else {
    var data = '{"versions":' + localStorage.getItem('Game-Version') + '}';
    setVersionTemplate(data);
  }
}

/**
 * retrieve game version from the local storage
 */
function retrieveGameVersionsModalDetails(name) {
  if (!window.localStorage) {
    console.log('no localstorage support!!');
  } else {
    var gameName = 'Game-Version-'+name;
    var data = localStorage.getItem(gameName);
    setVersionDetailsTemplate(data);
  }
}