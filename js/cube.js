function Cube(){
  this.triangles = new Array();

  var triangle = new Triangle();
  triangle.vertices[0] = new Vertex( -10,-10, 10,0,0,1,1, 0, 0, 1);
  triangle.vertices[1] = new Vertex( -10, 10, 10,0,0,1,1, 0, 0, 1);
  triangle.vertices[2] = new Vertex(10,-10, 10,0,0,1,1, 0, 0, 1);
  this.triangles.push(triangle);

  triangle = new Triangle();
  triangle.vertices[0] = new Vertex( -10, 10, 10,0,0,1,1, 0, 0, 1);
  triangle.vertices[1] = new Vertex(10,-10, 10,0,0,1,1, 0, 0, 1);
  triangle.vertices[2] = new Vertex(10, 10, 10,0,0,1,1, 0, 0, 1);
  this.triangles.push(triangle);

  triangle = new Triangle();
  triangle.vertices[0] = new Vertex( -10,-10,-10,1,0,0,1, 0, 0, -1);
  triangle.vertices[1] = new Vertex(10,-10,-10,0,1,0,1, 0, 0, -1);
  triangle.vertices[2] = new Vertex(10, 10,-10,0,0,1,1, 0, 0, -1);
  this.triangles.push(triangle);

  triangle = new Triangle();
  triangle.vertices[0] = new Vertex( -10,-10,-10,1,1,0,1, 0, 0, -1);
  triangle.vertices[1] = new Vertex(10, 10,-10,0,1,1,1, 0, 0, -1);
  triangle.vertices[2] = new Vertex( -10, 10,-10,1,0,1,1, 0, 0, -1);
  this.triangles.push(triangle);

  triangle = new Triangle()
  triangle.vertices[0] = new Vertex( -10, 10,-10,1,0,0,1, 0, 1, 0);
  triangle.vertices[1] = new Vertex( -10, 10, 10,1,0,0,1, 0, 1, 0);
  triangle.vertices[2] = new Vertex(10, 10,-10,1,0,0,1, 0, 1, 0);
  this.triangles.push(triangle);

  triangle = new Triangle();
  triangle.vertices[0] = new Vertex( -10, 10, 10,1,0,0,1, 0, 1, 0);
  triangle.vertices[1] = new Vertex(10, 10,-10,1,0,0,1, 0, 1, 0);
  triangle.vertices[2] = new Vertex(10, 10, 10,1,0,0,1, 0, 1, 0);
  this.triangles.push(triangle);

  triangle = new Triangle();
  triangle.vertices[0] = new Vertex( -10,-10,-10,1,1,1,1, 0, -1, 0);
  triangle.vertices[1] = new Vertex(10,-10,-10,1,1,1,1, 0, -1, 0);
  triangle.vertices[2] = new Vertex( -10,-10, 10,1,1,1,1, 0, -1, 0);
  this.triangles.push(triangle);

  triangle = new Triangle();
  triangle.vertices[0] = new Vertex( -10,-10, 10,1,1,1,1, 0, -1, 0);
  triangle.vertices[1] = new Vertex(10,-10, 10,1,1,1,1, 0, -1, 0);
  triangle.vertices[2] = new Vertex(10,-10,-10,1,1,1,1, 0, -1, 0);
  this.triangles.push(triangle);

  triangle = new Triangle();
  triangle.vertices[0] = new Vertex(10,-10,-10,0,1,0,1, 1, 0, 0);
  triangle.vertices[1] = new Vertex(10,-10, 10,0,1,0,1, 1, 0, 0);
  triangle.vertices[2] = new Vertex(10, 10,-10,0,1,0,1, 1, 0, 0);
  this.triangles.push(triangle);

  triangle = new Triangle();
  triangle.vertices[0] = new Vertex(10,-10, 10,0,1,0,1, 1, 0, 0);
  triangle.vertices[1] = new Vertex(10, 10,-10,0,1,0,1, 1, 0, 0);
  triangle.vertices[2] = new Vertex(10, 10, 10,0,1,0,1, 1, 0, 0);
  this.triangles.push(triangle);

  // The yellow side has normal vectors that point idifferent directions,
  // which makes it appear rounded whelighting is applied. For the other
  // sides all vertices have the same normal vectors, making them appear flat.
  triangle = new Triangle();
  triangle.vertices[0] = new Vertex( -10,-10,-10,1,1,0,1, -0.577, -0.577, -0.577);
  triangle.vertices[1] = new Vertex( -10, 10,-10,1,1,0,1, -0.577,0.577, -0.577);
  triangle.vertices[2] = new Vertex( -10,-10, 10,1,1,0,1, -0.577, -0.577,0.577);
  this.triangles.push(triangle);

  triangle = new Triangle();
  triangle.vertices[0] = new Vertex( -10,-10, 10,1,1,0,1, -0.577, -0.577,0.577);
  triangle.vertices[1] = new Vertex( -10, 10, 10,1,1,0,1, -0.577,0.577,0.577);
  triangle.vertices[2] = new Vertex( -10, 10,-10,1,1,0,1, -0.577,0.577, -0.577);
  this.triangles.push(triangle);

  this.clone = function(){
      //TODO: better clone()
      return new Cube();
  }
}

