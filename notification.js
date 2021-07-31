/**
* Source from : https://cythilya.github.io/2017/07/09/notification/
* Use :
*     LaunchNotification( doNotification );
*/

function checkIfNotificationAvailable() {
  return 'Notification' in window;
}

function LaunchNotification( func ) {
    if (Notification.permission === 'default' || Notification.permission === 'undefined') {
      Notification.requestPermission (
        function( permission ) {
            if( permission === 'granted' && func ) {
              func();
            }
            else {
              console.log("user disable the notification...");
            }

        });

        return;
    }

    if ( Notification.permission === 'granted' && func ) {
        console.log("user enable it already...");
        func();
        return;
    }

    console.log("no permission can do...");
}



function doNotification() {

    var notify = new Notification('title', {"body":"message content"});

    /**
    * content parameters:
    * body -> message content
    * icon -> icon image address
    * tag -> the name of notification, if using the same tag, the new one will shows up at same position
    */

    notify.onclick = function(e) {
        e.preventDefault();
        console.log("console env is still in the main window...");
        window.open("https://www.google.com");
    }

    notify.onerror = function(e) {
        // handle the exception
    }
}
