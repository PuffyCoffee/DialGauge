# Raphael dial gauge
- Raphael plugin
- Different skins

Example
-------

<script>
var dial = Raphael('gauge', 370, 370).dialGauge({
	div: document.getElementById('gauge'),
	unit: 'ms',
	min: 0,
	max: 500,
	skin: 'CRISP_WHITE',
	thresholds: {
		values: [250, 400, 500],
		colors: ['#2ffff2f', '#ffff63', '#ff3939']
	}
});
</script>


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


