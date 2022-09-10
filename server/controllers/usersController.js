const {UserModel} = require( './../models/usersModel' );
const bcrypt = require( 'bcrypt' );

const UsersController = {

    register: async function (req,res) {
        
        const {firstname,lastname,email,password,confpassword} = req.body 

        let isValid = true;
        let errormessages = {}

        //* No empty spaces
        if(!firstname || !lastname || !email || !password || !confpassword){
            isValid = false
            errormessages.empty = " 🚫 Seems you leaved an empty space"
        }
        if(firstname.length < 2){
            isValid = false
            errormessages.firstnlen = "🚫 Firstname must be at least 2 caracters"
        }
        if(lastname.length < 2){
            isValid = false
            errormessages.lastnlen = "🚫 Lastname must be at least 2 caracters"
        }
        if(firstname.length > 25){
            isValid = false
            errormessages.firstnlen2 = "🚫 Firstname must be less than 25 caracters"
        }
        if(lastname.length > 25){
            isValid = false
            errormessages.lastnlen2 = "🚫 Lastname must be less than 25 caracters"
        }
        if(password.length < 6){
            isValid = false
            errormessages.passlen = "🚫 Password must be at least 6 caracters"
        }
        if(confpassword.length < 6){
            isValid = false
            errormessages.passlen2 = "🚫 Confirmation must be at least 6 caracters"
        }
        //* Passwords Not Match !!
        if(password !== confpassword){
            isValid = false
            errormessages.passnotmatch = " 🛑 The passwords doesn't match 🛑"
        }

        const emailExist = await UserModel.getUserByEmail(email)
        if(emailExist !== null){
            isValid = false
            errormessages.emailExist = "⚠️ This Email already exits"
        }

    if(isValid){

        const encryptedpass = await bcrypt.hash( password , 10)

        const newUser = {
            firstname,
            lastname,
            email, 
            password: encryptedpass
        }

        UserModel.createUser(newUser)
        .then(data=>{
            res.status(200).json(data)
            // Security problem with pass, but to make it easy, just keep like this
        })
        .catch(error=>{
            res.status(400).json(error)
        })

    }
    else{
        res.status(400).json(errormessages)
    }

    },

    login: async function (req,res) {
        const {email,password} = req.body

        let errormessages = {};
        let isValid = true;

        if(email && password){
            UserModel.getUserByEmail(email)
            .then(data=>{
                if(!data){
                    let errormsj = {
                        adminerror: "🚫 This user doesn't exits 🛑"
                    }
                    res.status(400).json(errormsj)
                }
                bcrypt.compare( password, data.password )
                .then(flag =>{
                    if( !flag ){
                        let errormsj = {
                            passworderror: "🔐⚠️ This password is wrong ⚠️ "
                        }
                        res.status(400).json(errormsj)
                    }
                
                userInfo = {
                    _id: data._id,
                    firstname : data.firstname,
                    lastname : data.lastname,
                    username : data.username,
                    email: data.email,
                }
                res.status(200).json(userInfo);
                })
                .catch( error => {
                    res.statusMessage = error.message;
                    res.status(406).end()
                }); 
            })
            .catch( error => {
                res.statusMessage = error.message;
                res.status(406).end()
            });
        }
        else{
            let errormsj = {
                empty: "🚫There is an empty space🚫 "
            }
            res.status(400).json(errormsj)
        }
    }
}

module.exports = {UsersController}