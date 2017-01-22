function Vertex (xa, ya, za, ra, ga, ba, aa, nxa, nya, nza) {
	this.x = xa;
	this.y = ya;
	this.z = za;

	this.r = ra;
	this.g = ga;
	this.b = ba;
	this.a = 1;

	this.nx = nxa;
	this.ny = nya;
	this.nz = nza;


   	this.getInfo = function() {
        return this.x + ' ' + this.y + ' ' + this.z;
    };

    this.clone = function(){
    	return new Vertex(this.x, this.y, this.z, this.r, this.g, this.b, this.a, this.nx, this.ny, this.nz);
    }
}

function EmptyVertex () {
	this.x = 0;
	this.y = 0;
	this.z = 0;

	this.r = 0;
	this.g = 0;
	this.b = 0;
	this.a = 1;

	this.nx = 0;
	this.ny = 0;
	this.nz = 0;


    this.getInfo = function() {
        return this.x + ' ' + this.y + ' ' + this.z;
    };
}

function Triangle(){
	this.vertices = new Array();
	this.vertices.push(new Vertex());
	this.vertices.push(new Vertex());
	this.vertices.push(new Vertex());

	this.clone = function(){
		var triangle = new Triangle();
		triangle.vertices[0] = this.vertices[0].copy();
		triangle.vertices[1] = this.vertices[1].copy();
		triangle.vertices[2] = this.vertices[2].copy();
		return triangle;
	}
}

function Triangle(a){
	this.vertices = new Array();
	this.vertices.push(new Vertex());
	this.vertices.push(new Vertex());
	this.vertices.push(new Vertex());
}

