let date = new Date();
let dd = String(date.getDate()).padStart(2, '0');
let mm = String(date.getMonth() + 1).padStart(2, '0');
let yyyy = date.getFullYear();

let today = yyyy + '-' + mm + '-' + dd;
let from = yyyy + '-' + mm + '-' + (dd - 7);

export default from;