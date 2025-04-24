import { describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";
import { calculateRank } from "../src/calculateRank.js";

describe("Test calculateRank", () => {
  it("new user gets C rank", () => {
    expect(
      calculateRank({
        all_commits: false,
        commits: 0,
        prs: 0,
        issues: 0,
        reviews: 0,
        repos: 0,
        stars: 0,
        followers: 0,
      }),
    ).toStrictEqual({ level: "C", percentile: 100 });
  });

  it("beginner user gets B rank", () => {
    expect(
      calculateRank({
        all_commits: false,
        commits: 125,
        prs: 25,
        issues: 10,
        reviews: 5,
        repos: 0,
        stars: 25,
        followers: 5,
      }),
    ).toStrictEqual({ level: "A+", percentile: 12.786137467886006 });
  });

  it("median user gets A- rank", () => {
    expect(
      calculateRank({
        all_commits: false,
        commits: 250,
        prs: 50,
        issues: 25,
        reviews: 10,
        repos: 0,
        stars: 50,
        followers: 10,
      }),
    ).toStrictEqual({ level: "SS+", percentile: 3.1684462966057647 });
  });

  it("average user gets A- rank (include_all_commits)", () => {
    expect(
      calculateRank({
        all_commits: true,
        commits: 1000,
        prs: 50,
        issues: 25,
        reviews: 10,
        repos: 0,
        stars: 50,
        followers: 10,
      }),
    ).toStrictEqual({ level: "SS+", percentile: 4.867510440306077 });
  });

  it("advanced user gets A+ rank", () => {
    expect(
      calculateRank({
        all_commits: false,
        commits: 500,
        prs: 100,
        issues: 50,
        reviews: 20,
        repos: 0,
        stars: 200,
        followers: 40,
      }),
    ).toStrictEqual({ level: "SS+", percentile: 0.5301367507003829 });
  });

  it("expert user gets S+ rank", () => {
    expect(
      calculateRank({
        all_commits: false,
        commits: 2000,
        prs: 200,
        issues: 100,
        reviews: 4,
        repos: 0,
        stars: 30,
        followers: 5,
      }),
    ).toStrictEqual({ level: "SS+", percentile: 3.8362614143230944 });
  });

  it("sindresorhus gets SS+ rank", () => {
    expect(
      calculateRank({
        all_commits: false,
        commits: 1300,
        prs: 1500,
        issues: 4500,
        reviews: 1000,
        repos: 0,
        stars: 600000,
        followers: 50000,
      }),
    ).toStrictEqual({ level: "SS+", percentile: 0.00036147692730192915 });
  });
});
