"use strict";
var _a;
console.log('hello world 4');
const hambMenu = document.querySelector('.hamburger-menu');
const navMenu = document.getElementById('navMenu');
const navBar = document.querySelector('.navBar');
const spanToBreak = document.querySelectorAll('.brSm');
const socialMedia = document.querySelector('#socialMedia');
if (hambMenu) {
    hambMenu.addEventListener('click', function () {
        navMenu.classList.toggle('show');
        navMenu.classList.toggle('hide', !navMenu.classList.contains('show'));
        hambMenu.classList.toggle('openHam');
        navBar.classList.toggle('expand');
    });
}
const navBarAdjToScreen = function () {
    if (window.innerWidth < 750 && navBar.classList.contains('biggerScreen')) {
        navBar.classList.add('mobileView');
        navBar.classList.remove('biggerScreen');
    }
    else if (window.innerWidth >= 750 && !navBar.classList.contains('biggerScreen')) {
        navBar.classList.remove('mobileView');
        navBar.classList.add('biggerScreen');
    }
};
window.addEventListener('resize', () => { navBarAdjToScreen(); });
navBarAdjToScreen();
// The scrollable wrapper
const SCROLL_SEL = 'body';
const scrollEl = document.querySelector(SCROLL_SEL) || document; // document => page scroll
const getScrollTop = () => {
    if (scrollEl === document) {
        return window.scrollY || document.documentElement.scrollTop || 0;
    }
    else {
        return scrollEl.scrollTop; // safe cast
    }
};
const onScroll = () => {
    const y = getScrollTop();
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
const observeInView = (selectorClass, offset = 0) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { rootMargin: `${offset}px 0px` });
    document.querySelectorAll(selectorClass).forEach(el => observer.observe(el));
};
const removeObserveInView = (selectorClass, offset = 0) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                entry.target.classList.remove('in-view');
            }
        });
    }, { rootMargin: `${offset}px 0px` });
    document.querySelectorAll(selectorClass).forEach(el => observer.observe(el));
};
observeInView('.bioLandingPicContainer img', -100);
// observeInView('#landingPicBox img', -100)
observeInView('.singleCard', -100);
observeInView('#imgTransition', -100);
observeInView('.flip-icon', 0);
observeInView('.flip-toggle ', 0);
observeInView('.serviceTextBx ', 100);
removeObserveInView('.serviceTextBx ', 100);
observeInView('.singleServiceWrapper ', 200);
removeObserveInView('.singleServiceWrapper ', 0);
observeInView('#imgHero ', 100);
removeObserveInView('#imgHero ', 0);
const container = document.querySelector('#bigPic');
let allNotActiveTitles = document.querySelectorAll('.secTitles');
allNotActiveTitles.forEach(listEl => {
    listEl.addEventListener('click', () => {
        allNotActiveTitles = document.querySelectorAll('.secTitles');
        if (!listEl.classList.contains('active')) {
            const titleActive = [...allNotActiveTitles].filter(el => el.classList.contains('active'))[0];
            titleActive.classList.remove('active');
            listEl.classList.add('active');
        }
    });
});
document.querySelectorAll('.flip-card').forEach(card => {
    const btn = card.querySelector('.flip-toggle');
    if (btn) {
        btn.addEventListener('click', () => {
            const is = card.classList.toggle('is-flipped');
            btn.setAttribute('aria-expanded', String(is));
        });
    }
});
emailjs.init('0wA6kpUaumn2FNdbg');
const messageSent = document.querySelector('#messageSent');
const inputText = document.querySelectorAll('.inputText');
const inputTextSelect = document.querySelectorAll('select');
(_a = document.getElementById('myForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    emailjs.sendForm('service_m5a5vcb', 'template_1jfyvjh', this)
        .then(function (response) {
        messageSent.classList.remove('hide');
        inputText.forEach(text => text.value = '');
        inputTextSelect.forEach(select => select.selectedIndex = 0);
        console.log('SUCCESS!', response.status, response.text);
        setTimeout(() => { messageSent.classList.add('hide'); }, 5000);
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
/***************************************
*  ====     EVENTS PAGE LOGIC     ==== *
****************************************/
/***  ====> Tabs switch logic <==== ***/
const eventsPage = document.querySelector('body#eventsPage');
const eventSwitchTab = () => {
    const tabsWrapper = eventsPage.querySelector('#all-tabs');
    const allTabs = [...tabsWrapper.querySelectorAll('.single-tab')];
    const allContents = [...eventsPage.querySelectorAll('.tab-content')];
    const showTab = (valueText) => {
        const contentId = `${valueText}-content`;
        allContents.forEach(content => {
            const activeContent = content.id === contentId;
            content.hidden = !activeContent;
            content.setAttribute('aria-hidden', String(!activeContent));
            content.tabIndex = 1;
        });
        allTabs.forEach(tab => {
            const selected = tab.value === valueText;
            tab.checked = selected;
            tab.classList.toggle('activeTab', tab.checked);
            tab.setAttribute('aria-selected', String(selected));
            tab.tabIndex = 1;
        });
    };
    tabsWrapper.addEventListener('change', (e) => {
        const tabClicked = e.target;
        if (tabClicked)
            showTab(tabClicked.value);
    });
};
eventSwitchTab();
const templateCard = (singleEvent) => {
    const cardElementWrapper = document.createElement('article');
    cardElementWrapper.className = singleEvent.event_isMostRecent ? 'event_wrapper mostRecentEvt' : 'event_wrapper';
    const cardElement = document.createElement('div');
    cardElement.className = singleEvent.event_isMostRecent ? 'event_card mostRecentEvt' : 'event_card';
    cardElementWrapper.append(cardElement);
    cardElement.innerHTML = `
        <div class="eventInfo">
            <div class="titlePicWrapper">
                <div class="flex flex-column flex-alignItems-center col-12">
                    <h5 class="col-12 eTitle">${singleEvent.event_title}</h5>
                    <h3 class="col-12 text-bold eDate">${singleEvent.event_date}</h3>
                </div>
                <img class="eventPic" src="${singleEvent.event_picture}" alt="">
            </div>
            <div class="col-12 flex flex-justifyContent-spaceBetween placeTimeWrapper">
                <h6 class="eLocation flex">${singleEvent.event_location}</h6>
                <h6 class="eTime flex">${singleEvent.event_time}</h6>
            </div>
            <p class="col-12 eDescription">${singleEvent.event_description}</p>
            <a class="col-12 eLink" href="${singleEvent.event_link}" target="_blank">Event Link</a>
        </div>
        <div class="eventPicWrapper">
            <img src="${singleEvent.event_picture}" alt="">
        </div>
    `;
    const eTime = cardElement.querySelector('.eTime');
    eTime.className = singleEvent.event_time === '' ? 'eTime flex' : 'eTime flex ml-50';
    eTime.classList.toggle('hide', !singleEvent.event_isMostRecent);
    return cardElementWrapper;
};
const allEventsUpcoming = [
    {
        event_title: 'Title Here',
        event_date: 'Oct 6-7, 2025',
        event_location: 'Chicago, Navy Pier',
        event_time: '5:00 pm - 6:00 pm',
        event_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exer',
        event_link: 'Upcoming Events link',
        event_picture: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1760143358/Niko/new_materials/chef-kapernaros-on-the-pass_fl0osx.jpg',
        event_isMostRecent: true
    },
    {
        event_title: 'Title Here',
        event_date: 'Oct 6-7, 2025',
        event_location: 'Chicago, Navy Pier',
        event_time: '5:00 pm - 6:00 pm',
        event_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exer',
        event_link: 'Upcoming Events link',
        event_picture: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1760143358/Niko/new_materials/chef-kapernaros-on-the-pass_fl0osx.jpg',
        event_isMostRecent: false
    },
    {
        event_title: 'Title Here',
        event_date: 'Oct 6-7, 2025',
        event_location: 'Chicago, Navy Pier',
        event_time: '5:00 pm - 6:00 pm',
        event_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exer',
        event_link: 'Upcoming Events link',
        event_picture: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1760143358/Niko/new_materials/chef-kapernaros-on-the-pass_fl0osx.jpg',
        event_isMostRecent: false
    },
    {
        event_title: 'Title Here',
        event_date: 'Oct 6-7, 2025',
        event_location: 'Chicago, Navy Pier',
        event_time: '5:00 pm - 6:00 pm',
        event_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exer',
        event_link: 'Upcoming Events link',
        event_picture: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1760143358/Niko/new_materials/chef-kapernaros-on-the-pass_fl0osx.jpg',
        event_isMostRecent: false
    },
];
const allEventsPast = [
    {
        event_title: 'Chicago Gourmet',
        event_date: 'Sept. 25 - 28, 2025',
        event_location: 'Harris Theater Rooftop • Millennium Park',
        event_time: '',
        event_description: "Welcome to Chicago Gourmet, one of the country's most distinguished food festivals. Each year, Chicago Gourmet celebrates the city's diverse dining scene with a dynamic line-up of epicurean events that showcase the city’s top chefs, food, and drinks.",
        event_link: 'https://www.chicagogourmet.org/',
        event_picture: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1760656045/Niko/new_materials/chef-gourmet_ngqfr3.jpg',
        event_isMostRecent: true
    },
    {
        event_title: 'Title Here',
        event_date: 'Oct 6-7, 2025',
        event_location: 'Chicago, Navy Pier',
        event_time: '5:00 pm - 6:00 pm',
        event_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exer',
        event_link: 'Past Events link',
        event_picture: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1760143358/Niko/new_materials/chef-kapernaros-on-the-pass_fl0osx.jpg',
        event_isMostRecent: false
    },
    {
        event_title: 'Title Here',
        event_date: 'Oct 6-7, 2025',
        event_location: 'Chicago, Navy Pier',
        event_time: '5:00 pm - 6:00 pm',
        event_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exer',
        event_link: 'Past Events link',
        event_picture: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1760143358/Niko/new_materials/chef-kapernaros-on-the-pass_fl0osx.jpg',
        event_isMostRecent: false
    },
    {
        event_title: 'Title Here',
        event_date: 'Oct 6-7, 2025',
        event_location: 'Chicago, Navy Pier',
        event_time: '5:00 pm - 6:00 pm',
        event_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exer',
        event_link: 'Past Events link',
        event_picture: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1760143358/Niko/new_materials/chef-kapernaros-on-the-pass_fl0osx.jpg',
        event_isMostRecent: false
    },
];
const allEventsCompetions = [
    {
        event_title: 'Competions title',
        event_date: 'Oct 6-7, 2025',
        event_location: 'Chicago, Navy Pier',
        event_time: '5:00 pm - 6:00 pm',
        event_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exer',
        event_link: 'Competions link',
        event_picture: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1760143358/Niko/new_materials/chef-kapernaros-on-the-pass_fl0osx.jpg',
        event_isMostRecent: false
    },
    {
        event_title: 'Competions title',
        event_date: 'Oct 6-7, 2025',
        event_location: 'Chicago, Navy Pier',
        event_time: '5:00 pm - 6:00 pm',
        event_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exer',
        event_link: 'Competions link',
        event_picture: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1760143358/Niko/new_materials/chef-kapernaros-on-the-pass_fl0osx.jpg',
        event_isMostRecent: false
    },
    {
        event_title: 'Competions title',
        event_date: 'Oct 6-7, 2025',
        event_location: 'Chicago, Navy Pier',
        event_time: '5:00 pm - 6:00 pm',
        event_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exer',
        event_link: 'Competions link',
        event_picture: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1760143358/Niko/new_materials/chef-kapernaros-on-the-pass_fl0osx.jpg',
        event_isMostRecent: false
    },
    {
        event_title: 'Competions title',
        event_date: 'Oct 6-7, 2025',
        event_location: 'Chicago, Navy Pier',
        event_time: '5:00 pm - 6:00 pm',
        event_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exer',
        event_link: 'Competions link',
        event_picture: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1760143358/Niko/new_materials/chef-kapernaros-on-the-pass_fl0osx.jpg',
        event_isMostRecent: false
    },
];
const upcomingContent = eventsPage.querySelector('#upcoming-content');
allEventsUpcoming.forEach(event => { upcomingContent.append(templateCard(event)); });
const pastEventsContent = eventsPage.querySelector('#past_events-content');
allEventsPast.forEach(event => { pastEventsContent.append(templateCard(event)); });
const competitionsContent = eventsPage.querySelector('#competitions-content');
allEventsCompetions.forEach(event => { competitionsContent.append(templateCard(event)); });
