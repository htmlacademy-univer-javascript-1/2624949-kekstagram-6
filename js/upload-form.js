/* eslint-disable no-use-before-define */
import { sendData } from './api.js';

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

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();
  uploadInput.value = '';
  document.removeEventListener('keydown', onEscKeydown);
};

const onEscKeydown = (evt) => {
  const active = document.activeElement;
  const isFieldFocused = active === hashtagsField || active === commentsField;
  if (evt.key === 'Escape' && !isFieldFocused) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const onUploadInputChange = () => {
  if (uploadInput.files.length === 0) {return;}

  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  const scaleSmaller = uploadOverlay.querySelector('.scale__control--smaller');
  const scaleBigger = uploadOverlay.querySelector('.scale__control--bigger');
  const scaleValue = uploadOverlay.querySelector('.scale__control--value');
  const previewImg = uploadOverlay.querySelector('.img-upload__preview img');

  const file = uploadInput.files[0];
  if (file) {
    previewImg.src = URL.createObjectURL(file);
  }

  let scale = 100;

  const updateScale = () => {
    scaleValue.value = `${scale}%`;
    previewImg.style.transform = `scale(${scale / 100})`;
  };

  scaleSmaller.addEventListener('click', () => {
    if (scale > 25) {
      scale -= 25;
      updateScale();
    }
  });

  scaleBigger.addEventListener('click', () => {
    if (scale < 100) {
      scale += 25;
      updateScale();
    }
  });

  updateScale();
  const effectLevelField = uploadOverlay.querySelector('.effect-level__value');
  const effectLevelContainer = uploadOverlay.querySelector('.img-upload__effect-level');
  const slider = uploadOverlay.querySelector('.effect-level__slider');
  const effectsList = uploadOverlay.querySelector('.effects__list');

  if (slider.noUiSlider) {
    slider.noUiSlider.destroy();
  }

  const effectConfigs = {
    none: { range: [0, 1], step: 1, start: 0, filter: () => '', hidden: true },
    chrome: { range: [0, 1], step: 0.1, start: 1, filter: (v) => `grayscale(${v})`, hidden: false },
    sepia: { range: [0, 1], step: 0.1, start: 1, filter: (v) => `sepia(${v})`, hidden: false },
    marvin: { range: [0, 1], step: 0.01, start: 1, filter: (v) => `invert(${v * 100}%)`, hidden: false },
    phobos: { range: [0, 1], step: 0.01, start: 1, filter: (v) => `blur(${v * 3}px)`, hidden: false },
    heat: { range: [0, 1], step: 0.01, start: 1, filter: (v) => `brightness(${1 + v * 2})`, hidden: false }
  };

  let currentEffect = 'none';

  const updateEffect = () => {
    const config = effectConfigs[currentEffect];

    if (slider.noUiSlider) {
      slider.noUiSlider.destroy();
    }

    if (config.hidden) {
      effectLevelContainer.classList.add('hidden');
      previewImg.style.filter = '';
      effectLevelField.value = '';
      return;
    }

    effectLevelContainer.classList.remove('hidden');

    window.noUiSlider.create(slider, {
      range: { min: config.range[0], max: config.range[1] },
      start: config.start,
      step: config.step,
      connect: 'lower'
    });

    const setValue = (value) => {
      previewImg.style.filter = config.filter(value);
      effectLevelField.value = value;
    };

    setValue(config.start);

    slider.noUiSlider.on('update', (values) => {
      setValue(parseFloat(values[0]));
    });
  };

  effectsList.addEventListener('change', (evt) => {
    if (evt.target.name === 'effect' && evt.target.checked) {
      currentEffect = evt.target.value;
      updateEffect();
    }
  });

  updateEffect();

  uploadCancel.addEventListener('click', closeUploadForm);
  document.addEventListener('keydown', onEscKeydown);

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

  hashtagsField.addEventListener('input', updateSubmitButton);
  commentsField.addEventListener('input', updateSubmitButton);

  const showMessage = (template) => {
    const messageElement = template.cloneNode(true);
    document.body.append(messageElement);

    const closeMessage = () => {
      messageElement.remove();
      document.removeEventListener('keydown', onMessageEscKeydown);
    };

    const onMessageEscKeydown = (evt) => {
      if (evt.key === 'Escape') {
        closeMessage();
      }
    };

    messageElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('success') || evt.target.classList.contains('error') || evt.target.classList.contains('success__button') || evt.target.classList.contains('error__button')) {
        closeMessage();
      }
    });

    document.addEventListener('keydown', onMessageEscKeydown);
  };

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (!pristine.validate()) {
      return;
    }

    const formData = new FormData(uploadForm);
    submitButton.disabled = true;

    sendData(formData)
      .then(() => {
        closeUploadForm();
        const successTemplate = document.querySelector('#success').content.querySelector('.success');
        showMessage(successTemplate);
      })
      .catch(() => {
        const errorTemplate = document.querySelector('#error').content.querySelector('.error');
        showMessage(errorTemplate);
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  });

  updateSubmitButton();

};

const initUploadForm = () => {
  uploadInput.addEventListener('change', onUploadInputChange);
};

export { initUploadForm };
