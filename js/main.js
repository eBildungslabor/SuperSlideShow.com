window.onload = function() {

  console.log('SuperSlideShow!! (c) EY-I.org!');
  initDnD();

};


function initDnD() {

  // Add drag handling to target elements
  document.getElementById("body").addEventListener("dragenter", onDragEnter,
      false);
  document.getElementById("drop-box-overlay").addEventListener("dragleave",
      onDragLeave, false);
  document.getElementById("drop-box-overlay").addEventListener("dragover",
      noopHandler, false);

  // Add drop handling
  document.getElementById("drop-box-overlay").addEventListener("drop", onDrop,
      false);

};

function noopHandler(evt) {

  evt.stopPropagation();
  evt.preventDefault();
};

function onDragEnter(evt) {

  jQuery("#drop-box-overlay").fadeIn(125);
  jQuery("#drop-box-prompt").fadeIn(125);

};

function onDragLeave(evt) {

  if (evt.pageX < 10 || evt.pageY < 10 ||
      jQuery(window).width() - evt.pageX < 10 ||
      jQuery(window).height - evt.pageY < 10) {
    jQuery("#drop-box-overlay").fadeOut(125);
    jQuery("#drop-box-prompt").fadeOut(125);
  }
};

function onDrop(evt) {

  // Consume the event.
  noopHandler(evt);

  // Hide overlay
  jQuery("#drop-box-overlay").fadeOut(0);
  jQuery("#drop-box-prompt").fadeOut(0);

  // Get the dropped files.
  var files = evt.dataTransfer.files;

  // If anything is wrong with the dropped files, exit.
  if (typeof files == "undefined" || files.length == 0) {
    return;
  }

  // FILES = files;

  parse_images(files);

};

function parse_images(files) {

  $('#body').css('background-color','#0e0e0e');
  $('#body').css('background-image','none');
  $('#dropzone').hide();
  $('#loading').show();

  var readcounter = 0;

  var read_images = [];

  var target = files.length;

  for (var f in files) {

    // console.log(files[f]);

    var reader = new FileReader();
    reader.onerror = function(){};
    reader.onload = function(e) {

      var data = e.target.result;

      read_images.push(data);

      readcounter += 1;

      if (readcounter == target) {

        console.log('Loaded '+target+' images!');
        start_slideshow(read_images);

      }
    }

    reader.readAsDataURL(files[f]);

  }

};


function start_slideshow(images) {
  
  // console.log('starting with ...' + images);


  $('#loading').hide();
  $('#slideshow').show();
  $('#legalstuff').hide();

  $('#slideshow').Kenburns({
    images: images,
    scale:.9,
    duration:7000,
    fadeSpeed:2400,
    ease3d:'cubic-bezier(0.445, 0.050, 0.550, 0.950)',

    onSlideComplete: function(){},
    onLoadingComplete: function(){}

  });

}
    