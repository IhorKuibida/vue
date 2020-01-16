<template>
    <div class="prj-panorama" id="prjPanorama">

        <transition appear appear-active-class="animated fadeIn">
            <div class="prj-panorama__box" id="panorama"></div>
        </transition>

        <transition appear appear-active-class="animated bounceIn">
            <btn-close
                :class="'prj-panorama__close'"
                btnTitle="Close"
                v-on:btnСlicked="closePanorama()">
            </btn-close>
        </transition>

    </div>
</template>





<script>
import { importScript } from '../helpers/_import-script.js';
import BtnClose from './elements/BtnClose.vue';

export default {
    name: 'PrjPanorama',
    components: { BtnClose },


    // data
    data: function() {
        return {
            "currentProject": this.$store.state.prjCurrentProject,
        }
    },


    // created
    created() {
        const panorama = this.projectPanorama;
        importScript('js/three.min.js', function() {
            init(panorama);
            animate();
        });
    },


    // mounted
    mounted() {

    },


    // methods
    methods: {

        // Close panorama
        closePanorama() {
            this.$store.commit('offPanorama');
        },
    },


    // computed
    computed: {

        // get project panorama
        projectPanorama() {
            const project = this.$store.getters.getCurrentProject(this.currentProject);
            return project["project_image_panorama"];
        },
    },
}


// THREE JS
var camera, scene, renderer;
var isUserInteracting = false,
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 0, onMouseDownLon = 0,
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0;

function init(panorama) {
    var container, mesh;
    container = document.getElementById( 'panorama' );
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
    camera.target = new THREE.Vector3( 0, 0, 0 );
    scene = new THREE.Scene();
    var geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale( - 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( {
        map: new THREE.TextureLoader().load( '../' + panorama )
    } );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );

    const sectionEl = document.querySelector('.section-prj-main');
    const sectionWidth = sectionEl.offsetWidth;
    const sectionHeight = sectionEl.offsetHeight;
    renderer.setSize( sectionWidth, sectionHeight );
    container.appendChild( renderer.domElement );

    // mouse events
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );

    // touch events
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    document.addEventListener( 'touchend', onDocumentTouchUp, false );

    window.addEventListener( 'resize', onWindowResize, false );
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseDown( event ) {
    event.preventDefault();
    isUserInteracting = true;
    onMouseDownMouseX = event.clientX;
    onMouseDownMouseY = event.clientY;
    onMouseDownLon = lon;
    onMouseDownLat = lat;
}

function onDocumentMouseMove( event ) {
    if ( isUserInteracting === true ) {
        lon = ( onMouseDownMouseX - event.clientX ) * 0.1 + onMouseDownLon;
        lat = ( event.clientY - onMouseDownMouseY ) * 0.1 + onMouseDownLat;
    }
}

function onDocumentMouseUp( event ) {
    isUserInteracting = false;
}

function onDocumentTouchStart( event ) {
    event.preventDefault();
    isUserInteracting = true;
    onMouseDownMouseX = event.touches[0].clientX;
    onMouseDownMouseY = event.touches[0].clientY;
    onMouseDownLon = lon;
    onMouseDownLat = lat;
}

function onDocumentTouchMove( event ) {
    if ( isUserInteracting === true ) {
        lon = ( onMouseDownMouseX - event.touches[0].clientX ) * 0.07 + onMouseDownLon;
        lat = ( event.touches[0].clientY - onMouseDownMouseY ) * 0.07 + onMouseDownLat;
    }
}

function onDocumentTouchUp( event ) {
    isUserInteracting = false;
}


function animate() {
    requestAnimationFrame( animate );
    update();
}

function update() {
    if ( isUserInteracting === false ) {
        lon += 0.1;
    }
    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.Math.degToRad( 90 - lat );
    theta = THREE.Math.degToRad( lon );
    camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
    camera.target.y = 500 * Math.cos( phi );
    camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );
    camera.lookAt( camera.target );
    /*
    // distortion
    camera.position.copy( camera.target ).negate();
    */
    renderer.render( scene, camera );
}

</script>