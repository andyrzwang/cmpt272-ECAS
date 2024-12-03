import { v4 as uuidv4 } from "uuid";
import L from "leaflet";

export function showReports(map, markerIcon) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const data = JSON.parse(value);

    const lat = data.lat;
    const lng = data.lng;

    L.marker([parseFloat(lat), parseFloat(lng)], {
      icon: markerIcon, // Use the passed marker icon
    })
      .addTo(map)
      .bindPopup(
        `<b>${data["emergency-type"]}</b><br>Location: ${data["location"]}`
      );
  }
}

export function storeReport(data) {
  const reportId = data.id || `report-${uuidv4()}`;
  localStorage.setItem(reportId, JSON.stringify(data));
}

export function getAllReports() {
  const reports = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    
    const value = localStorage.getItem(key);
    const data = JSON.parse(value);
    if (i % 2 === 0) {
      data.status = 'Closed';
    }
    reports.push({ id: key, ...data });
  }
  
  return reports;
}
