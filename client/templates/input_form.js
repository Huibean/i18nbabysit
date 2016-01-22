Template.inputForm.events({
  'submit form' : function(e){
    e.preventDefault();
    Session.set("resultId", "");

    var leftInput = $(e.target).find('#left-input').val();
    var rightInput = $(e.target).find('#right-input').val();
    

    leftTextGroup = takeApartElement(leftInput, []);
    rightTextGroup = takeApartElement(rightInput, []);
    debugger

    //leftTextGroup = pushjQueryTextToArray(leftInput);
    //rightTextGroup = pushjQueryTextToArray(rightInput);

    keyGroup = hashStringToKey(leftTextGroup);
    
    leftYml = matchKeyAndValue(keyGroup, leftTextGroup);
    rightYml = matchKeyAndValue(keyGroup, rightTextGroup);
    
    resultId = wrireYml(leftYml, rightYml);

    Session.set("resultId", resultId);
    Router.go('results', {_id: resultId});
  }
});

function pushjQueryTextToArray(dom){
  targrtArray =new Array();
  $(dom).each(function(index, el) {
    if ($(el).text().length > 0) {
      targrtArray.push($(el).text());
    };
  });
  return targrtArray;
};

function replaceTextWithKey(key, text){
  text = "t(" + " ' " + key + " ' " + ")"
  return text;
}
        
function takeApartElement(stringGroup, arr){
  $(stringGroup).each(function(){
    if ( $(this).children().length > 1) {
      _this = $(this).children();
      takeApartElement($(_this), arr);
    } else if( !!$(this).children() && $(this).text().length > 0){
      arr.push($(this).text());
    };
  })
  console.log(arr);
  return arr;
};

function hashStringToKey(stringGroup){
  key = new Array();
  for (var i =0; i < stringGroup.length; i++) {
    if ( 20 < stringGroup[i].length &&  stringGroup[i].length <= 40) {
      key_hash = "str" + i.toString() + ":";
    } else if( 40 < stringGroup[i].length ) {
      key_hash = "paragraph" + i.toString() + ":";
    } else{
      key_hash = stringGroup[i].toLowerCase().replace(" ", "_") + ":";
    };
    key.push(key_hash);
  };
  return key;
};

function transTextToWoringKey(keyGroup, dom){
  
};

function matchKeyAndValue(keyGroup, ValueGroup){
  hashGroup = new Array();
  for (var i = 0; i < keyGroup.length; i++) {
   hash_line = keyGroup[i] + " " + ValueGroup[i] + "\n";
   hashGroup.push(hash_line);
  };
  return hashGroup;
};