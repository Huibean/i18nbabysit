Template.inputForm.events({
  'submit form' : function(e){
    e.preventDefault();
    Session.set("resultId", "");
    
    originLeftText = $(e.target).find('#left-input').val();
    originRightText = $(e.target).find('#right-input').val();

    leftInput = originLeftText.replace(/[\r\n]/g,"");
    rightInput = originRightText.replace(/[\r\n]/g,"");

    prefixKey = $(e.target).find('#prefix-key').val();
    
    leftTextGroup = takeApartElement(leftInput, []);
    rightTextGroup = takeApartElement(rightInput, []);

    keyGroup = hashStringToKey(leftTextGroup)[0];

    ymlKeyGroup = hashStringToKey(leftTextGroup)[1];

    prefixKeyGroup = ymlPrefixKey(prefixKey);

    leftYml = matchKeyAndValue(ymlKeyGroup, leftTextGroup);
    rightYml = matchKeyAndValue(ymlKeyGroup, rightTextGroup);
    
    htmlText = processText(originLeftText, keyGroup, leftTextGroup, prefixKey);

    resultId = wrireYml(prefixKey, prefixKeyGroup, leftYml, rightYml, htmlText);

    Session.set("resultId", resultId);

    Router.go('results', {_id: resultId});
  }
});

function trim(str){
  str = str.replace(/^(\s|\u00A0)+/,'');   
  for(var i=str.length-1; i>=0; i--){   
    if(/\S/.test(str.charAt(i))){   
      str = str.substring(0, i+1);   
      break;   
    }   
  }   
  return str;   
}; 
        
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
  ymlKey = new Array();
  for (var i =0; i < stringGroup.length; i++) {
    if ( 20 < stringGroup[i].length &&  stringGroup[i].length <= 40) {
      key_hash = "str" + i.toString();
    } else if( 40 < stringGroup[i].length ) {
      key_hash = "paragraph" + i.toString();
    } else{
      key_hash = trim(stringGroup[i]).replace(/\ +/g,"_").toLowerCase();
    };
    ymlKey.push(key_hash + ":");
    key.push(key_hash);
  };
  return [key, ymlKey] ;
};

function matchKeyAndValue(keyGroup, ValueGroup){
  hashGroup = new Array();
  for (var i = 0; i < keyGroup.length; i++) {
   hash_line = keyGroup[i] + " " + trim( ValueGroup[i].replace(/[\r\n]/g,"") ) + "\n";
   hashGroup.push(hash_line);
  };
  return hashGroup;
};

function textWithKeyForRails(prefixKey, key){
  if (prefixKey.length > 0) {
    text = "<%= t('" + prefixKey + '.' + key + "') %>"
  } else {
    text = "<%= t('"+ key.replace(/:/ , "") + "') %>"
  };
  return text;
};

function processText(text, keyGroup, ValueGroup, prefixKey){
  processedText = text;

  for (var i = 0; i < ValueGroup.length; i++) {
   aimString = trim( ValueGroup[i].replace(/[\r\n]/g,"") );
   console.log(aimString);
   var re = new RegExp(aimString);
   console.log(re);
   erb = textWithKeyForRails(prefixKey, keyGroup[i]);
   console.log(erb);
   processedText = processedText.replace(re, erb.toString());
   console.log(processedText);
  };
  return processedText;
};

function ymlPrefixKey(prefixKey){
  originPrefixKey = prefixKey;
  prefixGroup = originPrefixKey.split('.');
  prefixKeyGroup = [];
  for (var i = 0; i < prefixGroup.length; i++) {
    end_str = ""
    if (originPrefixKey.length > 0) {  
      end_str = ":";
    };
    begin_str = "";
    if (i > 0) {
      for (var child_node = 0; child_node< i; child_node++) {
        begin_str += "  ";
      }
    };
    prefixKeyGroup[i] = begin_str + prefixGroup[i] + end_str;
  };
  return prefixKeyGroup
}