//global variables
var start_index = 0;
var obj;

/* A function to populate images
    corresponding to the platform
    */

function populateImage(platform, index){
  console.log(platform, index);
  index += 1;
  platform = platform.trim();
  var elem = document.getElementById("myimg"+index);
  if(platform == "codechef")
  {
    elem.src= "./img/cc32.jpg";  
  }
  else if(platform == "codeforces")
  {
    elem.src= "./img/cf32.png";
  }
  else if(platform == "hackerearth")
  {
    elem.src= "./img/he32.png"; 
  }
}

/* A function to populate links
    corresponding to the platform
    */

function populateLinks(platform, index, contest_url){
  index += 1;
  platform = platform.trim();
  var elem = document.getElementById("link"+index);
  console.log(contest_url);
  elem.href = contest_url;

     


}

/* A function to display data
    it basically processes incoming json
    and uses functions populateImage()
    and populateLinks() to display corresponding data
    */

function displayData(obj){
  var i = 0;
  var total_length = obj.result.upcoming_contests.length; //make sure this function is correct
  for(i=0 ; i<5; i++)
  {
    if(start_index < total_length)
    {
      var j = i+1;
      //contest code
      var elem = document.getElementById('span'+j);
      elem.innerHTML = obj.result.upcoming_contests[start_index].code; 
      //contest start time
      var elem2 = document.getElementById('minispan'+j);
      elem2.innerHTML = obj.result.upcoming_contests[start_index].start_time;
      //contest image
      populateImage(obj.result.upcoming_contests[start_index].platform,i);
      //recently added
      populateLinks(obj.result.upcoming_contests[start_index].platform,i,obj.result.upcoming_contests[start_index].contest_url);
      start_index += 1;  
    }
    else
    {
      //hide the element which displays the data
      //and make the button unresponsive
      var elem = document.getElementById("listitem"+j); //verify the index !important
      elem.style.display = "none";
      var checkButton = document.getElementById('showmorebtn');
      checkButton.removeEventListener('click',checkButtonHandler , false);



    }
    
  }

}

/*
  Given function is called as soon as
  the DOM contents are fully loaded.
  It creates an HTTP request to fetch
  JSON data from https://tranquil-caverns-50595.herokuapp.com/
  and then calls displayData(obj)
  which further processes the JSON data
*/

document.addEventListener('DOMContentLoaded', function() {
  /*
  first check net connection
  if there is no net connection then just don't act
  Dude!!
  */

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function()
  {
    if(xhr.readyState == 4 )
    {
      if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304)
      {
        obj = JSON.parse(xhr.responseText);
        //we got the json object
        //now fill all spans with json data through iteration
        displayData(obj);
        
      }
      else
      {
        alert("Request was unsuccessfull");
      }
    }
  };
  xhr.open("get","https://tranquil-caverns-50595.herokuapp.com/",true);
  xhr.send(null);



  var checkButton = document.getElementById('showmorebtn');
  checkButton.addEventListener('click',checkButtonHandler , false);




}, false);

function checkButtonHandler()
{
    displayData(obj);
}