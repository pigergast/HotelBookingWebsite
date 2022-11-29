class Room{
    
    constructor(name, type){
        this.Name = name;
        this.RoomType = type;
    }

}

class Booking{
    constructor(room, date, name){
        this.Room = room;
        this.Date = date;
        this.GuestName = name;
    }
}

class Manage{
    constructor(){
        this.RoomList = [new Room("101", "Single"), new Room("102", "Double"), new Room("103", "Single"), new Room("104", "Double")];
        this.BookingList = [];
    }
    
    AddBooking(room, date, name){
        this.BookingList.push(new Booking(room, date, name));
    }
    
}

if (JSON.parse(window.localStorage.getItem("Manage")) == null){
    window.localStorage.setItem("Manage", JSON.stringify(new Manage()));
}
let manage = JSON.parse(window.localStorage.getItem("Manage"));

function addRoom(){
    let name = document.getElementById("roomName").value;
    let type = document.getElementById("roomType").value;
    manage.RoomList.push(new Room(name, type));
    console.log(name + " " + type)
    window.localStorage.setItem("Manage", JSON.stringify(manage));
    manage.RoomList.forEach(element => {
        console.log(element.Name + " " + element.RoomType);
    });
}