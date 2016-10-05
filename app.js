'use strict';

// Takes an array of link objects, and sorts them by each object's order property.
function sortLinks(linksAry) {
  return linksAry.sort(function(a, b) { return a.order - b.order});
}

// Loads in a link object. Assigns its property values to variables. Uses the ternary
// operator to check if the link has a submenu. If so, it calls createSubmenu, if not
// it creates an empty string. Finally it returns a string containing the html for a
// nav link, potentially including a submenu.
function createLink(linkObj) {
  var url     = linkObj["link_url"];
  var target  = linkObj["internal"] ? '' : ' target="_blank" ';
  var name    = linkObj["link_name"];
  var subMenu = linkObj["submenu"] ? createSubmenu(sortLinks(linkObj["submenu"])) : '';
  return '<li><a href="' + url + '"' + target + '>' + name + '</a>' + subMenu + '</li>';
}

// Loads in an array of link objects, iterates over them and returns a string containing
// as unordered list of links. Notice that I don't use forEach() to iterate as it is not
// support by older browsers.
function createSubmenu(linksAry) {
  var submenu = '<ul class="sub-menu">';
  for (var i = 0; i < linksAry.length; i++)
    submenu += createLink(linksAry[i]);
  return submenu += '</ul>';
}

// Loads in an array of link objects, iterates over them and returns a string containing
// all the html for the navigation bar.
function createNavigation(linksAry) {
  var menu = '';
  for (var i = 0; i < linksAry.length; i++)
    menu += createLink(linksAry[i]);
  return menu;
}

$(document).ready(function(){
  // Pull in the links JSON data from links.js using the AJAX getJson jQuery method,
  // sort the links, and then pass it to createNavigation.
  // Append the newly created navigation to #dynamic-nav in the view.
  $.getJSON('./links.js', function(data){
    var links = sortLinks(data);
    var navBar = createNavigation(links);
    $("#dynamic-nav").append(navBar);
  });
});
