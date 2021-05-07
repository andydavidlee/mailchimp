const express = require('express');
const request = require('request');
// const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.urlencoded({extended: true}));

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Sign up
app.post('/signup', (req, res)=> {
    const {firstName, lastName, email} = req.body;
    console.log(req.body);
    if(!firstName||!lastName||!email){
        res.redirect('/fail.html');
    };

    // Construct req Data
    const data= {
        members:[
            {
                email_address: email,
                status:'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const postData= JSON.stringify(data);
    const options= {
        url: 'https://us17.api.mailchimp.com/3.0/lists/b3fca76c32',
        method: 'POST',
        headers: {
            Authorization: 'auth 965fdebf71751d8b9e3c76d7d3ab9864-us17'
        }, 
        body: postData,
    }
    request(options, (err, response, body)=>{
        if(err) {
            res.redirect('/fail.html');
        }else{
            if(response.statusCode === 200){
                res.redirect('/success.html')
            }else{
                res.redirect('/fail.html')
            }
        }
    })
})

const PORT = 5001;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));