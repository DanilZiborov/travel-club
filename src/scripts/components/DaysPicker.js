export class DaysPicker {
  constructor(options) {
    this._presentDay = new Date();
    this._language = options.language ? options.language : navigator.language;
    this._nameForToday = options.localDaysNames ? options.localDaysNames[0] : 'Today';
    this._nameForTomorrow = options.localDaysNames ? options.localDaysNames[1] : 'Tomorrow';
    this._weekStart = options.weekStart ? options.weekStart : 'sunday';
    this._containers = Array.from(document.querySelectorAll(options.container));

    this._daysOfTheWeek = [];

  }

  // собирает массив названий дней недели в зависимости от языка браузера;
  // индексы элементов массива соответствуют номерам дней недели из объекта Date
  // где 0 - воскресенье и 6 - суббота
  // если i === 3, неделя начинается с вс, если 4, с пн
  // надо замутить возможность добавления объекта options с описанием


  _getDate(n) {
    return new Date((1000*3600*24) * n);
  }

  _makeDayObject(i) {
    const dayObject = { name: '', number: 0, isSelected: false, value: '' };

    const exampleDate = this._getDate(i);
    const exampleDayName = exampleDate.toLocaleDateString(this._language, { weekday: 'long' });
    const exampleDayNumber = exampleDate.getDay();
    const presentDayNumber = this._presentDay.getDay();
    const tomorrowNumber = ((presentDayNumber + 1) > 6) ? 0 : presentDayNumber + 1;

    if(exampleDayNumber === presentDayNumber) {
      dayObject.name = exampleDayName + ' (' + this._nameForToday + ')';;
      dayObject.isSelected = true;
    }
    else if(exampleDayNumber  === tomorrowNumber) {
      dayObject.name = exampleDayName + ' (' + this._nameForTomorrow + ')';
    }

    else dayObject.name = exampleDayName;

    dayObject.number = exampleDate.getDay();

    return dayObject;

  }

  _addDateValue() {
    const idx = this._daysOfTheWeek.findIndex(el => el.name.includes(this._nameForToday));

    const todayMilisec = new Date().setHours(0, 0, 0, 0);

    let counter = idx;

    for (let i = 0; i < this._daysOfTheWeek.length; i++) {

      counter > 6 ? counter = 0 : counter;
      
      const date = new Date(todayMilisec + ((1000*3600*24)*i));

      // тут настраиваем формат даты, которая видна пользователю
      const value = date.toLocaleDateString('ru');

      // тут настраиваем значение value для option
      const visibleValue = date.toLocaleDateString('ru', {month: '2-digit', day: '2-digit'});

      // для сегодня и завтра не отрисовываем дату
      if(!(this._daysOfTheWeek[counter].name.includes(this._nameForToday) || this._daysOfTheWeek[counter].name.includes(this._nameForTomorrow))) {
        this._daysOfTheWeek[counter].name = this._daysOfTheWeek[counter].name + ` (${visibleValue})`;
      }

      counter++;
    }
  }

  _makeDaysData() {
    for (let i = this._weekStart === 'monday' ? 4 : 3; i < (this._weekStart === 'monday' ? 11 : 10); i++) {
      this._daysOfTheWeek.push(this._makeDayObject(i));
    }

    this._addDateValue();
  }

  _renderDays(container) {
    const selectOptions = Array.from(container.querySelectorAll('option'));
    for (let i = 0; i <= 6; i++) {
      const option = selectOptions[i];
      const dayData = this._daysOfTheWeek[i];

      if(dayData.isSelected) option.setAttribute('selected', '');
      option.textContent = dayData.name;
      option.value = dayData.value;
    }
  }

  start() {
    this._makeDaysData();
    this._containers.forEach(container => this._renderDays(container));
  }

}
