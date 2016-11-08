const _digits = [0,1,2,3,4,5,6,7,8,9];

const _monthSlugs = ["01","02","03","04","05","06","07","08","09","10","11","12"];

const _monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const patterns = {
  decade: /^\d\d\d0s$/,
  year:   /^\d\d\d\d$/,
  month:  /^\d\d\d\d-\d\d$/,
  week:   /^\d\d\d\d-\d\d-w\d$/,
  day:    /^\d\d\d\d-\d\d-\d\d$/,
}

function _monthSlug(year,month) {
  return ""+year+"-"+(month < 10 ? "0" : "")+month;
}

function _decadeTitle(slug) {
  if (/^\d\d\d0s$/.test(slug)) { return slug; }
  if (/^\d\d\d0$/.test(slug)) { return ""+slug+"s"; }
  return null;
}

function _yearTitle(slug) {
  if (!slug) return null;
  return ""+slug;
}

function _monthTitle() {

  if (arguments.length == 0) return null;

  var year = arguments[0];
  var month = arguments[1];

  if (arguments.length == 1) {
    if (!patterns.month.test(arguments[0])) return null;
    numbers = arguments[0].match(/\d+/g);
    year = numbers[0];
    month = numbers[1];
  }

  return _monthNames[parseInt(month)-1]+" "+year;
}

function _weekTitle() {

  if (arguments.length == 0) return null;

  var year = arguments[0];
  var month = arguments[1];
  var week = arguments[2];

  if (arguments.length == 1) {
    if (!patterns.week.test(arguments[0])) return null;
    numbers = arguments[0].match(/\d+/g);
    year = numbers[0];
    month = numbers[1];
    week = numbers[2];
  }

  return _monthNames[parseInt(month)-1]+" "+year+" week "+week;
}

function _dayTitle() {

  if (arguments.length == 0) return null;

  var year = arguments[0];
  var month = arguments[1];
  var day = arguments[2];

  if (arguments.length == 1) {
    if (!patterns.day.test(arguments[0])) return null;
    numbers = arguments[0].match(/\d+/g);
    year = numbers[0];
    month = numbers[1];
    day = numbers[2];
  }

  return _monthNames[parseInt(month)-1]+" "+parseInt(day)+", "+year;
}

function _entity(slug,titleFn) {
  return { slug: ""+slug, title: titleFn(""+slug) };
}

module.exports =  function(pDefaultSlug,options) {

	if (!options) options = {};

	this.fromSlug = function(slug) {

		this.slug = slug;
		this.title = ""+slug; // force string

		if (patterns.decade.test(slug)) {

			this.type = "decade";
			decade = parseInt(slug.match(/\d\d\d0/)[0]);
			this.decade = decade;
			this.children = _digits.map(function(d) {
				return ""+(decade+d);
			});
			this.previous = _entity(""+(decade-10)+"s",_decadeTitle);
			this.next = _entity(""+(decade+10)+"s",_decadeTitle);

		} else if (patterns.year.test(slug)) {

			this.type = "year";
      year = parseInt(slug);
      this.decade = year - (year%10);
			this.year = year;
			this.children = _monthSlugs.map(function(s) {
				return ""+year+"-"+s;
			});
			this.previous = _entity(year-1,_yearTitle);
			this.next = _entity(year+1,_yearTitle);

		} else if (patterns.month.test(slug)) {

			this.type = "month";
			numbers = slug.match(/\d+/g);
      year = parseInt(numbers[0]);
			month = parseInt(numbers[1]);
			this.title = _monthTitle(slug);
      this.decade = year - (year%10);
			this.year = year;
			this.month = month;
			previous = month == 1 ? _monthSlug(year-1,12) : _monthSlug(year,month-1);
			next = month == 12 ? _monthSlug(year+1,1) : _monthSlug(year,month+1);
			this.previous = _entity(previous,_monthTitle);
			this.next = _entity(next,_monthTitle);

    } else if (patterns.week.test(slug)) {

			this.type = "week";
			numbers = slug.match(/\d+/g);
      year = parseInt(numbers[0]);
			month = parseInt(numbers[1]);
      week = parseInt(numbers[2]);
			this.title = _weekTitle(slug);
      this.decade = year - (year%10);
			this.year = year;
			this.month = month;
      this.week = week;
			// previous = month == 1 ? _monthSlug(year-1,12) : _monthSlug(year,month-1);
			// next = month == 12 ? _monthSlug(year+1,1) : _monthSlug(year,month+1);
			// this.previous = _entity(previous,_monthTitle);
			// this.next = _entity(next,_monthTitle);

    } else if (patterns.day.test(slug)) {

			this.type = "day";
			numbers = slug.match(/\d+/g);
      year = parseInt(numbers[0]);
			month = parseInt(numbers[1]);
      day = parseInt(numbers[2]);
			this.title = _dayTitle(slug);
      this.decade = year - (year%10);
			this.year = year;
			this.month = month;
      this.day = day;
			// previous = month == 1 ? _monthSlug(year-1,12) : _monthSlug(year,month-1);
			// next = month == 12 ? _monthSlug(year+1,1) : _monthSlug(year,month+1);
			// this.previous = _entity(previous,_monthTitle);
			// this.next = _entity(next,_monthTitle);

		}
	}

	if (pDefaultSlug) {
		this.fromSlug(pDefaultSlug);
	}

	// Return a shallow clone with a limited set of properties.
	this.clone = function() {
		if (!this.type) return {};
		return {
			slug: this.slug,
			title:this.title,
			type:this.type,
			decade:this.decade || null,
			year:this.year || null,
			month:this.month || null,
      week:this.week || null,
			day:this.day || null
		};
	};

}
