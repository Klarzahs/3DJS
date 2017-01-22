

var addEvent = function(object, type, callback) {
	if (object == null || typeof (object) == 'undefined')
		return;
	if (object.addEventListener) {
		object.addEventListener(type, callback, false);
	} else if (object.attachEvent) {
		object.attachEvent("on" + type, callback);
	} else {
		object["on" + type] = callback;
	}
};

addEvent(window, "resize", initCanvas);
addEvent(window, "load", initCanvas);

addEvent(window, "load", function() {
	//document.onmousemove = handleMouseMove;
	setInterval(gameloop, 25);
});


var canvas;
var cube;

var width;
var height;

var modelX = 0;
var modelY = 0;
var modelZ = 0;

var modelScaleX = 1;
var modelScaleY = 1;
var modelScaleZ = 1;

var modelRotateX = 0;
var modelRotateY = 15;
var modelRotateZ = 0;

var modelOriginX = 0;
var modelOriginY = 0;
var modelOriginZ = 0;

var depthBuffer = new Array();
var dirX = 1;
var dirY = 1;


function update(){
	modelOriginX = (modelOriginX + dirX);
	if(modelOriginX > 40){
		dirX = -1;
	}
	if(modelOriginX < 0){
		dirX = 1;
	}
	modelOriginY = (modelOriginY + dirY);
	if(modelOriginY > 40){
		dirY = -1;
	}
	if(modelOriginY < 0){
		dirY = 1;
	}
}

function render() {
	 // 1: Erase what we drew last time.
  	canvas.fillStyle = "rgba(255, 255, 255, 255)";
	canvas.fillRect( 0, 0, width, height );

  	// 2: Also clear out the depth buffer.
  	for (var i = 0; i < depthBuffer.length; i++) {
    	depthBuffer[i] = Infinity;
  	}

  // 3: Take the cube, place it in the 3D world, adjust the viewpoint for
  // the camera, and project everything to two-dimensional triangles.
  	//let projected = transformAndProject()
  	var projected = transformAndProject();

  	var triangle;
  	for(triangle in projected.triangles){
  		draw(projected.triangles[triangle]);
  	}
}

function transformAndProject(){
	var transformed = new Cube();

	for(var i = 0; i < transformed.triangles.length; i++){
		var triangle = new Triangle();
		for(var j = 0; j < triangle.vertices.length; j++){
			var newVertex = transformed.triangles[i].vertices[j].clone();

			newVertex.x -= modelOriginX;
			newVertex.y -= modelOriginY;
			newVertex.z -= modelOriginZ;

			newVertex.x *= modelScaleX;
			newVertex.y *= modelScaleY;
			newVertex.z *= modelScaleZ;

			// Rotate about the X-axis.
			var tempA =  Math.cos(modelRotateX)*newVertex.y + Math.sin(modelRotateX)*newVertex.z;
			var tempB = -Math.sin(modelRotateX)*newVertex.y + Math.cos(modelRotateX)*newVertex.z;
			newVertex.y = tempA;
			newVertex.z = tempB;

			// Rotate about the Y-axis:
			tempA =  Math.cos(modelRotateY)*newVertex.x + Math.sin(modelRotateY)*newVertex.z;
			tempB = -Math.sin(modelRotateY)*newVertex.x + Math.cos(modelRotateY)*newVertex.z;
			newVertex.x = tempA;
			newVertex.z = tempB;

			// Rotate about the Z-axis:
			tempA =  Math.cos(modelRotateZ)*newVertex.x + Math.sin(modelRotateZ)*newVertex.y;
			tempB = -Math.sin(modelRotateZ)*newVertex.x + Math.cos(modelRotateZ)*newVertex.y;
			newVertex.x = tempA;
			newVertex.y = tempB;

			tempA =  Math.cos(modelRotateY)*newVertex.nx + Math.sin(modelRotateY)*newVertex.nz;
			tempB = -Math.sin(modelRotateY)*newVertex.nx + Math.cos(modelRotateY)*newVertex.nz;
			newVertex.nx = tempA;
			newVertex.nz = tempB;

			newVertex.x += modelX;
			newVertex.y += modelY;
			newVertex.z += modelZ;

			//move outside?
			//camera space
			newVertex.x -= cameraX;
		    newVertex.y -= cameraY;
		    newVertex.z -= cameraZ;

		    //translate to 2d
		    newVertex.x /= (newVertex.z + 100) * 0.01;
			newVertex.y /= (newVertex.z + 100) * 0.01;

			//camera viewport
			newVertex.x *= (height)/80;
			newVertex.y *= (height)/80;
			
			//let (0,0) be the center
			newVertex.x += (width/2);
			newVertex.y += (height/2);

			triangle.vertices[j] = newVertex;
		}
		transformed.triangles[i] = triangle;
	}

	return transformed;

/*
	for (j, triangle) in transformed.enumerated() {
    var newTriangle = Triangle()
    for (i, vertex) in triangle.vertices.enumerated() {
      var newVertex = vertex

      newTriangle.vertices[i] = newVertex
    }
    transformed[j] = newTriangle
  }
  */
}

var spans = new Array();;
var firstSpanLine = 0;
var lastSpanLine = 0;

function draw(triangle){
	if(!partiallyInsideViewport(triangle)){
		return;
	}

  	// 2. Reset the spans so that we're starting with a clean slate.
  	spans = new Array();
  	for(var i = 0; i < height; i++){
  		spans.push(new Span());
  	}
  	firstSpanLine = 9007199254740991;
  	lastSpanLine = -1;

  	// 3. Interpolate all the things!
  	addEdge(triangle.vertices[0], triangle.vertices[1]);
  	addEdge(triangle.vertices[1], triangle.vertices[2]);
  	addEdge(triangle.vertices[2], triangle.vertices[0]);

  	// 4. Draw the horizontal strips.
  	drawSpans();
}


function addEdge(vertex1, vertex2) {
  var yDiff = Math.ceil(vertex2.y - 0.5) - Math.ceil(vertex1.y - 0.5);

  if(yDiff == 0){
  	return;
  } 
  var start = yDiff > 0 ? vertex1 : vertex2;
  var end = yDiff > 0 ? vertex2 : vertex1;
  var len = Math.abs(yDiff);

  var yPos = Math.ceil(start.y - 0.5);  
  var yEnd = Math.ceil(end.y - 0.5); 
  var xStep = (end.x - start.x)/len;
  var xPos = start.x + xStep/2;

  var zStep = (end.z - start.z)/len;
  var zPos = start.z + zStep/2;

  var rStep = (end.r - start.r)/len;
  var rPos = start.r;

  var gStep = (end.g - start.g)/len;
  var gPos = start.g;

  var bStep = (end.b - start.b)/len;
  var bPos = start.b;

  var aStep = (end.a - start.a)/len;
  var aPos = start.a;

  var nxStep = (end.nx - start.nx)/len;
  var nxPos = start.nx;

  var nyStep = (end.ny - start.ny)/len;
  var nyPos = start.ny;

  var nzStep = (end.nz - start.nz)/len;
  var nzPos = start.nz;

  while (yPos < yEnd) {
    var x = Math.ceil(xPos - 0.5);
    // Don't want to go outside the visible area.
    if (yPos >= 0 && yPos < height) {

      // This is to optimize drawSpans(), so it knows where to start
      // drawing and where to stop.
      if (yPos < firstSpanLine) { firstSpanLine = yPos; }
      if (yPos > lastSpanLine) { lastSpanLine = yPos; }

      // Add this edge to the span for this line.
      var edge = new Edge(x, rPos, gPos, bPos, aPos, zPos, nxPos, nyPos, nzPos);
	  spans[yPos].push(edge);	
      
    }

    // Move the interpolations one step forward.
    yPos += 1;
    xPos += xStep;
    zPos += zStep;
    rPos += rStep;
    gPos += gStep;
    bPos += bStep;
    aPos += aStep;
    nxPos += nxStep;
    nyPos += nyStep;
    nzPos += nzStep;
  }
}

var id;
var d;

function drawSpans() {
  if (lastSpanLine != -1) {
    for(var y = firstSpanLine; y < lastSpanLine; y++){
      if (spans[y].edges.length == 2 ){
        var edge1 = spans[y].leftEdge();
        var edge2 = spans[y].rightEdge();

        // How much to interpolate on each step.
        var step = 1 / (edge2.x - edge1.x);
        var pos = 0;

        for(var x = edge1.x; x < edge2.x; x++){
          // Interpolate between the colors again.
          var r = edge1.r + (edge2.r - edge1.r) * pos;
          var g = edge1.g + (edge2.g - edge1.g) * pos;
          var b = edge1.b + (edge2.b - edge1.b) * pos;
          var a = edge1.a + (edge2.a - edge1.a) * pos;

          // Also interpolate the normal vector.
          var nx = edge1.nx + (edge2.nx - edge1.nx) * pos;
          var ny = edge1.ny + (edge2.ny - edge1.ny) * pos;
          var nz = edge1.nz + (edge2.nz - edge1.nz) * pos;

          // depth buffer
          var shouldDrawPixel = true;
		  if (useDepthBuffer) {
		  	var z = edge1.z + (edge2.z - edge1.z) * pos;
		  	var offset = x + y * width;
		  	if (depthBuffer[offset] > z) {
		    	depthBuffer[offset] = z;
		  	} else {
		   		shouldDrawPixel = false;
		  	}
		  }
          // draw the pixel
          if (shouldDrawPixel) {
  			var factor = Math.min(Math.max(0, -1*(nx*diffuseX + ny*diffuseY + nz*diffuseZ)), 1);

 			r *= (ambientR*ambientIntensity + factor*diffuseR*diffuseIntensity);
  			g *= (ambientG*ambientIntensity + factor*diffuseG*diffuseIntensity);
  			b *= (ambientB*ambientIntensity + factor*diffuseB*diffuseIntensity);


  			canvas.fillStyle = rgbToHex(Math.floor(r*255), Math.floor(g*255), Math.floor(b*255));
  			//canvas.fillStyle = "#FF0000";
			canvas.fillRect( x, y, 1, 1 );

			/*
			d[0]   = r;
			d[1]   = g;
			d[2]   = b;
			d[3]   = a;
			canvas.putImageData( id, x, y );    
			*/
		  }

          pos += step;
        }
      }
    }
  }
}

// http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function partiallyInsideViewport(triangle){
	return partiallyInsideViewportVertice(triangle.vertices[0]) || 
			partiallyInsideViewportVertice(triangle.vertices[1]) || 
			partiallyInsideViewportVertice(triangle.vertices[2]);
}

function partiallyInsideViewportVertice(vertex){
	return vertex.x > 0 && vertex.x < width && vertex.y > 0 && vertex.y < height;
}

function initCanvas() {
	canvas = document.getElementById('canvas');
	//init the depthBuffer.size
	width = canvas.clientWidth;
	height = canvas.clientHeight;
	for(var i = 0; i < width * height; i++){
		depthBuffer.push(0);
	}
	var ctx = canvas.getContext("2d");
	canvas.height = canvas.clientHeight;
	canvas.width = canvas.clientWidth;

	canvas = ctx;
	cube = new Cube(); 

	id = canvas.createImageData(1,1); 
	d = id.data; 
}

function gameloop(){
	update();
	render();
}

