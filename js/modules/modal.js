const createModal = (obj) => {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'is-visible');

  modal.insertAdjacentHTML('beforeend', `
    <div class='modal__wrapper'>
      <div class='modal__overlay'></div>
      <div class='modal__content'>
        <h2 class='modal__title'>${obj.title}</h2>
        <p class='modal__text'>${obj.text}</p>
        ${obj.svg ?
          `<div class='modal__icon'>
            <svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 62 62" fill="none">
              <g clip-path="url(#clip0_0_1327)">
                <path d="M23.2618 41.8332L12.4285
                  30.9999L8.81738 34.611L23.2618
                  49.0554L54.2142 18.1031L50.6031 14.4919L23.2618 41.8332Z"
                  fill="white"/>
              </g>
            </svg>
          </div>` : ''}
        ${obj.btn ?
          `<button type = 'button' class='modal__btn'>
            Забронировать</button>` : ''}
      </div>
    </div>
  `);

  return modal;
};

const closeModal = (body, modal) => {
  modal.classList.remove('is-visible');
  body.classList.remove('overflow');
};

const renderModal = (body, obj) => {
  const modal = createModal(obj);
  body.classList.add('overflow');
  body.append(modal);
  return modal;
};

export {
  renderModal,
  closeModal,
};
