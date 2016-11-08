var Era = require("../index");

function _validate(data) {

  describe("'"+data.slug+"'", function() {

    var era = new Era(data.slug);

    it("is recognized as a '"+data.type+"' era", function() {
      expect(era.type).toEqual(data.type);
    });

    it("has a proper title '"+data.title+"'", function() {
      expect(era.title).toEqual(data.title);
    });

    if (data.previousSlug) {
      it("previous is '"+data.previousSlug+"'", function() {
        expect(era.previous.slug).toEqual(data.previousSlug);
      });
    }

    if (data.nextSlug) {
      it("next is '"+data.nextSlug+"'", function() {
        expect(era.next.slug).toEqual(data.nextSlug);
      });
    }

    if (data.children) {
      it("children", function() {
        expect(era.children).toEqual(data.children);
      });
    }

  });

}

_validate({
    type: "decade",
    slug: "1990s",
    title: "1990s",
    previousSlug: "1980s",
    nextSlug: "2000s",
    children: [
      "1990","1991","1992","1993","1994",
      "1995","1996","1997","1998","1999"
    ]
});

_validate({
    type: "year",
    slug: "1991",
    title: "1991",
    previousSlug: "1990",
    nextSlug: "1992",
    children: [
      "1991-01","1991-02","1991-03",
      "1991-04","1991-05","1991-06",
      "1991-07","1991-08","1991-09",
      "1991-10","1991-11","1991-12"
    ]
});

_validate({
    type: "month",
    slug: "1990-12",
    title: "December 1990",
    previousSlug: "1990-11",
    nextSlug: "1991-01"
});

_validate({
    type: "month",
    slug: "1991-01",
    title: "January 1991",
    previousSlug: "1990-12",
    nextSlug: "1991-02"
});

_validate({
    type: "week",
    slug: "1991-01-w1",
    title: "January 1991 week 1"
});

_validate({
    type: "day",
    slug: "1991-01-01",
    title: "January 1, 1991"
});
