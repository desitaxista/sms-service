const { io } = require("socket.io-client");
// const socket = io();
// const socket = io("http://localhost:3003");
const socket = io("https://desitaxista.herokuapp.com");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// socket.emit('message', "hellothere");
socket.on('sendSMS', (msg) => {
    console.log(  msg); 
    let bodie ={
        message: encodeURIComponent(msg.message),
        phoneno: encodeURIComponent(msg.phone)
    }
    // return
    fetch(`http://192.168.0.50:8080/send?message=${bodie.message}&phoneno=${bodie.phoneno}`, {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Cache-Control': 'no-cache'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            // res.send({ message: "Success", data: data })
            
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Fech Error xg14");
            // console.error("Error:", error);
            // res.send({ message: "Error", data: error })
        });
});
socket.on('askForRole', (msg) => {
    console.log("asked for role \n");
    // let role = "smsService"
    socket.emit("setRole","smsService"); 
});
