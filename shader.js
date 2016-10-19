(function () {

	let container = document.getElementById('container');
	const WIDTH = 400;
	const HEIGHT = 400;
	const SPHERE_RADIUS = 50;

	const FOV = 45;
	const ASPECT_RATIO = WIDTH/HEIGHT; 
	const NEAR = 0.1;
	const FAR = 1000;

	// scene
	let scene = new THREE.Scene();

	// plane
	var planeGeometry = new THREE.PlaneGeometry( WIDTH, HEIGHT, 0 );
	var planeMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
	var plane = new THREE.Mesh( planeGeometry, planeMaterial);
	scene.add( plane );

	// camera
	let camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);
	camera.position.z = 475;
	scene.add(camera);


	// sphere
	let sphereGeometry = new THREE.SphereGeometry(SPHERE_RADIUS, 16, 16);
	let sphereMaterial = new THREE.MeshBasicMaterial({color: 0x98cff4, wireframe: true});
	let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	scene.add(sphere);

	let axisHelper = new THREE.AxisHelper( WIDTH*HEIGHT );
	scene.add( axisHelper );

	// renderer
	let renderer = new THREE.WebGLRenderer();
	renderer.setSize(WIDTH, HEIGHT);


	// let vShader = document.getElementById('vertexshader');
	// let fShader = document.getElementById('fragmentshader');
	// let shaderMaterial = new THREE.ShaderMaterial({
	// 	vertexShader: vShader.text(),
	// 	fragmentShader: fShader.text()
	// });

	let vel_x = 6;
	let vel_y = 3;
	let rot_x = 0; 
	let rot_y = 0;

	container.appendChild(renderer.domElement);	

	function render() {

		sphere.position.x += vel_x;
		sphere.position.y += vel_y;
		sphere.rotation.x += rot_x;
		sphere.rotation.y += rot_y;
		if (sphere.position.x + SPHERE_RADIUS >= WIDTH/2 || sphere.position.x - SPHERE_RADIUS <= -WIDTH/2) {
			vel_x = -vel_x;
			rot_y = sphere.position.x + SPHERE_RADIUS >= WIDTH/2 ? -0.1 : 0.1;
			sphere.material.color = new THREE.Color(`${randomRGB()}`);
		}

		if (sphere.position.y + SPHERE_RADIUS >= HEIGHT/2 || sphere.position.y - SPHERE_RADIUS <= -HEIGHT/2) {
			vel_y = -vel_y;
			rot_x = sphere.position.y + SPHERE_RADIUS >= WIDTH/2 ? 0.1 : -0.1;
			sphere.material.color = new THREE.Color(`${randomRGB()}`);
		}

		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}

	render();

	function randomRGB () {
		let hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
		return hue;
	}


}())