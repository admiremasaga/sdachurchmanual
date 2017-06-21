// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
	checkTablesCreated();
	currentChapter = 1;
	loadmanual(currentChapter);
	initLinks();
		 //Contents grid contents modal generator
	var menucon = '<div class="data-table"><table><tbody><tr>';
for (i=0; i<chaptertitle.length; i++){
			chptitle = chaptertitle[i];
			if (chptitle.length > 17){
				chptitle = chptitle.substr(0, 17) + '...';
				}
			menucon += '<td><a href="#" id="'+chaptertitle[i]+'" class="gridlinks" onclick="myApp.closeModal(); currentChapter = '+(i+1)+'; navshtml();">'+ chptitle + '</a></td>';
			if (i!=0 && (i % 3) == 0){
			menucon += '</tr><tr>';}
}
menucon += '</tbody></table></div>';
$$('.open-contents-modal').on('click', function(){
	myApp.modal({
		title: 'CHURCH MANUAL CONTENTS',
		text: menucon,
		buttons: [{
			text: 'close',
			close: true,
		},]
	})
	});
		 //Contents grid contents modal generator ends here
});

//font change modal script
$$('.open-fontchange-modal').on('click', function () {
  myApp.modal({
    title:  'FONT SIZE',
    text: 'Click on the buttons below to change the size.',
    buttons: [
      {
        text: 'SMALL',
        onClick: function() {
          $$('.page-content').removeClass('bigfont');
		  $$('.page-content').removeClass('mediumfont');
        }
      },
      {
        text: 'MEDIUM',
        onClick: function() {
		$$('.page-content').removeClass('bigfont');
          $$('.page-content').addClass('mediumfont');
        }
      },
      {
        text: 'BIG',
        bold: true,
        onClick: function() {
		$$('.page-content').removeClass('mediumfont');
          $$('.page-content').addClass('bigfont');
        }
      },
    ]
  })
});

//theme change modal script
$$('.open-themechange-modal').on('click', function () {
  myApp.modal({
    title:  'COLOUR THEME',
    text: 'Click on the buttons below to change the colour theme.',
    buttons: [
      {
        text: 'DARK THEME',
        onClick: function() {
          $$('.page-content').removeClass('lighttheme');
		 $$('#manualcontent').removeClass('lighttheme');
		  $$('.page-content').addClass('darktheme');
		  $$('#manualcontent').addClass('darktheme');
        }
      },
      {
        text: 'LIGHT THEME',
        onClick: function() {
		  $$('.page-content').removeClass('darktheme');
		  $$('#manualcontent').removeClass('darktheme');
		 $$('.page-content').addClass('lighttheme');
		 $$('#manualcontent').addClass('lighttheme');
        }
      },
    ]
  })
});