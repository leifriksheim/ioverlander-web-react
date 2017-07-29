const ROOT_URL = 'http://localhost:3000/static/task-help'
const PAGE_URLS = {
  'Find Places by Country': '/countries/places_by_country',
  'Add or update a single place': '/static/add-or-update-a-single-place',
  'Mobile apps': '/static/mobile-apps',
  'Frequently Asked Questions': '/static/faqs',
  'I have time': {
    path: '/static/i-have-time',
    submenu: 'volunteer-submenu'
  },
  'Donate': {
    path: '/static/donate',
    submenu: 'volunteer-submenu'
  },
  'About iOverlander': {
    path: '/static/about-ioverlander',
    submenu: 'about-submenu'
  },
  'Contact Us': {
    path: '/static/contact',
    submenu: 'about-submenu'
  },
  'Contributors': {
    path: '/static/contributors',
    submenu: 'about-submenu'
  },
  'iOverlander - Find your next destination': {
    path: '/',
    noSuffix: true,
    submenu: 'header-logo'
  }
}

const TESTS = {}

Object.keys(PAGE_URLS).forEach((title, i) => {
  TESTS['Header link - ' + title] = (browser) => {
    browser
      .url(ROOT_URL)
      .waitForElementVisible('body', 1000)

    if (!PAGE_URLS[title].path) {
      browser
        .click('[href="' + PAGE_URLS[title] + '"]')
        .pause(250)
    } else {
      browser
        .moveToElement('[data-el="' + PAGE_URLS[title].submenu + '"]', 10, 10)
        .click('[href="' + PAGE_URLS[title].path + '"]')
        .pause(250)
    }

    browser
      .assert
      .title(title + (PAGE_URLS[title].noSuffix ? '' : ' - iOverlander'))

    if (i === Object.keys(PAGE_URLS).length - 1) {
      browser.end()
    }
  }
})

module.exports = TESTS
