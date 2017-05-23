const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.triggerUsuario = functions.database.ref('/usuarios/{id}')
  .onWrite(event => {
      console.log(event.data.val());
      let id = event.params.id;
      if (!event.data.exists()) {
        console.log("eliminado..",id);
        admin.auth().deleteUser(id)
        .then(function() {
          console.log("Successfully deleted user");
        })
        .catch(function(error) {
          console.log("Error deleting user:", error);
        });
        return;
      }

  });
