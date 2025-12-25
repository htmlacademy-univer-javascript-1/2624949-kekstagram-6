import { renderThumbnails } from './render-pictures.js';
import { initUploadForm } from './upload-form.js';
import { getData } from './api.js';
import { initFilters } from './filter.js';

getData()
  .then((pictures) => {
    renderThumbnails(pictures);
    initFilters(pictures);
  })
  .catch(() => {
    const errorMessage = document.createElement('div');
    errorMessage.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background: #ff6b6b; color: white; border-radius: 5px; font-size: 16px; z-index: 1000;';
    errorMessage.textContent = 'Не удалось загрузить фотографии. Попробуйте обновить страницу.';
    document.body.append(errorMessage);
  });

initUploadForm();
