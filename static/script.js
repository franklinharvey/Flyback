(function() {
	var config = {
		apiKey: "AIzaSyAPpCQEyr_E8seQdF75zSrWKaACM2bPr_0",
	    authDomain: "watchapp-992f5.firebaseapp.com",
	    databaseURL: "https://watchapp-992f5.firebaseio.com",
	    storageBucket: "watchapp-992f5.appspot.com",
	    messagingSenderId: "836981217641"
	};
	firebase.initializeApp(config);

	object = "";
	populate(object);

	function loadPage(object){
		const content = document.getElementById("content");
		var imgSource = "https://s30.postimg.org/t7kxdxflt/IMG_4052.jpg";
		var contentString = '<div class="content-window">' +
			'<img src="' + imgSource + '" class="img-responsive" height="400px">' + 
			'<h3> ' + object + ' </h3>' +
			'</div>';
		content.insertAdjacentHTML('beforeend', contentString);
	};

	function populate(object){
		var query = firebase.database().ref("Brands/" + object).orderByKey();
		query.once("value")
	  		.then(function(snapshot) {
	    		snapshot.forEach(function(childSnapshot) {
		      		var key = childSnapshot.key;
		      		var childData = childSnapshot.val().RefNumber;
		      		if (!childData){
		      			loadPage(key);
		      		}
		      		else {
		      			console.log(key + " " + childData);
		      		}
	  			});
			});
  	}

	function stripPunctuation (replaceString) {
		replaceString = replaceString.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
		replaceString = replaceString.replace(/\s{2,}/g," ");
		return replaceString;
	};
}());