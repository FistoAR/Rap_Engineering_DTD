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
const set = new Set([2, 3, 4, 5, 14, 18, 22, 24, 26, 30]);
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
  { id: 'twelevenewSlide', flag: 'hasShownTweleveNewSlide', done: 'twelevenewSlideAnimationCompleted' },
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
  animation(visibleIndex + 2)
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
  } else if (pageNumber > 2) {
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
  animation(page)
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
  '.bvd-home': 14,
  '.sdtd-home': 18,
  '.sdtd-c-home': 22,
  '.ytypehome': 24,
  '.bypasshome': 26,
  '.scalehome': 30,
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
        li.innerHTML = `<img src="./images/Vector.png" class="bullet-icon" alt=""> ${item}`;
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
    li.innerHTML = `<img src="./images/Vector.png" class="bullet-icon" alt=""> ${featur}`;
    feature.appendChild(li);
  });


  options.forEach((feature) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="./images/Vector.png" class="bullet-icon" alt=""> ${feature}`;
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
    li.innerHTML = `<img src="./images/Vector.png" class="bullet-icon" alt=""> ${featur}`;
    feature6.appendChild(li);
  });


  options6.forEach((feature) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="./images/Vector.png" class="bullet-icon" alt=""> ${feature}`;
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
    li.innerHTML = `<img src="./images/Vector.png" class="bullet-icon" alt=""> ${featur}`;
    feature9.appendChild(li);
  });


  options9.forEach((feature) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="./images/Vector.png" class="bullet-icon" alt=""> ${feature}`;
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
    li.innerHTML = `<img src="./images/Vector.png" class="bullet-icon" alt=""> ${featur}`;
    featurescale.appendChild(li);
  });

  featuresscale1.forEach((featur) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="./images/Vector.png" class="bullet-icon" alt=""> ${featur}`;
    featurescale1.appendChild(li);
  });


  optionsscale.forEach((feature) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="./images/Vector.png" class="bullet-icon" alt=""> ${feature}`;
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
    li.innerHTML = `<img src="./images/Vector.png" class="bullet-icon" alt=""> ${featur}`;
    featureby.appendChild(li);
  });

  featuresby1.forEach((featur) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="./images/Vector.png" class="bullet-icon" alt=""> ${featur}`;
    featureby1.appendChild(li);
  });


  optionsby.forEach((feature) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="./images/Vector.png" class="bullet-icon" alt=""> ${feature}`;
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




// -------------------------------------- Cursor animation  ----------------------------------------

const cursor = document.querySelector(".custom-cursor");
const mousePosition = { x: -100, y: -100 };
let isMoving = false;
let isMouseDown = false;
let animationFrameId = null;

window.addEventListener("mousemove", (e) => {
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;

  gsap.to(cursor, {
    x: mousePosition.x,
    y: mousePosition.y,
    duration: 0.8,
    ease: "power2.out"
  });

  isMoving = true;
  if (window.movementTimeout) clearTimeout(window.movementTimeout);
  window.movementTimeout = setTimeout(() => {
    isMoving = false;
  }, 500);
});

window.addEventListener("mousedown", () => {
  isMouseDown = true;
  gsap.to(cursor, {
    width: 50,
    height: 50,
    borderColor: "#1bf8c7",
    boxShadow: "0 0 25px rgba(255, 255, 255, 0.84)",
    duration: 0.2,
    ease: "power2.out"
  });
});

window.addEventListener("mouseup", () => {
  isMouseDown = false;
  gsap.to(cursor, {
    width: 25,
    height: 25,
    borderColor: "#fff",
    boxShadow: "none",
    duration: 0.2,
    ease: "power2.out"
  });
});

function updateTrail() {
  const trailSegments = document.querySelectorAll(".trail-segment");
  trailSegments.forEach((segment, index) => {
    const delay = (index + 1) * 0.05;
    gsap.to(segment, {
      x: mousePosition.x,
      y: mousePosition.y,
      duration: 0.3,
      delay,
      opacity: isMoving || isMouseDown ? 1 - index / trailSegments.length : 0,
      ease: "power2.out",
      scale: 1 + index / trailSegments.length,
      boxShadow:
        isMoving || isMouseDown
          ? `0 0 10px rgba(255, 255, 255, ${0.2 + index / trailSegments.length})`
          : "none"
    });
  });
}

function animateTrail() {
  updateTrail();
  animationFrameId = requestAnimationFrame(animateTrail);
}

animateTrail();



window.addEventListener("load", () => {
  gsap.fromTo(".text-diverter",
    { x: -300, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.2,
      ease: "power3.out",
      onComplete: () => {
        gsap.to(".text-diverter", {
          y: 12,
          duration: 1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      }
    }
  );


  gsap.fromTo(".text-valve",
    { x: 400, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.2,
      onComplete: () => {
        gsap.to(".text-valve", {
          y: 12,
          duration: 1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      }
    }
  );
});

let previous = 0;

function animation(page) {
  // if(isScrollingDown){
  //   page=page-1
  // }
  if (previous == page) return
  const animatedPages = [4, 7, 8, 11, 16, 20, 23, 25, 28, 32];
  if (page == "2" && previous != page) {
    gsap.set(".spec-header-row", { opacity: 0, x: -100 });
    gsap.set(".left-column", { opacity: 0, x: -100 });

    gsap.to(".spec-header-row", {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out"
    });

    gsap.to(".left-column", {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.3
    });

    gsap.set(".animated-img", {
      opacity: 0,
      scale: 0.8
    });
    gsap.to(".animated-img", {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.3
    });
  } else if (page == "3" || page == "6") {

    gsap.set(".valve-image", {
      clearProps: "all"
    });

    gsap.from(".valve-image", {
      y: -300,
      rotation: 60,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out"
    });

    gsap.from(".animated-desc", {
      x: -150,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.8
    });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    tl.to([".arrow-target1", ".arrow-target2", ".arrow-target3", ".arrow-target4"], {
      x: -35,
      opacity: 1,
      duration: 1.2,
      ease: "power2.inOut",
      stagger: 0.4
    })
      .to([".arrow-target1", ".arrow-target2", ".arrow-target3", ".arrow-target4"], {
        x: 0,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2
      });
  } else if (animatedPages.includes(page)) {
    const listDivs = {
      4: 'fourthSlide',
      7: 'fifthSlide',
      8: 'detailsSlide',
      11: 'tweleveSlide',
      16: 'detailsSlidenew9',
      20: 'detailsSlidenew',
      23: 'sevenSlide',
      25: 'eightSlide',
      28: 'twentiethSlide',
      32: 'seventeenthSlide'
    };

    const containerId = `#${listDivs[page]}`;

    if (page == 7) {
      gsap.from(`#fifthSlide .details-right-column1 img`, {
        rotateX: 360,
        x: 600,
        duration: 1.2,
        opacity: 0,
        ease: "power3.out"
      });
    }


    gsap.set(`${containerId} .feature-list li`, { x: -50, opacity: 0 });

    gsap.to(`${containerId} .feature-list li`, {
      x: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.2,
      delay: 0.5
    });

    gsap.set(`${containerId} .bullet-icon`, { scale: 0, x: -7 });

    gsap.to(`${containerId} .bullet-icon`, {
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
      stagger: 0.2,
      delay: 1,
      onComplete: () => {
        gsap.to(`${containerId} .bullet-icon`, {
          x: 5,
          duration: 1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.2
        });
      }
    });

  }


  gsap.fromTo(".spec-box1",
    { y: -150, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "bounce.out"
    }
  );

  gsap.set(".homedivs", { x: -300, opacity: 0 });
  gsap.set(".homedivs1", { y: -300, opacity: 0 });

  gsap.to(".homedivs", {
    x: 0,
    opacity: 1,
    duration: 1.5,
    ease: "power3.out",
    delay: 1
  });

  gsap.to(".homedivs1", {
    y: 0,
    opacity: 1,
    duration: 1.5,
    ease: "power3.out",
    delay: 1.1,
    onComplete: () => {
      gsap.to(".homedivs1 img", {
        y: 30,
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
      gsap.to(".homedivs1 img", {
        x: 15,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.5
      });
      gsap.to(".homedivs1 img", {
        rotation: 5,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1
      });
    }
  });

  previous = page

  const indicator = document.querySelector(".page-indicator");

  indicator.classList.add("active-btn");

  setTimeout(() => {
    indicator.classList.remove("active-btn");
  }, 2000);

}

gsap.set(".spec-text", { x: "100%", opacity: 0 });
const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

tl.to(".spec-text", {
  x: "0%",
  opacity: 1,
  duration: 1,
  ease: "power3.out"
}).to(".spec-text", {
  x: "-100%",
  opacity: 0,
  duration: 1,
  ease: "power3.in",
  delay: 1
});




const modelViewer = document.querySelector("#rotaryModel");
const normalBtn = document.querySelector("#normalBtn");
const explodedBtn = document.querySelector("#explodedBtn");
const partsBtn = document.querySelector("#partsBtn");
const hotspots = modelViewer.querySelectorAll(".HotspotAnnotation");
const exploaded = document.querySelectorAll(".exploaded-btn");
function toggleHotspots(visible) {
  hotspots.forEach(h => {
    h.style.display = visible ? 'inline' : 'none';
  });
}

normalBtn.addEventListener("click", () => {
  $('.model3d model-viewer button').css('visibility', 'hidden');
  $('.label-content').hide();
  modelViewer.currentTime = 0;
  modelViewer.pause();
  toggleHotspots(false);
});

let animationTimeout;

explodedBtn.addEventListener("click", () => {
  $('.model3d model-viewer button').css('visibility', 'hidden');
  $('.label-content').hide();
  modelViewer.currentTime = 0;
  modelViewer.play();
  toggleHotspots(false);
  clearTimeout(animationTimeout);
  animationTimeout = setTimeout(() => {
    modelViewer.pause();
  }, 10980);
});
let stopAt8sInterval = null;

partsBtn.addEventListener("click", () => {
  $('.model3d model-viewer button').css('visibility', 'visible');
  modelViewer.currentTime = 10.98;
  modelViewer.play();
  requestAnimationFrame(() => {
    modelViewer.pause();
    toggleHotspots(true);
  });
  clearInterval(stopAt8sInterval);
});


exploaded.forEach(btn => btn.addEventListener('click', () => {
  exploaded.forEach(b => b.classList.remove('active-explode'));
  btn.classList.add('active-explode');
}));


window.addEventListener('DOMContentLoaded', () => {
  toggleHotspots(false);
});


const hotspotDescriptions = {
  'hotspot-1': {
    title: "Housing",
    text: "The body and housing provide structural integrity, ensuring durability and long-term performance."
  },
  'hotspot-2': {
    title: "End Cover",
    text: "End covers are essential components that protect the internal mechanism and enhance operational safety."
  },
  'hotspot-4': {
    title: "Seal",
    text: "Durable rotary seal preventing leakage in rotating valve shaft systems."
  },
  'hotspot-3': {
    title: "Rotor",
    text: "The rotor plays a key role in the system, enabling efficient movement and performance optimization."
  }
};

const descriptionEl = document.getElementById("hotspotDescription");
const titleEl = document.getElementById("hotspotTitle");

modelViewer.querySelectorAll(".Hotspot").forEach(button => {
  button.addEventListener("click", () => {
    $('.label-content').fadeIn();
    const slotName = button.getAttribute("slot");
    const content = hotspotDescriptions[slotName] || { title: "", text: "" };
    descriptionEl.classList.remove("show");
    titleEl.classList.remove("show");
    void descriptionEl.offsetWidth;

    titleEl.textContent = content.title;
    descriptionEl.textContent = content.text;

    titleEl.classList.add("show");
    descriptionEl.classList.add("show");
  });
});

$(document).on('click', '#close-btn', function () {
  $('.label-content').hide();
});
