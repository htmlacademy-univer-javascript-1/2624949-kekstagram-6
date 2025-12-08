// main.js

import { generatePhotos } from './data.js';
import { renderThumbnails } from './render-pictures.js';
import { initUploadForm } from './upload-form.js';

// Сначала — миниатюры
const pictures = generatePhotos();
renderThumbnails(pictures);

// Потом — форма
initUploadForm();
