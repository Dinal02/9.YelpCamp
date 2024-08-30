const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    // const c = new Campground({ title: 'purple field' });
    // await c.save();

    for(let i = 0; i < 300; i++) {
        const randomIndex = Math.floor(Math.random() * cities.length);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '66bef9aaa9a7de39f110abbe',
            location: `${cities[randomIndex].city}, ${cities[randomIndex].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate corporis atque deleniti sed illo, nostrum praesentium numquam laborum similique inventore explicabo eius quasi vero consectetur ab. Voluptatibus voluptates ipsum illum.',
            price,
            geometry: {
                type: "Point", 
                coordinates: [
                    cities[randomIndex].longitude,
                    cities[randomIndex].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dtxfscseo/image/upload/v1724479384/YelpCamp/vjylzuicf7v6qbsrpilm.jpg',
                  filename: 'YelpCamp/vjylzuicf7v6qbsrpilm',         
                },
                {
                  url: 'https://res.cloudinary.com/dtxfscseo/image/upload/v1724479380/YelpCamp/qsguon5eju1aflduawe9.jpg',
                  filename: 'YelpCamp/qsguon5eju1aflduawe9',        
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});

// `https://picsum.photos/400?random=${Math.random()}`