$(function(){
	$(".deleteButton").on("click",function(){
		let member_id = $(this).attr("member_id");

		$.ajax({
			url:"delete",
			type:"POST",
			data:{
				id:member_id
			}

		})

		.done((data) => {
			$("#memberSection" + member_id).remove();
			
			//alert("sucess");
		})

		.fail(() => {
			alert("Error");
		})
	})
})

