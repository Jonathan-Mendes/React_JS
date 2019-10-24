import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


var firebaseConfig = {
    apiKey: "AIzaSyA2SuRKIxUgCe8R0kUsbB5YTftPQDba1Sw",
    authDomain: "iteris-54dfa.firebaseapp.com",
    databaseURL: "https://iteris-54dfa.firebaseio.com",
    projectId: "iteris-54dfa",
    storageBucket: "iteris-54dfa.appspot.com",
    messagingSenderId: "50240353609",
    appId: "1:50240353609:web:c1d42b1f5a6063e375d698"
  };

  
class Firebase {

    constructor() {
        app.initializeApp(firebaseConfig);
        this.app = app.database();
    }

    async solicitaAntecipacao(datePag, dateAnt, numNotAnt){
        let ref = app.database().ref('solicitacoes/')
        let key = ref.push().key
        return ref.child(key).set({
            numNotAnt: numNotAnt,
            dateAnt: dateAnt,
            datePag: datePag
        })
    }

    async cadastraNota(numNot, descricao, dateFat, datePag, status) {
        return app.database().ref('notas/').child(numNot).set({
            numNot: numNot,
            descricao: descricao,
            dateFat: dateFat,
            datePag: datePag,
            status: status
        })
    }

    async deleteSolicitacoes(key){
        await app.database().ref('solicitacoes').child(key).remove();
    }
}

export default new Firebase();