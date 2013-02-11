  var PlaylistView = Backbone.View.extend({

  tagName: "table",

  queuedSongs: [],
  // renderCallCount: 0,

  initialize: function(){
  },

  // playlist renderer
  render: function(){
    // initial playlist message
    if(this.queuedSongs.length === 0) {
      //initial playlist text
      this.$el.html('Click on a song, bitch');

      //create event listener on songs collection
      this.collection.on("change:queuedAt", this.handleQueueChange.bind(this));

      return this.$el;
    } else {
      this.$el.html('<h2>Playlist</h2>');
      // create subview entries for each song in queuedSongs
      this.subviews = this.queuedSongs.map(function(song) {
        return new PlaylistEntryView({model: song})
      });

      // populate the playlist table
      var self = this;
      _.each(this.subviews, function(subview) {
        self.$el.append(subview.render());
      });
      return this.$el;
    }
  },

  //event handler
  handleQueueChange: function() {
    //stores all que'd songs 
    this.queuedSongs = this.collection.queued();
    this.render();
    }
});

