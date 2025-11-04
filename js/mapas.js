/*
document.addEventListener("DOMContentLoaded", async () => {
  await customElements.whenDefined("gmp-map");

  const map = document.querySelector("#map");
  const marker = document.querySelector("#marker");
  const placePicker = document.querySelector("#place-picker");

  placePicker.addEventListener("gmpx-placechange", () => {
    const place = placePicker.value;

    if (!place.location) return;

    map.center = place.location;
    map.zoom = 17;
    marker.position = place.location;
  });
});
*/
document.addEventListener("DOMContentLoaded", async () => {
  await customElements.whenDefined("gmp-map");

  const mapEl = document.querySelector("gmp-map");
  const placePicker = document.getElementById("place-picker");

  const markers = []; // aquí se guardarán todos los pines

  placePicker.addEventListener("gmpx-placechange", () => {
    const place = placePicker.value;

    if (!place.location) return alert("No se encontró la ubicación");
    console.log("PLACE RESULT:", place);

    console.log("Nombre:", place.displayName);
    console.log("Dirección:", place.formattedAddress);
    console.log("Lat:", place.location.lat());
    console.log("Lng:", place.location.lng());
    console.log("ID del lugar:", place.id);
    console.log("Tipos:", place.types);

    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: mapEl.innerMap,
      position: place.location,
      title: place.displayName,
    });
    markers.push({
      lat: place.location.lat(),
      lng: place.location.lng,
      address: place.formattedAddress,
      name: place.displayName,
    });

    console.log("Pines actuales:", markers);
    mapEl.appendChild(marker);

    mapEl.innerMap.panTo(place.location);
  });
});
