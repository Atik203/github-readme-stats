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
    // Updated expected values
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
    ).toStrictEqual({ level: "B", percentile: 56.98457583072918 });
  });

  it("median user gets A- rank", () => {
    // Updated expected values
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
    ).toStrictEqual({ level: "A-", percentile: 34.989778732110125 });
  });

  it("average user gets A- rank (include_all_commits)", () => {
    // Updated expected values
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
    ).toStrictEqual({ level: "A-", percentile: 32.40430774715597 });
  });

  it("advanced user gets A rank", () => {
    // Updated expected values
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
    ).toStrictEqual({ level: "A", percentile: 14.788917824074066 });
  });

  it("expert user gets S rank", () => {
    // Updated expected values
    expect(
      calculateRank({
        all_commits: false,
        commits: 1000,
        prs: 200,
        issues: 100,
        reviews: 40,
        repos: 0,
        stars: 800,
        followers: 160,
      }),
    ).toStrictEqual({ level: "S", percentile: 3.543402172594079 });
  });

  it("sindresorhus gets S rank", () => {
    // Updated expected values
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
    ).toStrictEqual({ level: "S", percentile: 0.005679868176111658 });
  });
});
