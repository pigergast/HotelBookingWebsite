const pictures = {
  featured:
    "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/397679601.jpg?k=8d420d6fcd15cae1e327c759b8aa44e7a893f66db176e53983c3a6f83845d82c&o=&hp=1",
};

const houseRules = {
  rule1: "No smoking",
  rule2: "No pets",
};

const utilities = {
  AC: "AC",
  Terrace: "Terrace",
  Pool: "Pool",
  Gym: "Gym",
  Restaurant: "Restaurant",
  Beach: "Beach",
};

class ScheduledRates {
  constructor(firstDate, lastDate, rate) {
    this.firstDate = Date(firstDate);
    this.lastDate = Date(lastDate);
    this.rate = rate;
  }
}

class Room {
  constructor(name, size, rate, number) {
    this.name = name;
    this.size = size;
    this.rate = rate;
    this.number = number;
    this.utility = [];
    this.scheduledRates = [];
  }

  addScheduledRate(firstDate, lastDate, rate) {
    this.scheduledRates.push(new ScheduledRates(firstDate, lastDate, rate));
  }

  modifyScheduledRate(firstDate, lastDate, rate) {
    this.scheduledRates.forEach((scheduledRate) => {
      if (
        scheduledRate.firstDate === firstDate &&
        scheduledRate.lastDate === lastDate
      ) {
        scheduledRate.rate = rate;
      }
    });
  }

  checkScheduledRate(checkin, checkout) {
    this.scheduledRates.forEach((scheduledRate) => {
      if (
        checkin >= scheduledRate.firstDate &&
        checkout <= scheduledRate.lastDate
      ) {
        return scheduledRate.rate;
      }
    });
    return this.rate;
  }

  addUtility(utility) {
    this.utility.push(utility);
  }
  modifyRoom(name, size, rate, number) {
    this.name = name;
    this.size = size;
    this.rate = rate;
    this.number = number;
  }
}

class Booking {
  constructor(name, email, phone, room, checkin, checkout, price) {
    this.Name = name;
    this.Email = email;
    this.Phone = phone;
    this.Room = room;
    this.CheckIn = checkin;
    this.CheckOut = checkout;
    this.Price = price;
  }
}

class Hotel {
  constructor(name, address, coordinate, ownerName, ownerEmail, ownerPhone) {
    this.name = name;
    this.address = address;
    this.coordinate = coordinate;
    this.ownerName = ownerName;
    this.ownerEmail = ownerEmail;
    this.ownerPhone = ownerPhone;
    this.bookings = [];
    this.photos = [pictures.featured];
    this.houseRules = [houseRules.rule1, houseRules.rule2];
    this.roomList = [
      new Room("Deluxe", 30, 100, 1),
      new Room("Superior", 40, 150, 2),
      new Room("Luxury", 50, 200, 3),
    ];
  }
  modifyHotel(name, address, coordinate, ownerName, ownerEmail, ownerPhone) {
    this.name = name;
    this.address = address;
    this.coordinate = coordinate;
    this.ownerName = ownerName;
    this.ownerEmail = ownerEmail;
    this.ownerPhone = ownerPhone;
  }
}
function displayRooms(hotel) {
  i = 0;
  hotel.roomList.forEach((room) => {
    i++;
    document.getElementById(
      "roomList"
    ).innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center" > <img class="img-fluid rounded-top" style="width: 300px" src="https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/397679942.jpg?k=7b3f5dd6c2f195e3129f361ecb989adf25331fe20ec52954beb2b0c83cf01b89&o=&hp=1" alt=""/> <h5>${
      room.name
    }<div class="mt-2">${listUtility(room)}</div></h5> <h5>Size: ${
      room.size
    } meters</h5> <h5> Standard Rate: ${
      room.rate
    } USD</h5> <h5> Rooms:<span class="badge ms-1 bg-info badge-pill">${
      room.number
    }</span> </h5> <button type="button" id="btn${i}" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal"> <h5>Reserve</h5> </button> </li>`;
  });
  setButtons(hotel);
}
function displayRates(hotel) {
  i = 0;
  hotel.roomList.forEach((room) => {
    i++;
    document.querySelector("#roomRateList").innerHTML += ` <li
    class="list-group-item d-flex justify-content-between align-items-center"
  >
    <img
      class="img-fluid rounded-top"
      style="width: 150px"
      src="https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/397679942.jpg?k=7b3f5dd6c2f195e3129f361ecb989adf25331fe20ec52954beb2b0c83cf01b89&amp;o=&amp;hp=1"
      alt=""
    />
    <h5>
      ${room.name}
    </h5>
    <h5>Size: ${room.size}</h5>
    <h5>Standard Rate: ${room.rate}</h5>
    <h5>
      Rooms:<span class="badge ms-1 bg-info badge-pill">${room.number}</span>
    </h5>
    <button
      type="button"
      id="btnRate${i}"
      class="btn btn-primary btn-lg"
      data-bs-toggle="modal"
      data-bs-target="#rateModal"
    >
      <h5>Set</h5>
    </button>
  </li>`;
  });
  setRateButtons(hotel);
}

function setRateButtons(hotel) {
  let i = 0;
  hotel.roomList.forEach((room) => {
    i++;
    document.getElementById(`btnRate${i}`).addEventListener("click", function () {
      document.querySelector("#roomRated").innerHTML = `${room.name}`;
    });
  });
}

function addBooking(hotel)
{
  let name = document.getElementById("guestName").value;
  let email = document.getElementById("guestEmail").value;
  let phone = document.getElementById("guestPhone").value;
  let roomName = document.querySelector("#roomBooked").innerHTML;
  let checkin = new Date(document.getElementById("checkinDate").value);
  let checkout = new Date(document.getElementById("checkoutDate").value);
  let price = document.getElementById("totalPrice").innerHTML;
  hotel.bookings.push(
    new Booking(name, email, phone, roomName, checkin, checkout, price)
  );
  window.localStorage.setItem("hotel", JSON.stringify(hotel));
  console.log(`${name} ${roomName} ${checkin} ${checkout} ${price}`);
}

function setButtons(hotel) {
  let i = 0;
  hotel.roomList.forEach((room) => {
    i++;
    document.getElementById(`btn${i}`).addEventListener("click", function () {
      document.querySelector("#roomBooked").innerHTML = `${room.name}`;
      document.querySelector("#checkinDate").min = new Date()
        .toISOString()
        .split("T")[0];
      let date = new Date();
      let dateTmp = date;
      date.setDate(date.getDate() + 1);
      document.querySelector("#checkoutDate").min = date
        .toISOString()
        .split("T")[0];
      document.querySelector("#checkoutDate").value = date
        .toISOString()
        .split("T")[0];
      document.querySelector("#checkinDate").value = new Date()
        .toISOString()
        .split("T")[0];
        document.querySelector("#totalPrice").innerHTML = `${calculatePrice(
          new Date(document.querySelector("#checkinDate").value),
          new Date(document.querySelector("#checkoutDate").value),
          room.rate
        )}`;
      document
        .querySelector("#checkinDate")
        .addEventListener("change", function () {
          document.querySelector("#totalPrice").innerHTML = `${calculatePrice(
            new Date(document.querySelector("#checkinDate").value),
            new Date(document.querySelector("#checkoutDate").value),
            room.rate
          )}`;
        });
      document
        .querySelector("#checkoutDate")
        .addEventListener("change", function () {
          document.querySelector("#totalPrice").innerHTML = `${calculatePrice(
            new Date(document.querySelector("#checkinDate").value),
            new Date(document.querySelector("#checkoutDate").value),
            room.rate
          )}`;
        });
    });
  });
}

function calculatePrice(checkin, checkout, rate) {
  let timeDiff = Math.abs(checkout.getTime() - checkin.getTime());
  let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  console.log(checkout.getTime() - checkin.getTime());
  return diffDays * rate;
}

//List every utility in a room
function listUtility(room) {
  let utilityList = "";
  for (let i = 0; i < room.utility.length; i++) {
    utilityList += `<span class="badge bg-info badge-pill mx-1">${room.utility[i]}</span>`;
  }
  return utilityList;
}

function addRoom(hotel) {
  let name = document.getElementById("roomName").value;
  let size = document.getElementById("roomSize").value;
  let rate = document.getElementById("roomRate").value;
  let number = document.getElementById("roomNum").value;

  let utilities = [];
  if (document.getElementById("AC").checked) {
    utilities.push("AC");
  }
  if (document.getElementById("Terrace").checked) {
    utilities.push("Terrace");
  }
  if (document.getElementById("Pool").checked) {
    utilities.push("Pool");
  }
  if (document.getElementById("Gym").checked) {
    utilities.push("Gym");
  }
  if (document.getElementById("Restaurant").checked) {
    utilities.push("Restaurant");
  }
  if (document.getElementById("Beach").checked) {
    utilities.push("Beach");
  }
  hotel.roomList.push(new Room(name, size, rate, number));
  hotel.roomList[hotel.roomList.length - 1].utility = utilities;
  window.localStorage.setItem("hotel", JSON.stringify(hotel));
  makeToast();
}

function listBookings(hotel){
  let i = 0;
  hotel.bookings.forEach((booking) => {
    i++;
    document.querySelector("#bookingList").innerHTML += `<li class="list-group-item list-group-item"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Duration: ${(new Date(booking.CheckIn)).toISOString().split("T")[0]} to ${(new Date(booking.CheckOut)).toISOString().split("T")[0]}</h5></div><h6 class="mb-1">Room: ${booking.Room}</h6><h6 class="mb-1">Guest Name: ${booking.Name}</h6><h6 class="mb-1">Guest Phone: ${booking.Phone}</h6><h6 class="mb-1">Guest Email: ${booking.Email}</h6><h6 class="mb-1">Total price: ${booking.Price} USD</h6></li>`;
  });
}

function bookRoom(){
  addBooking(hotel);
  makeToast();
}

function createRoom() {
  addRoom(hotel);
}

function makeToast() {
  const toastLiveExample = document.getElementById("liveToast");
  const toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
}

function test() {
  console.log(document.getElementById("date").value);
}

if (window.localStorage.getItem("hotel") === null) {
  let hotel = new Hotel(
    "The Princess of Arena Cam Ranh Home",
    "Cam Nghĩa, Cam Ranh, Khánh Hòa, Vietnam",
    "12.02630367601079, 109.21449190530254",
    "CÔNG TY CỔ PHẦN TRẦN THÁI CAM RANH",
    "rsvn.ams@arenams.vn",
    "02583968888"
  );
  hotel.roomList[1].utility.push(
    utilities.AC,
    utilities.Pool,
    utilities.Restaurant,
    utilities.Gym
  );
  hotel.roomList[2].utility.push(
    utilities.AC,
    utilities.Pool,
    utilities.Restaurant,
    utilities.Beach
  );
  hotel.roomList[0].utility.push(
    utilities.AC,
    utilities.Pool,
    utilities.Restaurant
  );
  window.localStorage.setItem("hotel", JSON.stringify(hotel));
}
console.log(window.localStorage.getItem("hotel"));
let hotel = JSON.parse(window.localStorage.getItem("hotel"));
if(window.location.pathname == "/Bookings.html"){
  listBookings(hotel);
}
if (window.location.pathname == "/Rooms.html") {
  displayRooms(hotel);
}
if(window.location.pathname == "/Admin.html"){
  displayRates(hotel);
}
