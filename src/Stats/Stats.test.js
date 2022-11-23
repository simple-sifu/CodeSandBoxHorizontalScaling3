import BookAdderTestHarness from "../TestTools/BookAdderTestHarness";
import StatsPresenter from "./StatsPresenter";
describe("stats", () => {
  it("should show last added book", async () => {
    let lastAddedViewModel = null;
    const bookAdderTestHarness = new BookAdderTestHarness();
    await bookAdderTestHarness.addBook(() => {});
    const statsPresenter = new StatsPresenter();
    statsPresenter.load((generatedLastAddedViewModel) => {
      lastAddedViewModel = generatedLastAddedViewModel;
    });
    expect(lastAddedViewModel).toBe("UFT");
  });
});
