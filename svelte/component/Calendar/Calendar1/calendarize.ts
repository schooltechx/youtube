//Modify by Oom 
//code from https://www.npmjs.com/package/calendarize
export default function (target?: Date|string, offset=0) {
	let i=0, j=0, week = Array(7)
    const out=[], date = new Date(target || new Date);
	const year = date.getFullYear(), month = date.getMonth();
	// day index (of week) for 1st of month
	let first = new Date(year, month, 1 - (offset | 0)).getDay();

	// how many days there are in this month
	const days = new Date(year, month+1, 0).getDate();

	while (i < days) {
		for (j=0, week=Array(7); j < 7;) {
			while (j < first) week[j++] = 0;
			week[j++] = ++i > days ? 0 : i;
			first = 0;
		}
		out.push(week);
	}
	return out;
}