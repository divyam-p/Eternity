const router = require('express').Router(); 
let User = require('../models/user.model'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth');

router.route('/register').post( async (req, res) => { 
    try{ 
        let { email, password, passwordCheck, displayName } = req.body; 
        //validation 

        if(!email || !password || !passwordCheck){ 
            return res.status(400).json({message: "Not all fields have neen entered."}); 
        }
        if(password.length < 5){ 
            return res.status(400).json({message: "The password needs to be at least 5 characters long."}); 
        }
        if(password !== passwordCheck){ 
            return res.status(400).json({message: "Please Enter the same password twice for verification."}); 
        }
        const existingUser = await User.findOne({email: email}); 
        if(existingUser){ 
            return res.status(400).json({message: "Account with this email already exists."}); 
        }
        if(!displayName){ 
            displayName = email; 
        }        
        //hashing password 
        const salt = await bcrypt.genSalt(); 
        const passwordHash = await bcrypt.hash(password, salt); 
          
        const newUser = new User({         
            email,     
            password: passwordHash, 
            displayName
        })        
        //saves user to database 
        const savedUser = await newUser.save(); 
        res.json(savedUser); 
    }catch(err){ 
        res.status(500).json({error: err.message}); 
    }
})

router.route('/login').post(async (req, res) => { 
    try{ 
        const {email, password} = req.body; 

        //validate 
        if(!email || !password){ 
            return res.status(400).json({message: "Not all fields have neen entered."}); 
        }
        
        const user = await User.findOne({email: email}); 
        if(!user){ 
            return res.status(400).json({message: "No Account with this email has been registered."}); 
        }
        const isMatch = await bcrypt.compare(password, user.password); 
        if(!isMatch){ 
            return res.status(400).json({message: "Invalid credentials."}); 
        }

        //stores the id of the user in a token so we can retrieve the user info later 
        //now we need a password so that we can assure that only we are able to login the correct user 
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);  
        res.json({ 
            token, 
            user: { 
                id: user._id, 
                displayName: user.displayName, 
            }
        })

    }catch(err){ 
        res.status(500).json({error: err.message}); 
    }
})

//creating a middleware that checks if a user is logged in before letting them delete the account 
router.route("/delete").delete(auth, async (req, res) => { 
    try{ 
        const deletedUser = await User.findByIdAndDelete(req.user); 
        res.json(deletedUser); 
    }
    catch (err) { 
        res.status(500).json({error: err. message}); 
    }
})

router.route("/tokenIsValid").post( async (req, res) => { 
    try{ 
        const token = req.header("x-auth-token"); 
        if(!token){ 
            return res.json(false); 
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET); 
        if(!verified){ 
            return res.json(false); 
        }

        const user = await User.findById(verified.id); 
        if(!user){ 
            return res.json(false); 
        }
        return res.json(true); 
    }
    catch (err) { 
        res.status(500).json({error: err. message}); 
    }
})

router.get("/", auth, async (req, res) => { 
    //note you do req.user not req.id because in auth.js file, we set req.user to verified.id! 
    const user = await User.findById(req.user); 
    res.json({ 
        displayName: user.displayName, 
        id: user._id,
    }); 
}); 

module.exports = router; 