// js/upload-form.js

const uploadInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadForm = uploadOverlay.querySelector('.img-upload__form');
const uploadCancel = uploadOverlay.querySelector('#upload-cancel');
const hashtagsField = uploadOverlay.querySelector('.text__hashtags');
const commentsField = uploadOverlay.querySelector('.text__description');
const body = document.body;

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;

// === Валидаторы ===
const validateComment = (value) => {
  const text = value.trim();
  return text.length === 0 || text.length <= MAX_COMMENT_LENGTH;
};
const commentErrorMessage = () => `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`;

const validateHashtags = (value) => {
  const input = value.trim();
  if (input === '') {return true;}

  const tags = input.split(/\s+/).filter((t) => t);
  if (tags.length > MAX_HASHTAG_COUNT) {return false;}

  const validTagRegex = /^#[A-Za-zА-Яа-яЁё0-9]+$/;
  for (const tag of tags) {
    if (tag.length < 2 || tag.length > MAX_HASHTAG_LENGTH || !validTagRegex.test(tag)) {
      return false;
    }
  }

  const lowerTags = tags.map((t) => t.toLowerCase());
  return new Set(lowerTags).size === lowerTags.length;
};

const hashtagErrorMessage = () => {
  const input = hashtagsField.value.trim();
  if (!input) {return '';}

  const tags = input.split(/\s+/).filter((t) => t);
  if (tags.length > MAX_HASHTAG_COUNT) {
    return `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэш-тегов`;
  }

  const validTagRegex = /^#[A-Za-zА-Яа-яЁё0-9]+$/;
  for (const tag of tags) {
    if (tag.length < 2) {return 'Хэш-тег не может состоять только из #';}
    if (tag.length > MAX_HASHTAG_LENGTH) {return `Максимальная длина хэш-тега — ${MAX_HASHTAG_LENGTH} символов`;}
    if (!validTagRegex.test(tag)) {return 'Хэш-тег содержит запрещённые символы';}
  }

  const lowerTags = tags.map((t) => t.toLowerCase());
  if (new Set(lowerTags).size !== lowerTags.length) {
    return 'Хэш-теги не должны повторяться';
  }

  return 'Неверный формат хэш-тега';
};

// === Закрытие ===
const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();       // ← сброс всех полей формы (хэштеги, комментарий и т.д.)
  uploadInput.value = '';   // ← критически важно: сброс input[type="file"]
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onEscKeydown);
};

// === Обработка Esc ===
const onEscKeydown = (evt) => {
  const active = document.activeElement;
  const isFieldFocused = active === hashtagsField || active === commentsField;
  if (evt.key === 'Escape' && !isFieldFocused) {
    evt.preventDefault();
    closeUploadForm();
  }
};

// === Открытие формы + валидация ===
const onUploadInputChange = () => {
  if (uploadInput.files.length === 0) {return;}

  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  uploadCancel.addEventListener('click', closeUploadForm);
  document.addEventListener('keydown', onEscKeydown);

  // Инициализация Pristine
  const pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__error-text'
  });

  pristine.addValidator(hashtagsField, validateHashtags, hashtagErrorMessage, 2, true);
  pristine.addValidator(commentsField, validateComment, commentErrorMessage, 2, true);

  const submitButton = uploadForm.querySelector('.img-upload__submit');

  const updateSubmitButton = () => {
    submitButton.disabled = !pristine.validate();
  };

  // Реакция на ввод
  hashtagsField.addEventListener('input', updateSubmitButton);
  commentsField.addEventListener('input', updateSubmitButton);

  // ✅ ГАРАНТИЯ: валидация при попытке отправки
  uploadForm.addEventListener('submit', (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault(); // ← не даём отправить, если есть ошибки
    }
  });

  // Первичное состояние кнопки
  updateSubmitButton();

  // Закрытие
  uploadCancel.addEventListener('click', closeUploadForm);
  document.addEventListener('keydown', onEscKeydown);
};

const initUploadForm = () => {
  uploadInput.addEventListener('change', onUploadInputChange);
};

export { initUploadForm };
