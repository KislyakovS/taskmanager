import { Component } from './component';

const createFilterMarkup = (filter, isChecked) => {
    const { name, count } = filter;

    return `
      <input
          type="radio"
          id="filter__${name}"
          class="filter__input visually-hidden"
          name="filter"
          ${isChecked ? 'checked' : ''}
        />
        <label for="filter__${name}" class="filter__label">
          ${name} <span class="filter__all-count">${count}</span>
        </label>
  `
}

const createFilterTemplate = (filters) => {
    const filtersTemplate = filters.map((item, i) => createFilterMarkup(item, i === 0)).join('');

    return (
        `<section class="main__filter filter container">${filtersTemplate}</section>`
    );
};

class Filter extends Component {
    constructor(filters) {
        super();
        this._filters = filters;
    }

    get _template() {
        return createFilterTemplate(this._filters);
    }
}

export {
    Filter
}