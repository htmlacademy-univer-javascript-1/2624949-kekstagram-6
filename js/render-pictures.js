import { openFullPicture } from './render-full-picture.js';

export const renderThumbnails = (photos) => {
  const container = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content;

  // Удаляем ТОЛЬКО старые миниатюры (не трогая .img-upload!)
  const oldThumbnails = container.querySelectorAll('.picture');
  oldThumbnails.forEach((el) => el.remove());

  photos.forEach((photo) => {
    const thumbnail = template.cloneNode(true);
    const img = thumbnail.querySelector('.picture__img');
    const comments = thumbnail.querySelector('.picture__comments');
    const likes = thumbnail.querySelector('.picture__likes');

    img.src = photo.url;
    img.alt = photo.description;
    comments.textContent = `${photo.comments.length} коммент.`;
    likes.textContent = `${photo.likes} лайк.`;
    const pictureLink = thumbnail.querySelector('.picture');
    pictureLink.dataset.id = photo.id;

    // Добавляем обработчик клика
    pictureLink.addEventListener('click', (evt) => {
      evt.preventDefault();
      openFullPicture(photo);
    });

    container.append(thumbnail);
  });
};
