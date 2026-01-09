export const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

export const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const showDataLoadError = (message) => {
  const errorMessage = document.createElement('div');
  errorMessage.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background: #ff6b6b; color: white; border-radius: 5px; font-size: 16px; z-index: 1000;';
  errorMessage.classList.add('data-error');
  errorMessage.textContent = message;
  document.body.append(errorMessage);
  setTimeout(() => {
    errorMessage.remove();
  }, 5000);
};

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
