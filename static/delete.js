
$(function(){
	$(".deleteButton").on("click",function(event){
		let member_id = $(this).attr("member_id");

		deferred = $.ajax({
			url:"/delete",
			type:"DELETE",
			data:{
				id:member_id
			}
		})
		.done((data) => {
			let members = data.members;
			let body = $("#body");
			body.empty();
			let appendHtml = "";
			for(i = 0; i < members.length ; i++){
				$("#body").append(`
					<div class="container"><div id="memberSection${members[i].id}" class="panel panel-default"> <div class="panel-heading"><h3 class="panel-title">No: <span id="memberNumber${members[i].id}">${members[i].id}</h3></div>
					<div class="panel-body"><div class="form-inline">
					<div class="form-group"><label for="nameInput">title</label><input type="text" class="form-control" id="nameInput${members[i].id}" value="${members[i].name}"></div>
					<div class="form-group"><label for="emailInput">content</label><input type="text" class="form-control" id="emailInput${members[i].id}" value="${members[i].email}"></div>
					<button class="btn btn-primary updatebutton" member_id=${members[i].id}>Update</button>
					<button class="btn btn-primary deletebutton" member_id=${members[i].id}>Delete</button>
					</div></div></div></div>
				`);
			}

			body.append(appendHtml);
			//update
			$(function(){
				$(".updatebutton").on("click",function(){
					let member_id = $(this).attr("member_id");
					let name = $("#nameInput" + member_id).val();
					let email = $("#emailInput" + member_id).val();

					$.ajax({
						url:"/update",
						type:"PUT",
						data:{
							name:name,
							email:email,
							id:member_id
						}
					})

					.done((data) => {
						$('#memberSection'+member_id).fadeOut(1000).fadeIn(1000);
					})

					.fail(() => {
						console.log("updateError");
					})
					//update
				})
			})
		})
		.fail(() => {
			alert("Error");
		})
		.always(() => {
			console.log("always");
			deferred.resolve();
		})
	})

});

