"use strict";
class singlePic {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
class picCollection {
    constructor(id) {
        this.head = null;
        this.tail = null;
        this.id = id;
    }
    append(data) {
        const newSinglePic = new singlePic(data);
        if (!this.head) {
            this.head = newSinglePic;
            this.tail = newSinglePic;
        }
        else if (this.tail) {
            this.tail.next = newSinglePic;
            this.tail = newSinglePic;
        }
    }
    getSinglePic(index) {
        let currentSinglePic = this.head;
        let count = 0;
        // if currentSinglePic === null means that the while loop reached the end of the list because it will replace the currentPicture with is next currentSinglePic = currentSinglePic.next
        while (currentSinglePic !== null) {
            if (count === index)
                return currentSinglePic.data;
            count++;
            currentSinglePic = currentSinglePic.next;
        }
        return null;
    }
    getLastIndex() {
        let currentSinglePic = this.head;
        let count = 0;
        while (currentSinglePic !== null) {
            count++;
            currentSinglePic = currentSinglePic.next;
        }
        return count - 1;
    }
}
function initPicCollection(newPicturesList, collection) {
    let bigPic = document.querySelector(`#bigPic`);
    let carouselElement = bigPic.querySelector(`#singlePicCont`);
    carouselElement.innerHTML = '';
    let first = collection.shift();
    if (!newPicturesList.head) {
        collection.forEach(picture => { newPicturesList.append(picture); });
    }
    function showPicture(index) {
        carouselElement.innerHTML = '';
        const picture = newPicturesList.getSinglePic(index);
        if (index < newPicturesList.getLastIndex() && index !== 0) {
            carouselElement.innerHTML = `
                <div id="picShowing" class="flex flex-alignItems-center">
                    <button class="p-20" id="prevPicture">
                        <i class="fa-solid fa-chevron-left fontSize40"></i>
                    </button>
                    <div class="flex flex-justifyContent-center flex-alignItems-center picDiv" >
                        <img class="picToEn" src="${picture.src}" alt="Media Picture">
                        <p class="mediaCaption">${picture.caption}</p>
                    </div>
                    <button class="p-20" id="nextPicture">
                        <i class="fa-solid fa-chevron-right fontSize40"></i>
                    </button>
                </div>
            `;
        }
        else if (index === newPicturesList.getLastIndex()) {
            carouselElement.innerHTML = `
                <div id="picShowing" class="flex flex-alignItems-center">
                    <button class="p-20" id="prevPicture">
                        <i class="fa-solid fa-chevron-left fontSize40"></i>
                    </button>
                    <div class="flex flex-justifyContent-center flex-alignItems-center picDiv" >
                        <img class="picToEn" src="${picture.src}" alt="Media Picture">
                        <p class="mediaCaption">${picture.caption}</p>
                    </div>

                    <div class="p-20 emptyBox"></div>
                </div>
            `;
        }
        else if (index === 0) {
            carouselElement.innerHTML = `
                <div id="picShowing" class="flex flex-alignItems-center">
                    <div class="p-20 emptyBox"></div>

                    <div class="flex flex-justifyContent-center flex-alignItems-center picDiv" >
                        <img class="picToEn" src="${picture.src}" alt="Media Picture">
                        <p class="mediaCaption">${picture.caption}</p>
                    </div>
                    <button class="p-20" id="nextPicture">
                        <i class="fa-solid fa-chevron-right fontSize40"></i>
                    </button>
                </div>
            `;
        }
        if (!picture.caption) {
            const nullCaption = carouselElement.querySelector('.mediaCaption');
            nullCaption === null || nullCaption === void 0 ? void 0 : nullCaption.classList.add('hide');
        }
        if (picture.src === 'https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714608753/Niko/f_f_14_dulpgp.webp') {
            const firstCaption = carouselElement.querySelector('.mediaCaption');
            firstCaption.style.right = '88%';
        }
        setTimeout(() => {
            const imgs = carouselElement.querySelector('img');
            const imgShowing = carouselElement.querySelector('#picShowing');
            imgs.classList.add('show');
            imgs.addEventListener('click', function () {
                imgs.requestFullscreen();
                imgShowing.classList.add('fullscreen-mode');
            });
            document.addEventListener('fullscreenchange', () => {
                if (!document.fullscreenElement) {
                    imgShowing.classList.remove('fullscreen-mode');
                }
            });
        }, 150);
        const prevButton = document.getElementById('prevPicture');
        const nextButton = document.getElementById('nextPicture');
        if (prevButton) {
            prevButton.addEventListener('click', () => { movePicture(-1); });
        }
        if (nextButton) {
            nextButton.addEventListener('click', () => { movePicture(1); });
        }
    }
    // initial Picture showing on first load defined by currentPictureIndex
    showPicture(0);
    let currentPictureIndex = 0;
    function movePicture(n) {
        currentPictureIndex = currentPictureIndex + n;
        // Wrap the index if it goes out of bounds
        const totalPictures = newPicturesList.getLastIndex();
        if (currentPictureIndex >= totalPictures) {
            currentPictureIndex = totalPictures;
        }
        else if (currentPictureIndex === 0) {
            currentPictureIndex = 0;
        }
        showPicture(currentPictureIndex);
    }
    document.addEventListener('keydown', function (event) {
        if (event.key === "ArrowLeft") { // Left arrow key
            movePicture(-1);
        }
        else if (event.key === "ArrowRight") { // Right arrow key
            movePicture(1);
        }
    });
    collection.unshift(first);
    console.log('carousel running 1');
}
// Wait for the DOM to fully load before initializing the carousel
document.addEventListener('DOMContentLoaded', function () {
    const friendsCelebList = new picCollection('friendsCelebList');
    const growingInGreeceList = new picCollection('growingInGreeceList');
    const charityEventsList = new picCollection('charityEventsList');
    const competitionShows = new picCollection('competitionShows');
    const onThePass = new picCollection('onThePass');
    const chicagoChefsCookbookLaunch = new picCollection('chicagoChefsCookbookLaunch');
    const allLists = [
        friendsCelebList,
        growingInGreeceList,
        charityEventsList,
        competitionShows,
        onThePass,
        chicagoChefsCookbookLaunch
    ];
    const friendsCelebList_src = [
        { src: 'friendsCelebList', caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714608753/Niko/f_f_14_dulpgp.webp", caption: 'Jose Andres' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714611082/Niko/f_f_16_i861kj.webp", caption: 'Tony Priolo, Eva Davidman & Darren Gest' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714611418/Niko/f_f_19_cygdn0.webp", caption: 'Sarah Grueneberg' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714612983/Niko/f_f_32_jvdutb.webp", caption: 'Fabio Viviani' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714607529/Niko/f_f_11_metou3.webp", caption: 'Sanaa Abourezk' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714607192/Niko/f_f_9_zacdoe.webp", caption: 'Brother Luck' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/q_80,w_800,h_1200,c_fill/v1714603600/Niko/f_f_3_ypggwg.webp", caption: 'Izzy Arroyo & Kostas Chaidaropoulos' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/q_80,w_800,h_1200,c_fill/v1714604103/Niko/f_f_4_tu7gvz.webp", caption: 'Jose Andres' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/q_80,w_800,c_fill/v1714604694/Niko/f_f_5_pti2yn.webp", caption: 'Sarah Stegner' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714607390/Niko/f_f_10_y0mfzb.webp", caption: 'Paul Kahan' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714611192/Niko/f_f_17_dhcths.webp", caption: 'Anthony Martorina' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714611927/Niko/f_f_24_bl55y4.webp", caption: 'Logan Sandoval & Michelle Garcia' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714613141/Niko/f_f_34_zcya8h.webp", caption: 'Darnell Reed' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714613623/Niko/f_f_37_pxhi3p.webp", caption: 'Casey Nicole Doody' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1715041545/viber_image_2024-05-06_19-19-15-109_gco6hq.webp", caption: "D'Andre Carter" },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1715041545/viber_image_2024-05-06_19-19-34-967_shgs66.webp", caption: 'Soo Kyo Ahn' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1715044783/viber_image_2024-05-06_20-09-18-396_erkru4.webp", caption: 'Robert Lang & Quince' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1715044784/viber_image_2024-05-06_20-12-45-373_xckkgu.webp", caption: 'John Boudouvas' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714613295/Niko/f_f_35_zgjzm4.webp", caption: 'Tim Allen' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714611315/Niko/f_f_18_nwuxra.webp", caption: 'Kendall Jenner' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1715041546/viber_image_2024-05-06_09-14-52-204_kcwld6.webp", caption: 'Michelle Mekky' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1715041545/viber_image_2024-05-06_19-23-35-469_u0xdb4.webp", caption: 'Dj Tiesto' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1715041545/viber_image_2024-05-06_18-16-04-970_nxefty.webp", caption: 'Phil Vettel & Eleftheria Sioulas' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1715041545/viber_image_2024-05-06_19-22-41-400_kjycqo.webp", caption: 'Makropoulos & Stan' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/q_80,w_800,h_1200,c_fill/v1714601356/Niko/f_f_2_bpez7h.webp", caption: 'Tamron Hall' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714696956/20231222_160947_lzbtfg.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/q_80,w_800,h_1200,c_fill/v1714605010/Niko/f_f_6_lapp0q.webp", caption: 'Roquan Smith' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714605777/Niko/f_f_7_f2s8zh.webp", caption: 'Andre Drummond' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714606635/Niko/f_f_8_lbql67.webp", caption: 'Cole Kmet & Lou Canellis' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714607629/Niko/f_f_12_lw4pkp.webp", caption: 'Candace Collins' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714607919/Niko/f_f_13_njsqqk.webp", caption: 'Tsotras H & Kyrkos A' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714610871/Niko/f_f_15_syo3bh.webp", caption: 'Justin Fields' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714611504/Niko/f_f_20_yxq3gm.webp", caption: 'Matt Eberflus' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714611614/Niko/f_f_21_n0jrv2.webp", caption: 'Nick Galis ' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714611684/Niko/f_f_22_agudmu.webp", caption: 'Nick Galis' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714611853/Niko/f_f_23_zgxxng.webp", caption: 'Dimitris Basis' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714612087/Niko/f_f_25_oai4zu.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714612235/Niko/f_f_26_oi8rbi.webp", caption: 'Basis D & Protopsalti A.' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714612584/Niko/f_f_28_uvsrep.webp", caption: 'Dina Bair' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714612645/Niko/f_f_29_rznm8c.webp", caption: 'Dawn Hashbrouk' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714612758/Niko/f_f_30_le2dkm.webp", caption: 'Evrod Cassimy & Matthew Rodriguez ' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714612846/Niko/f_f_31_hetsw8.webp", caption: 'Linda Bacin' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714613151/Niko/f_f_33_ke48sd.webp", caption: 'Kevin Warren' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714613366/Niko/f_f_36_j484sl.webp", caption: 'Lisa Fielding' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1714613639/Niko/f_f_38_mfwtlr.webp", caption: 'Amy Rutledge & Tonya Francisco' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/q_auto,f_auto/v1715304167/viber_image_2024-05-07_22-30-12-805_kndjk7.webp", caption: 'Gianluigi Buffon' },
    ];
    const growingInGreeceList_src = [
        { src: 'growingInGreeceList', caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618491/Niko/niko-growing%20greece/g_g_17_mrjstu.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714614499/Niko/niko-growing%20greece/g_g_5_qva7un.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714615983/Niko/niko-growing%20greece/g_g_10_h4dbvx.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714614491/Niko/niko-growing%20greece/g_g_4_peo48x.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714616225/Niko/niko-growing%20greece/g_g_12_nw6vmq.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714615676/Niko/niko-growing%20greece/g_g_8_xaopxm.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714615465/Niko/niko-growing%20greece/g_g_7_tyzfaa.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714615279/Niko/niko-growing%20greece/g_g_6_vtni3k.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714616872/Niko/niko-growing%20greece/g_g_15_o0hg55.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715042825/viber_image_2024-05-06_19-45-23-203_zf7az0.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715042825/viber_image_2024-05-06_19-43-41-114_ysefnx.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714614484/Niko/niko-growing%20greece/g_g_3_xbjxxr.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715042394/viber_image_2024-05-01_23-10-59-123_qe9moc.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/w_1100,h_1000,c_fill/v1714614217/Niko/niko-growing%20greece/g_g_1_r7i5t5.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715042558/viber_image_2024-05-06_19-41-34-011_pso3vm.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715042653/viber_image_2024-05-06_19-42-54-272_boedrs.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/w_1300,h_900,c_fill/v1714614224/Niko/niko-growing%20greece/g_g_2_myfflq.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714617566/Niko/niko-growing%20greece/g_g_16_jrjtzg.webp", caption: null },
    ];
    const charityEventsList_src = [
        { src: "charityEventsList", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618577/Niko/charity%20events/c_e_5_ybs4do.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618551/Niko/charity%20events/c_e_2_wnpmve.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618559/Niko/charity%20events/c_e_3_wup5of.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618542/Niko/charity%20events/c_e_1_nnx7ps.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618568/Niko/charity%20events/c_e_4_lxljgw.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618586/Niko/charity%20events/c_e_6_jgwge1.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619085/Niko/charity%20events/c_e_7_jvuw9w.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618606/Niko/charity%20events/c_e_8_wskun4.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618751/Niko/charity%20events/c_e_9_afuwys.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618761/Niko/charity%20events/c_e_10_v4gaep.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618771/Niko/charity%20events/c_e_11_ffbduo.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714618781/Niko/charity%20events/c_e_12_pdspri.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715043466/viber_image_2024-05-06_18-16-05-002_fw3f69.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715043465/viber_image_2024-05-06_18-16-04-986_pfvada.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715043469/viber_image_2024-05-06_19-21-37-845_ffk9gl.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619460/Niko/competitions/c_s_2_tfjvel.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715043470/viber_image_2024-05-06_19-24-23-920_c1p4hs.webp", caption: null },
    ];
    const competitionShows_src = [
        { src: "competitionShows", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1726763368/Niko/competitions/BobbyFlay_3_pwamwn.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1726763368/Niko/competitions/BobbyFlay_2_flbrxf.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1726763368/Niko/competitions/BobbyFlay_1_ln5jbt.webp", caption: 'Chef Monique Feybesse & Bobby Flay' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1727106224/Niko/competitions/Action___Bobby_Flay_w22uvp.webp", caption: 'Chef Jet Tila' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1726763368/Niko/competitions/BobbyFlay_5_b9cztz.webp", caption: 'Chef Jet Tila & Amanda Kloots' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1726763368/Niko/competitions/BobbyFlay_4_u0abbm.webp", caption: 'Bobby Flay' },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619837/Niko/competitions/c_s_8_a7ucnk.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619857/Niko/competitions/c_s_10_cgzqss.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715043709/viber_image_2024-05-01_23-12-10-266_s3fepo.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619451/Niko/competitions/c_s_1_nzov2c.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619771/Niko/competitions/c_s_5_qhlsa1.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619828/Niko/competitions/c_s_6_qbbqox.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714619847/Niko/competitions/c_s_9_a90wfg.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715044353/viber_image_2024-05-06_20-09-37-226_wcqxyh.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715044354/viber_image_2024-05-06_20-10-02-886_kxyucd.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715044356/viber_image_2024-05-06_20-10-58-696_eaq8r7.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715044357/viber_image_2024-05-06_20-11-37-388_msbjub.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715044360/viber_image_2024-05-06_20-11-49-074_ydicli.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715044481/viber_image_2024-05-06_20-13-05-582_asboxj.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715044483/viber_image_2024-05-06_20-13-28-286_o6c2sf.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715044484/viber_image_2024-05-06_20-13-56-208_gkkp0i.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715044520/viber_image_2024-05-06_20-14-21-324_ehbbdj.webp", caption: null },
    ];
    const onThePass_src = [
        { src: "onThePass", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620128/Niko/on%20the%20pass/o_t_p_4_efmsmz.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620119/Niko/on%20the%20pass/o_t_p_3_wnefgs.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620109/Niko/on%20the%20pass/o_t_p_2_q4hmvq.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620100/Niko/on%20the%20pass/o_t_p_1_va8hpk.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620341/Niko/on%20the%20pass/o_t_p_5_z9bvsq.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620351/Niko/on%20the%20pass/o_t_p_6_abdl2b.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620361/Niko/on%20the%20pass/o_t_p_7_xtkrv7.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620371/Niko/on%20the%20pass/o_t_p_8_f5uqa0.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620536/Niko/on%20the%20pass/o_t_p_9_babbqd.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620546/Niko/on%20the%20pass/o_t_p_10_k8dkae.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1716565169/Niko/on%20the%20pass/viber_image_2024-05-20_15-00-03-885_tv4ejz.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620557/Niko/on%20the%20pass/o_t_p_11_spnsd6.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620568/Niko/on%20the%20pass/o_t_p_12_mglkcu.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620784/Niko/on%20the%20pass/o_t_p_13_bs7c0y.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1714620795/Niko/on%20the%20pass/o_t_p_14_f2im1y.webp", caption: null },
    ];
    const chicagoChefsCookbookLaunch_src = [
        { src: "chicagoChefsCookbookLaunch", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715716400/Niko/Chicago%20Chefs%20Cookbook%20Launch/viber_image_2024-05-13_20-48-12-036_v6lv8n.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715716400/Niko/Chicago%20Chefs%20Cookbook%20Launch/viber_image_2024-05-13_20-48-12-160_cbwj6s.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715716399/Niko/Chicago%20Chefs%20Cookbook%20Launch/viber_image_2024-05-13_20-48-11-746_azbrgv.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715716399/Niko/Chicago%20Chefs%20Cookbook%20Launch/viber_image_2024-05-13_20-48-11-840_xj1yho.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715716398/Niko/Chicago%20Chefs%20Cookbook%20Launch/viber_image_2024-05-13_20-48-11-509_gdy0cm.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715716397/Niko/Chicago%20Chefs%20Cookbook%20Launch/viber_image_2024-05-13_20-48-11-406_d4ezzg.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715716397/Niko/Chicago%20Chefs%20Cookbook%20Launch/viber_image_2024-05-13_20-48-11-295_kbnkgq.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715716397/Niko/Chicago%20Chefs%20Cookbook%20Launch/viber_image_2024-05-13_20-48-11-207_utomno.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715716397/Niko/Chicago%20Chefs%20Cookbook%20Launch/viber_image_2024-05-13_20-48-10-901_mdhyzl.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715716397/Niko/Chicago%20Chefs%20Cookbook%20Launch/viber_image_2024-05-13_20-48-11-012_qi5ivs.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715716396/Niko/Chicago%20Chefs%20Cookbook%20Launch/viber_image_2024-05-13_20-48-10-784_bgcbkn.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715716395/Niko/Chicago%20Chefs%20Cookbook%20Launch/viber_image_2024-05-13_20-48-10-653_yn8azw.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715716395/Niko/Chicago%20Chefs%20Cookbook%20Launch/viber_image_2024-05-13_20-48-10-755_xggfj7.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715716395/Niko/Chicago%20Chefs%20Cookbook%20Launch/viber_image_2024-05-13_20-48-10-416_mg8jee.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715716395/Niko/Chicago%20Chefs%20Cookbook%20Launch/viber_image_2024-05-13_20-48-10-571_rckmzn.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715716394/Niko/Chicago%20Chefs%20Cookbook%20Launch/viber_image_2024-05-13_20-48-10-198_g5wqmi.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715716394/Niko/Chicago%20Chefs%20Cookbook%20Launch/viber_image_2024-05-13_20-48-10-315_ccwxlp.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715716394/Niko/Chicago%20Chefs%20Cookbook%20Launch/viber_image_2024-05-13_20-48-10-241_gtfeha.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715716394/Niko/Chicago%20Chefs%20Cookbook%20Launch/viber_image_2024-05-13_20-48-10-270_edhi42.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715716394/Niko/Chicago%20Chefs%20Cookbook%20Launch/viber_image_2024-05-13_20-48-09-888_arbo5h.webp", caption: null },
        { src: "https://res.cloudinary.com/drdrs6pdq/image/upload/v1715716394/Niko/Chicago%20Chefs%20Cookbook%20Launch/viber_image_2024-05-13_20-48-09-943_moyknm.webp", caption: null },
    ];
    const allSources = [friendsCelebList_src, growingInGreeceList_src, charityEventsList_src, competitionShows_src, onThePass_src, chicagoChefsCookbookLaunch_src];
    let allNotActiveTi = document.querySelectorAll('.secTitles');
    allNotActiveTi.forEach(listEl => {
        listEl.addEventListener('click', () => {
            allNotActiveTi = document.querySelectorAll('.secTitles');
            const picColl = allLists.filter(list => list.id === listEl.id);
            const picSource = allSources.filter(list => list[0].src === listEl.id);
            initPicCollection(picColl[0], picSource[0]);
        });
    });
    allNotActiveTi[3].addEventListener('click', () => {
        if (localStorage.getItem('loading_competions') === 'true')
            localStorage.removeItem('loading_competions');
    });
    localStorage.getItem('loading_competions') === 'true' ?
        allNotActiveTi[3].click()
        :
            allNotActiveTi[0].click();
});
