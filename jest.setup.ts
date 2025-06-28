import '@testing-library/jest-dom';

import { TextEncoder, TextDecoder } from 'text-encoding';

// Полифиллы для Node.js
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Полифиллы для jsdom
if (typeof window.TextEncoder === 'undefined') {
  window.TextEncoder = TextEncoder;
  window.TextDecoder = TextDecoder;
}