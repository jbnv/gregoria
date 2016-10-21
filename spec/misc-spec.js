var Era = require("../index");

describe("decade era for 1990s", function() {

  var era = new Era("1990s");

  it("has a proper title", function() {
    expect(era.title).toEqual("1990s");
  });

  it("previous is 1980s", function() {
    expect(era.previous.slug).toEqual("1980s");
  });

  it("next is 2000s", function() {
    expect(era.next.slug).toEqual("2000s");
  });

});

describe("year era for 1990", function() {

  var era = new Era("1991");

  it("has a proper title", function() {
    expect(era.title).toEqual("1991");
  });

  it("previous is 1990", function() {
    expect(era.previous.slug).toEqual(1990);
  });

  it("next is 1992", function() {
    expect(era.next.slug).toEqual(1992);
  });

});

describe("month era for December 1990", function() {

  var era = new Era("1990-12");

  it("has a proper title", function() {
    expect(era.title).toEqual("December 1990");
  });

  it("points to next month January 1991", function() {
    expect(era.next.slug).toEqual("1991-01");
  });

});

describe("month era for January 1991", function() {

  var era = new Era("1991-01");

  it("has a proper title", function() {
    expect(era.title).toEqual("January 1991");
  });

  it("points to previous month December 1990", function() {
    expect(era.previous.slug).toEqual("1990-12");
  });

});
