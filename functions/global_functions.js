module.exports = {
  searchInDb: function(db, searchValue){
    jsonNumber = null;
    foreachNumber = 0;
    db.forEach(obj => {
      Object.entries(obj).forEach(([key, value]) => {
        if (value == searchValue){
          jsonNumber = foreachNumber;
        }
      });
      foreachNumber++;
    })
    return jsonNumber;
  },
  jsonToString: function(json){
    jsonString = JSON.stringify(json);
    jsonString = jsonString.replaceAll('[', '');
    jsonString = jsonString.replaceAll(']', '');
    jsonString = jsonString.replaceAll('{', '');
    jsonString = jsonString.replaceAll('},', '\n \n');
    jsonString = jsonString.replace('}', '');
    jsonString = jsonString.replaceAll(',', '\n');
    jsonString = jsonString.replaceAll('"', '');
    jsonString = jsonString.replaceAll(':', ' : ');
    jsonString = jsonString.replaceAll('null', '');

    return jsonString
  }
}