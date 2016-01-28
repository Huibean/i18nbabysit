Template.results.helpers({
  'leftResults' : function(){
    result = this.leftResult;
    for (var i = 0; i < result.length; i++) {
      begin_str = ""
      for (var child = 0; child < this.prefixGroup.length; child++) {
        begin_str += "  "
      };
      result[i] = begin_str + result[i]
    };
    return result;
  },
  'rightResults' : function(){
    result = this.rightResult;
    for (var i = 0; i < result.length; i++) {
      begin_str = ""
      for (var child = 0; child < this.prefixGroup.length; child++) {
        begin_str += "  "
      };
      result[i] = begin_str + result[i]
    };    
    return result;
  },
  'prefixKeys' : function(){
    return this.prefixGroup;
  },
  'erbText' : function(){
    return this.htmlText;
  }
});