var net = require('net'), Firebase = require('Firebase');

var JETDIRECT_PORT = 9100;

function main(){
	var ref = new Firebase('https://printrapp.firebaseio.com');
	var printerRef = ref.child('Printers');
	var messageRef = ref.child('Messages');
	var printers = {};

	// Handle addition, updates, and removal of printers
	printerRef.on('child_added', function(snapshot){
		printers[snapshot.name()] = snapshot.val();
	});

	printerRef.on('child_changed', function(snapshot){
		printers[snapshot.name()] = snapshot.val();
	});

	printerRef.on('child_removed', function(snapshot){
		delete printers[snapshot.name()];
	});

	// Any time a new printer is added, we've got to monitor it's messages
	messageRef.on('child_added', function(snapshot){
		var name = snapshot.name();
		var hostIP = printers[name]['IP'];
		var printerMessageRef = messageRef.child(name);

		// Get most recent message for each printer
		printerMessageRef.limit(1).on('child_added', function(snapshot){
			// Pull out data about the message, and connect it up with a printer
			var data = snapshot.val();
			var username = data['username'];
			var message = data['message'];

			// Connect to the printer and update the text
			var printer = net.connect({port:JETDIRECT_PORT, host:hostIP}, function(){
				printer.write("@PJL RDYMSG DISPLAY = " +  message + "\n");
				printer.end();
			});

			printer.on('data', function(data){
				console.log(data.toString());
			});

			printer.on('error', function(error){
				console.log(error);
				printer.end();
			});

			printer.on('end', function(){
				console.log('ending socket');
			});
		});
	});
}

main();