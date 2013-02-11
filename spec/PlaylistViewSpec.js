describe("PlaylistView", function() {
  var view, collection;

  beforeEach(function() {
    collection = new Songs();
    collection.reset(data);

    spyOn(PlaylistView.prototype, 'render').andCallThrough();
    view = new PlaylistView({collection: collection});
    view.render();
  });

  it("should tell the user to click on some songs in the library", function(){
    expect(view.$el.html()).toMatch(/click.?/i);
  });

  it("should renderer when song ends", function(){
    var oldCallCount = view.render.callCount;
    expect(view.model).toBeUndefined();
    var song1 = collection.models[0];
    song1.enqueue();
    var song2 = collection.models[1];
    song2.enqueue();
    expect(view.queuedSongs.length).toEqual(2);
    song1.dequeue();
    expect(view.queuedSongs.length).toEqual(1);
    expect(view.render.callCount).toEqual(oldCallCount + 3);
  });

  describe("a song is added or removed via clicks", function(){

    it("should be rerendered", function(){
      var oldCallCount = view.render.callCount;
      var song = collection.models[0];
      song.enqueue();
      expect(view.render.callCount).toEqual(oldCallCount + 1);
    });

    it("should have the updated item in its collection", function(){
      expect(view.queuedSongs.length).toEqual(0);
      var song = collection.models[0];
      song.enqueue();
      expect(view.queuedSongs[0]).toEqual(song);
    });

    it("should not have the removed item in its collection", function(){
      expect(view.queuedSongs.length).toEqual(0);
      var song = collection.models[0];
      song.enqueue();
      expect(view.queuedSongs[0]).toEqual(song);
      song.dequeue();
      expect(view.queuedSongs[0]).toNotBe(song);
    });

    it("should have the updated item in its html", function(){
      var song = collection.models[0];
      song.enqueue();
      expect(view.$el.html()).not.toMatch(/click to add.?/i);
    });
  });

});