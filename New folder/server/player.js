var express = require('express');
var router = express.Router();
// create and save new user
module.exports = {
        login: (req, res) => {
            message = 'ok';
            res.render('login', {message});
        },
        password: (req, res) => {
          res.render('password');
        },
        editClines: (req, res) => {
          let Nom = req.body.Nom;
          let Prénom = req.body.Prénom;
          let user = req.body.user;
          let password = req.body.password;
          let confirm_password = req.body.confirm_password;
          let email_address = req.body.email_address;
          let gender = req.body.gender;
          const RegisterCline = [Nom, Prénom, user, password, confirm_password, email_address, gender];
              console.dir(RegisterCline);
              const sql = "INSERT INTO RegisterClines (Nom, Prénom, user, password, confirm_password, email_address, gender) VALUES(?, ?, ?, ?, ?, ?, ?)";
                 db.run(sql, RegisterCline, err => {
                 if (err) {
                  return console.error(err.message);
                  }
                 console.dir(RegisterCline);
                 res.redirect("/");
                 });            
      },
        //---------------------*ajouter*--------------------------//
    
        addOrdre: (req, res) => {
            const {Nemuro_Ordre,  Date_Ordre, Matricule,  Nom_Prenom
                , Grade_Fonction,  Service_attache, Destination,  Motif_mission
                , Date_Depart,  Heure_Depart, Date_Retour,  Heure_Retour}  = req.body;
            const book = [ Nemuro_Ordre,  Date_Ordre, Matricule,  Nom_Prenom
                , Grade_Fonction,  Service_attache, Destination,  Motif_mission
                , Date_Depart,  Heure_Depart, Date_Retour,  Heure_Retour];
                console.dir(book);
                const sql = "INSERT INTO ordre (Nemuro_Ordre,  Date_Ordre, Matricule,  Nom_Prenom\
                    , Grade_Fonction,  Service_attache, Destination,  Motif_mission\
                    , Date_Depart,  Heure_Depart, Date_Retour,  Heure_Retour) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                   db.run(sql, book, err => {
                   if (err) {
                    return console.error(err.message);
                    }
                   console.dir(book);
                   res.redirect("/");
                   });      
        },
        //---------------------*MDIFIE*--------------------------//
        
        EditOrdre: (req, res) => {
            const {id,Nemuro_Ordre,  Date_Ordre, Matricule,  Nom_Prenom
                , Grade_Fonction,  Service_attache, Destination,  Motif_mission
                , Date_Depart,  Heure_Depart, Date_Retour,  Heure_Retour}  = req.body;
                const book = [Nemuro_Ordre,  Date_Ordre, Matricule,  Nom_Prenom
                  , Grade_Fonction,  Service_attache, Destination,  Motif_mission
                  , Date_Depart,  Heure_Depart, Date_Retour,  Heure_Retour,id];
            
               
          const sql = "UPDATE ordre SET  Nemuro_Ordre = ? , Date_Ordre = ?, Matricule = ?,Nom_Prenom = ?, Grade_Fonction = ?, Service_attache = ?, Destination = ?, Motif_mission = ?, Date_Depart = ?, Heure_Depart = ? , Date_Retour = ?, Heure_Retour = ? WHERE (id = ?)";
                      db.run(sql,book ,err => {
                          if (err) {
                            return console.error(err.message);
                          }
                        console.dir(book);   //  console.dir(book2);
                   
                       res.redirect("/");
                        });  
      },
      //---------------------*supprime*--------------------------//
      dellOrdre: (req, res) => {
        let playerId = req.body.id;
        let deleteUserQuery = 'DELETE FROM ordre WHERE id = "' + playerId + '"';
        db.run(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(200).send(err);
            }
            console.dir("ok");
            res.redirect("/");
        });
    },
    
      add_agent: (req, res) => {
       const{matricule,nom,grade,service}=req.body;
       const book=[matricule,nom,grade,service];
              console.log("okall");   console.log(book);
              const sql = "INSERT INTO agent (matricule,nom,grade,service) VALUES(?, ?, ?, ?)";
                 db.run(sql, book, err => {
                 if (err) {
                  return console.error(err.message);
                  }
                 res.redirect("/");
                 });      
        },
      //---------------------*MDIFIE*--------------------------//
      
      edit_agent: (req, res) => {
        const{matricule,nom,grade,service,id}=req.body;
       const book=[matricule,nom,grade,service,id];
              console.log("okall");   console.log(book);
        const sql = "UPDATE agent SET  matricule = ? , nom = ?, grade = ?,service = ? WHERE (id = ?)";
                 db.run(sql, book, err => {
                 if (err) {
                  return console.error(err.message);
                  }
                 res.redirect("/");false
                 });      
     },
    //---------------------*supprime*--------------------------//
    dell_agent: (req, res) => {
      let playerId = req.body.id;
      let deleteUserQuery = 'DELETE FROM RegisterClines WHERE id = "' + playerId + '"';
      db.run(deleteUserQuery, (err, result) => {
          if (err) {
              return res.status(500).send(err);
          }
          console.dir("ok");
          res.redirect("login");
      });
  }
}
  