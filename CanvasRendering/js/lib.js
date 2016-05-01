var utils = {

	normalization : function ( value, min, max )	{
			"use strict";
			return ( value - min )/( max - min );
		},

	linerInterplotation : function ( norm, min, max ) {
			"use strict";
			return ( max - min ) * norm + min;
		},

	map : function ( value, sourceMin, sourceMax, distMin, distMax ) {
			"use strict";
			var nom = normalization( value, sourceMin, sourceMax );
			return linerInterplotation( nom, distMin, distMax ); 
		},

	clamp : function ( value, min, max ) {
			"use strict";
			return Math.min( Math.max( value, Math.min( min, max ) ), Math.max( min, max ) ); 
		},

	distance : function ( p0, p1 ) {
			"use strict";
			var dx = p0.x - p1.x,
				dy = p0.y - p1.y;
			return Math.sqrt( dx*dx + dy*dy );
		},

	distanceXY : function ( x1, y1, x2, y2 ) {
			"use strict";
			var dx = x2 - x1,
				dy = y2 - y1;
			return Math.sqrt( dx*dx + dy*dy );
		},

	circleCollision : function ( c0, c1 ) {
			"use strict";
			return utils.distance( c0, c1 ) <= c0.radius + c1.radius;
		},

	circlePointCollision : function ( x1, y1, cicrcle ) {
			"use strict";
			return utils.distanceXY( x1, y1, cicrcle.x, cicrcle.y ) <= cicrcle.radius;
		},

	pointInRect : function ( x1, y1, rect ) {
			"use strict";
			return utils.inRange( x1, rect.x, rect.x+rect.width ) & utils.inRange( y1, rect.y, rect.y+rect.height );

	},

	inRange: function ( value, min, max ) {
		return value >= Math.min( min, max ) && value <= Math.max( min, max );
	},

	pointAroundRectangle: function ( x1, y1, rect ) {
		dx = x1 - rect.xc;
		dy = y1 - rect.yc;
		if( dx > 0 && Math.abs(dx) > rect.width/2)
			return "right";
		else if( dx <= 0 && Math.abs(dx) > rect.width/2)
			return "left";
		else if( dy > 0 && Math.abs(dy) > rect.height/2 )
			return "up";
		else if( dy <= 0 && Math.abs(dy) > rect.height/2 )
			return "down";
		else
			return "inside";
	},

	clearCanvas: function( context ) {
		context.clearRect(0,0,context,height);
	},
	drawGrid : function ( context, gridSize ) {
			"use strict";
			var width = window.innerWidth,
			height = window.innerHeight;
			context.beginPath();
			context.strokeStyle = "#cccccc";
			for ( var x = 0; x <= width; x += gridSize ) 
			{
				context.moveTo( x, 0 );
				context.lineTo( x, height );
			};

			for ( var y = 0; y <= height; y += gridSize ) 
			{
				context.moveTo( 0, y );
				context.lineTo( width, y );
			};
			context.stroke();
		},
}
