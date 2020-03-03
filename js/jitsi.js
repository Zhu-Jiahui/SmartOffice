$(document).ready(function(){
          var domain = "meet.jit.si";
          var options = {
            roomName: "Smart Office",
            width: 430,
            height: 500,
            parentNode: document.querySelector('#meet')
          }
        var api = new JitsiMeetExternalAPI(domain, options);
        });
