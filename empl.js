var express=require('express')
var mongoose =require('mongoose')
var bodyParser=require('body-parser')


const Employemodel=mongoose.model("employedetails",

{
    employename:String,
    description:String,
    salary:String,
    companyname:String
    


}
)
mongoose.connect("mongodb+srv://dipinforce:forcepandalam@cluster0-sspts.mongodb.net/test?retryWrites=true&w=majority")


 var app=express();

 app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// For CORS,Pgm Line no 12 to 29
    app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*' );

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.get('/',(req,res)=>{
res.send('hello');
});

app.post('/Employe',function(req,res){

 var employename=req.body.employename
 var description=req.body.description
 var salary=req.body.salary
 var companyname=req.body.companyname
 

   var Employe=new Employemodel(req.body)

   Employe.save( (error,data)=>{
       if(error){
           throw error;
       }
           else{
               res.send(data);
       }
    })
})

app.get('/viewall',(req,res)=>{

var result=Employemodel.find( (error,data)=>{
     if(error){
     throw error;
     }
     else{
         res.send(data);
     }
    })
    })

app.post('/update',(req,res)=>{
var employename=req.body.employename;
var description=req.body.description;
var salary=req.body.salary;
var companyname=req.body.companyname;

var result=Employemodel.findByIdAndUpdate(id,{"employename":employename,"description":description,"salary":salary,"companyname":companyname},(error,data)=>{

    if(error){
        throw error;
}
else{
    res.send("succesfully Updated" + data);
}
})
})
app.post('/remove',(req,res)=>{

    
    var result=Employemodel.findByIdAndRemove( id,(error,data)=>{
        if(error){
            throw(error);
        }
        else{
            res.send("succesfully removed" + data);
        }
    })
})

app.listen(process.env.PORT || 3000,()=>{
    console.log('server started')
})