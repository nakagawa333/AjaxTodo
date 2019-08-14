$(function(){
	$("#add").on("click",function(){
		let name = $("#name").val();
		let email = $("#email").val();

		$.ajax({
			url:"add",
			type:"POST",
			data:{
				name:name,
				email:email
			}
		})

		.done((data) => {
			let members = data.member;
			//console.log(members);

			let appendHtml = "";
			for(i = 0; i < 1; i++){
				let member = members[0];
				console.log(member);

				$("#body").prepend("<div class=container>" + "<div id=memberSection class=panel>" + "<div class=panel-heading>" + "<h3 class=panel-title>" +"Member Number:" + "<span id=memberNumber>" + member.random + "</span>" + "</h3>" +"</div>" 
					 + "<div class=panel-body><div class=form-inline><div class=form-group> <label for=nameInput>title</label><input type=text class=form-control id=nameInput>"
					 + "<div class=form-group><label for=emailInput>content</label><input type=email class=form-control id=emailInput ></div>"
					 +"<button class=updateButton>Update</button>"
					 +" <button class=deleteButton>Delete</button>"
					+ "</div></div></div></div>");

				$("#nameInput").val(member.name);
				$("#emailInput").val(member.email);

				$(".panel").addClass("panel-default");
				$(".updateButton").addClass("btn btn-primary");
				 $(".deleteButton").addClass("btn btn-primary");



			};
		})

		.fail(() => {
			alert("Error");
		})
	})
})
