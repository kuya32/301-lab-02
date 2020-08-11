'use strict';

const imageArray = [];

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

const makeImageInstances = jsonArr => {
  jsonArr.forEach(indexObj => {
    new Image (indexObj.image_url, indexObj.title, indexObj.description, indexObj.keyword, indexObj.horns);
  });

  imageArray.forEach(arrIndexVal => arrIndexVal.renderJQ());

};

$.get('data/page-1.json')
  .then(makeImageInstances);
