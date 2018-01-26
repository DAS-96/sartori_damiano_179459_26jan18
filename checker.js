
const fetch = require('node-fetch')

function check(url, invocationParameters,  expectedResultData, expectedResultStatus) {

  var paramNames = Object.keys(invocationParameters);
  console.log(paramNames);
  var paramValues = Object.values(invocationParameters);
  console.log(paramValues);

  var completeUrl = url + "?";

  for (i = 0; i < paramNames.length; i++){
    completeUrl = completeUrl + paramNames[i] + "=" + paramValues[i];
    if (i < (paramNames.length - 1)){
      completeUrl = completeUrl + "&";
    }
  }

  console.log(completeUrl);

  fetch(completeUrl, {headers: 'Accept: application/json'})
    .then(function(res){
      console.log("FACENDO LA GET");
      console.log(res.status);
      var json = JSON.parse(res);
      //var json = JSON.parse(res.body);
      console.log(res);

      var compare = compareResults(expectedResultData, {area: 15});

      const checkResult = { // this is the object you need to set and return
          urlChecked: completeUrl,
          resultData: null,
          resultStatus: res.status,
          statusTestPassed: (res.status == expectedResultStatus),
          resultDataAsExpected: compare
      };

      console.log(checkResult);

    })
    .catch(function(err){
      console.log("ERRORE" + err);
    });



    /*const checkResult = { // this is the object you need to set and return
        urlChecked: url,
        resultData: null,
        resultStatus: null,
        statusTestPassed: null,
        resultDataAsExpected: null
    }*/



}


// funzione che confronta due oggetti semplici e verifica se actual contiene tutti gli attributi di expected, e se per
// questi ha gli stessi valori
function compareResults(expected, actual) {
    if (!expected) return true //always ok if there are no expectations
    if (!actual) return false
    for (let e of Object.keys(expected)) {
        if (actual[e]===undefined || expected[e]!=actual[e]  ) return false
    }
    return true
}

module.exports = check
