describe('Playlist Entry', function(){
  var view, collection;

  beforeEach(function() {
    collection = new Songs();
    collection.reset(data);

    view = new PlaylistView({collection: collection});
    view.render();
  });

  it('should be removed from playlist when clicked', function(){
    expect(view.queuedSongs.length).toEqual(0);
    var song = collection.models[0];
    song.enqueue();
    expect(view.queuedSongs[0]).toEqual(song);
    song.dequeue();
    expect(view.queuedSongs[0]).toNotBe(song);
  });
});