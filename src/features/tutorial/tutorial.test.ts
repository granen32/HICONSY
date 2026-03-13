describe("tutorial persistence", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("stores completion flag", () => {
    window.localStorage.setItem("hiconsy-tutorial-seen", "true");

    expect(window.localStorage.getItem("hiconsy-tutorial-seen")).toBe("true");
  });
});
