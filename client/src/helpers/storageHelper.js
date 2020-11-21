const { Alert } = require("../components");

class storageHelper {
  constructor(name) {
    this.name = name;
    this.item = this.getItem(this.name) || {};
  }
  getItem() {
    return JSON.parse(window.localStorage.getItem(this.name));
  }
  saveItem() {
    try {
      //STRINGIFY THE ITEM
      window.localStorage.setItem(this.name, JSON.stringify(this.item));
    } catch (e) {
      ///handle json error here
    }
  }

  clearItem() {
    window.localStorage.removeItem(this.name);
  }
  appendItem(newValue) {
    //check if json is an array
    if (this.item instanceof Array) {
      this.item.push(newValue);
    }
  }
}

class SearchHistory extends storageHelper {
  getSearchByDate() {}
  getLatestSearches() {}
  saveSearches() {}
  deleteSearches() {}
}
