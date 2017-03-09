const mongoose = require('mongoose');   // just a databese framwork
const { dbURI } = require('../config/environment');  // we connect to the database

mongoose.Promise = require('bluebird');    // to type more line
mongoose.connect(dbURI);


const User = require('../models/user');
const Session = require('../models/session');


Session.collection.drop();
User.collection.drop();


User
  .create([{
    firstName: 'me',
    lastName: 'you',
    username: 'meyou',
    email: 'me@me.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    image: 'https://s-media-cache-ak0.pinimg.com/736x/48/bd/3f/48bd3f6e928d7cb4b8d499cb0f96b8a8.jpg'

  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Session
      .create([{
        name: 'Caramelo Latin Dance',
        category: 'dance',
        address: {
          fullAddress: 'Paddington Academy, 50 Marylands Rd,  ',
          street: ' 50 Marylands Rd,  ',
          city: 'London',
          postcode: 'W9 2DR',
          country: 'UK'
        },
        image: 'http://cf.ltkcdn.net/dance/images/std/201360-461x450-dancers.jpg',
        stars: 3,
        createdBy: users[0]
      }, {
        name: 'Hunique Dance Hungarian Folk Dance Group',
        category: 'dance',
        address: {
          fullAddress: '2 Dukes Ave, ',
          street: ' Chiswick,  ',
          city: 'London',
          postcode: 'W4 2AE',
          country: 'UK'
        },
        image: 'https://www.likealocalguide.com/media/cache/73/c4/73c43e78cb28ced13d89ce5ece3fbec9.jpg',
        stars: 4,
        createdBy: users[0]   // dances should be users
      },{
        name: 'Brighton Ballet School',
        category: 'dance',
        address: {
          fullAddress: '205 Dyke Rd, ',
          street: 'Hove,  ',
          city: 'Brighton',
          postcode: 'BN3 6EG',
          country: 'UK'
        },
        image: 'http://www.ballet.org.uk/media/filer_public/2016/04/18/emerging-dancer-web.jpg',
        stars: 4,
        createdBy: users[0]   // dances should be users
      },{
        name: 'Xen-Do Martial Arts',
        category: 'kungfu',
        address: {
          fullAddress: '73 Baker St,',
          street: ' Marylebone,  ',
          city: 'London',
          postcode: 'W1U 6DJ',
          country: 'UK'
        },
        image: 'http://www.xen-do.com/imgs/player/about/xen-do-about-page-three.jpg',
        stars: 3,
        createdBy: users[0]   // dances should be users
      },{
        name: 'Hadouken Activity Club',
        category: 'kungfu',
        address: {
          fullAddress: 'London Road, ',
          street: 'Isleworth,  ',
          city: 'Manchester',
          postcode: 'TW7 4AS',
          country: 'UK'
        },
        image: 'https://i.kinja-img.com/gawker-media/image/upload/s--BANwxQTt--/c_scale,fl_progressive,q_80,w_800/182x5y9w98tjsjpg.jpg',
        stars: 5,
        createdBy: users[0]   // dances should be users
      },{
        name: 'White Crane Martial Arts',
        category: 'kungfu',
        address: {
          fullAddress: '64 Edward St, ',
          street: 'Hove,  ',
          city: 'Brighton',
          postcode: 'BN2 0JR',
          country: 'UK'
        },
        image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcThA31DilUAdecHG_PZimQTNP85arSVpt_sttXTPh_8O3E0wgmTFQ',
        stars: 3,
        createdBy: users[0]   // dances should be users
      },{
        name: 'Holly Cooper & Studio iO',
        category: 'yoga',
        address: {
          fullAddress: '64 Edward St, ',
          street: 'Hove,  ',
          city: 'Brighton',
          postcode: 'BN2 0JR',
          country: 'UK'
        },
        image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQXHHa_9ESzI0RDLlH0k7LhaUErt9SQflWvfe73xSlBbtsb6P4q',
        stars: 3,
        createdBy: users[0]   // dances should be users
      }, {
        name: 'Yoga London Ltd',
        category: 'yoga',
        address: {
          fullAddress: '92 Sirdar Road,',
          street: ' Rd,  ',
          city: 'London',
          postcode: 'EC1N 8JH',
          country: 'UK'
        },
        image: 'https://s3-us-west-2.amazonaws.com/ylimages/img/become-a-teacher.jpg',
        stars: 3,
        createdBy: users[0]   // dances should be users
      },{
        name: 'Stretch Yoga',
        category: 'yoga',
        address: {
          fullAddress: '64 Edward St, ',
          street: 'Hove,  ',
          city: 'Brighton',
          postcode: 'BN2 0JR',
          country: 'UK'
        },
        image: ' https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRKnZ5rnFT2RPgoyRp7s8X6Nfk96zFR68bWpDRjJaga_ubqyXOK3Q',
        stars: 4,
        createdBy: users[0]   // dances should be users
      }]) ;
  })
  .then((sessions) => console.log(`${sessions.length} sessions created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
