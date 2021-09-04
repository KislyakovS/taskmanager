import { createElement } from '../utils';

import { MONTH_NAMES } from '../const';

const createTaskTemplate = (task) => {
    const { text, dueDate, repeatingDays, color, isArchive, isFavorite } = task;

    const isRepeat = Object.values(repeatingDays).some(Boolean);
    const isExpired = dueDate instanceof Date && dueDate < Date.now();
    const isDateShow = !!dueDate;

    const date = isDateShow ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : '';
    const time = isDateShow ? `${dueDate.getHours()}:${dueDate.getMinutes()}` : '';

    const classRepeat = isRepeat ? "card--repeat" : false;
    const classDeadline = isExpired ? "card--deadline" : "";
    const classArchiveBtnInactive = isArchive ? "" : "card__btn--disabled";
    const classFavoriteBtnInactive = isFavorite ? "" : "card__btn--disabled";

    return (`<article class="card card--${color} ${classRepeat} ${classDeadline}">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive ${classArchiveBtnInactive}">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites ${classFavoriteBtnInactive}"
          >
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <p class="card__text">${text}</p>
        </div>

        ${isDateShow ?
            `
        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${date}</span>
                  <span class="card__time">${time}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        `
            : ''}
      </div>
    </div>
  </article>`)
}

class Task {
    constructor(task) {
        this._task = task;

        this._element = null;
    }

    get _template() {
        return createTaskTemplate(this._task);
    }

    get element() {
        if (!this._element) {
            this._element = createElement(this._template);
        }

        return this._element;
    }

    removeElement() {
        this._element = null;
    }
}

export {
    Task
}