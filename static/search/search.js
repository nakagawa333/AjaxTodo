$(function(){
	$("#searchsubmit").on("click",function(){
		let req = $("#search_input").val();

		localStorage.setItem("req",req);

		let r = localStorage.getItem("req");

		$("#search_input").val(r);

		$.ajax({
			url:"/searches",
			type:"POST",
			data:{
				req:req
			}
		})
		.then(
			sucessCallback_search,
			errorCallback_search
		)
	})
})

let sucessCallback_search = (data) =>{
	//history.pushState('','','/search');
	let members = data.member;
	console.log(members);
	//検索結果がない場合
	if(members.length == 0){
		alert("検索結果がありませんでした。");
	} else{
		let body = $("#body");
		body.empty();

		let appendHtml = "";
		for(i = 0 ; i <= members.length; i++){
		$("#body").append(`
			<div class="container"><div id="memberSection${members[i].id}" class="panel panel-default"> <div class="panel-heading"><h3 class="panel-title">No: <span id="memberNumber${members[i].id}">${members[i].id}</h3></div>
			<div class="panel-body"><div class="form-inline">
			<div class="form-group"><label for="nameInput">title</label><input type="text" class="form-control" id="nameInput${members[i].id}" value="${members[i].name}"></div>
			<div class="form-group"><label for="emailInput">content</label><input type="text" class="form-control" id="emailInput${members[i].id}" value="${members[i].email}"></div>
			<button class="btn btn-primary updatebutton" member_id=${members[i].id}>Update</button>
			<button class="btn btn-primary deletebutton" member_id=${members[i].id}>Delete</button>
			</div></div></div></div>		
			`);

		body.append(appendHtml);

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
				alert("updateError");
			})
		})
	})

	}
	}
}

let errorCallback_search = () => {
	console.log("Error");
}

$(function(){
	$("#searchsubmitb").on("click",function(){
		let req = $("#search_input").val();

		localStorage.setItem("req",req);

		let r = localStorage.getItem("req");

		$("#search_input").val(r);

	})
})