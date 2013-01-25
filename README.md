# Raphael dial gauge
- Raphael plugin
- Five skins
- MIT license

Example
-------

```javascript
var dial = Raphael('gauge', 370, 370).dialGauge({
	div: document.getElementById('gauge'),
	unit: 'ms',
	min: 0,
	max: 500,
	skin: 'CRISP_WHITE',
	thresholds: {
		values: [250, 400, 500],
		colors: ['#2ffff2f', '#ffff63', '#ff3939']
	},
	alert: 400
});
dial.instance.pointAt(300);
dial.instance.changeSkin("CLEAN_BLACK");
```

Options
-------

* div: wrapper
* unit: embedded lable
* min: min number
* max: max number
* skin: 'COLSOLE_RED' | 'CRISP_WHITE' | 'CLEAN_BLACK' | 'CLEAN_BLACK_NO_TRICKS' | 'DISK_TO_BBR'
* thresholds: 
	* values: specify thresholds ranges. e.g. [250, 400, 500] => range #1 [min, 250] range #2 [250, 400] range #3 [400, 500]
	* colors: corresponding colors
* alert: number. e.g. 400   alert when value between [400, max]


![Dial Gauge](https://raw.github.com/PuffyCoffee/DialGauge/master/screenshot/dial1.png "Dial Gauge")
![Dial Gauge](https://raw.github.com/PuffyCoffee/DialGauge/master/screenshot/dial2.png "Dial Gauge")
![Dial Gauge](https://raw.github.com/PuffyCoffee/DialGauge/master/screenshot/dial3.png "Dial Gauge")
![Dial Gauge](https://raw.github.com/PuffyCoffee/DialGauge/master/screenshot/dial4.png "Dial Gauge")

-------
Peng Zhang 2012
