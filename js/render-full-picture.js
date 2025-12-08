const fullPicture = document.querySelector('.big-picture');
const closeButton = fullPicture.querySelector('#picture-cancel');
const socialComments = fullPicture.querySelector('.social__comments');
const likeCountElement = fullPicture.querySelector('.likes-count');
const captionElement = fullPicture.querySelector('.social__caption');
const commentCountBlock = fullPicture.querySelector('.social__comment-count');
const commentsLoader = fullPicture.querySelector('.comments-loader');
const body = document.body;

let currentComments = [];
let shownCount = 0;
const STEP = 5;

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

  const totalCount = currentComments.length;
  commentCountBlock.innerHTML = `${shownCount} из <span class="comments-count">${totalCount}</span> комментариев`;
  commentCountBlock.classList.remove('hidden');

  if (shownCount >= totalCount) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};


const onCommentsLoaderClick = () => {
  shownCount += STEP;
  renderComments();
};

commentsLoader.addEventListener('click', onCommentsLoaderClick);

/**
 * Открывает полноэкранный просмотр фото
 * @param {Object} photo
 */
export const openFullPicture = (photo) => {
  fullPicture.querySelector('.big-picture__img img').src = photo.url;
  fullPicture.querySelector('.big-picture__img img').alt = photo.description;
  likeCountElement.textContent = photo.likes;
  captionElement.textContent = photo.description;

  currentComments = [...photo.comments];
  shownCount = Math.min(STEP, currentComments.length);

  renderComments();

  fullPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  fullPicture.focus();
};

const closeFullPicture = () => {
  fullPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

closeButton.addEventListener('click', closeFullPicture);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !fullPicture.classList.contains('hidden')) {
    evt.preventDefault();
    closeFullPicture();
  }
});
