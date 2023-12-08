const animateMenu = () => {
  const headerMenu = document.querySelector('.header__menu');
  const headerContainer = document.querySelector('.header__container');

  const animate = ({timing, draw, duration}) => {
    const start = performance.now();

    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      const progress = timing(timeFraction);

      draw(progress);

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  };

  const makeEaseOut = (timing) => function(timeFraction) {
    return 1 - timing(1 - timeFraction);
  };

  const bounce = (timeFraction) => {
    for (let a = 0, b = 1; 1; a += b, b /= 2) {
      if (timeFraction >= (7 - 4 * a) / 11) {
        // eslint-disable-next-line max-len
        return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
      }
    }
  };

  const heightElems = headerMenu.offsetHeight + headerContainer.offsetTop;
  const to = (document.documentElement.clientHeight - heightElems) / 100;

  animate({
    duration: 300,
    timing: makeEaseOut(bounce),
    draw(progress) {
      headerMenu.style.top = to * progress + 'px';
    },
  });
};

export {
  animateMenu,
};
