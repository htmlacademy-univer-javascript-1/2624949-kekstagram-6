import { renderThumbnails } from './render-pictures.js';
import { initUploadForm } from './upload-form.js';
import { getData } from './api.js';
import { initFilters } from './filter.js';
import { showDataLoadError } from './util.js';

getData()
  .then((pictures) => {
    renderThumbnails(pictures);
    initFilters(pictures);
  })
  .catch(() => {
    showDataLoadError('Не удалось загрузить фотографии. Попробуйте обновить страницу.');
  });

initUploadForm();
