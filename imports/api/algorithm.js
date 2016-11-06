const operateText = (texts, prefix) => {
  console.log("args:", texts, prefix)
  let prefixKey = prefix;
  let useHtmlSafe = true;

  let keyGroup;
  let translateCodes = [];
  let ymlKeyGroup;
  let prefixKeyGroup;
  let htmlText;

  texts.map((text, index) => {
    let formatedText = text.replace(/[\r\n]/g,"")
    let textGroup = takeApartElement(formatedText, []);
    if( index == 0 ) {
      keyGroup = hashStringToKey(textGroup)[0];
      ymlKeyGroup = hashStringToKey(textGroup)[1];
      prefixKeyGroup = ymlPrefixKey(prefixKey);
      htmlText = processText(text, keyGroup, textGroup, prefixKey);
    }
    translateCodes.push(matchKeyAndValue(ymlKeyGroup, textGroup, useHtmlSafe))
  })

  return {
    htmlText: htmlText,
    prefixKey: prefixKeyGroup,
    translateCodes: translateCodes
  }
  
};
export default operateText;

const trim = (str) =>{
  str = str.replace(/^(\s|\u00A0)+/,'');   
  for(var i=str.length-1; i>=0; i--){   
    if(/\S/.test(str.charAt(i))){   
      str = str.substring(0, i+1);   
      break;
    }   
  }   
  return str;   
}; 

const takeApartElement = (stringGroup, arr) => {
  $(stringGroup).each(function(){
    console.log(this);
    if ( $(this).children().length > 0 && $(this).children('strong').length == 0 && $(this).children('em').length == 0 && $(this).children('span').length == 0 && $(this).children('b').length == 0 ) {
      _this = $(this).children();
      takeApartElement($(_this), arr);
    } else if ($(this).children().length > 0 ) {
      if ($(this).text() == $(this).children().text()) {
        _this = $(this).children();
        takeApartElement($(_this), arr);
      } else {
        arr.push($(this).html());
      };
    } else if( !!$(this).children() && $(this).text().length > 1){
      arr.push($(this).text());
    };
  })
  console.log(arr);
  return arr;
};

const hashStringToKey = (stringGroup) => {
  key = new Array();
  ymlKey = new Array();
  strNum = 1;
  parNum = 1;
  for (var i =0; i < stringGroup.length; i++) {
    if ( 20 < stringGroup[i].length &&  stringGroup[i].length <= 40) {
      key_hash = "str" + strNum.toString();
      strNum++;
    } else if( 40 < stringGroup[i].length ) {
      key_hash = "paragraph" + parNum.toString();
      parNum++;
    } else{
      key_hash = trim(stringGroup[i]).replace(/\ +/g,"_").toLowerCase();
    };
    ymlKey.push(key_hash + ":");
    key.push(key_hash);
  };
  return [key, ymlKey];
};

const stringAddHtmlSafe = (str) => {
  var handledStr = str;
  if ($("<p>" + handledStr + "</p>" ).children().length > 0) {
    handledStr = "'" + handledStr + "'.html_safe";
  };
  return handledStr;
};

const matchKeyAndValue = (keyGroup, ValueGroup, useHtmlSafe) => {
   hashGroup = new Array();
  for (var i = 0; i < keyGroup.length; i++) {
   if (useHtmlSafe) {
     hash_line = keyGroup[i] + " " + stringAddHtmlSafe(trim( ValueGroup[i].replace(/[\r\n]/g,"") )) + "\n";
   } else {
     hash_line = keyGroup[i] + " " + trim( ValueGroup[i].replace(/[\r\n]/g,"") ) + "\n";
   };
   hashGroup.push(hash_line);
  };
  return hashGroup;
};

const textWithKeyForRails = (prefixKey, key) => {
  if (prefixKey.length > 0) {
    text = "<%= t('" + prefixKey + '.' + key + "') %>"
  } else {
    text = "<%= t('"+ key.replace(/:/ , "") + "') %>"
  };
  return text;
};

const processText = (text, keyGroup, ValueGroup, prefixKey) => {
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

const ymlPrefixKey = (prefixKey) => {
  originPrefixKey = prefixKey;
  prefixGroup = originPrefixKey.split('.');
  prefixKeyGroup = [];
  for (var i = 0; i < prefixGroup.length; i++) {
    end_str = ""
    if (originPrefixKey.length > 0) {  
      end_str = ":\n";
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