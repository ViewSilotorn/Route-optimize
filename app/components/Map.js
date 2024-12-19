'use client'
import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';

// ตั้งค่า token ของ Mapbox
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]); // เก็บพิกัดหมุดทั้งหมด
  const [lineData, setLineData] = useState(null); // GeoJSON สำหรับเส้น

  // ฟังก์ชันสร้าง GeoJSON สำหรับวาดเส้นเชื่อมระหว่างหมุด
  const generateLineData = (markers) => {
   if (markers.length < 2) return null;

   const coords = markers.map((marker) => marker.lngLat);
   const coordinates = coords.map((lng, lat) => `${lng},${lat}`).join(";")

   const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
    
   fetch(url)
     .then((response) => response.json())
     .then((data) => {
       const route = data.routes[0].geometry; // รับข้อมูลเส้นทางจาก API
       setLineData(route); // อัปเดตข้อมูลเส้นทาง
     })
     .catch((error) => console.error("Error fetching directions:", error));
 };
  

  useEffect(() => {
    // สร้างแผนที่
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11", // แผนที่ style
      center: [100.523186, 13.736717], // ศูนย์กลางแผนที่ (Bangkok)
      zoom: 10,
      attributionControl: false,
      dragPan: true, // ให้เลื่อนแผนที่ได้
      scrollZoom: true, // ปิดการซูมด้วยการเลื่อนเมาส์
      boxZoom: false, // ปิดการซูมด้วยการเลือกกล่อง
      dragRotate: false, // ปิดการหมุนแผนที่
    });

    mapRef.current = map;

    // ฟังก์ชันปักหมุดเมื่อผู้ใช้คลิกบนแผนที่
    const onMapClick = (event) => {
      const { lngLat } = event; // ดึงพิกัดที่คลิก
      const id = Date.now(); // สร้าง id ให้กับหมุดแต่ละตัว

      // สร้างหมุด
      const newMarker = new mapboxgl.Marker({ draggable: true })
        .setLngLat([lngLat.lng, lngLat.lat])
        .addTo(map);

      // เพิ่มพิกัดหมุดใน state
      setMarkers((prevMarkers) => {
        const updatedMarkers = [
          ...prevMarkers,
          { id, lngLat: [lngLat.lng, lngLat.lat], marker: newMarker },
        ];
        setLineData(generateLineData(updatedMarkers)); // อัปเดตเส้น
        return updatedMarkers;
      });

      // ฟังก์ชันลากหมุด
      newMarker.on("dragend", () => {
        const newLngLat = newMarker.getLngLat();
        setMarkers((prevMarkers) => {
          const updatedMarkers = prevMarkers.map((marker) =>
            marker.id === id
              ? { ...marker, lngLat: [newLngLat.lng, newLngLat.lat] }
              : marker
          );
          setLineData(generateLineData(updatedMarkers)); // อัปเดตเส้น
          return updatedMarkers;
        });
      });

      // ฟังก์ชันลบหมุดเมื่อคลิกขวา
      newMarker.getElement().addEventListener("contextmenu", (e) => {
        e.preventDefault();
        newMarker.remove();
        setMarkers((prevMarkers) => {
          const updatedMarkers = prevMarkers.filter(
            (marker) => marker.id !== id
          );
          setLineData(generateLineData(updatedMarkers)); // อัปเดตเส้น
          return updatedMarkers;
        });
      });
    };

   
    // Event ฟังการคลิกแผนที่
    map.on("load", () => {
      // ตั้งค่า Event Listener สำหรับการคลิกแผนที่
      map.on("click", onMapClick);
    });

    return () => {
      if (map) map.remove();
    };
  }, []);

  // เพิ่ม GeoJSON layer สำหรับเส้น
  useEffect(() => {
    if (mapRef.current && lineData) {
      const map = mapRef.current;

      // เช็คว่ามี source เดิมอยู่หรือไม่
      if (map.getSource("line-source")) {
        map.getSource("line-source").setData(lineData);
      } else {
        map.addSource("line-source", {
          type: "geojson",
          data: lineData,
        });

        map.addLayer({
          id: "line-layer",
          type: "line",
          source: "line-source",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#0ea5e9", // สีเส้น
            "line-width": 5, // ความหนาของเส้น
          },
        });
      }
    }
  }, [lineData]);



  return (
    <div>
      {/* <h1>Choose a Map Style</h1>
      <select onChange={(e) => setSelectedStyle(e.target.value)} value={selectedStyle}>
        {styles.map((style) => (
          <option key={style.value} value={style.value}>
            {style.name}
          </option>
        ))}
      </select> */}

      <div 
        ref={mapContainerRef}
        style={{ height: "100vh", width: "100%" }}
      />
    </div>
  );
};

export default Map;

  // mapRef.current = map;

    // map.on('click', (e) => {
    //   const { lng, lat } = e.lngLat;
    //   console.log('Clicked at:', lng, lat);

    //   // const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

    //   // setMarkers((prevMaerkers) => [...prevMaerkers, {lng,lat,marker}]);

    //  map.flyTo({
    //     center: [lng, lat],
    //     zoom: 12,
    //     essential: true,
    //   });
    //   const center = turf.point([lng, lat]);
    //   const radius = 5;
    //   const options = { steps: 64, units: 'kilometers' };
    //   const circle = turf.circle(center, radius, options);

    //   // Add the circle to the map
    //   if (map.getSource('circle')) {
    //     map.getSource('circle').setData(circle); // อัปเดตวงกลมเดิม
    //   } else {
    //     map.addSource('circle', {
    //       type: 'geojson',
    //       data: circle,
    //     });

    //     map.addLayer({
    //       id: 'circle-layer',
    //       type: 'fill',
    //       source: 'circle',
    //       paint: {
    //         'fill-color': '#3887be',
    //         'fill-opacity': 0.4,
    //       },
    //     });
    //   }
  
    //   // Add a marker at the center
    //   // new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
    // });
