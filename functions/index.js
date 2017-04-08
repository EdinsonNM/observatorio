const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase)

exports.triggerEscuelasToFacultad = functions.database.ref('/{origin}/escuelas/{id}')
    .onWrite(event => {
        const escuelas = event.data.numChildren();
        return admin.database().ref(event.params.origin+'/facultades/'+event.params.id).child('escuelas').set(escuelas);

    });

exports.triggerVoucherToVouchersPostulante = functions.database.ref('/{origin}/vouchers/{admision}/{postulante}/{voucher}')
    .onWrite(event => {
		 return admin.database().ref(event.params.origin+'/vouchers/'+event.params.admision+'/'+event.params.postulante).once('value', (snapshot) => {
			 let data= snapshot.val();
			 let monto = 0;
			 for(let key in data){
				 monto = +data[key].monto;
			 }
			return admin.database().ref(event.params.origin+'/vouchers/'+event.params.admision+'/'+event.params.postulante).child('montoTotal').set(monto);
		 });
        

    });

