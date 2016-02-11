'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})



/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);

    $('#bonusBtn').click(randomizeBonus);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);


    var myURL="/project/"+idNumber;
    $.get("/project/"+idNumber, callback);
    console.log(myURL);
}

function callback (result){
    console.log(result);
    var id=  "project"+result.id;
    var where= $("#"+id+" .details");
    //where.html("<p>cool</p>");
    var details='<a href="#" class="thumbnail">'+
        '<img src="'+result['image']+'"class="detailsImage"></a>'+
        '<p>'+result['title']+'</p>'+
        '<p><small>'+result['date']+'</small></p>'+'<p>'+result['summary']+'</p>';
    where.html(details);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
    e.preventDefault();
	console.log("User clicked on color button");
    $.get("/palette", callback1);
}
function callback1 (result){
    var abc=result['colors'];
    var colors= abc['hex'];
    $('body').css('background-color', colors[0]);
    $('.thumbnail').css('background-color', colors[1]);
    $('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
    $('p').css('color', colors[3]);
    $('.project img').css('opacity', .75);
}

function randomizeBonus(e) {
    e.preventDefault();
    //console.log("what");
    $.get("http://www.panoramio.com/map/get_panoramas.php?set=full&from=0&to=20&minx=-80&miny=30&maxx=-50&maxy=90&size=medium&mapfilter=true",
        callback2, 'jsonp');
}
function callback2(result){
    //console.log("abc");
    var abc=result['photos'];
    var where= $(".bonus");
    var i=0;
    var addon= '<a href="#" class="thumbnail">'+
        '<img src="'+abc[i].photo_file_url+'"class="detailsImage">' +
        '<img src="'+abc[i+1].photo_file_url+'"class="detailsImage">'+
        '<img src="'+abc[i+2].photo_file_url+'"class="detailsImage">'+
        '<img src="'+abc[i+3].photo_file_url+'"class="detailsImage">'+
        '<img src="'+abc[i+4].photo_file_url+'"class="detailsImage">'+
        '<img src="'+abc[i+5].photo_file_url+'"class="detailsImage">'+
        '<img src="'+abc[i+6].photo_file_url+'"class="detailsImage">'+
        '<img src="'+abc[i+7].photo_file_url+'"class="detailsImage">'+
        '<img src="'+abc[i+8].photo_file_url+'"class="detailsImage">'+
        '<img src="'+abc[i+9].photo_file_url+'"class="detailsImage">'+
        '</a>';
    i=i+1;
    where.html(addon);

}