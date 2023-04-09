import {initializeApp} from "firebase/app";
import { getDatabase, ref, set, onValue, update} from 'firebase/database';

const firebaseConfig = {
		apiKey: "AIzaSyAYPF_k6MBimdXEkR5tfHo-AaDiYK2wjRU",
		authDomain: "project-advance.firebaseapp.com",
		databaseURL: "https://project-advance.firebaseio.com",
		projectId: "project-advance",
		storageBucket: "project-advance.appspot.com",
		messagingSenderId: "986793570142",
		appId: "1:986793570142:web:1a41e03d01d4094188e9cf",
		measurementId: "G-862SKPSKXE"
	  };
    const app = initializeApp(firebaseConfig);
    export const db = getDatabase(app);

   
    