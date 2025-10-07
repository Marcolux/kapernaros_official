var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
console.log('hello world');
var hambMenu = document.querySelector('.hamburger-menu');
var navMenu = document.getElementById('navMenu');
var navBar = document.querySelector('.navBar');
var spanToBreak = document.querySelectorAll('.brSm');
var socialMedia = document.querySelector('#socialMedia');
if (hambMenu) {
    hambMenu.addEventListener('click', function () {
        navMenu.classList.toggle('show');
        navMenu.classList.toggle('hide', !navMenu.classList.contains('show'));
        hambMenu.classList.toggle('openHam');
        navBar.classList.toggle('expand');
    });
}
var navBarAdjToScreen = function () {
    if (window.innerWidth < 750 && navBar.classList.contains('biggerScreen')) {
        navBar.classList.add('mobileView');
        navBar.classList.remove('biggerScreen');
    }
    else if (window.innerWidth >= 750 && !navBar.classList.contains('biggerScreen')) {
        navBar.classList.remove('mobileView');
        navBar.classList.add('biggerScreen');
    }
};
window.addEventListener('resize', function () { navBarAdjToScreen(); });
navBarAdjToScreen();
// The scrollable wrapper
var SCROLL_SEL = 'body';
var scrollEl = document.querySelector(SCROLL_SEL) || document; // document => page scroll
var getScrollTop = function () {
    if (scrollEl === document) {
        return window.scrollY || document.documentElement.scrollTop || 0;
    }
    else {
        return scrollEl.scrollTop; // safe cast
    }
};
var onScroll = function () {
    var y = getScrollTop();
    // navScrolling logic with y
    if (y > 30) {
        navBar.classList.add('scrolled');
        if (socialMedia)
            socialMedia.classList.remove('hide');
    }
    else {
        if (!navBar.classList.contains('scrolledAlways')) {
            navBar.classList.remove('scrolled');
            if (socialMedia)
                socialMedia.classList.add('hide');
        }
    }
};
(scrollEl === document ? window : scrollEl).addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load
var observeInView = function (selectorClass, offset) {
    if (offset === void 0) { offset = 0; }
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { rootMargin: "".concat(offset, "px 0px") });
    document.querySelectorAll(selectorClass).forEach(function (el) { return observer.observe(el); });
};
observeInView('.bioLandingPicContainer img', -100);
observeInView('#landingPicBox img', -100);
observeInView('.singleCard', -100);
observeInView('#imgTransition', -100);
observeInView('.flip-icon', 0);
observeInView('.flip-toggle ', 0);
var container = document.querySelector('#bigPic');
var allNotActiveTitles = document.querySelectorAll('.secTitles');
allNotActiveTitles.forEach(function (listEl) {
    listEl.addEventListener('click', function () {
        allNotActiveTitles = document.querySelectorAll('.secTitles');
        if (!listEl.classList.contains('active')) {
            var titleActive = __spreadArray([], allNotActiveTitles, true).filter(function (el) { return el.classList.contains('active'); })[0];
            titleActive.classList.remove('active');
            listEl.classList.add('active');
        }
    });
});
document.querySelectorAll('.flip-card').forEach(function (card) {
    var btn = card.querySelector('.flip-toggle');
    if (btn) {
        btn.addEventListener('click', function () {
            var is = card.classList.toggle('is-flipped');
            btn.setAttribute('aria-expanded', String(is));
        });
    }
});
emailjs.init('0wA6kpUaumn2FNdbg');
var messageSent = document.querySelector('#messageSent');
var inputText = document.querySelectorAll('.inputText');
var inputTextSelect = document.querySelectorAll('select.inputText');
(_a = document.getElementById('myForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    emailjs.sendForm('service_m5a5vcb', 'template_1jfyvjh', this)
        .then(function (response) {
        messageSent.classList.remove('hide');
        inputText.forEach(function (text) { return text.value = ''; });
        inputTextSelect.forEach(function (text) { return text.value = 'Select One'; });
        console.log('SUCCESS!', response.status, response.text);
        setTimeout(function () { messageSent.classList.add('hide'); }, 5000);
    }, function (error) {
        console.log('FAILED...', error);
        alert("Failed to send email.");
    });
});
// ******* Popup logic ******* \\
// const bobbyLink = document.getElementById('clickToPics') as HTMLElement
// const bobbyFlay = document.getElementById('bobbyFlay') as HTMLElement
// const closingPopup = document.getElementById('closingPopup') as HTMLElement
// const openCompetitions = () => {
//     window.location.href = './pages/services.html';
//     localStorage.setItem('loading_competions', 'true')
//     localStorage.setItem('hide_landing_popup', 'true')
//     bobbyFlay.classList.add('hide')
// }
// if (bobbyLink) {
//     bobbyLink.addEventListener('click', openCompetitions)
// }
// if (localStorage.getItem('hide_landing_popup') !== 'true' ) {
//     bobbyFlay.classList.remove('hide')
//     closingPopup.addEventListener('click', () => {
//         localStorage.setItem('hide_landing_popup', 'true')
//         bobbyFlay.classList.add('hide')
//     })
// } else {
//     bobbyFlay.classList.add('hide')
// }
// Setting a cookie with SameSite=Lax
document.cookie = "key=value; SameSite=Lax";
