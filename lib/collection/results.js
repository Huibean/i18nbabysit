Results = new Mongo.Collection('results');

wrireYml = function(prefixKey, prefixGroup, leftResult, rightResult, htmlText){
  resultId = Results.insert({prefixKey: prefixKey, prefixGroup: prefixGroup, leftResult: leftResult, rightResult: rightResult, htmlText: htmlText});
  return resultId;
};