var mongoose=require("mongoose");

const schema = mongoose.Schema({
	// _id: mongoose.Schema.Types.ObjectID,
	title: String,
	image: String,
	body: String
});
var Product = mongoose.model("Product", schema);

module.exports = Product;