var cartOpen = document.querySelectorAll(".catalog-item .buy");
var cartPopup = document.querySelector(".modal-cart");
var cartBlock = document.querySelector(".top-header-cart");
var cartCounter = cartBlock.querySelector(".count");

var mapOpen = document.querySelector(".open-map");
var mapPopup = document.querySelector(".modal-map");

var feedbackOpen = document.querySelector(".btn-contact");
var feedbackPopup = document.querySelector(".modal-write-us");

var overlay = document.querySelector(".modal-overlay");

var sliderArrow = document.querySelectorAll(".promo-block-bottom .slider-arrows a");
var sliderToggle = document.querySelectorAll(".promo-block-bottom [name=toggle]");

if (cartOpen) {
  var cartClose = cartPopup.querySelector(".modal-content-close");
  var cartCloseBtn = cartPopup.querySelector(".btn-continue");
  var cartCheckout = cartPopup.querySelector(".btn-checkout");
  
  for (i = 0; i < cartOpen.length; ++i) {
    cartOpen[i].addEventListener("click", function (event) {
      event.preventDefault(event);
      cartBlock.classList.add("not-empty");
      cartPopup.classList.add("modal-content-show");
      overlay.classList.add("modal-content-show");
      cartCounter.innerHTML++;
    })
  }
  
  cartClose.addEventListener("click", function (event) {
    event.preventDefault();
    cartPopup.classList.remove("modal-content-show");
    overlay.classList.remove("modal-content-show");
  });

  cartCloseBtn.addEventListener("click", function (event) {
    event.preventDefault();
    cartPopup.classList.remove("modal-content-show");
    overlay.classList.remove("modal-content-show");
  });

  cartCheckout.addEventListener("click", function (event) {
    event.preventDefault();
    cartPopup.classList.remove("modal-content-show");
    overlay.classList.remove("modal-content-show");
  });
}

if (mapOpen) {
  var mapClose = mapPopup.querySelector(".modal-content-close");
  
  mapOpen.addEventListener("click", function (event) {
    event.preventDefault();
    mapPopup.classList.add("modal-content-show");
  });

  mapClose.addEventListener("click", function (event) {
    event.preventDefault();
    mapPopup.classList.remove("modal-content-show");
  });
  
  ymaps.ready(init);
    var myMap;

    function init() {
      myMap = new ymaps.Map('map', {
        center: [55.68698, 37.529654],
        zoom: [16],
        controls: []
      }),
      myMap.behaviors.disable('scrollZoom');
      myMap.controls.add('zoomControl');

      myPlacemark = new ymaps.Placemark([55.68698, 37.529654], {
        hintContent: 'г. Москва, ул. Строителей, д. 15',
      }, {
        preset: 'islands#redDotIcon'
      });

      myMap.geoObjects.add(myPlacemark);
    }
}

if (feedbackOpen) {
  var feedbackClose = feedbackPopup.querySelector(".modal-content-close");
  var form = feedbackPopup.querySelector("form");
  var username = feedbackPopup.querySelector("[name=name]");
  var email = feedbackPopup.querySelector("[name=e-mail]");
  var message = feedbackPopup.querySelector("[name=message]");

  var storageName = localStorage.getItem("login");
  var storageEmail = localStorage.getItem("login");
  var storageMessage = localStorage.getItem("login");
  
  feedbackOpen.addEventListener("click", function (event) {
    event.preventDefault();
    feedbackPopup.classList.add("modal-content-show");
    overlay.classList.add("modal-content-show");
    if (storageName) {
      username.value = storageName;
    }
    if (storageEmail) {
      email.value = storageEmail;
    }
    if (storageMessage) {
      message.value = storageMessage;
    }
  });
  
  feedbackClose.addEventListener("click", function (event) {
    event.preventDefault();
    feedbackPopup.classList.remove("modal-content-show");
    overlay.classList.remove("modal-content-show");
    feedbackPopup.classList.remove("modal-error");
  });
  
  form.addEventListener("submit", function (event) {
    if (!username.value || !email.value || !message.value) {
      event.preventDefault();
      feedbackPopup.classList.remove("modal-error");
      feedbackPopup.offsetWidth = feedbackPopup.offsetWidth;
      feedbackPopup.classList.add("modal-error");
    } else {
      localStorage.setItem("username", username.value);
      localStorage.setItem("email", email.value);
      localStorage.setItem("message", message.value);
    }
  });
}

window.addEventListener("keydown", function (event) {
  if (event.keyCode === 27) {
    if (cartPopup.classList.contains("modal-content-show")) {
      cartPopup.classList.remove("modal-content-show");
      overlay.classList.remove("modal-content-show");
    }
    if (mapPopup.classList.contains("modal-content-show")) {
      mapPopup.classList.remove("modal-content-show");
    }
    if (feedbackPopup.classList.contains("modal-content-show")) {
      feedbackPopup.classList.remove("modal-content-show");
      overlay.classList.remove("modal-content-show");
      feedbackPopup.classList.remove("modal-error");
    }
  }
});

overlay.addEventListener("click", function (event) {
  if (cartPopup.classList.contains("modal-content-show")) {
    cartPopup.classList.remove("modal-content-show");
    overlay.classList.remove("modal-content-show");
  }
  if (feedbackPopup.classList.contains("modal-content-show")) {
    feedbackPopup.classList.remove("modal-content-show");
    overlay.classList.remove("modal-content-show");
    feedbackPopup.classList.remove("modal-error");
  }
});

if (sliderArrow) {
  for (var i = 0; i < sliderArrow.length; i++) {
    sliderArrow[i].addEventListener('click', function (event) {
      event.preventDefault();
      var activeToggle = document.querySelector('.promo-block-bottom .slider input:checked');
      var currentToggleIndex = [].indexOf.call(sliderToggle, activeToggle);
      var toggleCount = sliderToggle.length;
      switch (this.dataset.direction) {
      case 'prev':
        if (currentToggleIndex == 0) {
          sliderToggle[toggleCount - 1].checked = true;
        } else {
          sliderToggle[currentToggleIndex - 1].checked = true;
        }
        break;

      case 'next':
        if ((toggleCount - 1) == currentToggleIndex) {
          sliderToggle[0].checked = true;
        } else {
          sliderToggle[currentToggleIndex + 1].checked = true;
        }
        break;
      }
  });
  }
}