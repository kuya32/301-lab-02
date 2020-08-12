'use strict';

const imageArray = [];
const keywordArray = [];

function Image (url, title, desc, keyword, horns) {
  this.url = url;
  this.title = title;
  this.desc = desc;
  this.keyword = keyword;
  this.horns = horns;

  imageArray.push(this);
}

Image.prototype.renderJQ = function () {
  const $clonedSection = $('section:first-child').clone();

  $clonedSection.find('h2').text(this.title);
  $clonedSection.find('img').attr('src', this.url).attr('alt', this.title);
  $clonedSection.find('p').text(this.desc);

  $('main').append($clonedSection);
};

const renderOption = function (keywordArray) {
  keywordArray.forEach(keyword => {
    const $clonedOption = $('option:first-child').clone();
    $clonedOption.attr('value', keyword);
    $clonedOption.text(keyword);
    $('select').append($clonedOption);
  });
};

const makeImageInstances = jsonArr => {
  jsonArr.forEach(indexObj => {
    new Image (indexObj.image_url, indexObj.title, indexObj.description, indexObj.keyword, indexObj.horns);

    //feature #2:
    if (!keywordArray.includes(indexObj.keyword)) {
      keywordArray.push(indexObj.keyword);
    }
  });

  imageArray.forEach(arrIndexVal => arrIndexVal.renderJQ());

  //Do the same for line 36,
  renderOption(keywordArray);
};

$.get('data/page-1.json')
  .then(makeImageInstances);

$('select').on('change', selectedKeyword);

function selectedKeyword (){
  console.log($('option').val());
}
