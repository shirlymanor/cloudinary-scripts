var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
	cloud_name: "<CLOUD NAME>", 
	api_key: "<API KEY>", 
	api_secret: "<API SECRET>" 
}); 

var result = [];
var options = { type: "upload", max_results: 500, prefix: "<Name of the Folder>/" };
var sizefolder = 0

function listResources(next_cursor) {
    if (next_cursor != null && next_cursor != 1) 
        options["next_cursor"] = next_cursor;
    if (typeof next_cursor !== 'undefined' && next_cursor){
        cloudinary.api.resources(options, function(error,response){
        resources = response.resources;
        result = result.concat(resources);

        for(var res in resources) 
        {
            myres = resources[res];
            var mysize = myres.bytes;
            var mypublicId = myres.public_id; 
            console.log(sizefolder);
            sizefolder += mysize
                fs.appendFile('mynewfile.txt', mypublicId + " " + mysize + "/" + sizefolder + '\n', function (err) 
                {
                    if (err) throw err;
                });
        }

        var more = response.next_cursor;
        if (more)
            listResources(more);
        else
            console.log("DONE" + sizefolder);
        });
    }
}
listResources(1);
