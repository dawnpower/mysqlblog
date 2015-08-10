var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
var useraddress = document.getElementById("useraddress").value;
var userphone= document.getElementById("userphone").value;
$(document).ready(function(){
  $("form").submit(function(e){
    console.log("fffffffff"+username + " "+ password);
    alert("heeelllloooo");
    $.post('/signpage', { username: username,useraddress:useraddress,userphone:userphone,password:password}, function (e) {     
    alert("Submitted");
     });
  });
});
