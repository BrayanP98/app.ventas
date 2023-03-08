import { Router } from "express";
import Task from "../models/TASK";
import User from "../models/USUARIOS";
import Prod from "../models/PRODUCTOS";
import passport from "passport";
require('../pasport')(passport)

const router = Router();
//////
let nombre_user="";
router.get("/", (req, res) => {

 
  let nom_usu=req.session.nombre;
  res.render("index.hbs", {user1:nom_usu});

  console.log(req.session.nombre)

});


//////////
//actualizacion produ////
router.get("/escritorio", async (req, res) => {
  const prods= await Prod.find({categoria:"escritorio"}).lean();
    
  res.render("product.hbs", { prods: prods });

});
router.get("/product", isLogedIn, async (req, res) => {

  //const producto = Prod(req.body);
 
    const prods= await Prod.find().lean();
    res.render("product.hbs", { prods:prods, users:req.user});
   //res.render("product.hbs", );
  
  let nom_user= req.session.nombre= req.user.nombre;

   console.log(nom_user)
  
    
});


//////////

/*router.post("/task/findUser", async (req, res) => {
 /* const requ=(req.body);
 try{
  const user= User(req.body);
  const users = await User.find(requ).lean();
  //console.log(users),
  nombre_user=users[0].nombre;
  
  res.redirect("/");
 }catch(error){
 res.redirect("/");
 
  //res.render("index.hbs",{errors:"no"});
 //res.send(' <script>window.history.go(-1)</script> <script>alert("verifique sus datos por favor"); </script>');
 }
 */



 router.post("/task/findUser", passport.authenticate('local-login',{

          successRedirect:'/product',

         failureRedirect:'/contact',
         failureFlash:false
         


 }));

router.get("/logout", (req, res) => {
  req.logout(req.user, err => {
    if(err) return next(err);
    res.redirect("/");
  });
});

 function isLogedIn(req, res, next){

  if(req.isAuthenticated()){
    

    return next();
  }
  return res. redirect("/")
 }
/*const{nombre, password}= req.body;

User.findOne({nombre}, (err, user)=>{
  if(err){
    res.status(500).send('error al autenticar usuario');
  }
  else if(!user){
    res.status(500).send('usuario no existe');
  }else{

    user.isCorrectPassword(password,(err, result)=>{
        if(err){
          res.status(500).send('error al autenticar usuario');

        }else if(result){

         // res.status(200).send(' autenticado usuario');

       res.send('<script>   window.addEventListener("load",function(){alert("bienvenido'+nombre+'")})</script>');

       
          
            }else{
             res.status(500).send('error al autenticar usuario y/o contraseña');
             
        }

    })
  }

   
    
  })


//})
 
});*/

(function recargar(){

router.get("/", async (req, res) => {

    const user = User(req.body);
   
    if(nombre_user===""){
      res.render("index.hbs");
      console.log('sin nombre');
      
    }else{
      const users= await User.find({nombre:nombre_user}).lean();
      
      res.render("index.hbs", { users: users });
    }
 
});
})();


router.post("/task/add", async (req, res) => {
  const task = Task(req.body);
  const tasksave = await task.save();
  res.redirect("/");
  // res.send('<script>alert("bienvenido")</script>');
});

/////
//router.post("/task/addUser", async (req, res) => {
  router.post("/task/addUser", passport.authenticate('local-signup',{
         successRedirect:'/product',

         failureRedirect:'/',
         failureFlash:true

  }) );
 // const requ=(req.body);
  
  /*const user = new User({user, password});
  user.save(err =>{

    if(err){
      res.status(500).send('error de registro')
    }
    else{

      res.status(200).send('usuario registrado')
    }
  } )*/

/*try{

    const user = User(req.body);
     await user.save();

    console.log(user)
  res.redirect("/");
}catch(error){
//  res.redirect("/");
    res.status(500).send('error de registro')
   // res.send('<script>window.history.go(-1)</script>');
   // res.send('<script>alert("no se")</script>');
  //res.send('<script>alert("verifique sus datos por favor"); window.history.go(-1)";</script>');
 }*/
  
  // res.send('<script>alert("bienvenido")</script>');




//});

router.get("/contact", (req, res) => {
  res.render("contact.hbs");
});
router.get("/product", (req, res) => {
  res.render("product.hbs");
});

export default router;
