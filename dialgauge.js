var width = window.getComputedStyle(document.getElementById('gauge').width),
	height = window.getComputedStyle(document.getElementById('gauge').heigh);
var paper = Raphael('gauge', width, height), dial_gauge = paper.set();

var c1 = paper.circle(150, 150, 130).attr({
	fill: '120-#333-#ddd',
	stroke: '#ffffff'
});
var c2 = paper.circle(150, 150, 120).attr({
	fill: '#ffffff',
	stroke: '#ffffff'
});
var c3 = paper.circle(150, 150, 115).attr({
	stroke: '#590000',
	'stroke-width': 0.5
});
dial_gauge.push(c1, c2, c3);
c3.glow({
	width: 14,
	fill: false,
	opacity: 1.5,
	color: '#720000'
});
var arc = paper.path("M240.93,202.5A105,105,0,1,0,59.07,202.5").attr({
	stroke: '#ddd',
	fill: '120-#666-#ddd'
});
dial_gauge.push(arc);
var c4 = paper.circle(150, 150, 110).attr({
	fill: '120-#000000-#bbbbbb',
	stroke: '#000000'
});
dial_gauge.push(c4);
var i = 0, j = 0, length = 12, radiusA = 105, radiusB = 85, radiusC = 95, radiusD = 90, pointASet = [], pointBSet = [], pointCSet = [], pointDSet = [], pointESet = [], pointFSet = []; //pointESet should be invisible
for (; i < length; i += 1) {
	if (i !== 8 && i !== 9 && i !== 10) {
		var x_offset = Math.cos(i*Math.PI/6)*radiusA;
		var y_offset = Math.sin(i*Math.PI/6)*radiusA;
		var coordinate = {
			x: 150 - x_offset,
			y: 150 - y_offset
		};
		pointASet.push(coordinate);
	}	
}
for (; j < length; j += 1) {
	if (j < 8 || j > 10) {
		var x_offset = Math.cos(j*Math.PI/6)*radiusB;
		var y_offset = Math.sin(j*Math.PI/6)*radiusB;
		var coordinate = {
			x: 150 - x_offset,
			y: 150 - y_offset
		};
		pointBSet.push(coordinate);
	}	
}
//Draw
var mark_long = paper.set();
for (var j = 0; j < pointASet.length; j += 1) {
	var mark = paper.path("M"+pointASet[j].x+","+pointASet[j].y+
			   "L"+pointBSet[j].x+","+pointBSet[j].y).attr({
			   	stroke: '#ffffff',
			   	'stroke-width': 3
			   });
	mark_long.push(mark);
	dial_gauge.push(mark);
}

for (var i = 0; i < 60; i += 1) {
	if (i < 36 || i > 54) {
		var x_offset = Math.cos(i*Math.PI/30)*radiusC;
		var y_offset = Math.sin(i*Math.PI/30)*radiusC;
		var coordinate = {
			x: 150 - x_offset,
			y: 150 - y_offset
		};
		pointCSet.push(coordinate);
	}
}
for (var i = 0; i < 60; i += 1) {
	if (i < 36 || i > 54) {
		var x_offset = Math.cos(i*Math.PI/30)*radiusA;
		var y_offset = Math.sin(i*Math.PI/30)*radiusA;
		var coordinate = {
			x: 150 - x_offset,
			y: 150 - y_offset
		};
		pointDSet.push(coordinate);
	}
}
//fill in pointESet
for (var i = 0; i < 60; i += 1) {
	if (i < 36 || i > 54) {
		var x_offset = Math.cos(i*Math.PI/30)*radiusB;
		var y_offset = Math.sin(i*Math.PI/30)*radiusB;
		var coordinate = {
			x: 150 - x_offset,
			y: 150 - y_offset
		};
		pointESet.push(coordinate);
	}
}
for (var i = 0; i < 60; i += 1) {
	if (i < 36 || i > 54) {
		var x_offset = Math.cos(i*Math.PI/30)*radiusD;
		var y_offset = Math.sin(i*Math.PI/30)*radiusD;
		var coordinate = {
			x: 150 - x_offset,
			y: 150 - y_offset
		};
		pointFSet.push(coordinate);
	}
}

//Draw
var mark_short = paper.set();
for (var j = 0; j < pointCSet.length; j += 1) {
	var mark = paper.path("M"+pointDSet[j].x+","+pointDSet[j].y+
			   "L"+pointCSet[j].x+","+pointCSet[j].y).attr({
			   	stroke: '#ffffff',
			   	'stroke-width': 3
			   });
	mark_short.push(mark);
	dial_gauge.push(mark);
}
//Draw unit
var unit = paper.text(150, 95, "ms").attr({
	'font-size': 18,
	fill: '#ffffff',
	'text-anchor': 'middle'
});
dial_gauge.push(unit);
//Draw value
var valueACoordinateX = pointASet[pointASet.length-1].x + 10,
	valueACoordinateY = pointASet[pointASet.length-1].y + 10,
	valueBCoordinateX = pointASet[pointASet.length-2].x - 10,
	valueBCoordinateY = pointASet[pointASet.length-2].y + 10;

var start_value = paper.text(valueACoordinateX, valueACoordinateY, "0").attr({
	'font-size': 16,
	'text-anchor': 'start',
	fill: '#ffffff'
});
var end_value = paper.text(valueBCoordinateX, valueBCoordinateY, "500").attr({
	'font-size': 16,
	'text-anchor': 'end',
	'stroke-width': .5,
	fill: '#ffffff'
});
dial_gauge.push(start_value, end_value);
//threshold 90 radius
//Green
var pointAX = pointFSet[2].x,
	pointAY = pointFSet[2].y,
	pointBX = pointFSet[36].x,
	pointBY = pointFSet[36].y;
var threshold1 = paper.path("M"+pointBX+","
			  +pointBY+
		   "A90,90,0,0,1,"+
		   	   pointAX+","
		   	  +pointAY).attr({
		   	   	stroke: '#2fff2f',
		   	   	'stroke-width': 8
		   	   });
//Yellow
var pointCX = pointFSet[2].x,
	pointCY = pointFSet[2].y,
	pointDX = pointFSet[15].x,
	pointDY = pointFSet[15].y;
var threshold2 = paper.path("M"+pointCX+","
			  +pointCY+
		   "A90,90,0,0,1,"+
		   	   pointDX+","
		   	  +pointDY).attr({
		   	   	stroke: '#ffff63',
		   	   	'stroke-width': 8
		   	   });
//Red
var pointEX = pointFSet[15].x,
	pointEY = pointFSet[15].y,
	pointFX = pointFSet[35].x,
	pointFY = pointFSet[35].y;
var threshold3 = paper.path("M"+pointEX+","
			  +pointEY+
		   "A90,90,0,0,1,"+
		   	   pointFX+","
		   	  +pointFY).attr({
		   	   	stroke: '#ff3939',
		   	   	'stroke-width': 8
		   	   });
dial_gauge.push(threshold1, threshold2, threshold3);		   	
mark_long.toFront();
//Bottom number, *very important, most ppl only read this, must showing correct data.
var bottom_number = paper.text(150, 240, "4").attr({
	'font-size': 25,
	'text-anchor': 'middle',
	fill: '#ffffff'
});
dial_gauge.push(bottom_number);
//pointer, the hardest part.
var center_button = paper.set();
var button_circle1 = paper.circle(150, 150, 12).attr({
	fill: '120-#666-#ddd'
});
var button_circle2 = paper.circle(150, 150, 8).attr({
	fill: '120-#888-#222'
});
var button_circle3 = paper.circle(150, 150, 2.5).attr({
	fill: '120-#333-#ddd'
});
center_button.push(button_circle1, button_circle2, button_circle3);
dial_gauge.push(button_circle1, button_circle2, button_circle3);
var pointer = paper.path("M142,168L149,54L151,54L158,168L155,170L145,170Z").attr({
	fill: '#dc0000',
	stroke: '#dc0000'
});
dial_gauge.push(pointer);
center_button.toFront();
//rotate pointer
pointer.transform("r-117,150,150");
console.log(dial_gauge);