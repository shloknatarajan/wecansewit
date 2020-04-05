var map;
var service;
var infowindow;

function initMap() {
  var sydney = new google.maps.LatLng(40.71, -74.01);
  function wait(ms)
  {
  var d = new Date();
  var d2 = null;
  do { d2 = new Date(); }
  while(d2-d < ms);
  }
          infowindow = new google.maps.InfoWindow();

          map = new google.maps.Map(
              document.getElementById('map'), {center: sydney, zoom: 6});

          arrOfHosps = ["A.O. Fox Hospital", "A.O. Fox Hospital - Tri-Town Campus","Bassett Medical Center (The Mary Imogene Bassett Hospital)", "Cayuga Medical Center", "Chenango Memorial Hospital", "Cobleskill Regional Hospital", "FF Thompson Hospital", "Jones Memorial Hospital", "Lenox Hill Hospital", "Little Falls Hospital", "Montefiore Medical Center", "Newark-Wayne Community Hospital", "NewYork-Presbyterian Weill Cornell Medical Center", "Niagara Falls Memorial Medical Center", "Noyes Memorial Hospital", "Nyack Hospital", "NYC Health + Hospitals / Harlem","NYC Health + Hospitals - Harlem", "NYU Langone Hospitals", "O’Connor Hospital", "Richmond University Medical Center", "Samaritan Medical Center", "Schuyler Hospital", "St. James Hospital", "Staten Island University Hospital", "Strong Memorial Hospital"]
          for(var i = 0; i < arrOfHosps.length; i++){
              var hospital = arrOfHosps[i]
              var request = {
                  query: hospital,
                  fields: ['name', "geometry",'formatted_address', "icon",],
              };

              service = new google.maps.places.PlacesService(map);

              service.findPlaceFromQuery(request, function(results, status) {
                  if (status === google.maps.places.PlacesServiceStatus.OK) {
                      for (var i = 0; i < results.length; i++) {
                          createMarker(results[i]);
                      }

              // map.setCenter(results[0].geometry.location);
                  } else {
                      if(status == "OVER_QUERY_LIMIT"){
                          wait(250)
                      }
                      i = i - 1
                      console.log(status)
                      console.log(hospital)
                  }
              });
              }
          }

      function createMarker(place) {
          console.log(place)
          var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location

          });

          google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name + "<br>" + place.formatted_address);
          infowindow.open(map, this);
          });
      }