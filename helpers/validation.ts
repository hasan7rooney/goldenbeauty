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
            
        },
        category :{
            presence : must,
            type: "number"
            
        },
        image:{
            presence : must,
            type: "string"
            
        }
     
        
        })


        static makeInvoice = (must = true) => ({

            address: {
                presence: must,
                type: "string",
              },
            //   method: {
            //     presence: must,
            //     type: "string",
            //     inclusion: {
            //       within: {
            //         zc: "zc",
            //         ah: "ah",
            //         cd: "cd",
            //       },
            //       message: "^%{value} is not valid",
            //     },
            //   },
           
              products: {
                presence: must,
                type: "array",
              },
            })    

            static oneProduct = (must = true) => ({
                id: {
                  presence: must,
                  type: "number",
                },
                quantity: {
                  presence: must,
                  type: "number",
                },
              });
}