;(function(exports){

  var defaults = {
    monthNames: ['January', 'February', 'March', 'April', 'June', 'July',
                 'August', 'September', 'October', 'November', 'December'],

    repeatLevels: {
      'low': [0, 2],
      'medium-low': [2, 5],
      'medium': [5, 10],
      'medium-high': [10, 30],
      'high': [30, 50],
      'hot': [50, 70],
      'extra-hot': [70, 100]
    }
  },

  classPrefix = 'cornelius-';

  function extend(target, source) {
    for (var prop in source) target[prop] = source[prop];
    return target;
  }

  function create(el, options) {
    options = options || {};
    el = document.createElement(el);
    if ((className = options.className)) el.className = className;
    if ((textContent = options.text)) el.textContent = textContent;
    return el;
  }

  function isNumber(val) {
    return Object.prototype.toString.call(val) === '[object Number]';
  }

  var Cornelius = function Cornelius(options) {
    this.options = extend(defaults, options || {});
  };

  function drawMonths(options) {
    var th = create('tr'),
      monthLength = data[0].length;

    for (var i = 0; i < monthLength; i++) {
      th.appendChild(create('th', { text: i === 0 ? '' : (i - 1).toString() }));
    }
    return th;
  }

  function drawCells(options) {
    var fragment = document.createDocumentFragment(),

    formatPercentage = function(value, base) {
      if (isNumber(value)) return (value / base * 100).toFixed(2);
    },

    classNameFor = function(value) {
      var levels = options.repeatLevels,
        floatValue = value && parseFloat(value);

      var classNames = [classPrefix + 'percentage'];

      for (var level in levels) {
        if (floatValue >= levels[level][0] && floatValue < levels[level][1]) {
          classNames.push(classPrefix + level);
          return classNames.join(" ");
        }
      }

    };

    for (var i in data) {
      var tr = create('tr'),
        row = data[i],
        baseValue = row[1];

      for (var j = 0; j < row.length; j++) {
        var value = row[j],
          cellValue = j < 2 ? value : formatPercentage(value, baseValue);

          if (!cellValue) continue;

          var td = create('td', {
            text: cellValue,
            className: j > 1 ? classNameFor(cellValue) :
                       classPrefix + (j === 0 ? 'label' : 'people')
          });

        tr.appendChild(td);
      }
      fragment.appendChild(tr);
    }
    return fragment;
  }

  Cornelius.prototype.draw = function(data) {
    var table = create('table', { className: classPrefix + 'table' });

    table.appendChild(drawMonths(this.options));
    table.appendChild(drawCells(this.options));

    document.body.appendChild(table);
  };

  exports.Cornelius = Cornelius;

})(window);
