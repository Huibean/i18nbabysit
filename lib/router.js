Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function(){
  this.render('inputForm');
});

Router.route('/results/:_id',{
  name: 'results',
  data: function(){
  return Results.findOne(this.params._id)
  }
});