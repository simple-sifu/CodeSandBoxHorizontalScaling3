import booksRepository from "../Books/BooksRepository";
import Observable from "../Shared/Observable";
import httpGateway from "../Shared/HttpGateway";
import BookListPresenter from "../Books/BookListPresenter";
import GetPublicBooksStub from "./GetPublicBooksStub";
import AddBooksPresenter from "../Books/AddBooksPresenter";

export default class BookAdderTestHarness {
  async initLoad(callback) {
    jest.clearAllMocks();
    booksRepository.booksPm = new Observable([]);

    httpGateway.get = jest.fn().mockImplementation((path) => {
      return GetPublicBooksStub();
    });

    await new BookListPresenter().load(callback);
  }

  async addBook() {
    jest.clearAllMocks();
    let addBooksPresenter = new AddBooksPresenter();
    const pivotedStub = GetPublicBooksStub();
    pivotedStub.result.push(pivotedStub.result[2]);
    httpGateway.get = jest.fn().mockImplementation((path) => {
      return pivotedStub;
    });
    httpGateway.post = jest.fn();

    await addBooksPresenter.addBook("UFT", "Pete Heard");
  }
}
