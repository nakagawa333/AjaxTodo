$(function(){
	$("#searchSubmit").on("click",function(){
		let req = $("#search-input").val();
		$.ajax({
			url:"/searches",
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

var sucessCallback = (data) =>{
	//history.pushState('','','/search');
	history.pushState("","","/search");
	let datas = data;
	console.log(datas);

	$.ajax({
		type:"POST",
		url:"/search",
		data:{
			datas:datas
		}
	})
	.then(
		sucessCallback_a,
		errorCallback_a
	)
}

var errorCallback = () => {
	console.log("Error");
}



var sucessCallback_a = (data) => {
	console.log("Sucess");
}

var errorCallback_a = () => {
	console.log("error");
}