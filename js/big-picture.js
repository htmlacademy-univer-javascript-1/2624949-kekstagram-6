const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const socialCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');

// Скрываем блоки, с которыми работаем позже
commentCountBlock.classList.remove('hidden');
commentsLoader.classList.remove('hidden');

let currentComments = [];
let shownCount = 0;
const STEP = 5;

const onCommentsLoaderClick = () => {
  renderCommentsPortion();
};

// Функция отрисовки следующей порции комментариев
function renderCommentsPortion() {
  const fragment = document.createDocumentFragment();
  const start = shownCount;
  const end = Math.min(shownCount + STEP, currentComments.length);

  for (let i = start; i < end; i++) {
    const { avatar, name, message } = currentComments[i];
    const li = document.createElement('li');
    li.className = 'social__comment';
    li.innerHTML = `
      <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
      <p class="social__text">${message}</p>
    `;
    fragment.appendChild(li);
  }

  socialComments.appendChild(fragment);
  shownCount = end;

  // Обновляем счётчик: "5 из 125 комментариев"
  // Первый текстовый узел — это "5 из ", он изменяется через firstChild
  commentCountBlock.firstChild.textContent = `${shownCount} из `;

  // Скрываем кнопку, если всё показано
  if (shownCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }
}

let escHandler = null;

const openBigPicture = (photo) => {
  currentComments = photo.comments;
  shownCount = 0;

  // 1. Изображение
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;

  // 2. Подпись
  socialCaption.textContent = photo.description;

  // 3. Лайки
  likesCount.textContent = photo.likes;

  // 4. Число комментариев
  commentsCount.textContent = photo.comments.length;

  // 5. Очищаем и рендерим комментарии
  socialComments.innerHTML = '';
  commentCountBlock.firstChild.textContent = '0 из ';
  // Показываем кнопку (на случай, если она была скрыта ранее)
  commentsLoader.classList.remove('hidden');

  // Убираем старый обработчик и вешаем новый
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  // Рендерим первую порцию
  renderCommentsPortion();

  // 6. Показываем окно
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // 7. Обработчик закрытия по Esc
  escHandler = (evt) => {
    if (evt.key === 'Escape') {
      // eslint-disable-next-line no-use-before-define
      closeBigPicture();
    }
  };
  document.addEventListener('keydown', escHandler);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Убираем обработчик, чтобы не было утечек
  if (escHandler) {
    document.removeEventListener('keydown', escHandler);
    escHandler = null;
  }
};

// Закрытие по клику на крестик
cancelButton.addEventListener('click', closeBigPicture);

export { openBigPicture };
