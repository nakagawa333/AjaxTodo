$(function(){
	$("#add").on("click",function(){
		let name = $("#name").val();
		let email = $("#email").val();

		$.ajax({
			url:"/add",
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
				$("#body").prepend(`
					<div class="container"><div id="memberSection${member.id}" class="panel panel-default"> <div class="panel-heading"><h3 class="panel-title">Member Number: <span id="memberNumber${member.id}">None</h3></div>
					<div class="panel-body"><div class="form-inline">
					<div class="form-group"><label for="nameInput">title</label><input type="text" class="form-control" id="nameInput${member.id}" value=${member.name}></div>
					<div class="form-group"><label for="emailInput">content</label><input type="text" class="form-control" id="emailInput${member.id}" value=${member.email}></div>
					<button class="btn btn-primary updatebutton" member_id=${member.id}>Update</button>
					<button class="btn btn-primary deletebutton" member_id=${member.id}>Delete</button>
					</div></div></div></div>		
					`)
			}

				//update
			$(function(){
				$(".updatebutton").on("click",function(event){
					let member_id = $(this).attr("member_id");
					let name = $("#nameInput" + member_id).val();
					let email = $("#emailInput" + member_id).val();	

					$.ajax({
						url:"/update",
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
				});
			})


			//delete
			$(function(event){
				$(".deletebutton").on("click",function(){
					let member_id = $(this).attr("member_id");
					$.ajax({
						url:"/delete",
						type:"POST",
						data:{
							id:member_id
						}
					})
					.done((data) =>{
					//alert("hello");
					$("#memberSection" + member_id).remove();
				})

			})
			})
			
		})

		//データベースに新しいデータを保存出来なかった時
		.fail(() => {
			alert("Error");
		})
	})
})

