const container = document.querySelector(".container");
const count = document.getElementById("count");
const total = document.getElementById("total");
const moviePrice = document.getElementById("movie");
const seat = document.querySelectorAll('.row .seat:not(.occupied)');



const updateUi = () => {
    const LSslectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    console.log(LSslectedSeats)
    console.log(seat)

    if(LSslectedSeats != null && LSslectedSeats.length > 0){
        seat.forEach((item, index)=>{
            if(LSslectedSeats.indexOf(index)>-1){
                item.classList.add("selected");
            }
        })
    }
    const LSslectedMovieIndex = localStorage.getItem("movieSelectedIndex");
    if(LSslectedMovieIndex !== null){
        moviePrice.selectedIndex = LSslectedMovieIndex;
    }
};

updateUi();

let totalPrice = +moviePrice.value;
const conutSelected = () => {
  const userSelectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatSelectedCount = +userSelectedSeats.length;
  count.textContent = seatSelectedCount;
  total.textContent = seatSelectedCount * totalPrice;
 const seatIndex = [...userSelectedSeats].map((items)=>{
     return [...seat].indexOf(items);
 });
 localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));
};

const selectedSeats = (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    conutSelected();
  }
};

const scrollMovieSelected = (e) =>{
    totalPrice  = e.target.value;
    localStorage.setItem("movieSelectedIndex", e.target.selectedIndex)
    localStorage.setItem("movePrice", e.target.value )
    conutSelected();
}

conutSelected();


moviePrice.addEventListener("change",scrollMovieSelected)
container.addEventListener("click", selectedSeats);
