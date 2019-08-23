$(function(){
	$("#searchsubmit").on("click",function(){
		let req = $("#search_input").val();
		alert("hello");
		$.ajax({
			url:"/alljson",
			type:"POST",
			data:{
				req:req
			}
		})
		.then(
			sucessCallback,
			errorCallback
		)
	})
})

var sucessCallback = (data) => {
	console.log(data);
}

var errorCallback = () => {
	console.log("error");
}