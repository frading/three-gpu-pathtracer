var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=e.parcelRequire5b70;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var a=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,a.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequire5b70=a);var r=a("ilwiq"),i=a("RPVlj"),o=a("7lx9d"),s=a("5Rd1x"),d=a("4CEV9"),l=a("cVdfP"),c=a("891vQ"),u=a("kp7Te"),m=a("jiuw3");let p,h,w,g,f,b,v,y;const x=new r.Vector2,F=new r.Vector3,M={environmentIntensity:3,environmentRotation:0,bounces:3,samplesPerFrame:1,resolutionScale:1/window.devicePixelRatio,filterGlossyFactor:.5,tiles:1,autoFocus:!0};function C(e){x.set(e.clientX,e.clientY)}function E(e){if(Math.abs(x.x-e.clientX)+Math.abs(x.y-e.clientY)<2&&w){const t=w.bvh,n=new r.Raycaster;n.setFromCamera({x:e.clientX/window.innerWidth*2-1,y:-e.clientY/window.innerHeight*2+1},f);const a=t.raycastFirst(n.ray);a&&(F.copy(a.point),f.focusDistance=a.distance-f.near,g.reset())}}function S(){const e=window.innerWidth,t=window.innerHeight,n=M.resolutionScale,a=window.devicePixelRatio;g.setSize(e*n*a,t*n*a),g.reset(),p.setSize(e,t),p.setPixelRatio(window.devicePixelRatio*n),f.aspect=e/t,f.updateProjectionMatrix()}function P(){g.reset()}function R(){requestAnimationFrame(R),M.autoFocus&&(f.focusDistance=f.position.distanceTo(F)-f.near),g.material.materials.updateFrom(w.materials,w.textures),g.material.filterGlossyFactor=M.filterGlossyFactor,g.material.environmentIntensity=M.environmentIntensity,g.material.bounces=M.bounces,g.material.physicalCamera.updateFrom(f),f.updateMatrixWorld();for(let e=0,t=M.samplesPerFrame;e<t;e++)g.update();g.samples<1&&p.render(v,f),p.autoClear=!1,b.render(p),p.autoClear=!0,y.innerText=`Samples: ${Math.floor(g.samples)}`}window.innerWidth/window.innerHeight<.65&&(M.bounces=Math.max(M.bounces,6),M.resolutionScale*=.5,M.tiles=2),async function(){p=new r.WebGLRenderer({antialias:!0}),p.toneMapping=r.ACESFilmicToneMapping,document.body.appendChild(p.domElement),f=new d.PhysicalCamera(60,window.innerWidth/window.innerHeight,.025,500),f.position.set(-.262,.5276,-1.1606),f.apertureBlades=6,f.fStop=.6,f.focusDistance=1.1878,F.set(-.5253353217832674,.3031596413506029,.000777794185259223),v=new r.Scene,g=new d.PathTracingRenderer(p),g.camera=f,g.material=new d.PhysicalPathTracingMaterial,g.tiles.set(M.tiles,M.tiles),g.material.setDefine("FEATURE_GRADIENT_BG",1),g.material.setDefine("FEATURE_MIS",0),g.material.bgGradientTop.set(3739424),g.material.bgGradientBottom.set(1383199),b=new i.FullScreenQuad(new r.MeshBasicMaterial({map:g.target.texture,blending:r.CustomBlending})),h=new s.OrbitControls(f,p.domElement),h.target.set(-.182,.147,.06),h.update(),h.addEventListener("change",(()=>{g.reset()})),y=document.getElementById("samples");const e=new Promise((e=>{(new c.RGBELoader).load("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/equirectangular/royal_esplanade_1k.hdr",(t=>{const n=new d.BlurredEnvMapGenerator(p),a=n.generate(t,.35);g.material.envMapInfo.updateFrom(a),n.dispose(),t.dispose(),v.environment=a,e()}))})),t=new l.PathTracingSceneWorker,n=(new o.GLTFLoader).setMeshoptDecoder(u.MeshoptDecoder).loadAsync("https://raw.githubusercontent.com/gkjohnson/3d-demo-data/main/models/sd-macross-city-standoff-diorama/scene.glb").then((e=>{const n=new r.Group,a=new r.SphereBufferGeometry(1,10,10),i=new r.MeshStandardMaterial({emissiveIntensity:10,emissive:16777215});for(let e=0;e<300;e++){const e=new r.Mesh(a,i);e.scale.setScalar(.075*Math.random()+.03),e.position.randomDirection().multiplyScalar(30+15*Math.random()),n.add(e)}return e.scene.scale.setScalar(.5),e.scene.updateMatrixWorld(),n.add(e.scene),e.scene.traverse((e=>{e.material&&(e.material.roughness=.05,e.material.metalness=.05)})),t.generate(n)})).then((e=>{w=e,v.add(e.scene);const{bvh:n,textures:a,materials:r}=e,i=n.geometry,o=g.material;o.bvh.updateFrom(n),o.normalAttribute.updateFrom(i.attributes.normal),o.tangentAttribute.updateFrom(i.attributes.tangent),o.uvAttribute.updateFrom(i.attributes.uv),o.materialIndexAttribute.updateFrom(i.attributes.materialIndex),o.textures.setTextures(p,2048,2048,a),o.materials.updateFrom(r,a),t.dispose()}));await Promise.all([n,e]),document.getElementById("loading").remove(),S(),window.addEventListener("resize",S),p.domElement.addEventListener("mouseup",E),p.domElement.addEventListener("mousedown",C);const a=new m.GUI,x=a.addFolder("Path Tracing");x.add(M,"tiles",1,4,1).onChange((e=>{g.tiles.set(e,e)})),x.add(M,"samplesPerFrame",1,10,1),x.add(M,"bounces",1,30,1).onChange((()=>{g.reset()})),x.add(M,"resolutionScale",.1,1).onChange((()=>{S()}));const T=a.addFolder("Camera");T.add(f,"focusDistance",1,100).onChange(P).listen(),T.add(f,"apertureBlades",0,10,1).onChange((function(e){f.apertureBlades=0===e?0:Math.max(e,3),this.updateDisplay(),P()})),T.add(f,"apertureRotation",0,12.5).onChange(P),T.add(f,"anamorphicRatio",.1,10).onChange(P),T.add(f,"bokehSize",0,100).onChange(P).listen(),T.add(f,"fStop",.02,20).onChange(P).listen(),T.add(f,"fov",25,100).onChange((()=>{f.updateProjectionMatrix(),P()})).listen(),T.add(M,"autoFocus"),R()}();
//# sourceMappingURL=depthOfField.0cc6d401.js.map
