export default class Validate {

static register = (must = true) => ({

name :{
    presence : must,
    type: "string"
},
phone :{
    presence : must,
    type: "string",
    length:{ maximum: 15, minimum: 10}
},
email : {
    email:true,
    presence : must,
    type: "string"
},

password : {
    presence : must,
    type: "string",
    length:{ maximum: 15, minimum:4}
}


})

static otp = (must = true) => ({

    otp :{
        presence : must,
        type: "number"
    },
   
})

static login = (must = true) => ({

    email :{
        email:true,
        presence : must,
        type: "string"
    },
    password: {

        presence : must,
        type: "string",
        length:{ maximum: 15, minimum:4}

    }
   
})


static makeCategory = (must = true) => ({

    title :{
        presence : must,
        type: "string"
    },
    description :{
        presence : must,
        type: "string"
        
    }
 
    
    })

    static makeProduct = (must = true) => ({

        name :{
            presence : must,
            type: "string"
        },
        description :{
            presence : must,
            type: "string"
            
        },
        
        quantity :{
            presence : must,
            type: "number"
        },

        price :{
            presence : must,
            type: "number"
            
        }
     
        
        })


}