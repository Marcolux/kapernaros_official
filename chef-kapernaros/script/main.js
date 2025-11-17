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
console.log('hello world 4');
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
    if (window.innerWidth < 800 && navBar.classList.contains('biggerScreen')) {
        navBar.classList.add('mobileView');
        navBar.classList.remove('biggerScreen');
    }
    else if (window.innerWidth >= 800 && !navBar.classList.contains('biggerScreen')) {
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
var removeObserveInView = function (selectorClass, offset) {
    if (offset === void 0) { offset = 0; }
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
                entry.target.classList.remove('in-view');
            }
        });
    }, { rootMargin: "".concat(offset, "px 0px") });
    document.querySelectorAll(selectorClass).forEach(function (el) { return observer.observe(el); });
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
// ******* Popup logic ******* \\
var bobbyLink = document.getElementById('clickToPics');
var bobbyFlay = document.getElementById('bobbyFlay');
var closingPopup = document.getElementById('closingPopup');
var openCompetitions = function () {
    window.location.href = './pages/services.html';
    localStorage.setItem('loading_competions', 'true');
    localStorage.setItem('hide_landing_popup', 'true');
    bobbyFlay.classList.add('hide');
};
if (bobbyLink) {
    bobbyLink.addEventListener('click', openCompetitions);
}
if (localStorage.getItem('hide_landing_popup') !== 'true') {
    bobbyFlay.classList.remove('hide');
    closingPopup.addEventListener('click', function () {
        localStorage.setItem('hide_landing_popup', 'true');
        bobbyFlay.classList.add('hide');
    });
}
else {
    bobbyFlay.classList.add('hide');
}
// Setting a cookie with SameSite=Lax
document.cookie = "key=value; SameSite=Lax";
/***************************************
*  ====     EVENTS PAGE LOGIC     ==== *
****************************************/
/***  ====> Tabs switch logic <==== ***/
var eventsPage = document.querySelector('body#eventsPage');
var eventSwitchTab = function () {
    if (eventsPage) {
        var tabsWrapper = eventsPage.querySelector('#all-tabs');
        var allTabs_1 = __spreadArray([], tabsWrapper.querySelectorAll('.single-tab'), true);
        var allContents_1 = __spreadArray([], eventsPage.querySelectorAll('.tab-content'), true);
        var showTab_1 = function (valueText) {
            var contentId = "".concat(valueText, "-content");
            allContents_1.forEach(function (content) {
                var activeContent = content.id === contentId;
                content.hidden = !activeContent;
                content.setAttribute('aria-hidden', String(!activeContent));
                content.tabIndex = 1;
            });
            allTabs_1.forEach(function (tab) {
                var selected = tab.value === valueText;
                tab.checked = selected;
                tab.classList.toggle('activeTab', tab.checked);
                tab.setAttribute('aria-selected', String(selected));
                tab.tabIndex = 1;
            });
        };
        tabsWrapper.addEventListener('change', function (e) {
            var tabClicked = e.target;
            if (tabClicked)
                showTab_1(tabClicked.value);
        });
    }
};
eventSwitchTab();
var templateCard = function (singleEvent) {
    var cardElementWrapper = document.createElement('article');
    cardElementWrapper.className = singleEvent.event_isMostRecent ? 'event_wrapper mostRecentEvt' : 'event_wrapper';
    var cardElement = document.createElement('div');
    cardElement.className = singleEvent.event_isMostRecent ? 'event_card mostRecentEvt' : 'event_card';
    cardElement.id = singleEvent.event_id;
    cardElementWrapper.append(cardElement);
    cardElement.innerHTML = "\n        <div class=\"eventInfo\">\n            <div class=\"titlePicWrapper\">\n                <div class=\"flex flex-column flex-alignItems-center col-12\">\n                    <h5 class=\"col-12 eTitle\">".concat(singleEvent.event_title, "</h5>\n                    <h3 class=\"col-12 text-bold eDate\">").concat(singleEvent.event_date, "</h3>\n                </div>\n                <img class=\"eventPic\" src=\"").concat(singleEvent.event_picture, "\" alt=\"\">\n            </div>\n            <div class=\"col-12 flex flex-column flex-alignItems-center flex-justifyContent-spaceBetween placeTimeWrapper\">\n                <h6 class=\"eLocation flex\">").concat(singleEvent.event_location, "</h6>\n                <h6 class=\"eTime flex\">").concat(singleEvent.event_time, "</h6>\n            </div>\n            <p class=\"col-12 eDescription\">").concat(singleEvent.event_description, "</p>\n            <a class=\"col-12 eLink\" href=\"").concat(singleEvent.event_link, "\" target=\"_blank\">Event Link</a>\n        </div>\n        <div class=\"eventPicWrapper\">\n            <img src=\"").concat(singleEvent.event_picture, "\" alt=\"\">\n        </div>\n    ");
    var eTime = cardElement.querySelector('.eTime');
    var eLink = cardElement.querySelector('.eLink');
    var eDescription = cardElement.querySelector('.eDescription');
    eTime.className = singleEvent.event_time === '' ? 'eTime flex' : 'eTime flex ml-50';
    eTime.classList.toggle('hide', !singleEvent.event_isMostRecent);
    eLink.classList.toggle('hide', singleEvent.event_isMostRecent);
    return cardElementWrapper;
};
var allEventsUpcoming = [
    {
        event_id: "Harwood_Heights_Cooking_Class",
        event_title: "Harwood Heights Cooking Class",
        event_date: "Dec 9, 2025",
        event_location: "Harwood Heights, Recreation center",
        event_time: "6:00 pm - 8:30 pm",
        event_description: "Spend an unforgettable evening learning, tasting, and cooking with Chef Kapernaros. This hands-on class focuses on creating fresh, flavorful dishes using wholesome ingredients and classic Mediterranean techniques. Perfect for anyone who loves cooking, good company, and discovering the joy in every bite.",
        event_link: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1763340325/Niko/new_materials/viber_image_2025-11-16_18-39-00-116_qscdyt.jpg",
        event_picture: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1761871515/Niko/new_materials/cooking_classes_chef_kapernaros_vz0pbx.jpg",
        event_isMostRecent: true
    },
];
var allEventsPast = [
    {
        event_id: "Taste_of_Hope",
        event_title: "Taste of Hope",
        event_date: "Nov 6, 2025",
        event_location: "Chicago, Navy Pier - AON Grand Ballroom",
        event_time: "6:30 pm - 7:45 pm",
        event_description: "This isn’t just a night out; it’s a movement toward a world without cancer. Join us as we celebrate over 35 amazing restaurants from the Chicagoland area, and let's make a difference together!",
        event_link: "www.chicagotasteofhope.com",
        event_picture: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1763340556/Niko/new_materials/taste_of_hope_chef_Kapernaros_2_ezmkfg.jpg",
        event_isMostRecent: true
    },
    {
        event_id: "Chicago_Gourmet",
        event_title: "Chicago Gourmet",
        event_date: "Sep 28, 2025",
        event_location: "Chicago, Harries Theater for Music and Dance",
        event_time: "",
        event_description: "Rise and Shine gourmet brunch, enjoy cooking with some of most talent chefs in the city",
        event_link: "",
        event_picture: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1761871515/Niko/new_materials/pierless_hospitality_chef_kapernaros_gfd3sh.jpg",
        event_isMostRecent: true
    },
    {
        event_id: "Panos_Food_Show",
        event_title: "Panos Food Show",
        event_date: "June 10, 2025",
        event_location: "Chicago, Drury Lane Theater",
        event_time: "",
        event_description: "Celebrating 50 years of Panos Food",
        event_link: "",
        event_picture: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1759880299/Niko/new_materials/chef-pic-8_fehnzs.jpg",
        event_isMostRecent: true
    },
    {
        event_id: "I_Cook_For_benefit",
        event_title: "\"I Cook For\" benefit",
        event_date: "March 20, 2025",
        event_location: "Chicago, Four Seasons Hotel",
        event_time: "",
        event_description: "Pierless Hospitality team of Navy Pier Chicago at 'I Cook For' Benefit",
        event_link: "",
        event_picture: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1762035490/Niko/new_materials/I-cook-for-benefit_ri4usq.jpg",
        event_isMostRecent: true
    },
    {
        event_id: "Grand_Chef_Experience",
        event_title: "Grand Chef Experience",
        event_date: "March 2, 2025",
        event_location: "Chicago, Field Museum",
        event_time: "",
        event_description: "For one more year It is a great honor for me and Pierless Hospitality team to support The Cystic Fibrosis Foundation, the world's leader in the search for a cure for CF.",
        event_link: "",
        event_picture: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1762035621/Niko/new_materials/grand-chef-experience_u2rqn2.jpg",
        event_isMostRecent: true
    }
];
var allEventsCompetions = [
    {
        event_id: "Chopped",
        event_title: "Chopped",
        event_date: "Nov, 2024",
        event_location: "New York",
        event_time: "",
        event_description: "Season 60, Episode 2 - Big Fat Greek Kitchen - participant",
        event_link: "",
        event_picture: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1759880299/Niko/new_materials/chef-pic-5_mbrlln.jpg",
        event_isMostRecent: true
    },
    {
        event_id: "Beat_Bobby_Flay",
        event_title: "Beat Bobby Flay",
        event_date: "Oct, 2024",
        event_location: "New York",
        event_time: "",
        event_description: "<span class='col-12 text-center text-bold fontSize24'>Chef Kapernaros Big Win vs Iron Chef Bobby Flay</span> <br><br>- Episode winner - Season 35, Episode 12 - Talk the Talk and Walk the Walk.",
        event_link: "",
        event_picture: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1726763368/Niko/competitions/BobbyFlay_2_flbrxf.jpg",
        event_isMostRecent: true
    },
    {
        event_id: "Good_Taste_Series_For_Hyatt_Americas_Final",
        event_title: "Good Taste Series For Hyatt Americas Final",
        event_date: "Sep, 2018",
        event_location: "Bahamas, Grand Hyatt",
        event_time: "",
        event_description: "Fine dining competition awarded for excellence. Americas final finalist.",
        event_link: "",
        event_picture: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1762035672/Niko/new_materials/Chrisa-kapernaros-hyatt-competition_vkbvwq.jpg",
        event_isMostRecent: true
    },
    {
        event_id: "Good_Taste_Series_For_Hyatt_World_Midwest",
        event_title: "Good Taste Series For Hyatt World Midwest",
        event_date: "2018",
        event_location: "Chicago, Hyatt McCormick",
        event_time: "",
        event_description: "Fine dining competition awarded for excellence. First place winner.",
        event_link: "",
        event_picture: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1761874686/Niko/competitions/hyatt_world_midwest_eysuy8.jpg",
        event_isMostRecent: true
    },
];
if (eventsPage) {
    var upcomingContent_1 = eventsPage.querySelector('#upcoming-content');
    allEventsUpcoming.forEach(function (event) { upcomingContent_1.append(templateCard(event)); });
    var pastEventsContent_1 = eventsPage.querySelector('#past_events-content');
    allEventsPast.forEach(function (event) { pastEventsContent_1.append(templateCard(event)); });
    var competitionsContent_1 = eventsPage.querySelector('#competitions-content');
    allEventsCompetions.forEach(function (event) { competitionsContent_1.append(templateCard(event)); });
}
// serviceBxButton
/*****************************************
*  ====     Services PAGE LOGIC     ==== *
******************************************/
var servicesSec = document.querySelector('section#allServices');
if (servicesSec) {
    var allButtonServices = servicesSec.querySelectorAll('button.serviceBxButton');
    allButtonServices.forEach(function (button) {
        button.addEventListener('click', function () {
            var service = encodeURIComponent(button.value);
            window.location.href = "contact-the-chef.html?service=".concat(service);
        });
    });
}
/*************************************************
*  ====     The Chef's Table PAGE LOGIC     ==== *
*************************************************/
var chefTableCardContainer = document.querySelector('#tablePicContainer');
var allCardsInChefTable = chefTableCardContainer === null || chefTableCardContainer === void 0 ? void 0 : chefTableCardContainer.querySelectorAll('article');
var cardsOnSmallScreen = function () {
    allCardsInChefTable === null || allCardsInChefTable === void 0 ? void 0 : allCardsInChefTable.forEach(function (card) {
        card.classList.toggle('smallScreenCard', window.innerWidth < 750);
        if (card.classList.contains('smallScreenCard')) {
            card.addEventListener('mouseover', function () {
                allCardsInChefTable.forEach(function (card) { return card.classList.remove('clicked'); });
                setTimeout(function () {
                }, 0);
                card.classList.add('clicked');
                card.scrollIntoView({
                    behavior: "smooth", // optional
                });
                allCardsInChefTable.forEach(function (card) {
                    if (!card.classList.contains('clicked'))
                        card.classList.remove('is-flipped');
                });
            });
        }
    });
};
cardsOnSmallScreen();
window.addEventListener('resize', cardsOnSmallScreen);
emailjs.init('0wA6kpUaumn2FNdbg');
var messageSent = document.querySelector('#messageSent');
var textArea = document.querySelector('textarea.inputText');
var inputText = document.querySelectorAll('.inputText');
var inputTextSelect = document.querySelectorAll('select');
(_a = document.getElementById('myForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    emailjs.sendForm('service_m5a5vcb', 'template_1jfyvjh', this)
        .then(function (response) {
        messageSent.classList.remove('hide');
        inputText.forEach(function (text) { return text.value = ''; });
        inputTextSelect.forEach(function (select) { return select.selectedIndex = 0; });
        console.log('SUCCESS!', response.status, response.text);
        setTimeout(function () { messageSent.classList.add('hide'); }, 5000);
    }, function (error) {
        console.log('FAILED...', error);
        alert("Failed to send email.");
    });
});
// ******* Resizing logic ******* \\
var textAreaAdjustToScreen = function () {
    console.log('triggered');
    if (window.innerHeight < 700 && window.innerWidth > 800) {
        textArea.rows = 1;
        console.log('here');
    }
    else {
        textArea.rows = 3;
    }
};
textAreaAdjustToScreen();
window.addEventListener('resize', function () { textAreaAdjustToScreen(); });
