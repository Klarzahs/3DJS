function Span(){
	this.edges = new Array();

  this.push = function(Edge){
    this.edges.push(Edge);
  }

  this.leftEdge = function(){
    return this.edges[0].x < this.edges[1].x ? this.edges[0] : this.edges[1];
  }

  this.rightEdge = function(){
    return this.edges[0].x > this.edges[1].x ? this.edges[0] : this.edges[1];
  }
}


function Edge(x, r, g, b, a, z, nx, ny, nz){
  this.x = x;

  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;

  this.z = z;

  this.nx = nx;
  this.ny = ny;
  this.nz = nz;
}
