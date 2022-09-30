const express = require("express");
const Joi = require('joi')

const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "arnold" },
  { id: 2, name: "great" },
  { id: 3, name: "kulele" },
  { id: 4, name: "new one" },
];

app.get("/", (req, res) => {
  const allValues = courses;
  res.status(200).json({
    allValues,
  });
});

app.get("/:id", (req, res) => {
  value = courses.find((data) => {
    return (data.id === parseInt(req.params.id));
  });
  if(!value)return res.status(404).json({msg:"there is no value for this ID"})

  res.status(200).json({value})
});

app.post('/', (req, res)=>{
    

    const schema = {
        name:Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, schema)

    if(result.error){
        res.status(404).json({
            msg:`${result.error.details[0].message}`
        })
    }
    const newCourse = {
        id:courses.length +1,
        name:req.body.name
    }

    courses.push(newCourse)

    res.status(200).json({
        status:"success, course created"
    })

})

app.put('/:id', (req, res)=>{

    

})

app.listen(3000, () => console.log(`listening on port 3000`));
