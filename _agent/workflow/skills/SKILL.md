---
name: HTML 3D Canvas
description: Best practices and standard workflow for implementing, sizing, and optimizing an HTML 3D Canvas (WebGL/Three.js) in web projects.
---

# HTML 3D Canvas Skill

This skill provides guidelines and best practices for creating and managing an HTML `<canvas>` element for 3D rendering (using WebGL directly or libraries like Three.js/Babylon.js) within modern web applications.

## 1. DOM Structure & Accessibility
Always wrap your canvas in a container for easier layout management, and include appropriate ARIA attributes and fallback content for accessibility.

```html
<div class="canvas-3d-wrapper">
  <canvas 
    id="webgl-canvas" 
    aria-label="Interactive 3D visualization" 
    role="img">
    <!-- Fallback for browsers that do not support canvas or WebGL -->
    <p>Your browser does not support 3D canvas rendering. Please upgrade your browser.</p>
  </canvas>
</div>
```

## 2. CSS Layout Guidelines
Ensure the canvas fills its container properly. Avoid hardcoding pixel widths/heights in HTML attributes unless strictly necessary.

```css
.canvas-3d-wrapper {
  width: 100%;
  height: 100%; /* Or 100vh depending on use case */
  position: relative;
  overflow: hidden;
  background-color: #000; /* Fallback background color */
}

#webgl-canvas {
  display: block; /* Removes inline layout phantom margin at the bottom */
  width: 100%;
  height: 100%;
  outline: none;
}
```

## 3. Initialization & Responsive Resizing (JavaScript)
A robust 3D canvas must handle varying screen sizes and device pixel ratios (High-DPI/Retina displays) to avoid blurry or stretched graphics.

**Core Principles:**
1. Dynamically sync the canvas internal resolution with its CSS display size.
2. Limit the pixel ratio to `2` to balance crispness and GPU performance.
3. Update projection matrices on resize.

```javascript
function setupResizeHandler(renderer, camera, container) {
  const onResize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Update Camera aspect ratio
    if (camera.type === 'PerspectiveCamera') {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    // 2. Update Renderer size and Pixel Ratio
    renderer.setSize(width, height);
    // Limit to max 2 to prevent massive performance drops on ultra-high DPI screens
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
  };

  window.addEventListener('resize', onResize);
  
  // Trigger once initially
  onResize();
  
  // Return cleanup function
  return () => window.removeEventListener('resize', onResize);
}
```

## 4. Performance & Memory Management
3D canvases are highly resource-intensive. Follow these rules to ensure the web application remains performant:

- **Visibility Checking:** Use `IntersectionObserver` to pause the `requestAnimationFrame` render loop when the canvas is scrolled out of view.
- **Resource Disposal:** When destroying the canvas (e.g., in Single Page Applications when routing), you *must* manually dispose of geometries, materials, textures, and the renderer instance. WebGL data does not garbage collect automatically like standard JS objects.
- **Render on Demand:** If the scene is static and doesn't have continuous animations, only render when the camera moves or an interaction occurs, instead of continuously ticking a 60fps loop.

## 5. WebGL Support Checking
Always verify WebGL support before mounting the context.

```javascript
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}
```

## Workflow application
When tasked to "Add a 3D canvas" or "Implement WebGL/Three.js elements":
1. First, check if WebGL is available in the target environment scripts.
2. Inject the semantic HTML and CSS wrapper.
3. Initialize the renderer with `resize` listener and `setPixelRatio` limit.
4. Setup the render loop thoughtfully, considering visibility bounds and memory cleanup.
