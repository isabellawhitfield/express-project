const express = require('express');
const app = express();//top-level function of express

const path = require('path');
const apiData = require('./people.json');
const carOwners = require('./car.json');

const port = 3000;

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url} `);
  next();
})

//used to send a default message before routing
// app.get('/', (req, res) => res.send('Hello World!'));

app.use(express.static('public'));//all files from public folder must be included
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery  /dist')));
app.use('/popper', express.static(path.join(__dirname, 'node_modules/@popperjs/core/dist/umd')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));

//
// // set the route for index.html
app.get('/', (req,res,)=>{
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

// set the route for about.html
app.get('/about', (req,res,)=>{
  res.sendFile(path.join(__dirname+'/public/about.html'));
});
//give access to apiData
app.get('/people', (req,res,)=>{
  res.json(apiData);
});
  app.get('/gender/g=:gender', (req,res)=>{
    const genderParam = req.params.gender
    if ((genderParam === 'male') || (genderParam === 'female')){
      let filteredArray = [];
      for (let i=0; i < apiData.length; i ++){
        if (genderParam === apiData[i].gender.toLowerCase()){
          filteredArray.push(apiData[i]);

        }
      }
      res.send(filteredArray);
    } else {
      res.send('Invaild Parameter');
    }
    

  });

  app.get('/first_name/n=:first_name', (req,res)=>{
    const nameParam = req.params.first_name
    if ((nameParam === 'selina')){
      let filteredArray = [];
      for (let i=0; i < apiData.length; i ++){
        if (nameParam === nameData[i].first_name.toLowerCase()){
          filteredArray.push(nameData[i]);

        }
      }
      res.send(filteredArray);
    } else {
      res.send('Invaild Parameter');
    
    }

  });

  app.get('/carowners/fname=:first_name/carname=:car_make',(req,res)=>{

  // app.get('/carowners',(req,res)=>{
    const nameParam = req.params.first_name;
    const carParam = req.params.car_make; //retrieves the parameter value requested by the user
    // if ((modelParam === 'male') || (genderParam === 'female')){
      let ownersFilteredArray = [];//array to push the matching objects to user's value
      for (let i = 0; i < carOwners.length; i++) {
         if ((nameParam.toLowerCase() === carOwners[i].first_name.toLowerCase()) && (carParam.toLowerCase() === carOwners[i].car_make.toLowerCase())){
          ownersFilteredArray.push(carOwners[i]);
          // console.log(carOwners[i]);
         }
      }
      res.send(ownersFilteredArray);
    // res.send(carOwners);
  });

 



  app.listen(port, () => console.log(`This app is listening on port ${port}!`))
