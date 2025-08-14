"use strict";
class singleSlide {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
class slidesList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    append(data) {
        const newSingleSlide = new singleSlide(data);
        if (!this.head) {
            this.head = newSingleSlide;
            this.tail = newSingleSlide;
        }
        else if (this.tail) {
            this.tail.next = newSingleSlide;
            this.tail = newSingleSlide;
        }
    }
    getSingleSlide(index) {
        let currentSingleSlide = this.head;
        let count = 0;
        // if currentSingleSlide === null means that the while loop reached the end of the list because it will replace the currentSlide with is next currentSingleSlide = currentSingleSlide.next
        while (currentSingleSlide !== null) {
            if (count === index)
                return currentSingleSlide.data;
            count++;
            currentSingleSlide = currentSingleSlide.next;
        }
        return null;
    }
    getLastIndex() {
        let currentSingleSlide = this.head;
        let count = 0;
        while (currentSingleSlide !== null) {
            count++;
            currentSingleSlide = currentSingleSlide.next;
        }
        return count - 1;
    }
}
function initCarousel() {
    const slide1 = {
        description: 'Born and raised in Piraeus, Greece, I began my career studying at the Greek Culinary Institute & working on islands such as Rhodes, Kos and Crete.',
        leftBG: '#000000',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1711495614/Niko/Rectangle_55_rwurxu.webp',
        picNote: 'Piraeus, Attica'
    };
    const slide2 = {
        description: 'In 2011, I achieved one of my dreams - teaching at the Culinary Institute of Greece, Anavissos, showcasing the cooking styles of Greek, French, Mediterranean and international cuisines.  My team and I worked closely with the Greek Government and the Council of the European Union on exhibitions featuring Greek cuisine and environmental sustainability.',
        leftBG: '#000000',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1711495906/Niko/Rectangle_52_xrwyz8.webp',
        picNote: 'Culinary Institute of Greece, Anavissos, Attica'
    };
    const slide3 = {
        description: 'As I continued teaching, I then settled into Grand Resort Lagonissi, Greece, a private peninsula Luxury Resort and member of Leading Hotels of the World.  I worked my way up and was entrusted to be the Head Chef for Lagonissi’s VIP guests such as royalty, world-renowned athletes, award-winning actors/actresses and those in the music industry. I ended my career at Grand Resort Lagonissi as Executive Sous Chef in 2018.',
        leftBG: '#000000',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1711495915/Niko/Rectangle_54_lltm3q.webp',
        picNote: 'Lagonissi, Attica'
    };
    const slide4 = {
        description: 'In 2018, my wife and I made the decision to move to Chicago to be closer to her family.  We packed up our home, and with our daughter, and moved to the other side of the world. I continued to pursue my passion for cooking, and in January of 2021 we welcomed a beautiful boy - making us a family of four.',
        leftBG: '#000000',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1712186480/Niko/chef-kapernaros.family2_kxxwzi.webp',
        picNote: ''
    };
    const slide5 = {
        description: 'In June 2018, I began carving my new path in Chicago as Chef de Cuisine at the Hyatt Regency Chicago.',
        leftBG: '#000000',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/v1754953076/Niko/new_hyatt_h9wckf.jpg',
        picNote: 'Hyatt Regency Chicago'
    };
    const slide6 = {
        description: 'In 2021, I joined the Avli restaurant group and assisted with opening Avli on the Park, located in Chicago Lakeshore East. I was hired to lead and expand the vision of contemporary Greek cuisine with an emphasis of curating a menu where everything is made from scratch. In 2023, the culinary team’s efforts were recognized and the restaurant was named a Michelin 2023 Honoree.',
        leftBG: '#000000',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/w_800/v1712191635/Niko/IMG_20210701_161941_808_qdmrcm.webp',
        picNote: 'Avli on the Park, Lakeshore East, Chicago'
    };
    const slide7 = {
        description: 'In June of 2024, I welcomed a new challenge and accepted a position with Levy Restaurants Cultural Attractions as Executive Chef of Navy Pier Chicago.  Here, I fuse culinary experiences with the timeless architectural beauty of Chicago and Lake Michigan.',
        leftBG: '#000000',
        rightBG: 'https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1719343585/Kapernaros_NavyPier_gae6ms.webp',
        picNote: 'Navy Pier, Chicago'
    };
    // After adding a new slide update the circle_(lastIndex) in scss file too
    const newSlidesList = new slidesList();
    // Append slide objects
    newSlidesList.append(slide1);
    newSlidesList.append(slide2);
    newSlidesList.append(slide3);
    newSlidesList.append(slide4);
    newSlidesList.append(slide5);
    newSlidesList.append(slide6);
    newSlidesList.append(slide7);
    let carouselElement = document.querySelector('#carousel');
    function showSlide(index) {
        const slide = newSlidesList.getSingleSlide(index);
        carouselElement.innerHTML = `
            <div class="flex singleCarouselSlide" id="slide_${index + 1}">
                <div id="timeline" class="flex flex-column flex-justifyContent-spaceAround">
                    
                    <div id="lineWhite"></div>
                    <div id="circleWhite" class="circle_${index} position_0"></div>
                </div>
                    
                <div id="slideDescription" class="flex flex-column flex-justifyContent-center flex-alignItems-center" style="background-color: ${slide.leftBG}"> 
                    <i id="prevSlide" class="fa-solid fa-chevron-up fontSize40"></i>            
                    <div id="slideText" class="p-20 mx-30">
                        <p class="my-0">${slide.description}</p>
                    </div> 
                    <i id="nextSlide" class="fa-solid fa-chevron-down fontSize40"></i>     
                </div>
                <div id="slidePic">
                    <img id="slideImg" src="${slide.rightBG}" alt="Carousel Picture">
                    <p class="m-0 note_${index}" id="picNote">${slide.picNote}</p>
                </div>
            </div>
        `;
        const prevButton = document.getElementById('prevSlide');
        const nextButton = document.getElementById('nextSlide');
        const slideImg = document.getElementById('slideImg');
        const slideText = document.getElementById('slideText');
        prevButton.addEventListener('click', () => {
            setTimeout(() => {
                const circleWhite = document.getElementById('circleWhite');
                const picNote = document.getElementById('picNote');
                circleWhite.classList.remove('position_0');
                circleWhite.classList.add('moveUp');
                setTimeout(() => {
                    picNote.classList.add('darker');
                }, 150);
                if (!circleWhite.classList.contains('circle_6')) {
                    setTimeout(() => {
                        circleWhite.style.opacity = '1';
                        circleWhite.style.transform = 'translateY(0%)';
                    }, 250);
                }
            }, 50);
            moveSlide(-1);
        });
        nextButton.addEventListener('click', () => {
            setTimeout(() => {
                const circleWhite = document.getElementById('circleWhite');
                const picNote = document.getElementById('picNote');
                circleWhite.classList.remove('position_0');
                circleWhite.classList.add('moveDown');
                setTimeout(() => {
                    picNote.classList.add('darker');
                }, 250);
                if (!circleWhite.classList.contains('circle_0')) {
                    setTimeout(() => {
                        circleWhite.style.opacity = '1';
                        circleWhite.style.transform = 'translateY(0%)';
                    }, 350);
                }
            }, 50);
            moveSlide(1);
        });
        let timelineElement = document.querySelector('#timeline');
        const lineWhite = document.getElementById('lineWhite');
        timelineElement.style.background = slide.leftBG;
        if (index >= newSlidesList.getLastIndex()) {
            nextButton.style.display = 'none';
            lineWhite.style.height = '50%';
            lineWhite.style.top = '0px';
            lineWhite.style.bottom = '';
        }
        else if (index === 0) {
            prevButton.style.display = 'none';
            lineWhite.style.height = '50%';
            lineWhite.style.bottom = '0px';
            lineWhite.style.top = '';
        }
        else if (index > 0 && index <= newSlidesList.getLastIndex()) {
            prevButton.style.display = '';
            nextButton.style.display = '';
            lineWhite.style.height = '100%';
        }
        // Animations
        setTimeout(() => {
            if (slideImg && slideText) {
                slideImg.style.width = '100%';
                slideText.style.scale = '1';
            }
        }, 200);
    }
    // initial slide showing on first load defined by currentSlideIndex
    showSlide(0);
    let currentSlideIndex = 0;
    function moveSlide(n) {
        currentSlideIndex = currentSlideIndex + n;
        // Wrap the index if it goes out of bounds
        const totalSlides = newSlidesList.getLastIndex();
        if (currentSlideIndex >= totalSlides) {
            currentSlideIndex = totalSlides;
        }
        else if (currentSlideIndex === 0) {
            currentSlideIndex = 0;
        }
        showSlide(currentSlideIndex);
    }
    console.log('carousel running');
}
// Wait for the DOM to fully load before initializing the carousel
document.addEventListener('DOMContentLoaded', function () {
    initCarousel(); // Call the initialization function once the DOM is ready
});
