$(function(){
	$("#deleteAll").on("click",function(){
		$.ajax({
			url:"/deleteall",
			type:"DELETE"
		})
		.done((data) => {
			$("#body").remove();
		})

		.fail(() => {
			alert("Error");
		})

	})
})

