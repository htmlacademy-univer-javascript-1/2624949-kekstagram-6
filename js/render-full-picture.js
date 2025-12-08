// render-full-picture.js

const fullPicture = document.querySelector('.big-picture');
const closeButton = fullPicture.querySelector('#picture-cancel');
const socialComments = fullPicture.querySelector('.social__comments');
const likeCountElement = fullPicture.querySelector('.likes-count');
const captionElement = fullPicture.querySelector('.social__caption');
const commentCountBlock = fullPicture.querySelector('.social__comment-count');
const commentsLoader = fullPicture.querySelector('.comments-loader');
const body = document.body;

// Храним текущие комментарии и количество показанных
let currentComments = [];
let shownCount = 0;
const STEP = 5;

/**
 * Рендерит только отображаемые комментарии (первые `shownCount`)
 */
const renderComments = () => {
  socialComments.innerHTML = '';

  const fragment = document.createDocumentFragment();
  const toRender = currentComments.slice(0, shownCount);

  toRender.forEach((comment) => {
    const li = document.createElement('li');
    li.className = 'social__comment';
    li.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    fragment.append(li);
  });

  socialComments.append(fragment);

  // Обновляем счётчик: "5 из 23 комментариев"
  const totalCount = currentComments.length;
  commentCountBlock.innerHTML = `${shownCount} из <span class="comments-count">${totalCount}</span> комментариев`;
  commentCountBlock.classList.remove('hidden');

  // Управляем кнопкой "Загрузить ещё"
  if (shownCount >= totalCount) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

/**
 * Обработчик кнопки "Загрузить ещё"
 */
const onCommentsLoaderClick = () => {
  shownCount += STEP;
  renderComments();
};

// Назначаем обработчик один раз (а не каждый раз при открытии)
commentsLoader.addEventListener('click', onCommentsLoaderClick);

/**
 * Открывает полноэкранный просмотр фото
 * @param {Object} photo — объект с данными о фотографии
 */
export const openFullPicture = (photo) => {
  // Основные данные
  fullPicture.querySelector('.big-picture__img img').src = photo.url;
  fullPicture.querySelector('.big-picture__img img').alt = photo.description;
  likeCountElement.textContent = photo.likes;
  captionElement.textContent = photo.description;

  // Подготавливаем комментарии
  currentComments = [...photo.comments]; // копируем, чтобы не менять оригинал
  shownCount = Math.min(STEP, currentComments.length);

  // Рендерим первые комментарии
  renderComments();

  // Показываем окно
  fullPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  fullPicture.focus();
};

/**
 * Закрывает окно
 */
const closeFullPicture = () => {
  fullPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

// Закрытие по кнопке
closeButton.addEventListener('click', closeFullPicture);

// Закрытие по Esc
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !fullPicture.classList.contains('hidden')) {
    evt.preventDefault();
    closeFullPicture();
  }
});
