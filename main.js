import './styles/timeline.scss'

function qs(selector, all = false) {
  return all
    ? document.querySelectorAll(selector)
    : document.querySelector(selector);
}

const sections = qs(".section", true);
const timeline = qs(".timeline");
const line = qs(".line");
line.style.bottom = `calc(100% - 20px)`;
let prevScrollY = window.scrollY;
let up, down;
let full = false;
let set = 0;
const targetY = window.innerHeight * 0.8;

function scrollHandler(e) {
  const { scrollY } = window;
  up = scrollY < prevScrollY;
  down = !up;
  const timelineRect = timeline.getBoundingClientRect();
  const lineRect = line.getBoundingClientRect(); // const lineHeight = lineRect.bottom - lineRect.top;

  const dist = targetY - timelineRect.top;
  console.log(dist);

  if (down && !full) {
    set = Math.max(set, dist);
    line.style.bottom = `calc(100% - ${set}px)`;
  }

  if (dist > timeline.offsetHeight + 50 && !full) {
    full = true;
    line.style.bottom = `-50px`;
  }

  sections.forEach((item) => {
    // console.log(item);
    const rect = item.getBoundingClientRect(); //     console.log(rect);

    if (rect.top + item.offsetHeight / 5 < targetY) {
      item.classList.add("show-me");
    }
  }); // console.log(up, down);

  prevScrollY = window.scrollY;
}

scrollHandler();
line.style.display = "block";
window.addEventListener("scroll", scrollHandler);


import * as THREE from 'three'
//Declare three.js letiables
let camera, scene, renderer, stars = [];


const first = document.getElementById("abouttitle");
const second = document.getElementById("skilltittle");
const animate = (element, position) => {
  element.style.transform = `translateX(${position}%)`;
}
const animateopp = (element, position) => {
  element.style.transform = `translateX(-${position}%)`;
}
window.addEventListener('scroll', function (e) {
  let lastKnownScrollPosition = window.scrollY;

  window.requestAnimationFrame(function () {
    animate(first, lastKnownScrollPosition * .2 / 4)
    if(window.scrollY>280){
      animateopp(second,lastKnownScrollPosition * .2 /4 )
    }
  });
}, false);

//assign three.js objects to each letiable
function init() {

  //camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 5;

  //scene
  scene = new THREE.Scene();

  //renderer
  renderer = new THREE.WebGLRenderer();
  //set the size of the renderer
  renderer.setSize(window.innerWidth, window.innerHeight * 3);

  //add the renderer to the html document body
  document.getElementById('bg').appendChild(renderer.domElement);
}


function addSphere() {

  // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position. 
  for (let z = -1000; z < 1000; z += 20) {

    // Make a sphere (exactly the same as before). 
    let geometry = new THREE.SphereGeometry(0.5, 32, 32)
    let material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    let sphere = new THREE.Mesh(geometry, material)

    // This time we give the sphere random x and y positions between -500 and 500
    sphere.position.x = Math.random() * 1000 - 500;
    sphere.position.y = Math.random() * 1000 - 500;

    // Then set the z position to where it is in the loop (distance of camera)
    sphere.position.z = z;

    // scale it up a bit
    sphere.scale.x = sphere.scale.y = 2;

    //add the sphere to the scene
    scene.add(sphere);

    //finally push it to the stars array 
    stars.push(sphere);
  }
}

function animateStars() {
  // loop through each star
  for (let i = 0; i < stars.length; i++) {

    let star = stars[i];

    // and move it forward dependent on the mouseY position. 
    star.position.z += i / 10;

    // if the particle is too close move it to the back
    if (star.position.z > 1000) star.position.z -= 2000;

  }

}

function render() {
  //get the frame
  requestAnimationFrame(render);

  //render the scene
  renderer.render(scene, camera);
  animateStars();
}

init();
addSphere();
render();
