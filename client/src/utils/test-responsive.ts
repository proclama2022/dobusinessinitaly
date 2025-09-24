/**
 * Test script for responsive system
 * Run this in the browser console to test responsive behavior
 */

export function testResponsiveSystem() {
  console.log('=== YourBusinessInItaly Responsive System Test ===\n');

  // Test viewport dimensions
  console.log('1. Viewport Dimensions:');
  console.log(`   Width: ${window.innerWidth}px`);
  console.log(`   Height: ${window.innerHeight}px`);
  console.log(`   Device Pixel Ratio: ${window.devicePixelRatio}\n`);

  // Test breakpoints
  const breakpoints = {
    xs: 475,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1320,
  };

  console.log('2. Breakpoint Status:');
  Object.entries(breakpoints).forEach(([name, width]) => {
    const isActive = window.innerWidth >= width;
    console.log(`   ${name.toUpperCase()} (${width}px): ${isActive ? '✅ Active' : '❌ Inactive'}`);
  });
  console.log('');

  // Test device type
  function getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  console.log('3. Device Type Detection:');
  console.log(`   Current Device: ${getDeviceType().toUpperCase()}`);
  console.log(`   Is Mobile: ${window.innerWidth < 768}`);
  console.log(`   Is Tablet: ${window.innerWidth >= 768 && window.innerWidth < 1024}`);
  console.log(`   Is Desktop: ${window.innerWidth >= 1024}`);
  console.log('');

  // Test orientation
  console.log('4. Orientation:');
  console.log(`   Is Landscape: ${window.innerWidth > window.innerHeight}`);
  console.log(`   Is Portrait: ${window.innerWidth <= window.innerHeight}`);
  console.log('');

  // Test touch capability
  console.log('5. Touch Capability:');
  console.log(`   Max Touch Points: ${navigator.maxTouchPoints}`);
  console.log(`   Is Touch Device: ${'ontouchstart' in window || navigator.maxTouchPoints > 0}`);
  console.log('');

  // Test CSS custom properties (if available)
  console.log('6. CSS Custom Properties:');
  const rootStyles = getComputedStyle(document.documentElement);
  const safeAreaTop = rootStyles.getPropertyValue('--sat');
  const safeAreaRight = rootStyles.getPropertyValue('--sar');
  const safeAreaBottom = rootStyles.getPropertyValue('--sab');
  const safeAreaLeft = rootStyles.getPropertyValue('--sal');

  console.log(`   Safe Area Top: ${safeAreaTop || 'Not set'}`);
  console.log(`   Safe Area Right: ${safeAreaRight || 'Not set'}`);
  console.log(`   Safe Area Bottom: ${safeAreaBottom || 'Not set'}`);
  console.log(`   Safe Area Left: ${safeAreaLeft || 'Not set'}`);
  console.log('');

  // Test responsive classes
  console.log('7. Responsive Classes Test:');

  // Create test elements
  const testContainer = document.createElement('div');
  testContainer.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    max-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
  `;

  testContainer.innerHTML = `
    <h3 style="margin: 0 0 16px 0; color: #2d5016;">Responsive Test</h3>
    <div style="display: grid; gap: 8px;">
      <div class="test-mobile bg-blue-100 p-3 rounded">Mobile Content</div>
      <div class="test-tablet bg-green-100 p-3 rounded">Tablet Content</div>
      <div class="test-desktop bg-purple-100 p-3 rounded">Desktop Content</div>
    </div>
    <button onclick="this.parentElement.remove()" style="
      margin-top: 16px;
      padding: 8px 16px;
      background: #ef4444;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    ">Close</button>
  `;

  document.body.appendChild(testContainer);

  // Test visibility based on device type
  const deviceType = getDeviceType();
  const mobileEl = testContainer.querySelector('.test-mobile');
  const tabletEl = testContainer.querySelector('.test-tablet');
  const desktopEl = testContainer.querySelector('.test-desktop');

  // Simulate responsive behavior
  if (deviceType === 'mobile') {
    mobileEl.style.display = 'block';
    tabletEl.style.display = 'none';
    desktopEl.style.display = 'none';
  } else if (deviceType === 'tablet') {
    mobileEl.style.display = 'none';
    tabletEl.style.display = 'block';
    desktopEl.style.display = 'none';
  } else {
    mobileEl.style.display = 'none';
    tabletEl.style.display = 'none';
    desktopEl.style.display = 'block';
  }

  console.log('   Test panel created - check the center of your screen');
  console.log('');

  // Test performance metrics
  console.log('8. Performance Metrics:');
  if ('performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      console.log(`   DOM Content Loaded: ${navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart}ms`);
      console.log(`   Page Load Time: ${navigation.loadEventEnd - navigation.loadEventStart}ms`);
    }
  }
  console.log('');

  // Test network information (if available)
  console.log('9. Network Information:');
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection) {
      console.log(`   Effective Type: ${connection.effectiveType || 'Unknown'}`);
      console.log(`   Downlink: ${connection.downlink || 'Unknown'} Mbps`);
      console.log(`   RTT: ${connection.rtt || 'Unknown'} ms`);
      console.log(`   Save Data: ${connection.saveData || 'Unknown'}`);
    } else {
      console.log('   Network Information API not available');
    }
  } else {
    console.log('   Network Information API not supported');
  }
  console.log('');

  // Test memory information (if available)
  console.log('10. Memory Information:');
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    if (memory) {
      console.log(`   Total JS Heap: ${Math.round(memory.totalJSHeapSize / 1024 / 1024)} MB`);
      console.log(`   Used JS Heap: ${Math.round(memory.usedJSHeapSize / 1024 / 1024)} MB`);
      console.log(`   JS Heap Limit: ${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)} MB`);
    }
  } else {
    console.log('   Memory Information API not available');
  }
  console.log('');

  // Test responsive images
  console.log('11. Responsive Images Test:');
  const images = document.querySelectorAll('img[srcset], img[data-srcset]');
  console.log(`   Found ${images.length} responsive images`);
  images.forEach((img, index) => {
    const srcset = img.getAttribute('srcset') || img.getAttribute('data-srcset');
    console.log(`   Image ${index + 1}: ${srcset ? 'Has srcset' : 'No srcset'}`);
  });
  console.log('');

  // Test CSS Grid and Flexbox support
  console.log('12. CSS Feature Support:');
  const gridSupport = CSS.supports('display', 'grid');
  const flexboxSupport = CSS.supports('display', 'flex');
  const aspectRatioSupport = CSS.supports('aspect-ratio', '16/9');

  console.log(`   CSS Grid: ${gridSupport ? '✅ Supported' : '❌ Not supported'}`);
  console.log(`   Flexbox: ${flexboxSupport ? '✅ Supported' : '❌ Not supported'}`);
  console.log(`   Aspect Ratio: ${aspectRatioSupport ? '✅ Supported' : '❌ Not supported'}`);
  console.log('');

  // Test viewport units
  console.log('13. Viewport Units Test:');
  const vhTest = document.createElement('div');
  vhTest.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.1);
    pointer-events: none;
    z-index: 9998;
  `;
  document.body.appendChild(vhTest);

  setTimeout(() => {
    const rect = vhTest.getBoundingClientRect();
    console.log(`   100vw = ${rect.width}px (expected: ${window.innerWidth}px)`);
    console.log(`   100vh = ${rect.height}px (expected: ${window.innerHeight}px)`);
    vhTest.remove();
  }, 100);

  console.log('');

  // Test font loading
  console.log('14. Font Loading:');
  if ('fonts' in document) {
    document.fonts.ready.then(() => {
      console.log('   Fonts loaded successfully');
      console.log(`   Loaded fonts: ${document.fonts.size}`);
    }).catch(() => {
      console.log('   Font loading failed or not supported');
    });
  } else {
    console.log('   Font Loading API not supported');
  }
  console.log('');

  // Test accessibility
  console.log('15. Accessibility Features:');
  console.log(`   Reduced Motion: ${window.matchMedia('(prefers-reduced-motion: reduce)').matches}`);
  console.log(`   High Contrast: ${window.matchMedia('(prefers-contrast: high)').matches}`);
  console.log(`   Dark Mode: ${window.matchMedia('(prefers-color-scheme: dark)').matches}`);
  console.log(`   Light Mode: ${window.matchMedia('(prefers-color-scheme: light)').matches}`);
  console.log('');

  // Generate recommendations
  console.log('16. Recommendations:');

  if (window.innerWidth < 768) {
    console.log('   📱 Mobile Device Detected:');
    console.log('      - Ensure touch targets are at least 44x44px');
    console.log('      - Check viewport meta tag is set correctly');
    console.log('      - Test tap targets and spacing');
  } else if (window.innerWidth < 1024) {
    console.log('   📋 Tablet Device Detected:');
    console.log('      - Test multi-column layouts');
    console.log('      - Check touch and mouse interactions');
    console.log('      - Verify responsive images');
  } else {
    console.log('   💻 Desktop Device Detected:');
    console.log('      - Test hover states and transitions');
    console.log('      - Check keyboard navigation');
    console.log('      - Verify focus indicators');
  }

  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection && connection.effectiveType === '2g') {
      console.log('   🐌 Slow Connection Detected:');
      console.log('      - Consider lazy loading images');
      console.log('      - Optimize image sizes');
      console.log('      - Minimize JavaScript bundles');
    }
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('   ♿ Reduced Motion Preference:');
    console.log('      - Minimize animations');
    console.log('      - Provide alternatives to animated content');
  }

  console.log('\n=== Test Complete ===');
  console.log('Call this function again when resizing the window to see changes!');
}

// Auto-run on load if in development
if (process.env.NODE_ENV === 'development') {
  // Add to window for easy access
  (window as any).testResponsiveSystem = testResponsiveSystem;

  // Run after a short delay to ensure everything is loaded
  setTimeout(() => {
    console.log('Responsive test system loaded. Call testResponsiveSystem() to run tests.');
  }, 1000);
}

export default testResponsiveSystem;