import axios from 'axios';

// frontend/src/config.js
const API_BASE_URL = 'https://fleshy-sharpness-amenity.ngrok-free.dev';

// This header bypasses the Ngrok "Browser Warning" page for all AXIOS requests
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';

export default API_BASE_URL;
