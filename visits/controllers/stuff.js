exports.helloWorld = (req, res, next) => {
	res.status(200).json({message: "This is visits service"})
}