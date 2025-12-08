// main.js
import { generatePhotos } from './data.js';
import { renderThumbnails } from './render-pictures.js';

const pictures = generatePhotos();
renderThumbnails(pictures);
