'use strict';

let imageArray = [];
let keywordArray = [];


function Image (url, title, desc, keyword, horns, num) {
  this.url = url;
  this.title = title;
  this.desc = desc;
  this.keyword = keyword;
  this.horns = horns;
  this.page = num;

  imageArray.push(this);
}

// ==== Old render from Lab 2 for Reference ==== //
// Image.prototype.renderJQ = function () {
//   const $clonedSection = $('section:first-child').clone();

//   $clonedSection.find('h2').text(this.title);
//   $clonedSection.find('img').attr('src', this.url).attr('alt', this.keyword);
//   $clonedSection.find('p').text(this.desc);

//   $('main').append($clonedSection);
// };

Image.prototype.renderMustache = function () {
  const newHTML = Mustache.render($('#mustache-template').html(), this);
  $('main').append(newHTML);
};

const renderKeywordOptions = function (keywordArray) {
  $('.kidsOfClone').remove();
  keywordArray.forEach(keyword => {
    const $clonedOption = $('#filterKeyword option:first-child').clone();
    $clonedOption.attr('value', keyword);
    $clonedOption.addClass('kidsOfClone');
    $clonedOption.text(keyword);
    $('#filterKeyword').append($clonedOption);
  });
};


const makeImageInstances = (jsonArr, num) => {
  imageArray = [];
  keywordArray = [];

  jsonArr.forEach(indexObj => {
    new Image (indexObj.image_url, indexObj.title, indexObj.description, indexObj.keyword, indexObj.horns, num);

    //feature #2: Lab 2
    if (!keywordArray.includes(indexObj.keyword)) {
      keywordArray.push(indexObj.keyword);
    }
  });

  imageArray.forEach(arrIndexVal => arrIndexVal.renderMustache());

  renderKeywordOptions(keywordArray);
};

$.get('data/page-1.json').then(results => makeImageInstances(results, 1));

// Filter by Keyword
$('#filterKeyword').on('change', selectedKeyword);
function selectedKeyword (){
  const selection = $(this).val();
  $('section').each(function() {
    let findAlt = $(this).find('img').attr('alt');
    if (selection === findAlt) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}

// Filter by Sort Title or Horns
$('#sortPics').on('change', sortStuff);
function sortStuff () {
  const selection = $(this).val();

  console.log(selection);
  console.log(imageArray);

  if (selection === 'title') {
    imageArray.sort((a, b) => {
      if(a.title > b.title) {
        return 1;
      } else if(a.title < b.title) {
        return -1;
      } else {
        return 0;
      }
    });

  } else if (selection === 'horns') {
    imageArray.sort((a, b) => {
      if(a.horns > b.horns) {
        return 1;
      } else if(a.horns < b.horns) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  $('section').remove();
  imageArray.forEach(arrIndexVal => arrIndexVal.renderMustache());
}

// button for Lab 3
$('#pageTwo').on('click', getOtherJsonFile);
function getOtherJsonFile () {
  $('.1').hide();
  $.get('data/page-2.json').then(results => makeImageInstances(results, 2));
}

$('#pageOne').on('click', getPageOneJsonFile);
function getPageOneJsonFile () {
  $('.2').hide();
  $.get('data/page-1.json').then(results => makeImageInstances(results, 1));
}

