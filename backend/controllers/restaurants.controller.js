const mongoRestaurantsDetail = require('../model/mongoRestaurantsModel.model')

const getRestaurants = (req, res) => {
    
    //return res.status(200).send({message: "All restaurants found" });
    mongoRestaurantsDetail.find({}, function (err, data) {
        // Mongo command to fetch all data from collection.
        
        if (err) {
            return res.status(400).send({ message: 'Error fetching data from MongoDB' });
        } else {
            return res.status(200).send({message: data });
        }
        
    });

}

const getCuisines = (req, res) => {
    
    //return res.status(200).send({message: "All restaurants found" });
    mongoRestaurantsDetail.find({}, 'Cuisines' ,function (err, data) {
        // Mongo command to fetch all data from collection.
        
        if (err) {
            return res.status(400).send({ message: 'Error fetching data from MongoDB' });
        } else {
            var cuisines=[]
            data.forEach(function(item, index, array) {
                
                temp=item["Cuisines"].split(/\s*,\s*/);
                
                temp.forEach(function(item) {
                    if(item!='')
                        cuisines.push(item);
                });
            })
            var set = new Set(cuisines);
            //console.log("cuisine set",set);
            cuisines=[]
            set.forEach(function(item, index, array) {
                cuisines.push({"value":item, "label":item})
            })
            //console.log(cuisines);
            
            return res.status(200).send({message: cuisines });
        }
    })
}
const filterCuisines = (req, res) => {
    let cuisines = req.body.cuisines
    //console.log(cuisines);
    c=[]
    cuisines.forEach(function(item, index, array) {
        c.push(item["value"])
    })
    //return res.status(200).send({message: "All restaurants found" });
    mongoRestaurantsDetail.find({"Cuisines":{"$in":c}}, function (err, data) {
        // Mongo command to fetch all data from collection.
        console.log(data);
        
        if (err) {
            return res.status(400).send({ message: 'Error fetching data from MongoDB' });
        } else {
            return res.status(200).send({message: data });
        }
        
    });

}


module.exports = {
    getRestaurants,
    getCuisines,
    filterCuisines
};