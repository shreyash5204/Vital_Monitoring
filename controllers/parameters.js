const app = require('../util/database');
const accountSid = '';
const authToken = '';
const client = require('twilio')(accountSid, authToken);
//const firebase = require('../util/database').firebase;

const { getDatabase, ref, set, get } = require('firebase/database');

const data = require('../udp');

const cdata = data();

const db = getDatabase(app);

exports.submit = (req, res, next) => {
  const { username, age, mode } = req.body;
  set(ref(db, 'users/data'), {
    username: username,
    age: age,
    mode: mode,
  }).then(() => {
    exports.mode = mode;
    console.log('Data is added successfully!');
    res.redirect('/vitals');
  }).catch((error) => {
    console.error('Error adding data: ', error);
    res.status(500).send('Error adding data to the database');
  });
};

setInterval(() => {
  set(ref(db, 'users/vitals'), {
    BodyTemp: cdata.Temp,
    HeartRate: cdata.HeartRate,
    SpO2: cdata.SpO2,
  }).then(() => {
    exports.cdata = cdata;
    //console.log('Vitals updated successfully!');
  }).catch((error) => {
    console.error('Error adding vitals: ', error);
    res.status(500).send('Error adding vitals to the database');
  });
}, 2000);


setInterval(() => {
  Promise.all([
    get(ref(db, 'users/data')),
    get(ref(db, 'users/vitals'))
  ])
    .then((snap) => {
      const UserData = snap[0].val();
      const UserVitals = snap[1].val();

      console.log(UserData);
      console.log(UserVitals);

      UserData.age = parseInt(UserData.age);
      UserVitals.HeartRate = parseInt(UserVitals.HeartRate);

      if (UserData.mode == 'Still') {

        if ((UserData.age >= 12 && UserData.age <= 40) && (UserVitals.HeartRate > 60 && UserVitals.HeartRate < 90)) {
          client.messages
            .create({
              body: UserData.username + ' your heart rate is ' + UserVitals.HeartRate + ',It seems you are doing fine',
              from: '',
              to: ''
            })
            .then(message => console.log(message.sid))
            .done();
        }

        else if ((UserData.age >= 12 && UserData.age <= 40) && (UserVitals.HeartRate < 50 || UserVitals.HeartRate > 90)) {
          client.messages
            .create({
              body: UserData.username + ' your heart rate is ' + UserVitals.HeartRate + ',It seems you need to visit a doctor',
              from: '',
              to: ''
            })
            .then(message => console.log(message.sid))
            .done();
        }
        else if ((UserData.age >= 12 && UserData.age <= 40) && (UserVitals.HeartRate > 50 && UserVitals.HeartRate < 60)) {
          client.messages
            .create({
              body: UserData.username + ' your heart rate is ' + UserVitals.HeartRate + ',It seems you need to take care of your health',
              from: '',
              to: ''
            })
            .then(message => console.log(message.sid))
            .done();
        }
        else if ((UserData.age > 40) && (UserVitals.HeartRate > 50 && UserVitals.HeartRate < 85)) {
          client.messages
            .create({
              body: UserData.username + ' your heart rate is ' + UserVitals.HeartRate + ',It seems you are doing fine',
              from: '',
              to: ''
            })
            .then(message => console.log(message.sid))
            .done();
        }


        else if ((UserData.age > 40) && (UserVitals.HeartRate < 40 || UserVitals.HeartRate > 85)) {
          client.messages
            .create({
              body: UserData.username + ' your heart rate is ' + UserVitals.HeartRate + ',It seems you need to visit a doctor',
              from: '',
              to: ''
            })
            .then(message => console.log(message.sid))
            .done();
        }

        else if ((UserData.age > 40) && (UserVitals.HeartRate > 40 && UserVitals.HeartRate < 50)) {
          client.messages
            .create({
              body: UserData.username + ' your heart rate is ' + UserVitals.HeartRate + ',It seems you need to take care of your health',
              from: '',
              to: ''
            })
            .then(message => console.log(message.sid))
            .done();
        }

      }

      if (UserData.mode == 'Running') {

        if ((UserData.age >= 12 && UserData.age <= 40) && (UserVitals.HeartRate > 90 && UserVitals.HeartRate < 150)) {
          client.messages
            .create({
              body: UserData.username + ' your heart rate is ' + UserVitals.HeartRate + ',It seems you are doing fine',
              from: '',
              to: ''
            })
            .then(message => console.log(message.sid))
            .done();
        }

        else if ((UserData.age >= 12 && UserData.age <= 40) && (UserVitals.HeartRate > 150 && UserVitals.HeartRate < 160)) {
          client.messages
            .create({
              body: UserData.username + ' your heart rate is ' + UserVitals.HeartRate + ',It seems you need to take care of your health',
              from: '',
              to: ''
            })
            .then(message => console.log(message.sid))
            .done();
        }
        else if ((UserData.age >= 12 && UserData.age <= 40) && (UserVitals.HeartRate > 160)) {
          client.messages
            .create({
              body: UserData.username + ' your heart rate is ' + UserVitals.HeartRate + ',you need to visit a doctor',
              from: '',
              to: ''
            })
            .then(message => console.log(message.sid))
            .done();
        }
        else if ((UserData.age > 40) && (UserVitals.HeartRate > 100 && UserVitals.HeartRate < 150)) {
          client.messages
            .create({
              body: UserData.username + ' your heart rate is ' + UserVitals.HeartRate + ',It seems you are doing fine',
              from: '',
              to: ''
            })
            .then(message => console.log(message.sid))
            .done();
        }
        else if ((UserData.age > 40) && (UserVitals.HeartRate > 150 && UserVitals.HeartRate < 160)) {
          client.messages
            .create({
              body: UserData.username + ' your heart rate is ' + UserVitals.HeartRate + ',You need to take care of your health',
              from: '',
              to: ''
            })
            .then(message => console.log(message.sid))
            .done();
        }

        else if ((UserData.age > 40) && (UserVitals.HeartRate > 160)) {
          client.messages
            .create({
              body: UserData.username + ' your heart rate is ' + UserVitals.HeartRate + ',It seems you need to visit a doctor',
              from: '',
              to: ''
            })
            .then(message => console.log(message.sid))
            .done();
        }

      }

      if (UserData.mode == "Sleeping") {
        if ((UserVitals.HeartRate > 30 && UserVitals.HeartRate < 65)) {
          client.messages
            .create({
              body: UserData.username + ' your heart rate is ' + UserVitals.HeartRate + ',It seems you are doing fine',
              from: '',
              to: ''
            })
            .then(message => console.log(message.sid))
            .done();
        }

        else if ((UserVitals.HeartRate > 65 && UserVitals.HeartRate < 75)) {
          client.messages
            .create({
              body: UserData.username + ' your heart rate is ' + UserVitals.HeartRate + ',It seems you need to take care',
              from: '',
              to: ''
            })
            .then(message => console.log(message.sid))
            .done();
        }
        else if ((UserVitals.HeartRate > 75)) {
          client.messages
            .create({
              body: UserData.username + ' your heart rate is ' + UserVitals.HeartRate + ',It seems you need to visit a doctor',
              from: '',
              to: ''
            })
            .then(message => console.log(message.sid))
            .done();
        }

      }

      if ((UserVitals.SpO2 > 95 && UserVitals.SpO2 < 100)) {
        client.messages
          .create({
            body: UserData.username + ' your SpO2 is ' + UserVitals.SpO2 + ',It seems you are fine',
            from: '',
            to: ''
          })
          .then(message => console.log(message.sid))
          .done();
      }

      else if ((UserVitals.SpO2 < 95 && UserVitals.SpO2 > 85)) {
        client.messages
          .create({
            body: UserData.username + ' your SpO2 is ' + UserVitals.SpO2 + ',It seems you need to take care',
            from: '',
            to: ''
          })
          .then(message => console.log(message.sid))
          .done();
      }

      else if ((UserVitals.SpO2 < 85)) {
        client.messages
          .create({
            body: UserData.username + ' your SpO2 is ' + UserVitals.SpO2 + ',It seems you need to visit a doctor',
            from: '',
            to: ''
          })
          .then(message => console.log(message.sid))
          .done();
      }

      if ((UserVitals.BodyTemp < 37)) {
        client.messages
          .create({
            body: UserData.username + ' Your Body temperature is ' + UserVitals.BodyTemp + ',It seems you are fine',
            from: '',
            to: ''
          })
          .then(message => console.log(message.sid))
          .done();
      }

      else if ((UserVitals.BodyTemp >= 37 && UserVitals.BodyTemp <= 38)) {
        client.messages
          .create({
            body: UserData.username + ' Your Body temperature is ' + UserVitals.BodyTemp + ',It seems you need to take care',
            from: '',
            to: ''
          })
          .then(message => console.log(message.sid))
          .done();
      }

      else if ((UserVitals.BodyTemp > 38)) {
        client.messages
          .create({
            body: UserData.username + ' Your Body temperature is ' + UserVitals.BodyTemp + ',It seems you need to visit a doctor you are having fever',
            from: '',
            to: ''
          })
          .then(message => console.log(message.sid))
          .done();
      }
    }).catch((error) => {
      console.log("Error fetching data");
    })
}, 5000);




