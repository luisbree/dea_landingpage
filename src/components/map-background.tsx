'use client';

import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { useEffect, useRef } from 'react';
import { DragPan, MouseWheelZoom } from 'ol/interaction';

export default function MapBackground() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const esriLayer = new TileLayer({
      source: new XYZ({
        attributions:
          'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer">ArcGIS</a>',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      }),
    });

    const map = new Map({
      target: mapRef.current,
      layers: [esriLayer],
      view: new View({
        center: [-6450000, -4150000], // Centered roughly on Argentina
        zoom: 5,
      }),
      controls: [],
      interactions: [],
    });
    
    // Enable pan and zoom
    map.addInteraction(new DragPan());
    map.addInteraction(new MouseWheelZoom());


    // Clean up on unmount
    return () => map.setTarget(undefined);
  }, []);

  return (
    <div
      ref={mapRef}
      className="absolute inset-0 -z-20 bg-cover bg-center"
      style={{ filter: 'grayscale(80%) contrast(1.1)' }}
    ></div>
  );
}
