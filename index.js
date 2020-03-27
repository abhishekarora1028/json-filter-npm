const join = require('lodash/join');
const includes = require('lodash/includes');
const isObject = require('lodash/isObject');
const _filter = require('lodash/filter');
const tostring = require('lodash/toString');
const isUndefined = require('lodash/isUndefined');
const isArray = require('lodash/isArray');
const isInteger = require('lodash/isInteger');
const _forEach = require('lodash/forEach');
const isNull = require('lodash/isNull');
const _remove = require('lodash/remove');
const traverse = require('traverse');

const removeNullValues = (filteredTransformedResponse) => {
  _forEach(filteredTransformedResponse, (value, key) => {
    if (isObject(value)) {
      _remove(value, n => isUndefined(n));
      removeNullValues(filteredTransformedResponse[key]);
    }
  });
};


const makeFilterObject  = (filters) => {
	const filterObj = {};
	if (!isUndefined(filters) && isArray(filters)) {
        filters.forEach((element) => {
          const separator = includes(element, '!=') ? '!=' : '='
          const pathValue = element.split(separator);
          filterObj[pathValue[0]] = {};
          filterObj[pathValue[0]].value = pathValue[1];
          filterObj[pathValue[0]].separator = separator;
        });
		return filterObj;
      }else{
		  return 'filters must be in array';
	  }
}

const filterResponse = (transformedResponse, filters, recursiveKey='') => {
  const filter = makeFilterObject(filters);
  if(isObject(filter) && isObject(transformedResponse)){
  traverse(transformedResponse).forEach((x) => {
    const cpath = join(_filter(this.path, (o) => !isInteger(parseInt(o))), '.');
    x = isNull(x) ? 'null' : x;
    if (recursiveKey != '' && this.key == recursiveKey && x.length > 0) {
      bpFilter = [];
      filters.map((key,value) => {
        const keyArray = key.split('.');
        keyArray.shift();
        bpFilter.push(join(keyArray, '.'));
      });
      filterResponse(x, bpFilter, recursiveKey);
    } else if (includes(Object.keys(filter), cpath) && filter[cpath].separator == '=' && !includes(filter[cpath].value.split(','), tostring(x))) {
	  this.parent.delete();
    } else if (includes(Object.keys(filter), cpath) && filter[cpath].separator == '!=' && includes(filter[cpath].value.split(','), tostring(x))) {
      this.parent.delete();
    }
  });
  removeNullValues(transformedResponse);
  return transformedResponse;
  }else{
	  return 'Invalid input types, please pass json object and array of filters';
  }
};

module.exports = {
  filterResponse
};