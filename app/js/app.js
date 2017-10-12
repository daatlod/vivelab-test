appUsers = {};
appUsers.rootServices = 'https://jsonplaceholder.typicode.com/';
appUsers.json = {};
appUsers.OldJson = {};
appUsers.commentsJson = {};
appUsers.galleryJson = {};


/*load Json Services*/
appUsers.loadJson = function(serSelect){
	var http = $.ajax({
	    url: appUsers.rootServices+serSelect,
	    dataType: "json"
	});

	http.done(function(data){
	    appUsers.json = data;

	});
}

appUsers.loadJsonComments = function(id){
	var http = $.ajax({
	    url: appUsers.rootServices+'posts/'+id+'/comments',
	    dataType: "json"
	});

	http.done(function(data){
	    appUsers.commentsJson = data;

	});
}

appUsers.loadJsonGallery = function(id){
	var http = $.ajax({
	    url: appUsers.rootServices+'photos?albumid='+id,
	    dataType: "json"
	});

	http.done(function(data){
	    appUsers.galleryJson = data;

	});
}

/*home app*/

appUsers.buildHome = function(){
	appUsers.loadJson('users');

	$('#content').show();
	$('#content2').hide();	
	
	setTimeout(function(){  
		$('#content.home .container .row').html('');

		for (i = 0; i < appUsers.json.length; i++) {
			
			$('#content.home .container .row').append(
				'<div class="user-home">'
				+'<h2>'+appUsers.json[i].username+'</h2>'
				+'<p class="location"><span class="glyphicon glyphicon-map-marker"></span>'+appUsers.json[i].address.city+'</p>'
				+'<img src="http://fpoimg.com/300x250" />'
				+'<a href="#'+appUsers.json[i].id+'" class="link-user">+</a>'
				+'</div>'
			);    	
		}
	}, 200);
}

/*detail page post*/
appUsers.buildPost = function(id){
	appUsers.OldJson = appUsers.json;
	var idNumber = parseInt( id.replace('#', '') );
	appUsers.loadJson('posts?userId='+idNumber);
	appUsers.loadJsonComments(idNumber);

	$('#content2').show();
	$('#content').hide();

	setTimeout(function(){  

		$('.info-user h1, .post-user h2').text(appUsers.OldJson[idNumber-1].username);
		$('.info-user h3').text(appUsers.OldJson[idNumber-1].name);
		$('.info-user .email-user').text(appUsers.OldJson[idNumber-1].email);
		$('.info-user .geo-user').text(appUsers.OldJson[idNumber-1].address.city);
		$('.info-user .comp-user').text(appUsers.OldJson[idNumber-1].company.name);
		$('.info-user .qoute-user').text(appUsers.OldJson[idNumber-1].company.catchPhrase);

		$('.post-user h4').text(appUsers.json[0].title);
		$('.post-user .text').text(appUsers.json[0].body);

		$('.comments-user .expand-comments').text(appUsers.commentsJson.length+' comentarios');
		
		$('.comments-user .comment-boxes').html('');

		for (i = 0; i < appUsers.commentsJson.length; i++) {

			$('.comments-user .comment-boxes').append(
				'<div class="comment-box clearfix">'
				+'<div class="pic-comment"><img src="http://fpoimg.com/300x250" /></div>'
				+'<div class="text-coment"><p>'
				+'<span class="comment-o-user">'+appUsers.commentsJson[i].name+'</span>'
				+'<span class="mail-user-comment">'+appUsers.commentsJson[i].email+'</span></p>'
				+'<p class="comment">'+appUsers.commentsJson[i].body+'</p>'
				+'</div></div>'
			);    	
		}
		
	}, 500);
}

/*detail page gallery*/
appUsers.buildGallery = function(id){
	appUsers.OldJson = appUsers.json;
	var idNumber = parseInt( id.replace('#', '') );
	appUsers.loadJson('albums?userId='+idNumber);
	appUsers.loadJsonGallery(idNumber);

	$('#content2').show();
	$('#content').hide();

	setTimeout(function(){  

		$('.info-user h1, .post-user h2').text(appUsers.OldJson[idNumber-1].username);
		$('.info-user h3').text(appUsers.OldJson[idNumber-1].name);
		$('.info-user .email-user').text(appUsers.OldJson[idNumber-1].email);
		$('.info-user .geo-user').text(appUsers.OldJson[idNumber-1].address.city);		


		
		$('.boxes-gallery .album').html('');

		for (i = 0; i < 50; i++) {

			$('.boxes-gallery .album').append(
				'<div class="col-xs-4">'
		  		+'<a href="#" class=""><img src="'+appUsers.galleryJson[i].thumbnailUrl+'" /></a>'
		  		+'</div>'
			);    	
		}
		
	}, 700);
}


$(function(){ 
	appUsers.buildHome();

	

	$(window).on('hashchange', function() {
	  if (location.hash === '') {
	    appUsers.buildHome();
	    
	  }else{
	  	if( $('#content').hasClass('postUsers')  ){
	  		appUsers.buildPost(location.hash); 
	  	}else{
	  		appUsers.buildGallery(location.hash);
	  	}
	  	
	  }
	});
});


