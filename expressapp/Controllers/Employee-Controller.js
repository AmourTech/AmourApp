const knex = require('./../knexfile')
exports.addEmployee = async (req, res) => {
    knex('user')
        .insert({
            'Admin' : req.body.Admin,
            'email' : req.body.email,
            'FirstName' : req.body.FirstName,
            'LastName' : req.body.LastName,
            'Organisation' : req.body.Organisation,
            'password' : req.body.password,
            'UserID' : req.body.UserID,
            'username' : req.body.username
        })
        .then(() => {
            res.json({message: `User \'${req.body.FirstName}\' \'${req.body.LastName}\' Created`})

        })

        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error creating the User` })
          })




}
exports.viewEmployees = async (req, res) => {
    knex
        .where('Organisation', req.body.Organisation)
        .from('user')
        .then(userData => {
            res.json(userData)
        })
}
exports.delEmployee = async (req, res) => {
    knex('user')
        .where('Organisation', req.body.Organisation)
        .andwhere('UserID', req.body,UserID)

    .then(()=>
    {
        res.json({ message: `User ${req.body.UserID} deleted`})
    })
    .catch(err =>
    {
        res.json({ message: `User ${req.body.UserID} not deleted`})
    })




}