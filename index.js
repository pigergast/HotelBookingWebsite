const pictures ={
    featured: "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/397679601.jpg?k=8d420d6fcd15cae1e327c759b8aa44e7a893f66db176e53983c3a6f83845d82c&o=&hp=1",
}

const houseRules = {
    rule1: "No smoking",
    rule2: "No pets",
}

const utilities = {
    AC: "AC",
    Terrace: "Terrace",
    Pool: "Pool",
    Gym: "Gym",
    Restaurant: "Restaurant",
    Beach: "Beach"
}

class Room{
    constructor(name, size, rate, number){
        this.name = name;
        this.size = size;
        this.rate = rate;
        this.number = number;
        this.utility = [];
    }

    addUtility(utility){
        this.utility.push(utility);
    }
    modifyRoom(name, size, rate, number){
        this.name = name;
        this.size = size;
        this.rate = rate;
        this.number = number;
    }

}

class Booking{
   constructor(name, guest, email, phone, room, checkin, checkout, price){
       this.Name = name;
       this.Guest = guest;
       this.Email = email;
       this.Phone = phone;
       this.Room = room;
       this.CheckIn = checkin;
       this.CheckOut = checkout;
       this.Price = price;
   }
}

class Hotel{
    constructor(name, address, coordinate, ownerName, ownerEmail, ownerPhone){
        this.name = name;
        this.address = address;
        this.coordinate = coordinate;
        this.ownerName = ownerName;
        this.ownerEmail = ownerEmail;
        this.ownerPhone = ownerPhone;
        this.bookings = [];
        this.photos = [pictures.featured];
        this.houseRules = [houseRules.rule1, houseRules.rule2];
        this.roomList = [new Room("Deluxe", 30, 100, 1), new Room("Superior", 40, 150, 2), new Room("Luxury", 50, 200, 3)];
    }  
    modifyHotel(name, address, coordinate, ownerName, ownerEmail, ownerPhone){
        this.name = name;
        this.address = address;
        this.coordinate = coordinate;
        this.ownerName = ownerName;
        this.ownerEmail = ownerEmail;
        this.ownerPhone = ownerPhone;
    }
    //loop through rooms and console.log the room name and number
    displayRooms(){
        this.roomList.forEach(room => {
            
            document.getElementById("roomList").innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center" > <img class="img-thumbnail" style="width: 300px" src="https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/397679942.jpg?k=7b3f5dd6c2f195e3129f361ecb989adf25331fe20ec52954beb2b0c83cf01b89&o=&hp=1" alt=""/> <h5>${room.name}<div class="mt-2">${listUtility(room)}</div></h5> <h5>Size: ${room.size} meters</h5> <h5>Rate: ${room.rate} VND</h5> <h5> Amount:<span class="badge ms-1 bg-primary badge-pill">${room.number}</span> </h5> <button type="button" class="btn btn-primary btn-lg"> <h5>Reserve</h5> </button> </li>`;
        });
    }

}
//List every utility in a room
function listUtility(room){
    let utilityList = "";
    for(let i = 0; i < room.utility.length; i++){
        utilityList += `<span class="badge bg-primary badge-pill mx-1">${room.utility[i]}</span>`;
    }
    return utilityList;
}

let hotel = new Hotel("The Princess of Arena Cam Ranh Home", "Cam Nghĩa, Cam Ranh, Khánh Hòa, Vietnam", "12.02630367601079, 109.21449190530254", "CÔNG TY CỔ PHẦN TRẦN THÁI CAM RANH", "rsvn.ams@arenams.vn", "02583968888");
hotel.roomList[1].utility.push(utilities.AC, utilities.Pool, utilities.Restaurant, utilities.Gym);
hotel.roomList[2].utility.push(utilities.AC, utilities.Pool, utilities.Restaurant, utilities.Beach);
hotel.roomList[0].utility.push(utilities.AC, utilities.Pool, utilities.Restaurant);
hotel.displayRooms();




window.localStorage.setItem("Hotel", JSON.stringify(hotel));
function test(){
    console.log(document.getElementById("date").value);
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