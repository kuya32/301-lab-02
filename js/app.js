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
}


const renderKeywordOptions = function (keywordArray) {
  keywordArray.forEach(keyword => {
    const $clonedOption = $('option:first-child').clone();
    $clonedOption.attr('value', keyword);
    $clonedOption.text(keyword);
    $('#filterKeyword').append($clonedOption);
  });
};

// suggestion from Skyler: add second param to our function
const makeImageInstances = (jsonArr, num) => {
  imageArray = [];
  jsonArr.forEach(indexObj => {
    new Image (indexObj.image_url, indexObj.title, indexObj.description, indexObj.keyword, indexObj.horns, num);

    //feature #2:
    if (!keywordArray.includes(indexObj.keyword)) {
      keywordArray.push(indexObj.keyword);
    }
  });

  imageArray.forEach(arrIndexVal => arrIndexVal.renderMustache());
  
  renderKeywordOptions(keywordArray);
};

$.get('data/page-1.json').then(results => makeImageInstances(results, 1));

$('select').on('change', selectedKeyword);

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

// button for Lab 3
$('button').on('click', getOtherJsonFile);

function getOtherJsonFile (){
  $('.1').hide();
  $.get('data/page-2.json').then(results => makeImageInstances(results, 2));
  // how do I hide page 1 option keywords (emptying the keywordArray wasn't working)
}

