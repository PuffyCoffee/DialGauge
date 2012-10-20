Raphael.fn.dialGauge = function(args) {
	var paper = this, dial_gauge = paper.set(),
		obj = {},
		width = parseInt(window.getComputedStyle(args.div).width),
		height = parseInt(window.getComputedStyle(args.div).height),
		cx = width/2, cy = width/2, cr = width/2,	
		c1 = paper.circle(cx, cy, cr*.87).attr({
			fill: '120-#333-#ddd',
			stroke: '#ffffff'
		}),
	 	c2 = paper.circle(cx, cy, cr*.8).attr({
			fill: '#ffffff',
			stroke: '#ffffff'
		}),
		c3 = paper.circle(cx, cy, cr*.77).attr({
			stroke: '#590000',
			'stroke-width': 0.5
		}),
		c4 = paper.circle(cx, cy, cr*.73).attr({
			fill: '120-#000000-#222222: 60-#ddd',
			stroke: '#000000'
		});
	dial_gauge.push(c1, c2, c3, c4);
	c3.glow({
		width: cr/10,
		fill: false,
		opacity: cr/100,
		color: '#720000'
	});
	var i = 0, j = 0, length = 12, 
		radiusA = cr*.7, radiusB = cr*.57, radiusC = cr*.63, 
		radiusD = cr*.6, 
		pointASet = [], pointBSet = [], pointCSet = [], 
		pointDSet = [], pointESet = [], pointFSet = []; 
	for (; i < length; i += 1) {
		if (i !== 8 && i !== 9 && i !== 10) {
			var x_offset = Math.cos(i*Math.PI/6)*radiusA;
			var y_offset = Math.sin(i*Math.PI/6)*radiusA;
			var coordinate = {
				x: cr - x_offset,
				y: cr - y_offset
			};
			pointASet.push(coordinate);
		}	
	}
	for (; j < length; j += 1) {
		if (j < 8 || j > 10) {
			var x_offset = Math.cos(j*Math.PI/6)*radiusB;
			var y_offset = Math.sin(j*Math.PI/6)*radiusB;
			var coordinate = {
				x: cr - x_offset,
				y: cr - y_offset
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
				x: cr - x_offset,
				y: cr - y_offset
			};
			pointCSet.push(coordinate);
		}
	}
	for (var i = 0; i < 60; i += 1) {
		if (i < 36 || i > 54) {
			var x_offset = Math.cos(i*Math.PI/30)*radiusA;
			var y_offset = Math.sin(i*Math.PI/30)*radiusA;
			var coordinate = {
				x: cr - x_offset,
				y: cr - y_offset
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
				x: cr - x_offset,
				y: cr - y_offset
			};
			pointESet.push(coordinate);
		}
	}
	for (var i = 0; i < 60; i += 1) {
		if (i < 36 || i > 54) {
			var x_offset = Math.cos(i*Math.PI/30)*radiusD;
			var y_offset = Math.sin(i*Math.PI/30)*radiusD;
			var coordinate = {
				x: cr - x_offset,
				y: cr - y_offset
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
	var unit = paper.text(cx, cy*.63, "ms").attr({
		'font-size': cr*.12,
		fill: '#ffffff',
		'text-anchor': 'middle'
	});
	dial_gauge.push(unit);
	//Draw value
	var valueACoordinateX = pointASet[pointASet.length-1].x + cr*.067,
		valueACoordinateY = pointASet[pointASet.length-1].y + cr*.067,
		valueBCoordinateX = pointASet[pointASet.length-2].x - cr*.067,
		valueBCoordinateY = pointASet[pointASet.length-2].y + cr*.067;

	var start_value = paper.text(valueACoordinateX, valueACoordinateY, "0").attr({
		'font-size': cr*.107,
		'text-anchor': 'start',
		fill: '#ffffff'
	});
	var end_value = paper.text(valueBCoordinateX, valueBCoordinateY, "500").attr({
		'font-size': cr*.107,
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
			   	  "A"+(cr*.60)+","+(cr*.60)+ 
			   	   ",0,0,1,"+
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
				   "A"+(cr*.60)+","+(cr*.60)+
				   ",0,0,1,"+
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
				   "A"+(cr*.60)+","+(cr*.60)+
				   ",0,0,1,"+
			   	   pointFX+","
			   	  +pointFY).attr({
			   	   	stroke: '#ff3939',
			   	   	'stroke-width': 8
			   	   });
	dial_gauge.push(threshold1, threshold2, threshold3);		   	
	mark_long.toFront();
	var bottom_number = paper.text(cx, cy*1.6, "250").attr({
		'font-size': cr*.17,
		'text-anchor': 'middle',
		fill: '#ffffff'
	});
	dial_gauge.push(bottom_number);
	//pointer, the hardest part.
	var center_button = paper.set();
	var button_circle1 = paper.circle(cx, cy, .08*cr).attr({
		fill: '120-#666-#ddd'
	});
	var button_circle2 = paper.circle(cx, cy, .053*cr).attr({
		fill: '120-#888-#222'
	});
	var button_circle3 = paper.circle(cx, cy, .017*cr).attr({
		fill: '120-#333-#ddd'
	});
	center_button.push(button_circle1, button_circle2, button_circle3);
	dial_gauge.push(button_circle1, button_circle2, button_circle3);
	var pointer = paper.path(
		"M"+(cx-cr*.053)+","+
			(cy+cr*.12)+
		"L"+(cx-cr*.0067)+","+
			(cy-cr*.64)+
		"L"+(cx+cr*.0067)+","+
			(cy-cr*.64)+
		"L"+(cx+cr*.053)+","+
			(cy+cr*.12)+
		"L"+(cx+cr*.03)+","+
			(cy+cr*.13)+
		"L"+(cx-cr*.03)+","+
			(cy+cr*.13)+"z"
	).attr({
		fill: '#dc0000',
		stroke: '#dc0000'
	});
	dial_gauge.push(pointer);
	center_button.toFront();	
	var isMobile = false;
	var title = document.getElementById('title');
	if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
		title.innerHTML += " -- iOS";
		isMobile = true;
	} else {
		title.innerHTML += " -- Standard Browser";
		isMobile = false;
	}	
	obj = {
		'elements': dial_gauge,
		'width': width,
		'height': height,
		'cx': cx,
		'cy': cy,
		'cr': cr,
		'pointer': pointer,
		'number': bottom_number,
		'isMobile': isMobile
	};
	return obj;
}





