function searchresultlocator(resultpos){
	$$(".page-content").scrollTop(0);	
	topd = $$("#"+resultpos).offset();
	tops = topd.top;
	$$(".page-content").scrollTop(tops - 50, 1000);
	resultparagraph = $$("#"+resultpos).css('font-weight', 'bold');
	
	boldSearch($$("#"+resultpos).html());
	$$("#"+resultpos).html(newword);
};

function boldSearch(editedstring){
					for (b = 0; b<aresult.length; b++){
						var regword = new RegExp(aresult[b], "gi");
						newword = editedstring.replace(regword, aresult[b].toUpperCase());
						editedstring = newword;
					}
					return newword;
				}

$$('.opensearch').on('click', function(){
	myApp.prompt('enter search keyword(s)', 'MANUAL SEARCH', function(value){
		searchkeywords(value);
	}, function(){
		$$('.secs').removeClass('paddedsecs');
	});
}
);
function searchkeywords(keywords){
		a = keywords;
		if (a.replace(/^\s+|\s+$/g, "").length != 0)
			myApp.openPanel('right');
		a = a.replace(/^\s+|\s+$/g, "");
			aresult = [];
		aresult = a.split(" ");
		searchquery = "%";
		searchquery += aresult.join("%");
		searchquery += "%";
		bresult = [];
		for (xx=0; xx<aresult.length; xx++)
			bresult[xx] = '%' + aresult[xx] + '%';
		queryconstrct(bresult);
	function queryconstrct(thearray){
		myquery = "SELECT * FROM manual WHERE chapter = "+ currentChapter +" and content like '" + thearray[0] +"'";
		for (o=1; o<thearray.length; o++)
			myquery += " or content like '" + thearray[o] +"' and chapter = "+ currentChapter;
		return myquery;
	}
	db.transaction(function(tx) {tx.executeSql(""+myquery+"", [],
		function (tx, results){
			var resultContent = "";
			sec = 0;
			
			for(i=0; i<results.rows.length; i++){
				item = results.rows.item(i);
				if (!(item.section == sec)){
					sec = item.section;
					subsectitleEd = subsectitle[sec - 1];
					boldSearch(subsectitleEd);
								
					resultContent += '<a href="#section'+sec+'"class="external panellinks"><p class="secs">' + newword + '</p></a>';
						
				}
				
				boldSearch(item.content);
				trimOutput(newword, aresult);
				function trimOutput(tobetrimmed, searchq){
					tobetrimmedupper = tobetrimmed.toUpperCase();
					pos1 = tobetrimmed.length;
					pos2 = 0;
				for (z=0; z<searchq.length; z++){
					regword = searchq[z].toUpperCase();
					postest = tobetrimmedupper.indexOf(regword);
					if (postest<pos1 && postest!=-1)
						pos1 = postest;
					postest = tobetrimmedupper.lastIndexOf(regword) + searchq[z].length;
					if (postest > pos2)
						pos2 = postest;
				}
				if (pos2 > 60){
					if ((pos2 - pos1)> 60){
						if (pos1 > 20){
						newword = '...'+tobetrimmed.substr(pos1 - 15, 30)+'...';
						newword += '...'+tobetrimmed.substr(pos2 - 15, 30)+'...';
						return newword;	
						}
						newword = '...'+tobetrimmed.substr(0, 30)+'...';
						newword += '...'+tobetrimmed.substr(pos2 - 15, 30)+'...';
						return newword;
					}
						newword = '...'+tobetrimmed.substr(pos1, 60)+'...';
						return newword;
				}
				newword = '...'+tobetrimmed.substr(0, 60)+'...';
						return newword;
				}
				pagepara = ""+item.page + item.paragraph;
				resultContent = resultContent + '<a href="#" class="searchresultlink panellinks" onclick=searchresultlocator('+pagepara+');><p>'+ newword + '</p></a>';
			}
			if (resultContent.length == 0){
				boldSearch(a);
				resultContent = "no results found matching "+newword+" try another keyword";
			}
			$$('#results-content').html(resultContent);
			$$('.panellinks').on('click', function(e){
				myApp.closePanel();
			});
		}
			);});
};
