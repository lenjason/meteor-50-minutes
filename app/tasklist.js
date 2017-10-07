Tasks = new Mongo.Collection('tasks');

if (Meteor.isClient) {
  Template.tasks.helpers({
    tasks: function(){
      return Tasks.find({}, {sort: {createedAt: -1}});
    }
  });

}

if (Meteor.isServer) {

}
