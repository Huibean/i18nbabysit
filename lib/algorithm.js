function pushjQueryTextToArray(dom){
  targrtArray =new Array(); 
  $(dom).each(function(index, el) {
    console.log(index);
    console.log(el);
    targrtArray.push($(el).text());
  });
  console.log(targrtArray);
}