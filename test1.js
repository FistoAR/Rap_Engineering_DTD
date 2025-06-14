if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

// Element references
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
const pageIndicator = document.querySelector('.page-indicator');
const socialIcons = document.querySelector('.social-icons');

// Slides
const slides = [
  { id: 'secondSlide', flag: 'hasShownSecondSlide', done: 'secondSlideAnimationCompleted', line: '#secondSlide .vertical-line' },
  { id: 'detailsSlide', flag: 'hasShownDetailsSlide', done: 'detailsSlideAnimationCompleted', line: '#detailsSlide .details-vertical-line' },
  { id: 'fourthSlide', flag: 'hasShownFourthSlide', done: 'fourthSlideAnimationCompleted', line: '#fourthSlide .fourth-vertical-line' },
  { id: 'fifthSlide', flag: 'hasShownFifthSlide', done: 'fifthSlideAnimationCompleted', line: '#fifthSlide .fifth-vertical-line' },
  { id: 'sixSlide', flag: 'hasShownSixSlide', done: 'sixSlideAnimationCompleted', line: '#sixSlide .six-vertical-line' },
  { id: 'sevenSlide', flag: 'hasShownSevenSlide', done: 'sevenSlideAnimationCompleted', line: '#sevenSlide .seven-vertical-line' },
  { id: 'eightSlide', flag: 'hasShownEightSlide', done: 'eightSlideAnimationCompleted', line: '#eightSlide .eight-vertical-line' },
  { id: 'nineSlide', flag: 'hasShownNineSlide', done: 'nineSlideAnimationCompleted', line: '#nineSlide .nine-vertical-line' },
  { id: 'tenSlide', flag: 'hasShownTenSlide', done: 'tenSlideAnimationCompleted', line: '#tenSlide .ten-vertical-line' },
  { id: 'elevenSlide', flag: 'hasShownElevenSlide', done: 'elevenSlideAnimationCompleted', line: '#elevenSlide .eleven-vertical-line' },
  { id: 'tweleveSlide', flag: 'hasShownTweleveSlide', done: 'tweleveSlideAnimationCompleted', line: '#tweleveSlide .tweleve-vertical-line' },
  { id: 'thirteenSlide', flag: 'hasShownThirteenSlide', done: 'thirteenSlideAnimationCompleted', line: '#thirteenSlide .thirteen-vertical-line' },
  { id: 'fourteenSlide', flag: 'hasShownFourteenSlide', done: 'fourteenSlideAnimationCompleted', line: '#fourteenSlide .fourteen-vertical-line' },
  { id: 'fifteenSlide', flag: 'hasShownFifteenSlide', done: 'fifteenSlideAnimationCompleted', line: '#fifteenSlide .fifteen-vertical-line' },

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

  if (scrollY > 350 && !animationFlags.hasAnimatedV) {
    animationFlags.hasAnimatedV = true;
    circle?.classList.add('zoom-out');
    bullseyeMask?.classList.add('zoom-out');
    if (bgVideo) bgVideo.style.opacity = 0;
    body.classList.add('gray-bg');

    navbar.style.display = 'flex';
    navbar.classList.add('visible');

    setTimeout(() => {
      if(!isScrollingDown)return
      centerImage?.classList.add('fade-out');
      textTop?.classList.add('scroll-to-top');
      textBottom?.classList.add('scroll-to-top');
      valveLetter?.classList.add('draw-line');
      textBottom?.classList.add('center-valve-text');

    }, 2000);
  }

  slides.forEach((s, index) => {
    const offset = baseScroll + index * 400;
    const prevDone = index === 0 ? 'textAnimationCompleted' : slides[index - 1].done;

    if (scrollY > offset && !animationFlags[s.flag] && animationFlags[prevDone]) {
      animationFlags[s.flag] = true;
      s.slide?.classList.add('visible');
      s.lineEl?.classList.add('active');

      if (s.id === 'secondSlide') {
        pageIndicator?.classList.add('visible');
      }
    } else if (scrollY <= offset && animationFlags[s.flag]) {
      animationFlags[s.flag] = false;
      animationFlags[s.done] = false;
      s.slide?.classList.add('slide-out');
      s.lineEl?.classList.remove('active');
      if (s.id === 'secondSlide') {
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

  if (parseInt(pageInput?.value) !== pageNumber) {
    pageInput.value = pageNumber;
  }

  if (navSelect?.selectedIndex !== pageNumber - 1) {
    navSelect.selectedIndex = pageNumber - 1;
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

function scrollToPage(page) {
  if (isNaN(page) || page < 1 || page > slides.length + 1) return;
  playAudioForPage(page)
  isProgrammaticScroll = true;

  const offset = page === 1 ? 0 : 280 + (page - 2) * 500;
  showOnlySlide(page - 1);
  window.scrollTo({ top: offset + 10, behavior: 'smooth' });

  if (navSelect) navSelect.selectedIndex = page - 1;

  setTimeout(() => {
    isProgrammaticScroll = false;
  }, 800);
}

const pageMapping = {
  '.text': 1,
  '.second-slide': 2,
  '.details-slide': 3,
  '.fourth-slide': 4,
  '.fifth-slide': 5,
  '.six-slide': 6,
  '.seven-slide': 7,
  '.eight-slide': 8,
  '.nine-slide': 9,
  '.ten-slide': 10,
  '.eleven-slide': 11,
  '.tweleve-slide': 12,
  '.thirteen-slide': 13,
  '.fourteen-slide': 14,
  '.fifteen-slide': 15
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
    { selector: ".second-slide", in: "slide-in", out: "slide-out" },
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
  const valveImage = document.querySelector('.valve-image1');
  const segments = document.querySelectorAll('.circle-segment');
  const detailsDescription = document.querySelector('.details-description1');
  const featureList = detailsDescription.querySelector('.feature-list');
  const diverterTitle = document.querySelector('.standard-diverter-text');

  const originalGradients = {
    'segment-dtd': 'linear-gradient(135deg, #8e2de2, #4a00e0, #a18cd1, #fbc2eb)',
    'segment-btm': 'linear-gradient(135deg, #f7971e, #ffd200, #ff416c, #ff4b2b)',
    'segment-valve': 'linear-gradient(135deg, #ff758c, #ff7eb3, #f9d5ec, #ffc3a0)',
    'segment-sdtd': 'linear-gradient(135deg, #00c9ff, #92fe9d, #38f9d7, #007991)'
  };

  const originalTransforms = {
    'segment-dtd': 'rotate(0deg)',
    'segment-btm': 'rotate(90deg)',
    'segment-valve': 'rotate(180deg)',
    'segment-sdtd': 'rotate(270deg)'
  };

  const valveMap = {
    'segment-dtd': {
      image: './images/DTDnew.png',
      title: 'Drum Type Diverter (DTD)',
      description: [
        'It is used with DT type RV',
        'It is a transition piece connecting the RV outlet to the conveying line',
        'It has a flange connection (available in DIN / ANSI / JIS) on the top and pipe connection (available in different sizes) on the bottom',
        'Available in mild steel & stainless steel construction'
      ]
    },
    'segment-btm': {
      image: './images/Ytype.png',
      title: 'Flap Type Diverter - (Y-valve)',
      description: [
        'Sliding Rails option in RV is very useful for cleaning of valve with ease and less effort',
        'It is available for Exec.2 and dairy versions'
      ]
    },
    'segment-valve': {
      image: './images/SDTD.png',
      title: 'Single Drum Type Diverter (SDTD)',
      description: [
        'It is used with DT type RV',
        'It is a transition piece connecting the RV outlet to the conveying line',
        'It has a flange connection (available in DIN / ANSI / JIS) on the top and pipe connection (available in different sizes) on the bottom',
        'Available in mild steel & stainless steel construction'
      ]
    },
    'segment-sdtd': {
      image: './images/BDV.png',
      title: 'BDV Diverter',
      description: [
        'It is used with DT type RV',
        'It is a transition piece connecting the RV outlet to the conveying line',
        'It has a flange connection (available in DIN / ANSI / JIS) on the top and pipe connection (available in different sizes) on the bottom',
        'Available in mild steel & stainless steel construction'
      ]
    }
  };

  function handleSegmentClick(segment) {
    // Reset all segments to original gradients and transforms
    segments.forEach(seg => {
      for (let key in originalGradients) {
        if (seg.classList.contains(key)) {
          seg.style.backgroundImage = originalGradients[key];
          seg.style.backgroundColor = ''; // Clear black override
          seg.style.transform = originalTransforms[key];
        }
      }
    });

    // Set selected segment to black
    for (let key in originalTransforms) {
      if (segment.classList.contains(key)) {
        segment.style.backgroundImage = 'none';
        segment.style.backgroundColor = '#1B1B1B';
        segment.style.transform = originalTransforms[key];
      }
    }

    // Update valve content
    for (let key in valveMap) {
      if (segment.classList.contains(key)) {
        valveImage.src = valveMap[key].image;
        diverterTitle.innerHTML = `<div class="red-dot"></div> ${valveMap[key].title}`;
        featureList.innerHTML = '';
        valveMap[key].description.forEach(item => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `<img src="./images/Vector.png" alt=""> ${item}`;
          featureList.appendChild(listItem);
        });
        detailsDescription.style.display = 'block';
      }
    }
  }

  const labelMap = {
    'label-dtd': 'segment-dtd',
    'label-btm': 'segment-btm',
    'label-valve': 'segment-valve',
    'label-sdtd': 'segment-sdtd'
  };

  Object.keys(labelMap).forEach(labelClass => {
    const label = document.querySelector(`.${labelClass}`);
    const segmentClass = labelMap[labelClass];
    if (label) {
      label.style.cursor = 'pointer';
      label.addEventListener('click', () => {
        const segment = document.querySelector(`.circle-segment.${segmentClass}`);
        if (segment) handleSegmentClick(segment);
      });
    }
  });

  segments.forEach(segment => {
    segment.style.cursor = 'pointer';
    segment.addEventListener('click', () => handleSegmentClick(segment));
  });

  const defaultSegment = document.querySelector('.segment-sdtd');
  if (defaultSegment) {
    defaultSegment.style.backgroundColor = 'black';
    defaultSegment.style.transform = 'rotate(270deg) scale(1.1)';
  }
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







