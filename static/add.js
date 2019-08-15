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

				$("#body").prepend("<div class=container>" + "<div id=memberSection class=panel>" + "<div class=panel-heading>" + "<h3 class=panel-title>" +"Member Number:" + "<span id=memberNumber>" + member.random + "</span>" + "</h3>" +"</div>" 
					 + "<div class=panel-body><div class=form-inline><div class=form-group> <label for=nameInput>title</label><input type=text class=form-control id=nameInput>"
					 + "<div class=form-group><label for=emailInput>content</label><input type=email class=form-control id=emailInput ></div>"
					 +"<button class=updateButton id=ub member_id=>Update</button>"
					 +" <button class=deleteButton id=db member_id=>Delete</button>"
					+ "</div></div></div></div>");

				$("#nameInput").val(member.name);
				$("#emailInput").val(member.email);

				// $("#membersection")
				$(".panel").addClass("panel-default");
				$(".updateButton").addClass("btn btn-primary ");
				$(".deleteButton").addClass("btn btn-primary ");

				$("#memberSection").attr("id","memberSection" + member.id);

				$("#nameInput").attr("id","nameInput" + member.id);
				$("#emailInput").attr("id","emailInput" + member.id);
				$("#memberNumber").attr("id","memberNumber" + member.id);
				
				$("#ub").attr({
					member_id:member.id
				});

				$("#db").attr({
					member_id:member.id
				});

				//update
				$(function(){
					$(".updateButton").on("click",function(){
						let member_id = $(this).attr("member_id");

						let name = $("#nameInput" + member_id).val();
						let email = $("#emailInput" + member_id).val();	

						$.ajax({
							url:"update",
							type:"POST",
							data:{
								name:name,
								email:email,
								id:member_id
							}
						})

						.done((data) =>{
							$('#memberSection'+member_id).fadeOut(1000).fadeIn(1000);
            				$('#memberNumber'+member_id).text(data.member_num);
						})

						.fail(() =>{
							alert("updateError");
						})


					})
				})

                //delete
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
						.done((data) =>{
							
							$("#memberSection" + member_id).remove();
						})
						.fail(() => {
							alert("deleteError");
						})

					})


				})
			};
		})

		//データベースに新しいデータを保存出来なかった時
		.fail(() => {
			alert("Error");
		})
	})
})

// let sucesscalldelete = (function(data){
// 	$("#memberSection" + member_id).remove();
// })

// let errorcalldelete = (function(){
// 	alert("Error");
// })

