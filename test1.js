if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

const circle = document.getElementById('circle');
const bgVideo = document.getElementById('bgVideo');
const bullseyeMask = document.getElementById('bullseyeMask');
const body = document.body;
const navbar = document.getElementById('navbar');
const centerImage = document.querySelector('.center-image');
const textTop = document.querySelector('.text:first-child');
const textBottom = document.querySelector('.text:last-child');
const valveLetter = document.querySelector('.valve-letter');
const pageInput = document.querySelector('.pageInput');
const navSelect = document.getElementById('navSelect');
const set = new Set([2, 3, 4, 5, 13, 17, 21, 23, 25, 29]);
const pageIndicator = document.querySelector('.page-indicator');
const socialIcons = document.querySelector('.social-icons');

const slides = [
  { id: 'secondSlidenew', flag: 'hasShownSecondSlidenew', done: 'secondSlidenewAnimationCompleted', line: '#secondSlidenew .vertical-line' },
  { id: 'secondSlide', flag: 'hasShownSecondSlide', done: 'secondSlideAnimationCompleted', line: '#secondSlide .vertical-line' },
  { id: 'fourthSlide', flag: 'hasShownFourthSlide', done: 'fourthSlideAnimationCompleted', line: '#fourthSlide .fourth-vertical-line' },
  { id: 'dtdHome', flag: 'hasShownDtdHome', done: 'dtdHomeAnimationCompleted' },
  { id: 'fifthnewSlide', flag: 'hasShownFifthnewSlide', done: 'fifthnewSlideAnimationCompleted', line: '#fifthnewSlide .vertical-line' },
  { id: 'fifthSlide', flag: 'hasShownFifthSlide', done: 'fifthSlideAnimationCompleted', line: '#fifthSlide .fifth-vertical-line' },
  { id: 'detailsSlide', flag: 'hasShownDetailsSlide', done: 'detailsSlideAnimationCompleted', line: '#detailsSlide .details-vertical-line' },
  { id: 'tenSlide', flag: 'hasShownTenSlide', done: 'tenSlideAnimationCompleted', line: '#tenSlide .ten-vertical-line' },
  { id: 'elevenSlide', flag: 'hasShownElevenSlide', done: 'elevenSlideAnimationCompleted', line: '#elevenSlide .eleven-vertical-line' },
  { id: 'tweleveSlide', flag: 'hasShownTweleveSlide', done: 'tweleveSlideAnimationCompleted', line: '#tweleveSlide .tweleve-vertical-line' },
  { id: 'thirteenSlide', flag: 'hasShownThirteenSlide', done: 'thirteenSlideAnimationCompleted', line: '#thirteenSlide .thirteen-vertical-line' },
  { id: 'bvdHome', flag: 'hasShownBvdHome', done: 'bvdHomeAnimationCompleted' },
  { id: 'nineSlide', flag: 'hasShownNineSlide', done: 'nineSlideAnimationCompleted', line: '#nineSlide .nine-vertical-line' },
  { id: 'detailsSlidenew9', flag: 'hasShownDetailsSlidenew9', done: 'detailsSlidenew9AnimationCompleted', line: '#detailsSlidenew9 .details-vertical-line' },
  { id: 'fifteenSlide', flag: 'hasShownFifteenSlide', done: 'fifteenSlideAnimationCompleted', line: '#fifteenSlide .fifteen-vertical-line' },
  { id: 'sdtdHome', flag: 'hasShownSdtdHome', done: 'sdtdHomeAnimationCompleted' },
  { id: 'sixSlide', flag: 'hasShownSixSlide', done: 'sixSlideAnimationCompleted', line: '#sixSlide .six-vertical-line' },
  { id: 'detailsSlidenew', flag: 'hasShownDetailsSlidenew', done: 'detailsSlidenewAnimationCompleted', line: '#detailsSlidenew .details-vertical-line' },
  { id: 'fourteenSlide', flag: 'hasShownFourteenSlide', done: 'fourteenSlideAnimationCompleted', line: '#fourteenSlide .fourteen-vertical-line' },
  { id: 'sdtdcHome', flag: 'hasShownSdtdcHome', done: 'sdtdcHomeAnimationCompleted' },
  { id: 'sevenSlide', flag: 'hasShownSevenSlide', done: 'sevenSlideAnimationCompleted', line: '#sevenSlide .seven-vertical-line' },
  { id: 'ytypeHome', flag: 'hasShownYtypeHome', done: 'ytypeHomeAnimationCompleted' },
  { id: 'eightSlide', flag: 'hasShownEightSlide', done: 'eightSlideAnimationCompleted', line: '#eightSlide .eight-vertical-line' },
  { id: 'bypassHome', flag: 'hasShownBypassHome', done: 'bypassHomeAnimationCompleted' },
  { id: 'nineteenthSlide', flag: 'hasShownNineteenthSlide', done: 'nineteenthSlideAnimationCompleted', line: '#nineteenthSlide .nineteenth-vertical-line' },
  { id: 'twentiethSlide', flag: 'hasShownTwentiethSlide', done: 'twentiethSlideAnimationCompleted', line: '#twentiethSlide .twentieth-vertical-line' },
  { id: 'twentiethoneSlide', flag: 'hasShownTwentiethoneSlide', done: 'twentiethoneSlideAnimationCompleted', line: '#twentiethoneSlide .twentiethone-vertical-line' },
  { id: 'scaleHome', flag: 'hasShownScaleHome', done: 'scaleHomeAnimationCompleted' },
  { id: 'sixteenthSlide', flag: 'hasShownSixteenthSlide', done: 'sixteenthSlideAnimationCompleted', line: '#sixteenthSlide .sixteenth-vertical-line' },
  { id: 'seventeenthSlide', flag: 'hasShownSeventeenthSlide', done: 'seventeenthSlideAnimationCompleted', line: '#seventeenthSlide .seventeenth-vertical-line' },
  { id: 'eighteenSlide', flag: 'hasShownEighteenSlide', done: 'eighteenSlideAnimationCompleted', line: '#eighteenSlide .eighteen-vertical-line' },
  { id: 'thankyou', flag: 'hasShownThankyou', done: 'thankyouAnimationCompleted' },

].map(s => ({
  ...s,
  slide: document.getElementById(s.id),
  lineEl: document.querySelector(s.line)
}));

// Animation flags
const animationFlags = {
  hasAnimatedV: false,
  textAnimationCompleted: false
};

slides.forEach(s => {
  animationFlags[s.flag] = false;
  animationFlags[s.done] = false;
});

// Scroll suppression flag
let isProgrammaticScroll = false;

let lastScrollY = window.scrollY;
let isScrollingDown = false;

textBottom?.addEventListener('transitionend', () => {
  animationFlags.textAnimationCompleted = true;

  setTimeout(() => {
    navSelect?.classList.add('visible');
    pageInput?.classList.add('visible');
    socialIcons?.classList.add('visible');
  }, 500);


  if (isScrollingDown) {
    setTimeout(() => {
      scrollToPage(2);
    }, 600);
  }

});

slides.forEach(s => {
  s.slide?.addEventListener('transitionend', () => {
    animationFlags[s.done] = true;
    if (s.slide?.classList.contains('slide-out')) {
      s.slide.classList.remove('visible', 'slide-out');
      updateCurrentPage()
    }
  });
});


let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      isScrollingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;

      if (!isProgrammaticScroll) {
        handleScroll(currentScrollY);
      }

      ticking = false;
    });

    ticking = true;
  }
});



function handleScroll(scrollY) {

  const baseScroll = 280;

  if (scrollY > 150 && !animationFlags.hasAnimatedV) {
    animationFlags.hasAnimatedV = true;
    circle?.classList.add('zoom-out');
    bullseyeMask?.classList.add('zoom-out');
    if (bgVideo) bgVideo.style.opacity = 0;
    body.classList.add('gray-bg');

    navbar.style.display = 'flex';
    navbar.classList.add('visible');

    setTimeout(() => {
      if (!isScrollingDown) return
      centerImage?.classList.add('fade-out');
      textTop?.classList.add('scroll-to-top');
      textBottom?.classList.add('scroll-to-top');
      valveLetter?.classList.add('draw-line');
      textBottom?.classList.add('center-valve-text');

    }, 2000);
  }

  slides.forEach((s, index) => {
    const offset = baseScroll + index * 300;
    const prevDone = index === 0 ? 'textAnimationCompleted' : slides[index - 1].done;

    if (
      isScrollingDown &&
      index === slides.length - 1 &&
      scrollY >= offset - 5 &&
      !animationFlags[s.flag]
    ) {
      scrollY = offset + 1;
    }

    if (scrollY > offset && !animationFlags[s.flag] && animationFlags[prevDone] && isScrollingDown) {
      animationFlags[s.flag] = true;
      s.slide?.classList.add('visible');
      s.lineEl?.classList.add('active');

      if (s.id === 'secondSlidenew') {
        pageIndicator?.classList.add('visible');
      }
    } else if (scrollY <= offset && animationFlags[s.flag]) {
      animationFlags[s.flag] = false;
      animationFlags[s.done] = false;

      s.slide?.classList.add('fade-out');
      s.lineEl?.classList.remove('active');

      s.slide?.addEventListener('transitionend', function onTransitionEnd() {
        s.slide?.classList.remove('fade-out', 'visible');
        s.slide?.removeEventListener('transitionend', onTransitionEnd);
      });

      if (s.id === 'secondSlidenew') {
        pageIndicator?.classList.remove('visible');
      }
    }

  });


  if (scrollY <= 100 && animationFlags.hasAnimatedV) {
    animationFlags.hasAnimatedV = false;
    circle?.classList.remove('zoom-out');
    bullseyeMask?.classList.remove('zoom-out');
    if (bgVideo) bgVideo.style.opacity = 1;
    body.classList.remove('gray-bg');
    navbar.classList.remove('visible');

    setTimeout(() => {
      navbar.style.display = 'none';
      pageIndicator?.classList.remove('visible');
      navSelect?.classList.remove('visible');
      pageInput?.classList.remove('visible');
      socialIcons?.classList.remove('visible');
    }, 500);

    centerImage?.classList.remove('fade-out');
    textTop?.classList.remove('scroll-to-top');
    textBottom?.classList.remove('scroll-to-top');
    valveLetter?.classList.remove('draw-line');
    textBottom?.classList.remove('center-valve-text');

    animationFlags.textAnimationCompleted = true;

    slides.forEach(s => {
      animationFlags[s.flag] = false;
      animationFlags[s.done] = false;
      s.slide?.classList.remove('visible', 'slide-out');
      s.lineEl?.classList.remove('active');
    });
  }
  updateCurrentPage();
}

function updateCurrentPage() {
  let visibleIndex = -1;

  slides.forEach((s, index) => {
    if (s.slide?.classList.contains('visible')) {
      const rect = s.slide.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        visibleIndex = index;
      }
    }
  });

  playAudioForPage(visibleIndex + 2)
  const pageNumber = visibleIndex >= 0 ? visibleIndex + 2 : 1;
  if (parseInt(pageInput?.value) !== pageNumber && pageNumber > 1) {
    pageInput.value = pageNumber;
  }

  if (set.has(pageNumber)) {
    for (let i = 0; i < navSelect.options.length; i++) {
      const option = navSelect.options[i];
      const dataId = parseInt(option.getAttribute('data-id'), 10);

      if (dataId === pageNumber) {
        navSelect.selectedIndex = i;
        break;
      }
    }
  } else {
    const sortedSet = Array.from(set).sort((a, b) => a - b);
    let targetPage = -1;
    let left = 0, right = sortedSet.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (sortedSet[mid] < pageNumber) {
        targetPage = sortedSet[mid];
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    if (targetPage !== -1) {
      selectOptionByDataId(targetPage);
    } else {
      console.warn("No valid option found");
    }
  }

  const isThankYouPage = slides[pageNumber - 2]?.id === 'thankyou';
   
  if (isThankYouPage) {
    pageIndicator?.classList.remove('visible');
    navSelect?.classList.remove('visible');
    pageInput?.classList.remove('visible');
    navbar?.classList.remove('visible');
    navbar.style.display = 'none';
    socialIcons?.classList.remove('visible');
  } else if(pageNumber>2){
    pageIndicator?.classList.add('visible');
    navSelect?.classList.add('visible');
    pageInput?.classList.add('visible');
    navbar?.classList.add('visible');
    navbar.style.display = 'flex';
    socialIcons?.classList.add('visible');
  }


}


function showOnlySlide(indexToShow) {
  slides.forEach((s, index) => {
    const isTarget = index === indexToShow - 1;
    if (isTarget) {
      s.slide?.classList.add('visible');
      s.lineEl?.classList.add('active');
      animationFlags[s.flag] = true;
      animationFlags[s.done] = true;
    } else {
      s.slide?.classList.remove('visible', 'slide-out');
      s.lineEl?.classList.remove('active');
      animationFlags[s.flag] = false;
      animationFlags[s.done] = false;
    }
  });

  if (indexToShow >= 1) {
    pageIndicator?.classList.add('visible');
  } else {
    pageIndicator?.classList.remove('visible');
  }
}

function selectOptionByDataId(targetPage) {
  for (let i = 0; i < navSelect.options.length; i++) {
    const option = navSelect.options[i];
    const dataId = parseInt(option.getAttribute('data-id'), 10);
    if (dataId === targetPage) {
      navSelect.selectedIndex = i;
      break;
    }
  }
}

function scrollToPage(page) {
  if (isNaN(page) || page < 1 || page > slides.length + 1) return;

  playAudioForPage(page);
  if (page >= 1) {
    pageIndicator?.classList.add('visible');
  } else {
    pageIndicator?.classList.remove('visible');
  }
  isProgrammaticScroll = true;

  const offset = page === 1 ? 0 : 280 + (page - 2) * 300;

  slides.forEach((s, index) => {
    if (index < page - 1) {
      s.slide?.classList.add('visible');
      s.lineEl?.classList.add('active');
      animationFlags[s.flag] = true;
      animationFlags[s.done] = true;
    } else {
      s.slide?.classList.remove('visible', 'slide-out');
      s.lineEl?.classList.remove('active');
      animationFlags[s.flag] = false;
      animationFlags[s.done] = false;
    }
  });

  window.scrollTo({ top: offset + 10, behavior: 'smooth' });

  if (set.has(page)) {
    selectOptionByDataId(page);
  } else {
    const sortedSet = Array.from(set).sort((a, b) => a - b);
    let targetPage = -1;
    let left = 0, right = sortedSet.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (sortedSet[mid] < page) {
        targetPage = sortedSet[mid];
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    if (targetPage !== -1) {
      selectOptionByDataId(targetPage);
    } else {
      console.warn("No valid option found");
    }
  }

  setTimeout(() => {
    isProgrammaticScroll = false;
    updateCurrentPage();
  }, 800);
}


const pageMapping = {
  '.second-slide-new': 2,
  '.second-slide': 3,
  '.fourth-slide': 4,
  '.dtd-home': 5,
  '.bvd-home': 13,
  '.sdtd-home': 17,
  '.sdtd-c-home': 21,
  '.ytypehome': 23,
  '.bypasshome': 25,
  '.scalehome': 29,
};


navSelect?.addEventListener('change', () => {
  const pageNumber = pageMapping[navSelect.value];
  if (pageNumber) {
    pageInput.value = pageNumber;
    scrollToPage(pageNumber);
  }
});

pageInput?.addEventListener('change', e => {
  scrollToPage(parseInt(e.target.value));
});



const videoContainer = document.getElementById("videoContainer");
const video = document.getElementById("video");
const magnifier = document.getElementById("magnifier");
const zoomedVideo = document.getElementById("zoomedVideo");


video.addEventListener("play", () => zoomedVideo.play());
video.addEventListener("pause", () => zoomedVideo.pause());
video.addEventListener("timeupdate", () => {
  zoomedVideo.currentTime = video.currentTime;
});


videoContainer.addEventListener("mousemove", (e) => {
  const { left, top, width, height } = videoContainer.getBoundingClientRect();
  const x = e.clientX - left;
  const y = e.clientY - top;


  magnifier.style.left = `${x}px`;
  magnifier.style.top = `${y}px`;
  magnifier.style.display = "block";

  const scale = 2;
  zoomedVideo.style.width = `${width * scale}px`;
  zoomedVideo.style.height = `${height * scale}px`;
  zoomedVideo.style.left = `-${x * scale - magnifier.offsetWidth / 2}px`;
  zoomedVideo.style.top = `-${y * scale - magnifier.offsetHeight / 2}px`;

});


videoContainer.addEventListener("mouseleave", () => {
  magnifier.style.display = "none";
});



function handleScrollAnimation(element, showClass, hideClass) {
  var rect = element.getBoundingClientRect();
  var windowHeight = window.innerHeight;

  var isVisible = rect.top < windowHeight && rect.bottom >= 0;

  if (isVisible) {
    if (!element.classList.contains(showClass)) {
      element.classList.add(showClass);
    }
    element.classList.remove(hideClass);
  } else {
    if (!element.classList.contains(hideClass)) {
      element.classList.add(hideClass);
    }
    element.classList.remove(showClass);
  }
}

window.addEventListener("scroll", function () {
  var sections = [
    { selector: ".second-slide-new", in: "slide-in", out: "slide-out" },
    { selector: ".details-slide", in: "fade-in", out: "fade-out" },
    { selector: ".fourth-slide", in: "zoom-in", out: "zoom-out" }
  ];

  sections.forEach(item => {
    const element = document.querySelector(item.selector);
    if (element) {
      handleScrollAnimation(element, item.in, item.out);
    }
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const valveImage = document.getElementById('img-center');
  const detailsDescription = document.querySelector('.details-description1');
  const featureList = detailsDescription.querySelector('.feature-list');
  const diverterTitle = document.querySelector('.standard-diverter-text');

  const segments = document.querySelectorAll('.segment');
  const labels = document.querySelectorAll('.segment-label');

  const valveMap = {
    'dtd': {
      image: './images/DTDnew.png',
      title: 'Drum Type Diverter (DTD)',
      description: [
        'DTD are designed to divert or converge dry bulk materials with minimal degradation in pneumatic systems',
        'They support both pressure and vacuum conveying applications',
        'Sealing options include static silicone (up to 2 bar) and dynamic silicone (up to 6 bar) based on pressure needs',
        'Available in sizes ranging from 50 mm to 200 mm for versatile system integration'
      ]
    },
    'bdv': {
      image: './images/BDV.png',
      title: 'BDV Diverter',
      description: [
        'BDVs divert or converge dry bulk materials in pneumatic conveying systems',
        'Suitable for pressure (up to 6 bar g) and vacuum (-0.5 bar g) applications',
        'Seal options: Polyurethane, Viton, and Silicone',
        'Available in sizes from 65 mm to 250 mm'
      ]
    },
    'sdtd': {
      image: './images/SDTD.png',
      title: 'Single Drum Type Diverter (SDTD)',
      description: [
        'SDTD diverts dry bulk materials in pneumatic conveying systems',
        'Works with both pressure and vacuum conveying',
        'Seal options: Static (1.5 bar) and Dynamic (6 bar)',
        'Available in sizes from 150 mm to 300 mm'
      ]
    },
    'sdtd-c': {
      image: './images/SDTD.png',
      title: 'Single Drum Type Diverter (SDTD-C)',
      description: [
        'SDTD diverts dry bulk materials in pneumatic conveying systems',
        'Works with both pressure and vacuum conveying',
        'Seal options: Static (1.5 bar) and Dynamic (6 bar)',
        'Available in sizes from 150 mm to 300 mm'
      ]
    },
    'ytype': {
      image: './images/Ytype.png',
      title: 'Flap Type Diverter - (Y-valve)',
      description: [
        'Sliding Rails option in RV is very useful for cleaning of valve with ease and less effort',
        'It is available for Exec.2 and dairy versions'
      ]
    },
    'bypass': {
      image: './images/bypass.png',
      title: 'By Pass valve',
      description: [
        'By-Pass Valve (BPV) is also called as “Air Only Diverter” specifically designed to divert the air in pneumatic conveying systems.',
        'This is typically used in Lean Phase Pneumatic Conveying Systems for both pressure and vacuum conveying applications.'
      ]
    },
    'scale': {
      image: './images/Scale valve.webp',
      title: 'Scale Valve',
      description: [
        'Scale Valve (SV-A  also known as a Bottom Diverter or Fill Vent Diverter) is a pneumatically actuated diversion valve designed to divert bulk solids during  pneumatic transport.   ',
        'It is designed for applications like dosing, weighing, batching and filling.'
      ]
    }
  };

  let bool = true

  function setActiveSegment(segmentName) {
    segments.forEach(seg => {
      seg.classList.toggle('active', seg.dataset.segment === segmentName);
    });

    if (bool) {
      const blackSegment = document.querySelector('.segment-black');
      if (blackSegment) blackSegment.style.transform = 'scale(1.05)';
      bool = false
    } else {
      const blackSegment = document.querySelector('.segment-black');
      if (blackSegment) blackSegment.style.transform = 'scale(1)';
    }

    const valve = valveMap[segmentName];
    if (valve) {
      valveImage.src = valve.image;
      diverterTitle.innerHTML = `<div class="red-dot"></div> ${valve.title}`;
      featureList.innerHTML = '';
      valve.description.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="./images/Vector.png" alt=""> ${item}`;
        featureList.appendChild(li);
      });
      detailsDescription.style.display = 'block';
    }
  }

  labels.forEach(label => {
    label.addEventListener('click', () => {
      const segmentName = label.dataset.segment;
      setActiveSegment(segmentName);
    });
  });

  segments.forEach(segment => {
    segment.addEventListener('click', () => {
      const segmentName = segment.dataset.segment;
      setActiveSegment(segmentName);
    });
  });

  setActiveSegment('dtd');


  const features = [
    "Housing, Drum & End Covers in Aluminum using High Quality Gravity Die Casting Process",
    "Product Contact Surface in SS 316L",
    "Dual Tunnel",
    "Cylinder Operated",
    "Can be Installed in any Orientation",
    "No External Moving Parts",
    "Easy to Maintain",
    "ATEX Approved"
  ];

  const options = [
    "MOC in complete SS 304 construction",
    "High Temperature Modification",
    "ATEX / IECEX Rated Electrical Components ",
    "Hard Chrome Coating on Product Contact Surface",
    "Tungsten Carbide Coating on Product Contact Surface",
    "Hardox Liner"
  ];

  const feature = document.getElementById('unorderlist-fea');
  const option = document.getElementById('unorderlist-opt');

  features.forEach((featur) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="./images/Vector.png" alt=""> ${featur}`;
    feature.appendChild(li);
  });


  options.forEach((feature) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="./images/Vector.png" alt=""> ${feature}`;
    option.appendChild(li);
  });


  const features6 = [
    "Housing, Drum & End Covers in Aluminum using High Quality Gravity Die Casting Process",
    "Product Contact Surface in Stainless Steel 316L",
    "SDTD-C in Stainless Steel 304 construction",
    "Single Tunnel",
    "Actuator Operated",
    "Can be Installed in any Orientation",
    "No External Moving Parts",
    "Easy to Maintain",
    "ATEX Approved"
  ];

  const options6 = [
    "High Temperature Modification",
    "ATEX / IECEX Rated Electrical Components",
    "SDTD - Hard Chrome Coating on Product Contact Surface",
    "SDTD - Tungsten Carbide Coating on Product Contact Surface",
    "SDTD - Hardox Liner"
  ];

  const feature6 = document.getElementById('six-unorderlist-fea');
  const option6 = document.getElementById('six-unorderlist-opt');

  features6.forEach((featur) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="./images/Vector.png" alt=""> ${featur}`;
    feature6.appendChild(li);
  });


  options6.forEach((feature) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="./images/Vector.png" alt=""> ${feature}`;
    option6.appendChild(li);
  });

  const features9 = [
    "Construction in Spheroidal Cast Iron",
    "Single Tunnel",
    "Actuator Operated",
    "No External Moving Parts",
    "Easy to Maintain",
    "ATEX Approved",
    "Can divert the product during its flow",
    "Replacement of seal is possible with the valve in position"
  ];

  const options9 = [
    "High Temperature Modification",
    "ATEX / IECEX Rated Electrical Components"
  ];

  const feature9 = document.getElementById('nine-unorderlist-fea');
  const option9 = document.getElementById('nine-unorderlist-opt');

  features9.forEach((featur) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="./images/Vector.png" alt=""> ${featur}`;
    feature9.appendChild(li);
  });


  options9.forEach((feature) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="./images/Vector.png" alt=""> ${feature}`;
    option9.appendChild(li);
  });


  const featuresscale = [
    "Compact design",
    "Minimal Process Loss",
    "Available in Cast Iron and Stainless Steel 304 construction",
    "Self venting – Local venting or dust collection is not required at the receiving / deposit point"
  ];

  const featuresscale1 = [
    "Optimal Sealing",
    "Simple Construction with Minimal Contact Area",
    "Metal-to-metal clearances ( like Rotary valve ) that eliminate frequent part replacement.",
  ];

  const optionsscale = [
    "ATEX / IECEX Rated Electrical Components"
  ];

  const featurescale = document.getElementById('unorderlist-fea-scale');
  const featurescale1 = document.getElementById('unorderlist-fea-scale-1');
  const optionscale = document.getElementById('unorderlist-opt-scale');

  featuresscale.forEach((featur) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="./images/Vector.png" alt=""> ${featur}`;
    featurescale.appendChild(li);
  });

  featuresscale1.forEach((featur) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="./images/Vector.png" alt=""> ${featur}`;
    featurescale1.appendChild(li);
  });


  optionsscale.forEach((feature) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="./images/Vector.png" alt=""> ${feature}`;
    optionscale.appendChild(li);
  });


  const featuresby = [
    "Construction in Cast Aluminum",
    "Economical Quality Product",
  ];

  const featuresby1 = [
    "Cylinder Operated",
    "Can be installed in any positions",
  ];

  const optionsby = [
    "MOC in Stainless Steel 304",
    "ATEX / IECEX Rated Electrical Components"
  ];

  const featureby = document.getElementById('unorderlist-fea-by');
  const featureby1 = document.getElementById('unorderlist-fea-by-1');
  const optionby = document.getElementById('unorderlist-opt-by');

  featuresby.forEach((featur) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="./images/Vector.png" alt=""> ${featur}`;
    featureby.appendChild(li);
  });

  featuresby1.forEach((featur) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="./images/Vector.png" alt=""> ${featur}`;
    featureby1.appendChild(li);
  });


  optionsby.forEach((feature) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="./images/Vector.png" alt=""> ${feature}`;
    optionby.appendChild(li);
  });

});


let pagelatest = 0;
function playAudioForPage(pageNumber) {
  if (pageNumber != pagelatest) {
    pagelatest = pageNumber
  } else {
    return
  }
  const audio = document.getElementById('slide-audio');
  if (!audio) return;
  audio.onended = null;
  audio.pause();
  audio.src = `./audios/audio${pageNumber}.mp3`;
  audio.currentTime = 0;
  audio.play();

  audio.play().catch(e => {
    document.addEventListener("click", () => {
      audio.play();
    }, { once: true });
  });
}







