import httpGateway from "../Shared/HttpGateway";
import Observable from "../Shared/Observable";

class BooksRepository {
  booksPm = null;
  lastAddedBookPm = null;
  mode = "books";
  sort = null;
  totalRowsDisplayed = {};

  constructor() {
    this.booksPm = new Observable([]);
    this.lastAddedBookPm = new Observable("");
  }

  getBooks = async (callback) => {
    this.booksPm.subscribe(callback);
    await this.loadApiData();
  };

  addBook = async (programmersModel) => {
    let dto = {
      name: programmersModel.name,
      author: programmersModel.author,
      ownerId: "tommy.han.cs@gmail.com"
    };
    await httpGateway.post(
      "https://api.logicroom.co/api/tommy.han.cs@gmail.com/books",
      dto
    );
    await this.loadApiData();
    this.lastAddedBookPm.value = {
      name: programmersModel.name,
      totalRowsDisplayed: this.totalRowsDisplayed
    };
    this.lastAddedBookPm.notify();
  };

  getLastAddedBook = async (callback) => {
    this.lastAddedBookPm.subscribe(callback);
  };

  setMode(modeArgs) {
    this.mode = modeArgs;
  }

  setSort(sortArgs) {
    this.sort = sortArgs;
  }

  compare = (a, b) => {
    if (this.sort === null) {
      return 0;
    }
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      if (this.sort === "desc") {
        return 1;
      } else {
        return -1;
      }
    }
    if (nameA > nameB) {
      if (this.sort === "desc") {
        return -1;
      } else {
        return 1;
      }
    }
    return 0;
  };

  loadApiData = async () => {
    const dto = await httpGateway.get(
      "https://api.logicroom.co/api/tommy.han.cs@gmail.com/" + this.mode
    );
    this.totalRowsDisplayed = dto.result.length;
    this.booksPm.value = dto.result.sort(this.compare).map((dtoItem) => {
      return dtoItem;
    });
    this.booksPm.notify();
    this.lastAddedBookPm.value = {
      ...this.lastAddedBookPm.value,
      totalRowsDisplayed: this.totalRowsDisplayed
    };
    this.lastAddedBookPm.notify();
  };

  refreshModelData = () => {
    this.booksPm.value = this.booksPm.value.map((pm) => {
      return pm;
    });
    this.booksPm.notify();
  };
}

const booksRepository = new BooksRepository();
export default booksRepository;
