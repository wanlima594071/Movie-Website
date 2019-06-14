//main test function;
// function main(){
// 	console.log("Hello goorm!");
// }
// main();

var express=require('express');
var app=express();
var mongoose=require("mongoose");
var blog=require("./models/model");
var bodyparser=require("body-parser");
var methodoverride=require("method-override");
var sanitizer=require("express-sanitizer");

//app.set("view engine", 'ejs');
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodoverride("_method"));
app.use(sanitizer());

////////////////////////////////////////////////////////////////////////////////////
//                                    MongoDB Connect
///////////////////////////////////////////////////////////////////////////////////
//mongoose.connect('mongodb+srv://wanlima:she123456@cluster0-r6eej.mongodb.net/test?retryWrites=true&w=majority', { 

mongoose.connect('mongodb+srv://wanlima:she123456@cluster0-r6eej.mongodb.net/project0?retryWrites=true&w=majority', { 
        useNewUrlParser: true,
        useCreateIndex: true
      })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

//                                    Mongoose Schema In App.js
// const schema = mongoose.Schema({
// 	// id: mongoose.Schema.Types.ObjectID,
// 	name: String,
// 	ok: Boolean
// });
// var Product = mongoose.model("Product", schema);



////////////////////////////////////////////////////////////////////////////////////
//                                    MongoDB Try
///////////////////////////////////////////////////////////////////////////////////

//New and Save
// phil = new product({
// 	name: "phil",
// 	ok: true
// });

// phil.save((err,phil)=>{
// 	if (err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log("phil saved",phil);
// 	}
// });



//Create
// blog.create({
// 	title: "star wars",
// 	image: "https://images3.alphacoders.com/114/11439.png"
// },function(err,product){
// 	if (err){
// 		console.log("err with create",err);	
// 	}else{
// 		console.log("ok create product", product);
// 	}	
// });



////////////////////////////////////////////////////////////////////////////////////
//                                    ROUTES
///////////////////////////////////////////////////////////////////////////////////

//INdex Route
app.get("/",function(req,res){
	res.redirect("/blogs");
});

app.get("/blogs",function(req,res){
	blog.find({},(err,blogs)=>{
		if (err){
		console.log("err with index route", err);
	}else{
		res.render("landing.ejs", {blogs:blogs});
	}
});
});

//About this website
app.get("/blogs/about",function(req,res){
	blog.find({},(err,blogs)=>{
		if (err){
		console.log("err with about route", err);
	}else{
		res.render("about.ejs");
	}
});
});


//New Route
app.get("/blogs/new",function(req,res){
	blog.find({},(err,blogs)=>{
		if (err){
		console.log("err with new route", err);
	}else{
		res.render("new.ejs", {blogs:blogs});
	}
});
});

//Create Route
app.post("/blogs",function(req,res){
	
	req.body.blog.body=req.sanitize(req.body.blog.body);
	
	blog.create(req.body.blog,(err,blogs)=>{
		if (err){
		console.log("err with create route", err);
		res.render("new");
	}else{
		res.redirect("/blogs");
	}
});
});

//SHOW Route
app.get("/blogs/:id",function(req,res){
	// res.send("show page")
	// console.log("id in show route is",req.params.id);
	blog.findById(req.params.id,(err,Foundblog)=>{
		if (err){
		console.log("err with show route", err);	
		res.redirect("/blogs");
	}else{
		res.render("show.ejs",{blog:Foundblog});
	}
});
});

//Edit Route
app.get("/blogs/:id/edit",function(req,res){
	// res.send("edit page");
	// console.log(req.params.id);
	blog.findById(req.params.id,(err,Foundblog)=>{
		if (err){
		console.log("err with edit route", err);
		res.redirect("/blogs");
	}else{
		res.render("edit.ejs",{blog:Foundblog});
	}
});
});

//Update Route
app.put("/blogs/:id",function(req,res){	
// 	 res.send("update page");
// });
	// console.log(req.params.id);
	req.body.blog.body=req.sanitize(req.body.blog.body);
	
	blog.findByIdAndUpdate(req.params.id, req.body.blog, (err,Updateblog)=>{
		if (err){
		console.log("err with update route", err);
		res.redirect("/blogs");
	}else{
		res.redirect("/blogs/"+ req.params.id);
	}
});
});


//Delete Route
app.delete("/blogs/:id",function(req,res){	
// 	 res.send("delete page");
// });
	// console.log(req.params.id);
	blog.findByIdAndRemove(req.params.id, (err,Updateblog)=>{
		if (err){
		console.log("err with delete route", err);
		res.redirect("/blogs");
	}else{
		res.redirect("/blogs/");
	}
});
});






////////////////////////////////////////////////////////////////////////////////////
//                                    URL
///////////////////////////////////////////////////////////////////////////////////
app.listen(process.env.PORT || 3000, ()=>{
	console.log("server listen on port 3000");
});




