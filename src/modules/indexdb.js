var pokeDB = (function () {
  var pDB = {};
  var datastore = null;

  /**
   * Open a connection to the datastore
   * @param  {Function} callback  function to call the db.open method
   */
  pDB.open = function () {
    //database version
    var version = 1;

    //open a connection to the datastore
    var request = indexedDB.open("pokemons", version);

    //handle datastore upgrades
    request.onupgradeneeded = function (e) {
      var db = e.target.result;

      e.target.transaction.onerror = pDB.onerror;

      //delete the old datastore.
      if (db.objectStoreNames.contains("pokemon")) {
        db.deleteObjectStore("pokemon");
      }

      //create a new datastore
      db.createObjectStore("pokemon", {
        keyPath: "name",
      });

      if (db.objectStoreNames.contains("region")) {
        db.deleteObjectStore("region");
      }

      //create a new datastore
      db.createObjectStore("region", {
        keyPath: "name",
      });

      if (db.objectStoreNames.contains("game")) {
        db.deleteObjectStore("game");
      }

      //create a new datastore
      db.createObjectStore("game", {
        keyPath: "name",
      });
    };

    //handle sucessful datastore access
    request.onsuccess = function (e) {
      //get a reference to the DB;
      datastore = e.target.result;
      console.log("Sucessfully opened the datastore");
    };

    //handle errors when opening the datastore
    request.onerror = pDB.onerror;
  };

  /**
   * fetch all pokemon item list
   * @param  {String}   pokemonname   pokemon name
   * @param  {Function} callback      callback function
   */
  pDB.fetchData = function (pokemonname, objStore, callback) {
    var db = datastore;
    var transaction = db.transaction([objStore], "readonly");
    var objStore_ = transaction.objectStore(objStore);
    var request = objStore_.get(pokemonname);
    request.onerror = function (event) {
      // Handle errors!
      console.log(
        "Could not get " + objStore_ + " data with name: " + pokemonname
      );
    };
    request.onsuccess = function (event) {
      // Do something with the request.result!
      var dbdata = request.result;
      callback(dbdata);
      //console.log(pokedata);
    };
  };

  /**
   * create a new pokemon item
   * @param  {String}   text     new pokemon list
   * @param  {Function} callback callback function
   */
  pDB.createData = function (dataObj, objStore) {
    //get a reference to the db
    var db = datastore;

    //initiate a new transaction
    var transaction = db.transaction([objStore], "readwrite");

    //get the datastore
    var objStore_ = transaction.objectStore(objStore);

    //create the datastore request
    var request = objStore_.put(dataObj);

    //handle a sucessful datastore put
    request.onsuccess = function (e) {
      console.log(
        "Successfully added " + request.result + " in the IndexedDB store"
      );
    };

    //handle errors
    request.onerror = pDB.onerror;
  };

  /**
   * delete a pokemon item
   * @param  {String}   id       pokemon id number
   * @param  {Function} callback callback function
   */
  pDB.deletePokemon = function (id, callback) {
    var db = datastore;
    var transaction = db.transaction(["pokemon"], "readwrite");
    var objStore = transaction.objectStore("pokemon");

    var request = objStore.delete(id);

    request.onsuccess = function (e) {
      callback();
    };

    request.onerror = function (e) {
      console.log(e);
    };
  };

  pDB.countObjStoreData = function (objStore) {
    //console.log(objStore);
    var db = datastore;

    //initiate a new transaction
    var transaction = db.transaction([objStore], "readwrite");

    //get the datastore
    var objStore_ = transaction.objectStore(objStore);

    var countRequest = objStore_.count();
    countRequest.onsuccess = function () {
      console.log("dsadasd");
      console.log(countRequest.result);
    };

    countRequest.onerror = function (e) {
      console.log(objStore + "is either empty or does not exit");
    };
  };

  // Export the pDB object
  return pDB;
})();
