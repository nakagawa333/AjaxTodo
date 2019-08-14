

$(function(){
	$(".updateButton").on("click",function(){
		let member_id = $(this).attr("member_id");

		let name = $("#nameInput" + member_id).val();
		let email = $("#emailInput" + member_id).val();

		$.ajax({
			url:"/update",
			type:"POST",
			data: {name:name,email:email,id:member_id}
		})

		.done((data) => {
			// $('#nameInput'+ member_id).val(data.member_name);  
			// //$('#memberNumber'+member_id).text(data.member_num);
            $('#memberNumber'+member_id).text(data.member_num);
            //alert("Hello");
		})

		.fail((data) =>{
			alert("Error");
		})
	})
})