Results = new Mongo.Collection('results');

wrireYml = function(leftResult, rightResult){
  resultId = Results.insert({leftResult: leftResult, rightResult: rightResult});
  return resultId;
};