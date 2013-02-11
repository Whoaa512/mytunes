var Song = Backbone.Model.extend({
	initialize: function(){
		isPlaying: false
	},

	enqueue: function(){
		this.set('queuedAt', new Date());
	},

	dequeue: function(){
		this.unset('queuedAt');
		if(this.get('isPlaying')) {this.notPlaying();}
	},

	playing: function() {
    this.set("isPlaying", true);
	},
	
	notPlaying: function() {
    this.set("isPlaying", false);
	}
});

var Songs = Backbone.Collection.extend({
	model: Song,
	
  // return queued songs
  queued: function(){
    // chain, filter, sortBy, and value are from underscore
    return this.chain().filter(function(song){
      return !!song.attributes.queuedAt;
    }).sortBy(function(song){
      return song.attributes.queuedAt;
    }).value();
  }
});
