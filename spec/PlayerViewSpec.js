describe("PlayerView", function() {
  var view, collection;

  beforeEach(function() {
    collection = new Songs();
    collection.reset(data);
    view = new PlayerView({collection: collection});
  });

  it("should change when the first song is queued", function(){
    expect(view.model).toBeUndefined();
    var song = collection.models[1];
    song.set("queuedAt", new Date());
    expect(view.model).toEqual(song);
  });

  describe("what happens when the song ends", function(){
    it("should remove the old song from the playlist", function(){
      var song1 = collection.models[0];
      var song2 = collection.models[1];
      song1.set("queuedAt", new Date());
      expect(view.model).toEqual(song1);
      song2.set("queuedAt", new Date());
      view.handleSongEnd();
      expect(view.model).toNotBe(song1);
    });

    it("should get the next song in the playlist", function(){
      var song1 = collection.models[0];
      var song2 = collection.models[1];
      song1.enqueue();
      expect(view.model).toEqual(song1);
      song1.dequeue();
      song2.enqueue();
      view.handleSongEnd();
      view.handleQueueChange();
      expect(view.model).toBe(song2);
    });
  });
});