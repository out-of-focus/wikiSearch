var str = "";

$(document).ready(function() {

document.getElementById("theQuery").onkeydown= function(){
  var char = event.which || event.keyCode;
  if (char==13){
    wikiSearch();
    return false;
  } else {return true; }
}
  
  document.getElementById("random").onclick = function() {
    window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
  };

  $("#searchicon").click(function() {
    if (document.getElementById("theQuery").className != "active"){
    document.getElementById("theQuery").className = "active";
    document.getElementById("theQuery").focus();
    document.getElementById("searchicon").className = 'searching';
    } else {
      wikiSearch()};

  });
  

  
 /* $("#theQuery").keyup(function() {
    str = $("#theQuery").val();
  });*/
  // STAD ZMIANA
  //$("#test").click(
  
  function wikiSearch() {
    //var wikiUrl = "https://en.wikipedia.org/w/api.php?action=query&format=jsonfm&generator=allpages&grnnamespace=0&gaplimit=5&gapfrom=" + str + "&prop=info|extracts&inprop=url&callback=?";
         document.getElementById("plaque").style.marginTop ="30px";
    document.getElementById("results").innerHTML ="";
    str = $("#theQuery").val();
    $.ajax({
      type: "GET",
      url: "http://en.wikipedia.org/w/api.php?action=query&format=json&generator=allpages&exintro&exchars=100&grnnamespace=0&exlimit=max&gapfrom=" + str + "&prop=info|extracts&inprop=url&gapfilterredir=nonredirects&callback=?",
      contentType: "application/json; charset=utf-8",
      async: false,
      dataType: "json",
      success: function(data, textStatus, jqXHR) {
        console.log(data);
        var pages = Object.keys(data.query.pages);
        for (let i = 0; i < pages.length; i++) {
          let newDiv = document.createElement('div');
          newDiv.className = 'results';
          var pno = pages[i];
          newDiv.innerHTML = data.query.pages[pno].extract.replace("</p>...", " ...</p>");
          document.getElementById("results").appendChild(newDiv);
          let wikiPage = data.query.pages[pno].fullurl;
          newDiv.onclick = function() {
            window.open(wikiPage, "_blank")
          };
          //console.log(Object.keys(data.query.pages)); 
        }
        $("#results").slideDown("slow");
      },
      error: function(errorMessage) {}
    });
  }
// DOTAD
  document.getElementById("test").onclick = wikiSearch;
})