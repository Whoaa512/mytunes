var PlaylistEntryView = Backbone.View.extend({

	tagName: "tr",

	events: {
		"click": "removeSong"
	},

	template: _.template("<td>(<%= artist %>)</td><td><%= title %></td><td> Playing: <%= isPlaying %> (<a href='#'>click to remove from playlist</a>)</td>"),

  render: function(){
  	return this.$el.html(this.template(this.model.attributes));
  },  

  removeSong: function() {
    this.model.dequeue();
  }
});
