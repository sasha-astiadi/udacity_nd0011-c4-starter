import { expect } from "chai";
import { shuffle } from "../src/shuffle.js";

describe("shuffle", () => {
  const cards = [
    { term: "a", description: "1" },
    { term: "b", description: "2" },
    { term: "c", description: "3" },
    { term: "d", description: "4" },
    { term: "e", description: "5" },
    { term: "f", description: "6" },
    { term: "g", description: "7" },
    { term: "h", description: "8" },
    { term: "i", description: "9" },
    { term: "j", description: "10" },
  ];

  it("returns an array containing all the same elements", () => {
    const result = shuffle(cards);
    expect(result).to.have.lengthOf(cards.length);
    expect(result).to.have.deep.members(cards);
  });

  it("rearranges the indexes of the array", () => {
    const result = shuffle(cards);
    // With 10 elements the odds of an identical ordering are 1 in 3,628,800
    expect(result).to.not.deep.equal(cards);
  });

  it("does not mutate the original array", () => {
    const copy = [...cards];
    shuffle(cards);
    expect(cards).to.deep.equal(copy);
  });

  it("handles an empty array", () => {
    expect(shuffle([])).to.deep.equal([]);
  });
});
