// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

// Include any additional ThreeJS examples below
require('three/examples/js/controls/OrbitControls');

const canvasSketch = require('canvas-sketch');

const settings = {
  // Make the loop animated
  animate: true,
  dimensions: [512, 512],
  fps: 30,
  duration: 4,
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  attributes: { antialias: true },
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas,
  });

  // WebGL background color
  renderer.setClearColor('hsl(0, 0%, 95%)', 1);

  // Setup a camera
  const camera = new THREE.OrthographicCamera();
  // camera.position.set(2, 2, -4);
  // camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  // const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // // Setup a geometry
  // const geometry = new THREE.SphereGeometry(1, 32, 16);

  // // Setup a material
  // const material = new THREE.MeshBasicMaterial({
  //   color: 'red',
  //   wireframe: true,
  // });

  // Setup a geometry
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const palette = random.pick(palettes);

  for (let index = 0; index < 40; index++) {
    // Setup a material
    const material = new THREE.MeshStandardMaterial({
      color: random.pick(palette),
    });

    // Setup a mesh with geometry + material
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(random.range(-1, 1), random.range(-1, 1), random.range(-1, 1));
    mesh.scale.set(random.range(-1, 1), random.range(-1, 1), random.range(-1, 1));
    mesh.scale.multiplyScalar(0.25);

    scene.add(mesh);
  }

  scene.add(new THREE.AmbientLight('hsl( 0, 0%,40%)'));

  const light = new THREE.DirectionalLight('white', 1);
  light.position.set(0, 0, 4);
  scene.add(light);

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);

      const aspect = viewportWidth / viewportHeight;

      // Ortho zoom
      const zoom = 1.5;

      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      // Update the camera
      camera.updateProjectionMatrix();

      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ playhead }) {
      scene.rotation.z = playhead * Math.PI * 2;
      // controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      // controls.dispose();
      renderer.dispose();
    },
  };
};

canvasSketch(sketch, settings);
