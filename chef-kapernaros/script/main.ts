console.log('hello world 4')

const hambMenu = document.querySelector('.hamburger-menu') as HTMLElement
const navMenu = document.getElementById('navMenu') as HTMLElement
const navBar = document.querySelector('.navBar') as HTMLElement
const spanToBreak = document.querySelectorAll('.brSm') as NodeListOf<HTMLElement>
const socialMedia = document.querySelector('#socialMedia') as HTMLElement

if (hambMenu) {
    hambMenu.addEventListener('click', function() {
        navMenu.classList.toggle('show')
        navMenu.classList.toggle('hide',!navMenu.classList.contains('show'))
        hambMenu.classList.toggle('openHam') 
        navBar.classList.toggle('expand')
    })
}
const navBarAdjToScreen = function () {
    if (window.innerWidth < 750 && navBar.classList.contains('biggerScreen')) {
        navBar.classList.add('mobileView')
        navBar.classList.remove('biggerScreen')
    } else if (window.innerWidth >= 750 && !navBar.classList.contains('biggerScreen')) {
        navBar.classList.remove('mobileView')
        navBar.classList.add('biggerScreen')
    }
}
window.addEventListener('resize',() => {navBarAdjToScreen()})
navBarAdjToScreen()

// The scrollable wrapper
const SCROLL_SEL = 'body'
const scrollEl = document.querySelector(SCROLL_SEL) || document // document => page scroll

const getScrollTop = () => {
    if (scrollEl === document) {
      return window.scrollY || document.documentElement.scrollTop || 0
    } else {
      return (scrollEl as HTMLElement).scrollTop // safe cast
    }
}

const onScroll = () => {
  const y = getScrollTop()
  // navScrolling logic with y
    if (y > 30) {
        navBar.classList.add('scrolled')
        if (socialMedia) socialMedia.classList.remove('hide')
    } else {
        if (!navBar.classList.contains('scrolledAlways')) {
            navBar.classList.remove('scrolled')
            if (socialMedia) socialMedia.classList.add('hide')
        }
    }
}
(scrollEl === document ? window : scrollEl).addEventListener('scroll', onScroll, { passive: true })
onScroll() // run once on load


const observeInView = (selectorClass: string, offset = 0) => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            })
        },
        { rootMargin: `${offset}px 0px` }
    )
    document.querySelectorAll(selectorClass).forEach(el => observer.observe(el))
}
const removeObserveInView = (selectorClass: string, offset = 0) => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    entry.target.classList.remove('in-view');
                }
            })
        },
        { rootMargin: `${offset}px 0px` }
    )
    document.querySelectorAll(selectorClass).forEach(el => observer.observe(el))
}


observeInView('.bioLandingPicContainer img', -100)
// observeInView('#landingPicBox img', -100)
observeInView('.singleCard', -100)
observeInView('#imgTransition', -100)
observeInView('.flip-icon', 0)
observeInView('.flip-toggle ', 0)
observeInView('.serviceTextBx ', 100)
removeObserveInView('.serviceTextBx ', 100)
observeInView('.singleServiceWrapper ', 200)
removeObserveInView('.singleServiceWrapper ', 0)
observeInView('#imgHero ', 100)
removeObserveInView('#imgHero ', 0)

const container = document.querySelector('#bigPic') as HTMLDivElement
let allNotActiveTitles = document.querySelectorAll('.secTitles') as NodeListOf<HTMLLIElement>

allNotActiveTitles.forEach( listEl => {
    listEl.addEventListener('click', () => {
        allNotActiveTitles = document.querySelectorAll('.secTitles') as NodeListOf<HTMLLIElement>

        if (!listEl.classList.contains('active')) {
            const titleActive = [...allNotActiveTitles].filter(el => el.classList.contains('active'))[0]
            titleActive.classList.remove('active')
            listEl.classList.add('active')
        }
    })
})

document.querySelectorAll('.flip-card').forEach(card=>{
    const btn = card.querySelector('.flip-toggle') as HTMLButtonElement
    if (btn) {
        btn.addEventListener('click', ()=>{
            const is = card.classList.toggle('is-flipped') 
            btn.setAttribute('aria-expanded', String(is))
        })
    }
})

// ******* Sending Email logic ******* \\

declare var emailjs: any
emailjs.init('0wA6kpUaumn2FNdbg')
const messageSent = document.querySelector('#messageSent') as HTMLElement
const inputText = document.querySelectorAll('.inputText') as NodeListOf <HTMLInputElement>
const inputTextSelect = document.querySelectorAll('select') as  NodeListOf<HTMLSelectElement>

document.getElementById('myForm')?.addEventListener('submit', function(event) {
    event.preventDefault() // Prevent the default form submission
    emailjs.sendForm('service_m5a5vcb', 'template_1jfyvjh', this)
    .then(function(response: any) {
        messageSent.classList.remove('hide')
        inputText.forEach(text => text.value= '')
        inputTextSelect.forEach(select => select.selectedIndex = 0)
        console.log('SUCCESS!', response.status, response.text)
        setTimeout(()=>{ messageSent.classList.add('hide') }, 5000)
    }, function(error: any) {
        console.log('FAILED...', error)
        alert("Failed to send email.")
    })
})

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

const eventsPage = document.querySelector('body#eventsPage') as HTMLElement
const eventSwitchTab = () => {

    const tabsWrapper = eventsPage.querySelector('#all-tabs') as HTMLElement
    const allTabs =  [...tabsWrapper.querySelectorAll<HTMLInputElement>('.single-tab')]
    const allContents = [...eventsPage.querySelectorAll<HTMLDivElement>('.tab-content')]

    const showTab = (valueText: string) => {
        const contentId = `${valueText}-content`
        allContents.forEach(content => {
            const activeContent = content.id === contentId
            content.hidden = !activeContent
            content.setAttribute('aria-hidden', String(!activeContent))
            content.tabIndex = 1
        })
        
        allTabs.forEach(tab => {
            const selected = tab.value === valueText
            tab.checked = selected
            tab.classList.toggle('activeTab', tab.checked)
            tab.setAttribute('aria-selected', String(selected))
            tab.tabIndex = 1
        })
    }
    tabsWrapper.addEventListener('change', (e) => {
        const tabClicked = e.target as HTMLInputElement
        if (tabClicked) showTab(tabClicked.value)
    })
}
eventSwitchTab()

/***  ====> EVENTS CARDS <==== ***/

interface eventObj {
    event_title: string
    event_date: string
    event_location: string
    event_time: string
    event_description: string
    event_link: string
    event_picture: string
    event_isMostRecent: boolean
}

const templateCard = (singleEvent: eventObj): HTMLElement => {
    const cardElementWrapper = document.createElement('article') 
    cardElementWrapper.className = singleEvent.event_isMostRecent ? 'event_wrapper mostRecentEvt' : 'event_wrapper'
    
    const cardElement = document.createElement('div') 
    cardElement.className = singleEvent.event_isMostRecent ? 'event_card mostRecentEvt' : 'event_card'
    
    cardElementWrapper.append(cardElement)

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
    `

    const eTime =  cardElement.querySelector('.eTime') as HTMLElement
    eTime.className = singleEvent.event_time === '' ? 'eTime flex' : 'eTime flex ml-50'
    eTime.classList.toggle('hide', !singleEvent.event_isMostRecent)
    
    return cardElementWrapper  
}

const allEventsUpcoming: eventObj[] = [
    {
        event_title: 'Taste of Hope',
        event_date: 'Nov 6, 2025',
        event_location: 'Chicago, Navy Pier - AON Grand Ballroom',
        event_time: '6:00 pm - 9:00 pm',
        event_description: "This isn’t just a night out; it’s a movement toward a world without cancer. Join us as we celebrate over 35 amazing restaurants from the Chicagoland area, and let's make a difference together!",
        event_link: 'www.chicagotasteofhope.com',
        event_picture: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1760143358/Niko/new_materials/chef-kapernaros-on-the-pass_fl0osx.jpg',
        event_isMostRecent: true
    },
    {
        event_title: 'Harwood Heights Cooking Class',
        event_date: 'Dec 9, 2025',
        event_location: 'Harwood Heights, Recreation center',
        event_time: '6:00 pm - 8:30 pm',
        event_description: '',
        event_link: '',
        event_picture: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1760143358/Niko/new_materials/chef-kapernaros-on-the-pass_fl0osx.jpg',
        event_isMostRecent: true
    },
]
const allEventsPast: eventObj[] = [
    { 
        event_title: "Chicago Gourmet",
        event_date: "Sep 28, 2025",
        event_location: "Chicago, Harries Theater for Music and Dance",
        event_time: "",
        event_description: "Rise and Shine gourmet brunch",
        event_link: "",
        event_picture: "",
        event_isMostRecent: true
    },
    { 
        event_title: "Panos Food Show",
        event_date: "June 10, 2025",
        event_location: "Chicago, Drury Lane Theater",
        event_time: "",
        event_description: "Celebrating 50 years of Panos Food",
        event_link: "",
        event_picture: "",
        event_isMostRecent: true
    },
    { 
        event_title: `"I Cook For" benefit`,
        event_date: "March 20, 2025",
        event_location: "Chicago, Four Seasons Hotel",
        event_time: "",
        event_description: "Pierless Hospitality team of Navy Pier Chicago at 'I Cook For' Benefit",
        event_link: "",
        event_picture: "",
        event_isMostRecent: true
    },
    { 
        event_title: "Grand Chef Experience",
        event_date: "March 2, 2025",
        event_location: "Chicago, Field Museum",
        event_time: "",
        event_description: "For one more year It is a great honor for me and Pierless Hospitality team to support The Cystic Fibrosis Foundation, the world's leader in the search for a cure for CF.",
        event_link: "",
        event_picture: "",
        event_isMostRecent: true
    }
]

const allEventsCompetions: eventObj[] = [
    { 
        event_title: "Good Taste Series For Hyatt World Midwest",
        event_date: "2018",
        event_location: "Chicago, Hyatt McCormick",
        event_time: "",
        event_description: "Fine dining competitions awarded for excellence. First place winner.",
        event_link: "",
        event_picture: "",
        event_isMostRecent: true
    },
    { 
        event_title: "Good Taste Series For Hyatt Americas Final",
        event_date: "Sep, 2018",
        event_location: "Bahamas, Grand Hyatt",
        event_time: "",
        event_description: "Fine dining competitions awarded for excellence. First place winner.",
        event_link: "",
        event_picture: "",
        event_isMostRecent: true
    },
    { 
        event_title: "Beat Bobby Flay",
        event_date: "Oct, 2024",
        event_location: "New York",
        event_time: "",
        event_description: "Season 35, Episode 12 - Talk the Talk and Walk the Walk - Episode winner.",
        event_link: "",
        event_picture: "",
        event_isMostRecent: true
    },
    { 
        event_title: "Chopped",
        event_date: "Nov, 2024",
        event_location: "New York",
        event_time: "",
        event_description: "Season 60, Episode 2 - Big Fat Greek Kitchen - participant",
        event_link: "",
        event_picture: "",
        event_isMostRecent: true
    },
]

const upcomingContent = eventsPage.querySelector('#upcoming-content') as HTMLElement
allEventsUpcoming.forEach(event => { upcomingContent.append(templateCard(event)) })

const pastEventsContent = eventsPage.querySelector('#past_events-content') as HTMLElement
allEventsPast.forEach(event => { pastEventsContent.append(templateCard(event)) })

const competitionsContent = eventsPage.querySelector('#competitions-content') as HTMLElement
allEventsCompetions.forEach(event => { competitionsContent.append(templateCard(event)) })
