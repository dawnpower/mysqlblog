var userid = document.getElementById("userid").value();
var password = document.getElementById("password").value();
$(document).ready(function(){
  $("form").submit(function(e){
    $.post('homepage', { userid: userid,password:password}, function (e) {     
    alert("Submitted");
     });
  });
});
