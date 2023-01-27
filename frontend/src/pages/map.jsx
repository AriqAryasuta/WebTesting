import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import osm from "../components/maptiler/osm-providers";
import { useRef } from "react";
import L from "leaflet/dist/leaflet";

import { useFacilityContext } from "../hooks/useFacilityContext";
import { useCategoryContext } from "../hooks/usecategoryContext";
import { useDisplayContext } from "../hooks/useDisplayContext";
import useFetch from "../hooks/useFetch";

import Navbar from "../components/public/Navbar";
import SearchBar from "../components/searchbar/searchbar";
import ChooseCategory from "../components/modal/chooseCategory";
import AddCategory from "../components/modal/addCategory";
import AddFacility from "../components/modal/addFacility";

export default function BasicMap() {
  const { facilities, dispatch } = useFacilityContext();
  const { categories, dispatch2 } = useCategoryContext();
  const { notify, isPending, error, setLoading, setError } =
    useDisplayContext();
  const [choosedCat, setChoosedCat] = useState({});

  const [editMode, setEditMode] = useState(false);
  const toggleMapMode = (mode) => {
    setEditMode(mode);
  };

  const [miniInfo, setMiniInfo] = useState(false);
  const [chooseCatModal, setChooseCatModal] = useState(false);
  const chooseCatPopUp = (state) => {
    setChooseCatModal(state);
    toggleMapMode(false);
  };
  const [addCatModal, setAddCatModal] = useState(false);
  const addCatPopUp = (state) => {
    setAddCatModal(state);
  };
  const [addFacModal, setAddFacModal] = useState(false);
  const addFacPopUp = (state) => {
    setAddFacModal(state);
  };

  const url = "http://localhost:3100/api/mapping";
  useFetch({ url, dispatch, setError, setLoading, type: "GET_FACILITIES" });

  const url2 = "http://localhost:3100/api/category";
  useFetch({
    url: url2,
    dispatch: dispatch2,
    setError,
    setLoading,
    type: "GET_CATEGORIES",
  });

  // console.log(facilities)
  // console.log(categories)

  const [center] = useState({
    lat: -7.795425632583776,
    lng: 110.36814965123658,
  });
  const ZOOM_LEVEL = 14;
  const mapRef = useRef();

  const [selectedPosition, setSelectedPosition] = useState(null);
  function ClickLocation() {
    const map = useMapEvents({
      click(e) {
        setSelectedPosition(e.latlng);
        console.log("selected: " + selectedPosition);
      },
    });
    return selectedPosition === null ? null : (
      <Marker position={selectedPosition}>
        <Popup on>
          <span onClick={(e) => chooseCatPopUp(true)}>+Tambah Lokasi</span>
        </Popup>
      </Marker>
    );
  }

  const [currentPos, setCurrentPos] = useState(null);
  function CurrentLocation() {
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setCurrentPos(e.latlng);
        console.log("selected: " + currentPos);
        map.flyTo(e.latlng, map.getZoom());
      },
    });
    return currentPos === null ? null : (
      <Marker position={currentPos}>
        <Popup on>
          <span onClick={(e) => chooseCatPopUp(true)}>+Tambah Lokasi</span>
        </Popup>
      </Marker>
    );
  }

  function ToggleButton() {
    return (
      <div className="bottom-0 right-0 mx-10 my-4">
        {editMode ? (
          <div className="flex justify-end z-400">
            <button
              className="bg-lightblue mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus :outline-none focus:shadow-outline"
              onClick={(e) => toggleMapMode(false)}
            >
              Edit Mode
            </button>
          </div>
        ) : (
          <div className="flex justify-end z-400">
            <button
              className="bg-lightblue mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus :outline-none focus:shadow-outline"
              onClick={(e) => toggleMapMode(true)}
            >
              View Mode
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <SearchBar></SearchBar>
      <ToggleButton />
      <MapContainer
        id="maps"
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
        style={{ width: "100vw", height: "100vh" }}
      >
        {editMode && <ClickLocation />}

        {/* <div className="leaflet-top flex items-end justify-end w-screen h-screen">
          <ToggleButton />
        </div> */}

        <TileLayer
          minZoom={3}
          maxZoom={20}
          className="z-10 absolute"
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />
      </MapContainer>

      {chooseCatModal && (
        <ChooseCategory
          categories={categories}
          selfPopup={chooseCatPopUp}
          addFacPopUp={addFacPopUp}
          addCatPopUp={addCatPopUp}
          choosedCat={choosedCat}
          setChoosedCat={setChoosedCat}
          setLoading={setLoading}
          setError={setError}
        />
      )}

      {addFacModal && (
        <AddFacility
          url={url}
          category={choosedCat}
          selfPopUp={addFacPopUp}
          chooseCatPopUp={chooseCatPopUp}
          addButtonVisible={toggleMapMode}
          setLoading={setLoading}
          setError={setError}
        />
      )}

      {addCatModal && <AddCategory />}
    </>
  );
}

// import React from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// const center = [-7.79517159918859, 110.36797836775261];
// export default function App() {
//   return (
//     <MapContainer
//       center={center}
//       zoom={300}
//       style={{ width: "100vw", height: "100vh" }}
//     >
//       <TileLayer
//         url="https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=bAw0nCk1tkpX6xjoL9u0"
//         attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
//       />
//       <Marker position={center}>
//         <Popup>
//           Yeay we did it. <br /> wadidaw.
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// }
