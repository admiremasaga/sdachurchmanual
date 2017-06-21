function initLinks(){
	nextChapter = currentChapter + 1;
	$$('#prevChapter').html('home');
	$$('#nextChapter').html('chapter ' + nextChapter);
}

$$('#nextChapter').on('click', function(){
	if (currentChapter < 19){
	currentChapter = currentChapter + 1;
	navshtml();
	}
});

$$('#prevChapter').on('click', function(){
	if (currentChapter > 1){
	currentChapter = currentChapter - 1;
	navshtml();
	}
	
});

function navshtml(){
	$$(".page-content").scrollTop(0);
	nextChapter = currentChapter + 1;
	prevChapter = currentChapter - 1;
	loadmanual(currentChapter);
	$$('#prevChapter').html('<i class="icon f7-icons size-14">chevron_left</i>  chapter ' + prevChapter);
	$$('#nextChapter').html('chapter ' + nextChapter +' <i class="icon f7-icons size-14">chevron_right</i>');
	
	if (currentChapter == 1){
	$$('#prevChapter').html("");
	}
	if (currentChapter == 19){
	$$('#nextChapter').html("");
	}
}