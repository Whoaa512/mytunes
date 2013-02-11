var PlayerView = Backbone.View.extend({

  initialize: function(){
    // set up an event listener on the songs collection
    this.collection.on("change:queuedAt", this.handleQueueChange.bind(this));
  },

  // templates are a nicer way to put js data into html strings
  template: _.template('<audio src="<%= url %>" controls muted></audio>'),

  render: function(){
    if(this.model){
      this.$el.html(this.template(this.model.attributes));
    }

    this.$el.find('audio').on("ended", this.handleSongEnd.bind(this));
    return this.$el;
  },

  // event listener
  handleQueueChange: function(){
    if(!this.model){
      this.model = this.collection.queued()[0];
      this.model.playing();
      this.render();
    }
  },

  // dequeues currently playing song and clears this.model
  handleSongEnd:  function() {
    this.model.dequeue();
    this.model = undefined;
  }
});
