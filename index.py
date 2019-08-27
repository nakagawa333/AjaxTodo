from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from random import randint
from flask_marshmallow import Marshmallow
from sqlalchemy import or_
import requests

app = Flask(__name__)
ma = Marshmallow(app)

app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)

class Member(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	name = db.Column(db.String(50))
	email = db.Column(db.String(50))
	random = db.Column(db.Integer)

	def __repr__(self):
		# return ("{0}","{1}","{2}").format(self.id,self.name,self.email)
		return "{0},{1},{2}".format(self.id,self.name,self.email)

class MemberSchema(ma.ModelSchema):
	class Meta:
		model = Member


@app.route("/")
def index():
	members = Member.query.order_by(Member.id.desc()).limit(3)
	return render_template("index.html",members=members)

@app.route("/limit_all",methods=["POST"])
def limit_all():
	members = Member.query.order_by(Member.id.desc()).limit(3)
	member_schema = MemberSchema(many=True)
	result = member_schema.dump(members)
	return jsonify({"members":result})

@app.route("/all",methods=["GET"])
def all():
	page = request.args.get("page",1,type=int)
	members = Member.query.order_by(Member.id.desc()).paginate(page=page,per_page=5)
	return render_template("all_member.html",members=members)


@app.route("/alljson",methods=["POST"])
def alljson():
	page = request.args.get("page",1,type=int)
	members = Member.query.order_by(Member.id.desc()).paginate(page=page,per_page=5)
	return jsonify({"members":members})

@app.route("/add",methods=["GET","POST"])
def add():
	name = request.form["name"]
	email = request.form["email"]
	member = Member(name = name,email=email)

	db.session.add(member)
	db.session.commit()

	members = Member.query.order_by(Member.id.desc()).all()
	member_schema = MemberSchema(many=True)
	result = member_schema.dump(members)
	return jsonify({"member":result})

@app.route("/search",methods=["GET"])
def search():
	req = request.args.get("input")
	searches = db.session.query(Member).\
	                                                  filter(or_(\
	                                                  Member.name.like("%" + req + "%"),\
	                                                  Member.email.like("%" + req + "%"),\
	                                                 )).all()

	members = Member.query.all()
	return render_template("search.html",searches=searches)

@app.route("/searches",methods=["POST"])
def searches():
	req = request.form["req"]
	searches = db.session.query(Member).\
	                                                  filter(or_(\
	                                                  Member.name.like("%" + req + "%"),\
	                                                  Member.email.like("%" + req + "%"),\
	                                                  )).all()

	member_schema = MemberSchema(many=True)
	result = member_schema.dump(searches)
	return jsonify({"member":result})


@app.route("/update",methods=["PUT"])
def update():
	member = Member.query.filter_by(id=request.form["id"]).first()
	member.name = request.form["name"]
	member.email = request.form["email"]
	member.random = randint(1,1000)

	db.session.commit()

	return jsonify({"member_num":member.random,"member_name":member.name,"member_email":member.email})

@app.route("/delete",methods=["DELETE"])
def delete():
	member_id = Member.query.filter_by(id = request.form["id"]).first()
	member = Member.query.filter_by(id=request.form["id"]).first()
	db.session.delete(member)
	db.session.commit()

	members = Member.query.order_by(Member.id.desc()).limit(3)
	member_schema = MemberSchema(many=True)
	result = member_schema.dump(members)
	return jsonify({"members":result})

@app.route("/deleteall",methods=["DELETE"])
def deleteall():
	 Member.query.delete()
	 db.session.commit()
	 total = Member.query.count()
	 Stringtotal = str(total)

	 return Stringtotal

if __name__ == '__main__':
    app.run(debug=True)