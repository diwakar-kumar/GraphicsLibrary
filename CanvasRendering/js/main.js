window.onload = function(){
	"use strict"
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	var tracker = document.getElementById("tracker"),
		tcontext = tracker.getContext("2d"),
		twidth = tracker.width = window.innerWidth,
		theight = tracker.height = window.innerHeight;
	//context.fillRect( 0, 0, width, height );
	//context.translate( 0, height);
	//context.scale( 1, -1 );
	// for (var ang = 0; ang < Math.PI*2; ang += 0.1 )
	// {
	// 	var x = ang * 200,
	// 		y = Math.cos(ang)*200;
	// 		context.fillRect( x, y, 5, 5 );
	// };Math

	var circle = {
		x: 326,
		y: 229.5,
		radius: 50,
	}
	var rect = {
		x : width/2 -200,
		y : height/2 -150,
		width : 400,//100,
		height : 100,//400,
		xc: /*500.5,*/650.5,
		yc: /*379.5,*/229.5,
	};
	console.log(rect);
	utils.drawGrid( context, 10 );
	context.fillStyle = "#000000";
	context.beginPath();
	context.fillRect( rect.x, rect.y, rect.width, rect.height );
	context.fill();
	context.arc( circle.x, circle.y, circle.radius, 0, Math.PI*2, false );
	context.fillStyle = "green";
	context.fill();
	var move = false;

	var point = {
		x : 0,
		y : 0,
    	isFirst : true,    
 	};
	document.body.addEventListener("mousedown", function(event){
		if(point.isFirst)
		{
			point.x = event.clientX;
			point.y = event.clientY;
			point.isFirst = false;
			move = true;	
		}
		else
		{
			tcontext.clearRect(0,0,width,height);
			context.beginPath();
			context.strokeStyle = "black";
			context.moveTo( point.x, point.y );
			context.lineTo( event.clientX, event.clientY );
			context.stroke();
			point.isFirst = true;
			move = false;
		}
	})

	document.body.addEventListener("mousemove", function(event){
		if(move)
		{
			tcontext.clearRect(0,0,width,height);
			tcontext.beginPath();
			tcontext.strokeStyle = "black";
			tcontext.moveTo( point.x, point.y );
			tcontext.lineTo( event.clientX, event.clientY );
			tcontext.stroke();
		}
		if( utils.circlePointCollision( event.clientX, event.clientY, circle ) || utils.pointInRect( event.clientX, event.clientY, rect ))
		{
			context.clearRect(0,0,width,height);
			utils.drawGrid( context, 10 );
			context.fillStyle = "green";
			context.beginPath();
			
			context.fillRect( rect.x, rect.y, rect.width, rect.height );
			context.fill();
			context.fillStyle = "#000000";
			context.arc( circle.x, circle.y, circle.radius, 0, Math.PI*2, false );
			context.fill();
		}
		else
		{
			context.clearRect(0,0,width,height);
			utils.drawGrid( context, 10 );
			context.fillStyle = "#000000";
			context.beginPath();
			context.fillRect( rect.x, rect.y, rect.width, rect.height );
			context.fill();
			context.fillStyle = "green";
			context.arc( circle.x, circle.y, circle.radius, 0, Math.PI*2, false );
			context.fill();
		}
		console.log( event.clientX+","+event.clientY );
		tcontext.clearRect(0,0,width,height);
		tcontext.fillStyle = "grey";
		tcontext.font = "30px Arial";
		tcontext.fillText(event.clientX+","+event.clientY+"("+utils.pointAroundRectangle( event.clientX, event.clientY, rect )+")",event.clientX, event.clientY);
		//console.log(utils.pointAroundRectangle( event.clientX, event.clientY, rect ));
	})


	// var rect = {
	// 	x : width/2 -200,
	// 	y : height/2 -150,
	// 	width : 400,
	// 	height : 100  
	// };


	// document.body.addEventListener("mousemove", function(event){
	// 	var x = clamp( event.clientX, rect.x, rect.x+rect.width ),
	// 		y = clamp( event.clientY, rect.y, rect.y+rect.height );

	// 		context.clearRect(0,0,width,height);
	// 		drawGrid( context, 100 );
	// 		context.fillStyle = "#cccccc";
	// 		context.fillRect( rect.x-10, rect.y-10, rect.width+20, rect.height+20 );
	// 		context.fillStyle = "#000000";
	// 		context.beginPath();
	// 		context.arc( x, y, 10, 0, Math.PI*2, false );
	// 		context.fill();
	// })
}