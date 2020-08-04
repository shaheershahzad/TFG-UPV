import { Component, OnInit } from '@angular/core';

declare const L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    //console.log((<HTMLInputElement> document.getElementsByTagName("app-map")[0]));

    var ubicacion = "Valencia";

    var mymap = L.map('map', {
      center: [39.46975, -0.37739],
      zoom: 13
    });

    var marker = L.marker([39.46975, -0.37739], { title: "Valencia" }).addTo(mymap);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(mymap);

    (<HTMLInputElement> document.querySelector("#coordenadas")).innerHTML = "39.46975,-0.37739";
    (<HTMLInputElement> document.querySelector("#location")).innerHTML = ubicacion; 

    // Código para ocultar las atribuciones
    (<HTMLInputElement> document.querySelector(".leaflet-control-attribution.leaflet-control")).style.display = "none";

    // Este listener es para renderizar correctamente el mapa al abrir un modal
    document.addEventListener("click", function(){
      mymap.invalidateSize();
    });

    mymap.on('click', function(e) {        
      var popLocation= e.latlng;
      (<HTMLInputElement> document.querySelector("#coordenadas")).innerHTML = popLocation.lat+","+popLocation.lng;
      
      mymap.removeLayer(marker);
      marker = L.marker(popLocation).addTo(mymap);
      
      const Http = new XMLHttpRequest();
      const url = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat="+popLocation.lat+"&lon="+popLocation.lng;
      Http.open("GET", url);
      Http.send();

      Http.onreadystatechange = (e) => {
        if (Http.readyState == 4) {
          let coordData = JSON.parse(Http.responseText);
          if(coordData.address.village != undefined){
              ubicacion = coordData.address.village;
          }else if(coordData.address.county != undefined){
              ubicacion = coordData.address.county;
          }else if(coordData.address.city != undefined){
              ubicacion = coordData.address.city;
          }else if(coordData.address.country != undefined){
              ubicacion = coordData.address.country;
          }else{
              ubicacion = "No localizable";
          }

          (<HTMLInputElement> document.querySelector("#location")).innerHTML = ubicacion;

          var popup = L.popup()
          .setLatLng(popLocation)
          .setContent('<p>'+ ubicacion +'</p>')
          .openOn(mymap);
        }
      }
    });

  }

}
