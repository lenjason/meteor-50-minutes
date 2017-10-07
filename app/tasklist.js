Tasks = new Mongo.Collection('tasks');

if (Meteor.isClient) {
  Template.tasks.helpers({
    tasks: function(){
      return Tasks.find({}, {sort: {createedAt: -1}});
    }
  });

  Template.tasks.events({
    "submit .add-task": function(event){
      var name = event.target.name.value;

      Meteor.call('addTask', name);

      event.target.name.value = '';

      return false;
    },
    "click .delete-task": function(event){
      if(confirm('Delete Task?')){
        Meteor.call('deleteTask', this._id);
      }
      return false;
    }
  });
}

if (Meteor.isServer) {

}

Meteor.methods({
  addTask: function(name){
    if(!Meteor.userId()){
      throw new Meteor.Error('No Access!');
    }
    Tasks.insert({
      name: name,
      createedAt: new Date(),
      userId: Meteor.userId()
    });
  },
  deleteTask: function(taskId) {
    Tasks.remove(taskId);
  }
});