import moment from 'moment';
import _ from 'lodash';
import { DATE_FORMAT } from '../global/constants.js';
import { dismissToast, infoToast, warningToast } from '../utils/toaster';

/**
 * @desc Check if given value is string
 * @param {*} value // Accepts string
 */
export function isStirng(value) {
  var myRegEx = /^[a-zA-Z\s]*$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
}

/**
 * @desc Checks if given value is Number
 * @param {*} value // Accepts string
 */
export function isNumber(value) {
  var myRegEx = /^(\s*[0-9]+\s*)+$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
}

/**
 * @desc Checks for valid email
 * @param {*} value // Accepts string
 */
export function isEmail(value) {

  var myRegEx =
    // eslint-disable-next-line max-len
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
}

/**
 * @desc Checks for valid email
 * @param {*} value // Accepts string
 */
export function isValidEmail(value) {

  var myRegEx =
    // eslint-disable-next-line max-len
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
}

/**
 * @desc Checks for Empty string
 * @param {*} value // Accepts string, object
 */
export function isEmpty(value) {
  if (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * @desc: Check valid date
 */
export function isValidDate(d) {
  return d instanceof Date;
}

/**
 * @desc: Check date is in format of YYYY-MM-DD
 * @format : YYYY-MM-DD
 */
export function isValidDateFormat(d) {
  // let myRegEx = /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/;
  let myRegEx = /\d{4}-[01]{1}\d{1}-[0-3]{1}\d{1}T[0-2]{1}\d{1}:[0-6]{1}\d{1}/gm;
  let isValid = myRegEx.test(d);
  return isValid ? true : false;
}

/**
 * @desc: Check valid password
 * It contains at least 8 characters and at most 20 characters.
 * It contains at least one digit.
 * It contains at least one upper case alphabet.
 * It contains at least one lower case alphabet.
 * It contains at least one special character which includes !@#$%&*()-+=^.
 * It doesn’t contain any white space.
 */
export function isValidPassword(password = null) {
  let myRegEx = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$/;
  let isValid = myRegEx.test(password);
  return isValid ? true : false;
}

/**
 * @desc it return unique GUID string
 */
export const getUniqueId = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + '-' + S4() + '-4' + S4().substr(0, 3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();
};

/**
 * @desc check does it dev mode or live mode
 * it return false only if its a production build
 */
export const isDev = () => {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  return false;
};

/**
 * @desc get query params
 */
export const getUrlParams = (queryParams) => {
  if (!queryParams) return new URLSearchParams();
  return new URLSearchParams(queryParams);
};

/**
 * @desc get query param by name
 */
export const getUrlParam = (query, name) => {
  let queryParams = new URLSearchParams();
  if (query) queryParams = new URLSearchParams(query);
  return queryParams.get(name);
};

/**
 * @desc get user friendly string from the given value
 * @param {*} value
 * @param {*} replaceChar
 */
export const UserFriendlyString = (value, replaceChar) => {
  if (!value) return '';
  value = value.trim();

  if (!replaceChar) replaceChar = '_';
  return value === undefined
    ? ''
    : value
      .replace(/[^a-z0-9_]+/gi, replaceChar)
      .replace(/^-|-$/g, '')
      .toLowerCase();
};

/**
 * @desc Checks if given value is Boolean
 * @param {*} value // Accepts string
 */
export const isBoolean = (value) => {
  if (typeof value === "boolean") {
    return true;
  } else {
    return false;
  }
};


export const stringToBoolean = (value) => {
  if (!value) return false;

  switch (value.toString().toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
    case null:
      return false;
    default:
      return Boolean(value);
  }
};

export const appEnvironments = () => {
  if (isProduction()) return 'inDevlopment';
  return null;
};

export const isProduction = () => {
  try {
    var url = window.location.href;
    if (url && url.includes('docfliq.app')) return false;
  } catch (ex) { }

  if (!isDev()) return true;
  return false;
};

export function mathRound(number, digit = 2) {
  try {
    if (Number(number) < 1) digit = 3;
    if (number) return Number(number).toFixed(digit);
  } catch (e) { }
  return Number(0).toFixed(2);
}

/**
 * @desc load java script async from code
 */
export const loadJavaScript = (url) => {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  document.body.appendChild(script);
  return script;
};

/**
 * @desc get formatted date
 */
export const getFormattedDate = (date) => {
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear();
  return day + '/' + month + '/' + year;
};

export const getFormattedTime = (date) => {
  if (!date) date = new Date();
  else date = new Date(date);
  var hour = date.getHours();
  var minutes = date.getMinutes();
  const time = String(hour).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
  return String(time);
};

export const getNameById = (array, id) => {
  if (!array || array.length === 0 || !id) return;
  const item = array.find((x) => x.id === id);
  if (item) return item.name;
};

export const removeWhiteSpaceRegex = (str) => {
  return str.replace(/ +/g, '');
};

export const replaceWhiteSpaceWithDash = (str) => {
  return str.replace(/\s+/g, '-');
};

export const replaceWhiteSpaceWithUnderscore = (str) => {
  return str.replace(/\s+/g, '_');
};

export const getAPIResponseError = (e) => {
  if (e) {
    // console.log("Server Error:", e.response);
    if (e.response && e.response.data) {
      let code = e.response.data?.status;
      let msg = e.response.data?.message;

      // switch (code) {
      //   case 400:
      //     dismissToast();
      //     warningToast(msg);
      //     break;

      //   default:
      //     dismissToast();
      //     infoToast(msg);
      //     break;
      // }
      if (e.response.data.message) {
        return {code, message: e.response.data.message};
      }
    }
  }
  return;
};

export const formatCurrency = (num) => {
  try {
    if (num) return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  } catch (e) { }
  return num;
};

export const currencyWithDecimal = (num) => {
  let returnValue = num;
  try {
    let digit = 2;
    if (num) {
      if (Number(num) < 1) digit = 3;
      if (Number(num) > 999) digit = 1;
      const num2 = Number(num).toFixed(digit);
      returnValue = formatCurrency(num2);
    } else {
      returnValue = Number(0).toFixed(digit);
    }
  } catch (e) { }
  return returnValue;
};

export const numToWords = (num) => {
  let a = [
    '',
    'one ',
    'two ',
    'three ',
    'four ',
    'five ',
    'six ',
    'seven ',
    'eight ',
    'nine ',
    'ten ',
    'eleven ',
    'twelve ',
    'thirteen ',
    'fourteen ',
    'fifteen ',
    'sixteen ',
    'seventeen ',
    'eighteen ',
    'nineteen ',
  ];
  let b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  if ((num = num.toString()).length > 9) return 'overflow';
  let n = num.split('');
  n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return '';
  var str = '';
  str += n[1] !== '00' ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
  str += n[2] !== '00' ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
  str += n[3] !== '00' ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
  str += n[4] !== '00' ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
  str += n[5] !== '00' ? (str !== '' ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + '' : '';
  return str;
};

export const currencyInWords = (value) => {
  if (isEmpty(value)) return '';
  var number = parseFloat(value);
  if (number === undefined) return '';
  let num = value.toString().split('.');

  var Rs = numToWords(num[0]).toUpperCase();
  if (num.length === 1) return Rs + ' RUPEES ONLY';

  //Get two digit decimal
  var num2 = (num[1] + '0').substring(0, 2);
  if (num2[0] === '0') num2 = num2[1];

  var Paisa = numToWords(num2).toUpperCase();
  return Rs + ' RUPEES AND ' + Paisa + ' PAISA ONLY';
};

export const getDateDifference = (startDate, endDate) => {
  try {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays >= 0) return diffDays;
  } catch (e) { }
};

export const isPastDate = (date) => {
  if (!date) {
    return '';
  }
  let diff = moment().diff(date, 'days');
  return diff > 0;
};

export const displayRelativeDate = (date) => {
  if (!date) {
    return '';
  }
  let diff = moment().diff(date, 'days');
  if (diff === 0) {
    return 'Today';
  } else if (diff === -1) {
    return 'Tomorrow';
  } else {
    return moment(date).fromNow();
  }
};

export const getFormattedAddress = (item) => {
  if (!item) return '';
  let formattedAdd = '';
  let address = [];
  if (!isEmpty(item.address_line1) || !isEmpty(item.addressLine1)) {
    address.push(item.address_line1 || item.addressLine1);
  }
  if (!isEmpty(item.city)) {
    address.push(item.city);
  }
  if (!isEmpty(item.state)) {
    address.push(item.state);
  }
  if (!isEmpty(item.pincode)) {
    address.push(item.pincode);
  }
  formattedAdd = address.join(', ');
  return formattedAdd;
};

export const getDateString = (date) => {
  //return yyyyMMdd
  if (date) {
    date = new Date(date);
    return date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2);
  }
  return;
};

export const getDateFromFormattedDate = (date) => {
  //parse yyyyMMdd and return date object
  if (date) {
    let year = Number(date.substr(0, 4));
    let month = Number(date.substr(4, 2));
    let day = Number(date.substr(6, 2));
    //here do -1 becuase month is always +1
    let result = new Date(year, month - 1, day);
    return result;
  }
  return;
};

export const getUTCDate = (date) => {
  if (date) date = new Date(date);
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
};

export const getDate = (date) => {
  if (!date) date = new Date();
  date = moment(date).format(DATE_FORMAT);
  return date;
};

export const removeDuplicates = (data, key) => {
  return [...new Map(data.map((x) => [key(x), x])).values()];
};

export const groupBy = (collection, iteratee) => {
  const groupResult = _.groupBy(collection, iteratee);
  return Object.keys(groupResult).map((key) => {
    return { id: key, orderItems: groupResult[key] };
  });
};

export const durationInAsSeconds = (start, end) => {
  start = moment(start);
  end = moment(end);
  const duration = moment.duration(end.diff(start));
  return duration.asSeconds();
};

export const convertToWebP = (inputFile, newfileName, resolution, callback) => {

  //getting File Actual Path
  inputFile = URL.createObjectURL(inputFile);
  // console.log(inputFile);

  var cnv = document.createElement('canvas');
  var ctx = cnv.getContext('2d');
  var img = new Image();
  img.src = inputFile;
  img.onload = function () {
    cnv.width = img.width;
    cnv.height = img.height;
    ctx.drawImage(img, 0, 0);
    var data = '';
    switch (resolution) {
      case 'high':
        data = cnv.toDataURL('image/webp');
        break;

        case 'medium':
        data =  cnv.toDataURL('image/webp',0.70); 
        break;

        case 'low':
        data = cnv.toDataURL('image/webp', 0.40);
        break;

      default:
        data = cnv.toDataURL('image/webp');
        break;
    }
    // var data = cnv.toDataURL('image/webp',0.50); //second param is quality percentage.
    var output = data.replace(/^data:image\/(png|jpg);base64,/, '');
    // console.log(output);


    //base64 to original file
    var arr = output.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    callback(output, new File([u8arr], newfileName, { type: mime }));
  }
}

export const formattedDateFromNow = (timestamp) => {
  return moment(timestamp).fromNow();
}