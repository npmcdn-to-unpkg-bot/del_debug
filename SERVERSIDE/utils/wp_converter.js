//     wp-converter.js 1.0.0
//     (c) 2016 Zachary Falen
//     wp-converter may be freely distributed under the MIT license.

var _ = require('underscore');

function getACF(obj){
  var the_fields = {};
  for (var field in obj.acf) {
    if (obj.acf.hasOwnProperty(field)) {
      the_fields[field] = formatField(obj.acf[field])
    }
  }
  return the_fields;
}

function getStandardContent(obj){
  return {
      the_content: formatField(obj.content.rendered),
      the_title: formatField(obj.title.rendered),
      the_excerpt: formatField(obj.excerpt.rendered)
    }
}

function formatField(input){
  if (typeof input === 'string'){
    return input.replace(/(<([^>]+)>)/ig,"")
                .replace(/&#039;/ig,"'")
                .replace(/&#8220;/ig,'"')
                .replace(/&#8221;/ig,'"')
                .replace(/&amp;/ig,'&')
                .replace(/&hellip;/ig,'...')
  } else {
    return input;
  }
}

module.exports = {

    getPage: function(arr, propName, propValue) {
      for (var i=0; i < arr.length; i++)
        if (arr[i][propName] === propValue){
          return arr[i];
        }
      },

    get_WP_data: function (obj) {
      var acf = getACF(obj);
      var content = getStandardContent(obj);
      var combined = _.extend({}, acf, content);
      return combined;
    }
  }
