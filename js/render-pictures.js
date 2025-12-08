// render-pictures.js

import { openFullPicture } from './render-full-picture.js';

export const renderThumbnails = (photos) => {
  const container = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content;

  // Удаляем старые миниатюры
  const oldPictures = container.querySelectorAll('.picture');
  oldPictures.forEach((el) => el.remove());

  // Добавляем новые
  photos.forEach((photo) => {
    const clone = template.cloneNode(true);
    const link = clone.querySelector('.picture');
    const img = clone.querySelector('.picture__img');
    const comments = clone.querySelector('.picture__comments');
    const likes = clone.querySelector('.picture__likes');

    img.src = photo.url;
    img.alt = photo.description || 'Фотография';
    comments.textContent = `${photo.comments.length} коммент.`;
    likes.textContent = `${photo.likes} лайк.`;

    link.addEventListener('click', (evt) => {
      evt.preventDefault();
      openFullPicture(photo);
    });

    container.append(clone); // ← правильно, без мусора
  });
};
