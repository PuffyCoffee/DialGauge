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
		c3_glow,
		c4 = paper.circle(cx, cy, cr*.73).attr({
			fill: '120-#000000-#222222: 60-#ddd',
			stroke: '#000000'
		});
	dial_gauge.push(c1, c2, c3, c4);
	c3_glow = c3.glow({
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
	var unit = paper.text(cx, cy*.63, args.unit).attr({
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

	var start_value = paper.text(valueACoordinateX, valueACoordinateY, args.min).attr({
		'font-size': cr*.107,
		'text-anchor': 'start',
		fill: '#ffffff'
	});
	var end_value = paper.text(valueBCoordinateX, valueBCoordinateY, args.max).attr({
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
	
	var bottom_number = paper.text(cx, cy*1.6, args.min).attr({
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
	pointer.transform("r-120,"+cx+","+cy);
	dial_gauge.push(pointer);	
	var isMobile = false;
	var title = document.getElementById('title');
	if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
		title.innerHTML += " -- iOS";
		isMobile = true;
	} else {
		title.innerHTML += " -- Standard Browser";
		isMobile = false;
	}	
	mark_short.toFront();
	mark_long.toFront();
	pointer.toFront();
	center_button.toFront();
	//skin
	function setSkin (c3_color, c3_color_glow, c4_color_fill, c4_color_stroke, mark_long_color, mark_short_color, 
		unit_color, start_value_color, end_value_color, bottom_number_color, pointer_color, hide_mark) {
		c3_glow.remove();
		c3.attr({stroke: c3_color});
		c3_glow = c3.glow({
			width: cr/10,
			fill: false,
			opacity: cr/100,
			color: c3_color_glow
		});
		if (hide_mark) {
			mark_long.hide();
			mark_short.hide();
		} else {
			mark_long.attr({stroke: mark_long_color});
			mark_short.attr({stroke: mark_short_color});
			mark_long.show();
			mark_short.show();
		}		
		c4.attr({fill: c4_color_fill, stroke: c4_color_stroke});
		unit.attr({fill: unit_color});
		start_value.attr({fill: start_value_color});
		end_value.attr({fill: end_value_color});
		bottom_number.attr({fill: bottom_number_color});
		pointer.attr({fill: pointer_color, stroke: pointer_color});		
	}	
	if (typeof args.skin !== 'undefined') {
		switch (args.skin) {
			case 'CPU_UTILIZATION':
				setSkin('#000000', '#000000', '120-#000000-#222222: 60-#ddd', '#000000', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#dc0000', true);
				break;
			case 'CRISP_WHITE':
				setSkin('#c8c8c8', '#c8c8c8', '#ffffff', '#ffffff', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', false);
				break;
			case 'CLEAN_BLACK':
				setSkin('#000000', '#000000', '120-#000000-#222222: 60-#ddd', '#000000', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#dc0000', false);
				break;
			case 'CLEAN_BLACK_NO_TRICKS':
				setSkin('#000000', '#000000', '120-#000000-#222222: 60-#ddd', '#000000', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#dc0000', true);
				break;
			case 'DISK_IO_BBR':
				setSkin('#c8c8c8', '#c8c8c8', '#ffffff', '#ffffff', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', true);
				break;
			case 'THREAD_COUNTS':
				setSkin('#000000', '#000000', '120-#000000-#222222: 60-#ddd', '#000000', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#dc0000', false);
				break;
			case 'CONSOLE_RED':
				break;
			default:
				console.info("unknown skin name.");
		}
	} else {
		//Skin: CONSOLE_RED
	}
	this.changeSkin = function(skin_name) {
		console.log(skin_name);		
		switch (skin_name) {
			case 'CPU_UTILIZATION':
				setSkin('#000000', '#000000', '120-#000000-#222222: 60-#ddd', '#000000', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#dc0000', true);
				break;
			case 'CRISP_WHITE':
				setSkin('#c8c8c8', '#c8c8c8', '#ffffff', '#ffffff', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', false);
				break;
			case 'CLEAN_BLACK':
				setSkin('#000000', '#000000', '120-#000000-#222222: 60-#ddd', '#000000', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#dc0000', false);
				break;
			case 'CLEAN_BLACK_NO_TRICKS':
				setSkin('#000000', '#000000', '120-#000000-#222222: 60-#ddd', '#000000', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#dc0000', true);
				break;
			case 'DISK_IO_BBR':
				setSkin('#c8c8c8', '#c8c8c8', '#ffffff', '#ffffff', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', true);
				break;
			case 'THREAD_COUNTS':
				setSkin('#590000', '#720000', '120-#000000-#222222: 60-#ddd', '#000000', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#dc0000', false);
				break;
			case 'CONSOLE_RED':
				setSkin('#590000', '#720000', '120-#000000-#222222: 60-#ddd', '#000000', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#dc0000', false);
				break;
			default:
				console.info("unknown skin name.");
		}
	};
	obj = {
		'elements': dial_gauge,
		'width': width,
		'height': height,
		'cx': cx,
		'cy': cy,
		'cr': cr,
		'pointer': pointer,
		'number': bottom_number,
		'isMobile': isMobile,
		'this': this
	};
	return obj;
}





