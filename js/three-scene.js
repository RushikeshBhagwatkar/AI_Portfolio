/**
 * Three.js 3D Background - Neural Network Sphere
 */

let scene, camera, renderer, particles, sphere;
let mouseX = 0, mouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function init() {
    const canvas = document.getElementById('three-canvas');
    
    // Scene & Camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    // Particles (Neural Network Nodes)
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const particleCount = 200;

    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * 2000 - 1000;
        const y = Math.random() * 2000 - 1000;
        const z = Math.random() * 2000 - 1000;
        vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
        color: 0x0070f3,
        size: 4,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.5
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Sphere Mesh (Wireframe Outline)
    const sphereGeom = new THREE.SphereGeometry(600, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
        color: 0x0070f3,
        wireframe: true,
        transparent: true,
        opacity: 0.05
    });
    sphere = new THREE.Mesh(sphereGeom, sphereMat);
    scene.add(sphere);

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.addEventListener('mousemove', onDocumentMouseMove);
    window.addEventListener('resize', onWindowResize);

    animate();
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.05;
    mouseY = (event.clientY - windowHalfY) * 0.05;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotation
    particles.rotation.x += 0.001;
    particles.rotation.y += 0.001;
    sphere.rotation.y += 0.002;

    // Camera follow mouse smooth
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// Start Three.js
init();
