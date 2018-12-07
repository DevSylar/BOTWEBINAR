


module.exports = class build{

	static text(id,message){
		return {
                recipient: {
                	id: id
                },
                message: {
                	text: message
                }
            };
	}
	
}