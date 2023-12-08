const scrollSvg = () => {
  const airplane = document.createElement('div');
  const docEl = document.documentElement;

  airplane.style.cssText = `
    position: fixed;
    bottom: 0;
    right: 0;
    width: 50px;
    height: 50px;
    pointer-events: none;
    background: url('img/airplane.svg') center/contain no-repeat;
    transition: top 0.3s ease-out;
  `;

  document.body.append(airplane);

  const checkDisplay = () => {
    airplane.style.display = window.innerWidth < 758 ? 'none' : 'block';
  };

  const calcPositionSvg = () => {
    if (window.innerWidth >= 758) {
      // eslint-disable-next-line max-len
      const maxScroll = docEl.scrollHeight - docEl.clientHeight + (10 * airplane.clientHeight);

      const percentScroll = (window.pageYOffset / maxScroll) * 100;
      // eslint-disable-next-line max-len
      const top = docEl.clientHeight - (percentScroll * (docEl.clientHeight / 100) + airplane.clientHeight);

      airplane.style.top = top + 'px';
    }
  };

  window.addEventListener('resize', checkDisplay);
  window.addEventListener('scroll', () => {
    requestAnimationFrame(calcPositionSvg);
  });

  calcPositionSvg();
};

scrollSvg();
