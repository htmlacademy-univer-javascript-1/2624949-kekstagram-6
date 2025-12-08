import { generatePhotos } from './data.js';
import { renderThumbnails } from './render-pictures.js';
import { initUploadForm } from './upload-form.js';

const pictures = generatePhotos();
renderThumbnails(pictures);

initUploadForm();
