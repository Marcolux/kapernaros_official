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
observeInView('#landingPicBox img', -100)
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
const inputTextSelect = document.querySelectorAll('select.inputText') as  NodeListOf<HTMLSelectElement>

document.getElementById('myForm')?.addEventListener('submit', function(event) {
    event.preventDefault() // Prevent the default form submission
    emailjs.sendForm('service_m5a5vcb', 'template_1jfyvjh', this)
    .then(function(response: any) {
        messageSent.classList.remove('hide')
        inputText.forEach(text => text.value= '')
        inputTextSelect.forEach(text => text.value= 'Select One')
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

// Events page ====> Tabs switch logic

const eventSwitchTab = () => {

    const eventsPage = document.querySelector('body#eventsPage') as HTMLElement
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