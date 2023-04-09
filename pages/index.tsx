import 'mapbox-gl/dist/mapbox-gl.css';

import { useRef, useEffect, useState } from 'react';
import { GetServerSideProps } from "next";
import { Box } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import mapboxgl from 'mapbox-gl'

import log from "logger";
import { fetcher } from "shared/utils";
import { Head } from "shared/components";
import { Marker, Fields, Response } from '@/shared/types/airtable';

export default function Home({
  data,
  error,
}: {
  error: boolean;
  data: Response;
}) {
  const { t } = useTranslation("common");
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);
  const [zoom, setZoom] = useState(1.8)
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)

  useEffect(() => {
    if (map.current) return; // initialize map only once

    mapboxgl.accessToken = 'pk.eyJ1IjoibWVkdXNhbGFiIiwiYSI6ImNsYWJoOWZtczAwZTQzcXI2cncyc25jczEifQ.laLpUHRLdwEpDfLM2E-F3w'

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [lng, lat],
      zoom
    });
  }, [])

  useEffect(() => {
    if (!map.current) return;

    const markers: Marker[] = data.filter((data: Fields) => {
      if (Number.isNaN(Number(data.latitude)) || Number.isNaN(Number(data.longitude))) return false
      return true
    }).map(({ latitude, longitude, name }: Fields) => ({
      lat: latitude,
      name,
      lng: longitude,
    }))

    const geojson = {
      type: 'Feature',
      features: markers.map(({ lat, lng, name }) => ({
        properties: {
          name,
          iconSize: [30, 30],
        },
        geometry: {
          type: 'Point',
          coordinates: {
            lat,
            lng
          }
        }
      }))
    };

    map.current.on('load', () => {
      geojson.features.forEach((marker) => {  // create a DOM element for the marker
        const markerIcon = document.createElement('div');
        markerIcon.className = 'location-marker';
        markerIcon.style.backgroundImage = 'url(/location-marker.png)';
        markerIcon.style.backgroundSize = 'cover';
        markerIcon.style.width = marker.properties.iconSize[0] + 'px';
        markerIcon.style.height = marker.properties.iconSize[1] + 'px';

        new mapboxgl.Marker(markerIcon)
          .setLngLat(marker.geometry.coordinates)
          .setPopup( // add pop out to map
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<p style="color:black;">${marker.properties.name}</p>`
            )
          )
          .addTo(map.current);
      });
    });
  }, [])

  return (
    <>
      <Head title={t("title")} description={t("description")} />
      {data.map((i) =>
        i.name ? (
          <p key={i.id}>
            {i?.name} / {i?.notes} / {i?.assignee?.email} / {i?.status}{" "}
          </p>
        ) : null
      )}
      <Box id="map-container" ref={mapContainer} height={"500px"} w={"full"} />
      {error ? <p>There was an error while fetching the data</p> : null}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const data = await fetcher("/api/airtable");
    log.info("All good with the main page req");
    return {
      props: {
        data,
        locale: ctx.locale,
        ...(await serverSideTranslations(ctx.locale || "pt-BR", [
          "common",
          "header",
          "footer",
        ])),
      },
    };
  } catch (e) {
    log.error(e, "Something went wrong with the main page req");
    return {
      props: {
        data: null,
        error: true,
        locale: ctx.locale,
        ...(await serverSideTranslations(ctx.locale || "pt-BR", [
          "common",
          "header",
          "footer",
        ])),
      },
    };
  }
};
