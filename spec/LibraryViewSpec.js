describe("LibraryView", function() {
  var view, collection, fakeSubview;

  beforeEach(function() {
    collection = new Backbone.Collection();
    collection.reset(data);

    fakeSubview = { render: jasmine.createSpy() };
    spyOn(window, 'LibraryEntryView').andReturn(fakeSubview);

    view = new LibraryView({collection: collection});
  });

  it("should create some subviews when you create it", function(){
    expect(LibraryEntryView.callCount).toEqual(data.length);
  });

  it("should render its subviews when you render it", function(){
    view.render()
    expect(fakeSubview.render.callCount).toEqual(data.length);
  });

  it("should have a header element", function(){
    view.render();
    expect(view.$('h2').length).toBe(1);
  });
});