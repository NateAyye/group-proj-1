const navButton = $('button[aria-controls="primary-navigation"]');
const navExit = $('#nav-exit');

navExit.click(() => {
  navButton.attr('aria-expanded', 'false');
});

navButton.click(() => {
  const isOpened = navButton.attr('aria-expanded') === 'true';
  if (isOpened) {
    navButton.attr('aria-expanded', 'false');
  } else {
    navButton.attr('aria-expanded', 'true');
  }
});

$(window).resize(() => {
  console.log(innerWidth);
  if (innerWidth > 768) {
    navButton.attr('aria-expanded', 'true');
    navButton.hide();
  } else {
    navButton.attr('aria-expanded', 'false');
    navButton.show();
  }
});
