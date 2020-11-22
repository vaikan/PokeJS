var db = {
  getData: (keyName) => {
    var data = localStorage.getItem(keyName);
    var parseJSON = JSON.parse(data);
    return parseJSON;
  },

  storeData: (dataObj, keyName) => {
    var jsonString = JSON.stringify(dataObj);
    if (localStorage.getItem(keyName) === null) {
      localStorage.setItem(keyName, jsonString);
      $.snackbar({
        content: "New key " + keyName + " added to Local Storage",
        timeout: 10000,
      });
    } else {
      $.snackbar({
        content: keyName + " is present in Local Storage",
        timeout: 10000,
      });
    }
  },
};
