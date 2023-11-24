export class Section {
  constructor({ containerSelector, data, renderer }) {
    this._container = document.querySelector(containerSelector);
    this._data = data;
    this._renderer = renderer;
  }

  renderData() {
    this._data.forEach((el, index) => {
      // зашиваю индекс элемента в одноименное поле объекта
      el.index = index;
      const card = this._renderer(el);
      this._container.append(card);
    })
  }
}
