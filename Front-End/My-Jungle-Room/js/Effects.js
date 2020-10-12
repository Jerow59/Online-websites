"use strict";

$.fn.moveIt = function () {
  var $window = $(window);
  var instances = [];

  $(this).each(function () {
    instances.push(new moveItItem($(this)));
  });

  // Modif opacité au scroll
  window.onscroll = function () {
    var scrollTop = $window.scrollTop();
    let opacity = 1 - (scrollTop / 250);
    if (opacity >= 0) {
      $('.baseline-name').css('opacity', opacity);
      $('.downArrow').css('opacity', opacity);
    }
    instances.forEach(function (inst) {
      inst.update(scrollTop);
    });

    // Bar de progression de lecture
    var height = document.body.scrollHeight;
    var windowHeight = window.innerHeight;

    var trackLenght = height - windowHeight;
    var percentage = (scrollTop / trackLenght) * 100;
    document.getElementById('progress-bar').style.right = 100 - percentage + "%";
  }
}

// Effet "parallaxe"
var moveItItem = function (el) {
  this.el = $(el);
  this.speed = parseInt(this.el.attr('data-scroll-speed'));
};

moveItItem.prototype.update = function (scrollTop) {
  this.el.css('transform', 'translateY(' + -(scrollTop / this.speed) + 'px)');
};

// Initialisation
$(function () {
  $('[data-scroll-speed]').moveIt();
});


// Popup

var contenuConseilsNom = document.getElementById('contenuConseilsNom');
var contenuConseilsExposition = document.getElementById('contenuConseilsExposition');
var contenuConseilsArrosage = document.getElementById('contenuConseilsArrosage');

var blur = document.getElementById('blur');
var popup = document.getElementById('popup');
var fermer = document.getElementById('fermer');


$('.home-section .boutonConseils').click(function () {
  var contenu = String($(this).attr('id'));
  //console.log("le contenu id du bouton :" + contenu)


  function positionsDuClic(event) {
    var x = event.clientX;
    var y = event.clientY;
    //console.log("La position du clic est x:" + x + "px et y:" + y + "px");

    var widthWindow = $(window).width();
    //console.log("La largeur de la fenêtre est de " + widthWindow);

    var heightWindow = $(window).height();
    //console.log("La hauteur de la fenêtre est de " + heightWindow);

    var widthPopup = popup.offsetWidth;
    //console.log("La largeur de la popup est de " + widthPopup);

    var heightPopup = popup.offsetHeight;
    //console.log("La hauteur de la popup est de " + heightPopup);

    var differenceWidthEntreWindowEtPopup = Number(widthWindow - widthPopup);
    //console.log("La différence de largeur entre la fenêtre et la popup est de " + differenceWidthEntreWindowEtPopup);

    var differenceHeightEntreWindowEtPopup = Number(heightWindow - heightPopup);
    //console.log("La différence de hauteur entre la fenêtre et la popup est de " + differenceHeightEntreWindowEtPopup);

    var differenceWidthEntreWindowEtPopupCote = differenceWidthEntreWindowEtPopup / 2;
    //console.log("La différence de largeur sur les cotés entre full-popup et popup est de " + differenceWidthEntreWindowEtPopupCote);

    var differenceHeightEntreWindowEtPopupCote = differenceHeightEntreWindowEtPopup / 2;
    //console.log("La différence de hauteur sur les cotés entre full-popup et popup est de " + differenceHeightEntreWindowEtPopupCote);

    var xPop = Number;
    var yPop = Number;

    if (x < differenceWidthEntreWindowEtPopupCote) {
      xPop = (- (differenceWidthEntreWindowEtPopupCote - x))
    } else {
      xPop = (x - differenceWidthEntreWindowEtPopupCote)
    }

    if (y < differenceHeightEntreWindowEtPopupCote) {
      yPop = (- (differenceHeightEntreWindowEtPopupCote - y))
    } else {
      yPop = (y - differenceHeightEntreWindowEtPopupCote)
    }

    //console.log("La valeur de xPop est: " + xPop);
    //console.log("La valeur de yPop est: " + yPop);


    popup.animate([
      // keyframes
      { clipPath: 'circle(0px at ' + xPop + 'px ' + yPop + 'px)' },
      { clipPath: 'circle(500% at ' + xPop + 'px ' + yPop + 'px)' }
    ], {
      // timing options
      duration: 500,
      //iterations: 1
    });

  }

  var positions = positionsDuClic(event);

  blur.classList.toggle('active');
  popup.classList.toggle('active');

  for (let i = 0, len = dataPlantes.length; i <= len; i++) {
    if (contenu === dataPlantes[i].nom) {
      //console.log("les noms sont identitiques avec " + dataPlantes[i].nom)
      contenuConseilsNom.innerHTML = dataPlantes[i].nomPlante
      contenuConseilsExposition.innerHTML = dataPlantes[i].exposition
      contenuConseilsArrosage.innerHTML = dataPlantes[i].arrosage
    } else {
      //console.log("les noms sont différents avec " + dataPlantes[i].nom)
    }
  }
});

$('#fermer').click(function () {
  //event.preventDefault();
  blur.classList.toggle('active');
  popup.classList.toggle('active');
})