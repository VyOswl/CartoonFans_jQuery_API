// Caroussel
p = 0;
container = document.getElementById("container");
container.style.width = 15 * 600 + "px";


for (let i = 1; i < 16; i++) {
      div = document.createElement("div");
      div.className = "images";
      div.style.backgroundImage = "url('img/image" + i + ".jfif')";
      container.appendChild(div);
}

setInterval(defiler, 1500);

function defiler() {
      p--;
      if (p > -15) {
            container.style.transform = "translate(" + p * 600 + "px)";
      } else {
            p = 0;
            container.style.transform = "translate(" + p * 600 + "px)";
      }
}

// API GHIBLI

const localVar = {}
const detailsContainer = document.getElementById("deets");

window.onload = () => {
      fetchInfoWithFilter().then((ghibliApiObject) => {
            //console.log(ghibliApiObject);
            localVar["cloudObj"] = ghibliApiObject;
            readStudioGhibliObject(ghibliApiObject);
      });

}




async function fetchInfoWithFilter() {

      var myRequest = new Request("https://ghibliapi.herokuapp.com/films?limit=250");

      const returnVal = await fetch(myRequest, {
            method: 'GET',
            mode: 'cors',
            cache: 'default',
            credentials: 'omit',
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
      })
            .then(function (response) {
                  if (!response.ok) {
                        throw new Error("HTTP error, status = " + response.status);
                  }
                  return response.text();
            })
            .then(function (myBlob) {
                  var cloudObject = JSON.parse(myBlob);
                  return cloudObject;
            })
            .catch(function (error) {
                  var p = document.createElement('p');
                  p.appendChild(
                        document.createTextNode('Error: ' + error.message)
                  );
                  document.querySelectorAll(".descriptioncontainer")[0].innerHTML = "";
                  document.querySelectorAll(".descriptioncontainer")[0].appendChild(p);
            });
      return returnVal;
};


function readStudioGhibliObject(ghibliApiObject) {
      const ghibliFilms = Object.entries(ghibliApiObject)
      const objectSize = ghibliFilms.length;
      const itemsContainer = document.getElementById("movietit");
      itemsContainer.innerHTML = "";

      console.log(ghibliFilms);
      console.log(objectSize);

      for (i = 0; i < objectSize; i++) {
            let optionEle = document.createElement("option");
            optionEle.value = ghibliFilms[i][1].title;
            optionEle.innerText = ghibliFilms[i][1].title;
            itemsContainer.appendChild(optionEle);
      }

      upDateDescription("first");

      itemsContainer.addEventListener("input", () => {
            upDateDescription("update");
      })


};


function upDateDescription(context) {
      detailsContainer.innerHTML = "";
      if (context === "first") {
            let myKey = document.createElement("p");
            myKey.className = "items";
            let objectEntries = Object.entries(localVar.cloudObj[0]);
            let objectKeys = Object.keys(localVar.cloudObj[0]);
            document.querySelectorAll("h1")[0].innerHTML = localVar.cloudObj[0].original_title;


            for (i = 0; i < objectEntries.length; i++) {
                  let copyKey = myKey.cloneNode(true);
                  copyKey.innerHTML = objectKeys[i].toUpperCase() + " : " + objectEntries[i][1];
                  detailsContainer.appendChild(copyKey);
            }
      } else {
            let thisFilmObject = searchForFilm(document.getElementById("movietit").value);
            let myKey = document.createElement("p");
            myKey.className = "items";
            let objectEntries = Object.entries(thisFilmObject);
            let objectKeys = Object.keys(thisFilmObject);
            document.querySelectorAll("h1")[0].innerHTML = thisFilmObject.original_title;
            document.querySelectorAll("span")[0].innerHTML = '<a href=' + thisFilmObject.image + '><img class="banner" src=' + thisFilmObject.image + '>';


            for (i = 0; i < objectEntries.length; i++) {
                  let copyKey = myKey.cloneNode(true);
                  copyKey.innerHTML = objectKeys[i].toUpperCase() + " : " + objectEntries[i][1];
                  detailsContainer.appendChild(copyKey);
            }

      }

}


function searchForFilm(searchQuery) {
      let obj = { "Not": "Found" };

      for (i = 0; i < localVar.cloudObj.length; i++) {
            if (searchQuery === localVar.cloudObj[i].title) {
                  obj = localVar.cloudObj[i];
            }
      }

      return obj;
};

/* const ghibliAPI = document.getElementById("ghibli");
ghibliAPI.addEventListener('click', function () {
      fetch('https://whicheverapi.com/path/id')
            .then(function (result) {
                  console.log(result);
            })
            .catch(function (err) {
                  console.error(err);
            });
});



/*
const container = document.createElement('div');
container.setAttribute('class', 'container');


app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {

      // Begin accessing JSON data here
      var data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400) {
            data.forEach(movie => {
                  const card = document.createElement('div');
                  card.setAttribute('class', 'card');

                  const h1 = document.createElement('h1');
                  h1.textContent = movie.title;

                  const p = document.createElement('p');
                  movie.description = movie.description.substring(0, 300);
                  p.textContent = `${movie.description}...`;

                  container.appendChild(card);
                  card.appendChild(h1);
                  card.appendChild(p);
            });
      } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `Gah, it's not working!`;
            app.appendChild(errorMessage);
      }
}

request.send();
*/