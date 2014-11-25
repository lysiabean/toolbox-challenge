"use strict";

var tiles = [];
var nums = _.sample([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],8);
for (var i = 0; i <8; i++) {  
  var img = 'img/tile' + nums[i] + '.jpg';
  tiles.push(img);
  tiles.push(img);
}
tiles = _.shuffle(tiles);

var output = "<ol>"; 
for (var i = 0; i < 16; i++) { 
  output += "<li>";
  output += "<img src = '" + tiles[i] + "'/>";
  output += "</li>";
}
output += "</ol>";
document.getElementById("game-board").innerHTML = output;
$("img").hide();

var guess1 = "";
var guess2 = "";
var count = 0;
var misscount = 0;
var matchesSoFar = 0;
var pairsRemained = 8;
var timeInterval = _.now();
setInterval(function(){myTimer()}, 1000);

function myTimer() {
    	var t = _.now() - timeInterval;
    	document.getElementById("timeTrack").innerHTML = "You have been playing for: " + t/1000 +"s";
	} 

$("li").click(function() {
	$("#miss").html("Total misses now: " + misscount);
	$("#matchednow").html("Matches found so far: " + matchesSoFar);
	$("#pairsleft").html("Still these many pairs left: " + pairsRemained);
	
	
  if ((count < 2) &&  ($(this).children("img").hasClass("up")) === false) {
    
    count++;
    $(this).children("img").show();
    $(this).children("img").addClass("up");
    
    if (count === 1 ) { 
      guess1 = $(this).children("img").attr("src"); 
    }   
    
    else { 
      guess2 = $(this).children("img").attr("src"); 
      
      if (guess1 === guess2) { 
      	matchesSoFar++;
      	pairsRemained--;
        $("li").children("img[src='" + guess2 + "']").addClass("match");
        document.getElementById("game-board").style.cursor="progress";
      } 
      
      else { 
      	misscount++;
        setTimeout(function() {
          $("img").not(".match").hide();
          $("img").not(".match").removeClass("up");
        }, 1000);
        document.getElementById("game-board").style.cursor="not-allowed";
      }
      
      if(pairsRemained == 0) {
      	window.alert("Congratulations! You won!");
      }
      
      count = 0; 
      setTimeout(function() { document.getElementById("game-board").style.cursor="default"; }, 1000);      
    }
  }

});

$(document).ready(function() {
	
	 $('#newgame').click(function(){
        guess1 = "";
		guess2 = "";
		count = 0;
		misscount = 0;
		matchesSoFar = 0;
		pairsRemained = 8;
		timeInterval = _.now();
		$("img").hide();
     });
     
});