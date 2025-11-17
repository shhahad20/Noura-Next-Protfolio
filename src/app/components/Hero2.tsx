// "use client";
// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import "../styles/Hero2.scss";
// import InfiniteScrollText from "./InfiniteScrollText";

// const Hero2: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const sceneRef = useRef<{
//     scene?: THREE.Scene;
//     camera?: THREE.OrthographicCamera;
//     renderer?: THREE.WebGLRenderer;
//     material?: THREE.ShaderMaterial;
//     mesh?: THREE.Mesh;
//     animationId?: number;
//   }>({});

//   // const [isLoaded, setIsLoaded] = useState(false);

//   // Default params (kept from your code)
//   const params = {
//     effectType: 2,
//     primaryColor: [20, 30, 40],
//     secondaryColor: [40, 50, 70],
//     accentColor: [255, 200, 60],
//     fractalScale: 1.5, // INCREASE this to make orbs smaller (was 0.83)
//     fractalX: 0,
//     fractalY: 0,
//     fractionalIterations: 8,
//     // Other parameters that affect circle appearance:
//     waveAmplitude: 0.5, // DECREASE this to make wave effects smaller (was 0.1)
//     waveFrequency: 25.0, // INCREASE this to make patterns tighter/smaller (was 10.0)

//     kaleidoscopeSegments: 8,
//     fmDensity: 20.0,
//     fmIntensity: 0.5,
//     // Light effects that create circular patterns:
//     lightCount: 2, // INCREASE this to add more circles (was 2)
//     lightIntensity: 0.3, // DECREASE this to reduce circle brightness/size appearance (was 1.0)
//     lightSpeed: 1.0,
//     lightBloomBalance: 0.8,

//     useBloom: false,
//     grainStrength: 0.02,
//     grainSpeed: 2.0,
//     grainMean: 0.0,
//     grainVariance: 0.5,
//     grainBlendMode: 1,
//     grainSize: 3.5,
//     animationSpeed: 0.02,
//     autoRotate: true,
//     perlinLayers: 3,
//     perlinScale: 1.0, // INCREASE this to make noise patterns smaller (was 3.0)
//     perlinWarp: 0.4,
//     perlinHeight: 1.2,
//     perlinRidges: false,
//     // Parameters for enhanced Voronoi
//     voronoiScale: 9.0, // INCREASE this to make voronoi cells smaller (was 5.0)
//     voronoiLayers: 2,
//     voronoiWarp: 0.3,
//     voronoiDepth: 0.6,
//     voronoiContrast: 1.2,
//     voronoiSpeed: 0.5,
//     voronoiEdges: true,
//   };

//   useEffect(() => {
//     if (!containerRef.current) return;

//     const container = containerRef.current;
//     const scene = new THREE.Scene();
//     const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
//     camera.position.z = 1;

//     const renderer = new THREE.WebGLRenderer({
//       antialias: true,
//       alpha: true,
//       powerPreference: "high-performance",
//     });
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     container.appendChild(renderer.domElement);

//     // Mouse state (normalized 0..1)
//     const mouse = new THREE.Vector2(0.5, 0.5);
//     const smoothedMouse = new THREE.Vector2(0.5, 0.5);

//     // Shader material
//     const shaderMaterial = new THREE.ShaderMaterial({
//       uniforms: {
//         iResolution: { value: new THREE.Vector2(800, 600) },
//         iTime: { value: 0.0 },
//         smoothedMouse: { value: new THREE.Vector2(0.5, 0.5) },
//         mouseDown: { value: 0.0 },
//         primaryColor: {
//           value: new THREE.Color().fromArray(
//             params.primaryColor.map((c) => c / 255)
//           ),
//         },
//         secondaryColor: {
//           value: new THREE.Color().fromArray(
//             params.secondaryColor.map((c) => c / 255)
//           ),
//         },
//         accentColor: {
//           value: new THREE.Color().fromArray(
//             params.accentColor.map((c) => c / 255)
//           ),
//         },
//         fractalScale: { value: params.fractalScale },
//         fractalOffset: {
//           value: new THREE.Vector2(params.fractalX, params.fractalY),
//         },
//         fractionalIterations: { value: params.fractionalIterations },
//         waveAmplitude: { value: params.waveAmplitude },
//         waveFrequency: { value: params.waveFrequency },
//         kaleidoscopeSegments: { value: params.kaleidoscopeSegments },
//         fmDensity: { value: params.fmDensity },
//         fmIntensity: { value: params.fmIntensity },
//         lightCount: { value: params.lightCount },
//         lightIntensity: { value: params.lightIntensity },
//         lightSpeed: { value: params.lightSpeed },
//         lightBloomBalance: { value: params.lightBloomBalance },
//         useBloom: { value: params.useBloom ? 1.0 : 0.0 },
//         grainStrength: { value: params.grainStrength },
//         grainSize: { value: params.grainSize },
//         grainSpeed: { value: params.grainSpeed },
//         grainMean: { value: params.grainMean },
//         grainVariance: { value: params.grainVariance },
//         grainBlendMode: { value: params.grainBlendMode },
//         animationSpeed: { value: params.animationSpeed },
//         autoRotate: { value: params.autoRotate ? 1.0 : 0.0 },
//         effectType: { value: params.effectType },
//         perlinLayers: { value: params.perlinLayers },
//         perlinScale: { value: params.perlinScale },
//         perlinWarp: { value: params.perlinWarp },
//         perlinHeight: { value: params.perlinHeight },
//         perlinRidges: { value: params.perlinRidges ? 1.0 : 0.0 },
//         voronoiScale: { value: params.voronoiScale },
//         voronoiLayers: { value: params.voronoiLayers },
//         voronoiWarp: { value: params.voronoiWarp },
//         voronoiDepth: { value: params.voronoiDepth },
//         voronoiContrast: { value: params.voronoiContrast },
//         voronoiSpeed: { value: params.voronoiSpeed },
//         voronoiEdges: { value: params.voronoiEdges ? 1.0 : 0.0 },
//       },
//       vertexShader: `
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           gl_Position = vec4(position, 1.0);
//         }
//       `,
//       fragmentShader: `
//         varying vec2 vUv;
//         uniform vec2 iResolution;
//         uniform float iTime;
//         uniform vec3 primaryColor;
//         uniform vec3 secondaryColor;
//         uniform vec3 accentColor;
//         uniform vec2 smoothedMouse;
//         uniform float mouseDown;
//         uniform float fractalScale;
//         uniform vec2 fractalOffset;
//         uniform int kaleidoscopeSegments;
//         uniform float fmDensity;
//         uniform float fmIntensity;
//         uniform int lightCount;
//         uniform float lightIntensity;
//         uniform float lightSpeed;
//         uniform float lightBloomBalance;
//         uniform float useBloom;
//         uniform float grainStrength;
//         uniform float grainSize;
//         uniform float grainSpeed;
//         uniform float grainMean;
//         uniform float grainVariance;
//         uniform int grainBlendMode;
//         uniform float animationSpeed;
//         uniform float autoRotate;
//         uniform int effectType;
//         uniform int fractionalIterations;
//         uniform float waveAmplitude;
//         uniform float waveFrequency;
//         uniform int perlinLayers;
//         uniform float perlinScale;
//         uniform float perlinWarp;
//         uniform float perlinHeight;
//         uniform float perlinRidges;
//         uniform float voronoiScale;
//         uniform int voronoiLayers;
//         uniform float voronoiWarp;
//         uniform float voronoiDepth;
//         uniform float voronoiContrast;
//         uniform float voronoiSpeed;
//         uniform float voronoiEdges;

//         #define PI 3.14159265359

//         float hash(float n) {
//             return fract(sin(n) * 43758.5453);
//         }

//         float hash(vec2 p) {
//             p = fract(p * vec2(123.34, 456.21));
//             p += dot(p, p + 45.32);
//             return fract(p.x * p.y);
//         }

//         vec2 hash2(vec2 p) {
//             p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
//             return fract(sin(p) * 43758.5453);
//         }

//         mat2 rot(float a) {
//             float s = sin(a);
//             float c = cos(a);
//             return mat2(c, -s, s, c);
//         }

//         float noise(vec2 p) {
//             vec2 i = floor(p);
//             vec2 f = fract(p);
//             vec2 u = f * f * (3.0 - 2.0 * f);
//             float a = hash(i);
//             float b = hash(i + vec2(1.0, 0.0));
//             float c = hash(i + vec2(0.0, 1.0));
//             float d = hash(i + vec2(1.0, 1.0));
//             return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
//         }

//         float fbm(vec2 p, int octaves, float persistence) {
//             float perlinSum = 0.0;
//             float amp = 1.0;
//             float freq = 1.0;
//             float totalAmp = 0.0;
//             for(int i = 0; i < 10; i++) {
//                 if (i >= octaves) break;
//                 perlinSum += amp * noise(p * freq);
//                 totalAmp += amp;
//                 amp *= persistence;
//                 freq *= 2.0;
//             }
//             return perlinSum / totalAmp;
//         }

//         vec2 warp(vec2 p, float strength) {
//             vec2 q = vec2(
//                 fbm(p + vec2(0.0, 1.0), 4, 0.5),
//                 fbm(p + vec2(5.2, 1.3), 4, 0.5)
//             );
//             return p + strength * q;
//         }

//         vec3 getLightPosition(int index, float time) {
//             float angle = float(index) * (2.0 * PI / float(lightCount)) + time * lightSpeed;
//             float radius = 1.5;
//             float height = sin(time * lightSpeed * 0.5 + float(index)) * 0.5;
//             return vec3(radius * cos(angle), height, radius * sin(angle));
//         }

//         float gaussian(float z, float u, float o) {
//             return (1.0 / (o * sqrt(2.0 * 3.1415))) * exp(-(((z - u) * (z - u)) / (2.0 * (o * o))));
//         }

//         vec3 screen(vec3 a, vec3 b, float w) {
//             return mix(a, vec3(1.0) - (vec3(1.0) - a) * (vec3(1.0) - b), w);
//         }

//         vec3 applyGrain(vec3 color, float noiseValue, float intensity) {
//             vec3 grain = vec3(noiseValue) * (1.0 - color);
//             if (grainBlendMode == 0) {
//                 return color + grain * intensity;
//             } else if (grainBlendMode == 1) {
//                 return screen(color, grain, intensity);
//             }
//             return color;
//         }

//         void main() {
//             // Use interpolated UV (0..1)
//             vec2 uv = vUv;

//             // Aspect correction
//             float aspect = iResolution.x / iResolution.y;

//             // Centered coordinates: (0,0) is center of the plane. x scaled by aspect.
//             vec2 centered = (uv - 0.5) * vec2(aspect, 1.0);

//             float shape = 0.0;
//             vec2 effectUV = uv;

//             if (effectType == 2) {
//                 // Ripple effect using centered coords
//                 vec2 p = centered;
//                 float dist = length(p);

//                 //🚧 INCREASE the multiplier (15.0) to make ripples tighter/smaller
//                 float ripples = sin(dist * 30.0 - iTime * 2.0 * animationSpeed) * 0.5 + 0.5;
//                 // 🚧 DECREASE the first value (1.0) to make the effect area smaller
//                 ripples *= smoothstep(0.6, 0.2, dist);

//                 shape = ripples;
//             } else if (effectType == 1) {
//                 vec2 p = effectUV * perlinScale;
//                 if (autoRotate > 0.5) {
//                     float timeScale = iTime * animationSpeed;
//                     p += vec2(
//                         sin(timeScale * 0.5) * 0.3 + timeScale * 0.1,
//                         cos(timeScale * 0.7) * 0.2 + timeScale * 0.05
//                     );
//                 }
//                 float terrain = fbm(p, perlinLayers, 0.5);
//                 shape = terrain * perlinHeight;
//             } else if (effectType == 0) {
//                 vec2 p = centered;
//                 p *= fractalScale;
//                 p += fractalOffset;
//                 float d = length(p);
//                 float pulse = 0.5 + 0.1 * sin(iTime * animationSpeed * 2.0);
//                 float orbshape = smoothstep(pulse, pulse - 0.1, d);
//                 float innerGlow = smoothstep(pulse * 0.8, 0.0, d) * 0.5;
//                 float angle = atan(p.y, p.x);
//                 float swirl = 0.15 * sin(angle * 8.0 + iTime * 3.0 * animationSpeed) * smoothstep(pulse, 0.0, d);
//                 shape = orbshape + innerGlow + swirl;
//             }

//             // Light calculation using centered coords
//             vec3 pos = vec3(centered.x, centered.y, 0.0);
//             float totalLight = 0.0;
//             for (int i = 0; i < 10; i++) {
//                 if (i >= lightCount) break;
//                 vec3 lightPos = getLightPosition(i, iTime);
//                 float dist = length(pos - lightPos);
//                 totalLight += lightIntensity / (1.0 + dist * dist * 2.0);
//             }

//             // Mouse light: smoothedMouse is normalized (0..1). Convert to centered & aspect-corrected
//             vec2 mousePos = (smoothedMouse * 2.0 - 1.0);
//             mousePos.x *= aspect;

//             float mouseDist = length(centered - mousePos);
//             // 🚧 Change the division factor from 4.0 to 8.0 or higher

//             totalLight += lightIntensity * 2.0 / (1.0 + mouseDist * mouseDist * 4.0);

//             totalLight += 0.2;
//             if (useBloom > 0.5) totalLight *= lightBloomBalance;

//             // Color mixing
//             vec3 finalColor = mix(primaryColor, secondaryColor, shape);
//             float highlight = pow(shape, 3.0);
//             finalColor = mix(finalColor, accentColor, highlight * 0.5);
//             finalColor *= totalLight * (shape + 0.2);

//             // ---- Film grain (fixed & animated) ----
//             // stronger time influence so the noise actually flickers
//             float t = iTime * grainSpeed * max(0.5, animationSpeed * 10.0);

//             // build a per-pixel seed from uv scaled to pixel coords for more variation
//             vec2 pix = vUv * iResolution.xy;
//             float seed = dot(pix, vec2(12.9898, 78.233));

//             // put time inside the sin for temporal variation per-pixel
//             float noiseGrain = fract(sin(seed + t) * 43758.5453);

//             // slight smoothing (optional)
//             // noiseGrain = smoothstep(0.0, 1.0, noiseGrain);

//             // apply grain
//             finalColor = applyGrain(finalColor, noiseGrain, grainStrength);

//             gl_FragColor = vec4(finalColor, 1.0);
//         }
//       `,
//     });

//     // Fullscreen plane
//     const geometry = new THREE.PlaneGeometry(2, 2);
//     const plane = new THREE.Mesh(geometry, shaderMaterial);
//     scene.add(plane);

//     // store refs
//     sceneRef.current = {
//       scene,
//       camera,
//       renderer,
//       material: shaderMaterial,
//       mesh: plane,
//     };

//     // Update size helper
//     const updateSize = () => {
//       if (!container) return;
//       const w = container.clientWidth || 1;
//       const h = container.clientHeight || 1;
//       renderer.setSize(w, h, false);
//       renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//       shaderMaterial.uniforms.iResolution.value.set(w, h);
//       renderer.domElement.style.width = "100%";
//       renderer.domElement.style.height = "100%";
//     };
//     updateSize();

//     // Mouse handlers (normalized)
//     const handleMouseMove = (event: MouseEvent) => {
//       const rect = container.getBoundingClientRect();
//       const mouseX = (event.clientX - rect.left) / rect.width;
//       const mouseY = 1.0 - (event.clientY - rect.top) / rect.height;
//       mouse.set(mouseX, mouseY);
//     };

//     const handleMouseDown = () => {
//       shaderMaterial.uniforms.mouseDown.value = 1.0;
//     };
//     const handleMouseUp = () => {
//       shaderMaterial.uniforms.mouseDown.value = 0.0;
//     };

//     // Touch handlers (normalized)
//     const handleTouchMove = (event: TouchEvent) => {
//       event.preventDefault();
//       const touch = event.touches[0];
//       const rect = container.getBoundingClientRect();
//       const mouseX = (touch.clientX - rect.left) / rect.width;
//       const mouseY = 1.0 - (touch.clientY - rect.top) / rect.height;
//       mouse.set(mouseX, mouseY);
//     };

//     const handleTouchStart = (event: TouchEvent) => {
//       shaderMaterial.uniforms.mouseDown.value = 1.0;
//       const touch = event.touches[0];
//       const rect = container.getBoundingClientRect();
//       const mouseX = (touch.clientX - rect.left) / rect.width;
//       const mouseY = 1.0 - (touch.clientY - rect.top) / rect.height;
//       mouse.set(mouseX, mouseY);
//     };

//     const handleTouchEnd = () => {
//       shaderMaterial.uniforms.mouseDown.value = 0.0;
//     };

//     container.addEventListener("mousemove", handleMouseMove);
//     container.addEventListener("mousedown", handleMouseDown);
//     container.addEventListener("mouseup", handleMouseUp);
//     container.addEventListener("touchmove", handleTouchMove, {
//       passive: false,
//     });
//     container.addEventListener("touchstart", handleTouchStart);
//     container.addEventListener("touchend", handleTouchEnd);

//     // Animation loop
//     const animate = () => {
//       const time = performance.now() * 0.001;
//       shaderMaterial.uniforms.iTime.value = time;

//       // Smooth mouse lerp
//       smoothedMouse.lerp(mouse, 0.1);
//       // send normalized coords to shader
//       shaderMaterial.uniforms.smoothedMouse.value.set(
//         smoothedMouse.x,
//         smoothedMouse.y
//       );

//       renderer.render(scene, camera);
//       sceneRef.current!.animationId = requestAnimationFrame(animate);
//     };
//     animate();
//     // setIsLoaded(true);

//     // Window resize
//     const onResize = () => {
//       updateSize();
//     };
//     window.addEventListener("resize", onResize);

//     // cleanup
//     return () => {
//       if (sceneRef.current?.animationId) {
//         cancelAnimationFrame(sceneRef.current.animationId);
//       }
//       container.removeEventListener("mousemove", handleMouseMove);
//       container.removeEventListener("mousedown", handleMouseDown);
//       container.removeEventListener("mouseup", handleMouseUp);
//       container.removeEventListener("touchmove", handleTouchMove);
//       container.removeEventListener("touchstart", handleTouchStart);
//       container.removeEventListener("touchend", handleTouchEnd);
//       window.removeEventListener("resize", onResize);

//       try {
//         if (sceneRef.current?.mesh) {
//           sceneRef.current.mesh.geometry.dispose();
//         }
//         shaderMaterial.dispose();
//         renderer.dispose();
//         if (renderer.domElement && renderer.domElement.parentNode) {
//           renderer.domElement.parentNode.removeChild(renderer.domElement);
//         }
//       } catch (e) {
//         // ignore disposal errors
//         console.warn("Error during cleanup:", e);
//       }
//     };
//   }, []);

//   // Keep iResolution synced on container resize (safety)
//   useEffect(() => {
//     const handleResize = () => {
//       if (
//         !containerRef.current ||
//         !sceneRef.current?.renderer ||
//         !sceneRef.current?.material
//       )
//         return;
//       const w = containerRef.current.clientWidth || 1;
//       const h = containerRef.current.clientHeight || 1;
//       sceneRef.current.renderer.setSize(w, h, false);
//       sceneRef.current.material.uniforms.iResolution.value.set(w, h);
//       sceneRef.current.renderer.setPixelRatio(
//         Math.min(window.devicePixelRatio, 2)
//       );
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="shader-hero">
//       <div
//         ref={containerRef}
//         className="shader-container"
//         // style={{
//         //   position: "absolute",
//         //   top: 0,
//         //   left: 0,
//         //   width: "100%",
//         //   height: "100%",
//         //   zIndex: 1,
//         //   opacity: isLoaded ? 1 : 0,
//         //   transition: "opacity 1s ease-in-out",
//         // }}
//       />
//       <div className="content">
//         <InfiniteScrollText />

//         <div className="quote-container">
//           <div className="quote">Hello!</div>
//           <div className="author">I&apos;m Noura Altharwa</div>
//         </div>
//       </div>
//       <div className="custom-cursor" />
//     </div>
//   );
// };

// export default Hero2;
