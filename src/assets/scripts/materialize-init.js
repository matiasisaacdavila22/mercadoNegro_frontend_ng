
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {
      //here we can set menu-side parameters
  });
});



function initSelect() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, {
   });
}


