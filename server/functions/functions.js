function map( x,  in_min,  in_max,  out_min,  out_max){
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

module.exports = {
    findUser: function(socket, array) {
        var index = -1
            ,   thisUsername;

        for(var i = 0; i < array.length; i++) {
            if (array[i].id === socket) {
                index = i;
                thisUsername = array[i].username;
                break;
            }
        }
        return thisUsername
    }
};