(function() {
	var config = {
		apiKey: "AIzaSyAPpCQEyr_E8seQdF75zSrWKaACM2bPr_0",
	    authDomain: "watchapp-992f5.firebaseapp.com",
	    databaseURL: "https://watchapp-992f5.firebaseio.com",
	    storageBucket: "watchapp-992f5.appspot.com",
	    messagingSenderId: "836981217641"
	};
	firebase.initializeApp(config);


	contentString = '<div class="content-window">' +
			'<img src=' + imgSource + '>' + 
			'<h3> ' + object + ' </h3>' +
			'</div>';

	object = "";
	populate(object);

	function loadPage(){
		const content = document.getElementById("content");
		
	};

	function populate(object){
		var query = firebase.database().ref("Brands/" + object).orderByKey();
		query.once("value")
	  		.then(function(snapshot) {
	    		snapshot.forEach(function(childSnapshot) {
		      		// key will be "ada" the first time and "alan" the second time
		      		var key = childSnapshot.key;
		      		// childData will be the actual contents of the child
		      		var childData = childSnapshot.val().RefNumber;
		      		if (!childData){
		      			console.log(key);
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