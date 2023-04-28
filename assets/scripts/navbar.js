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

function setNavbarStyles() {
  if (innerWidth > 768) {
    navButton.attr('aria-expanded', 'true');
    navButton.hide();
  } else {
    navButton.attr('aria-expanded', 'false');
    navButton.show();
  }
}

$(window).resize(setNavbarStyles);

$(() => {
  setNavbarStyles();
});
