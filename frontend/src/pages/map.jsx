import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import osm from "../components/maptiler/osm-providers";
import { useRef } from "react";

import { useFacilityContext } from "../hooks/useFacilityContext";
import { useCategoryContext } from "../hooks/useCategoryContext";
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
  const { notify, isPending, error, setLoading, setError } = useDisplayContext();
  const [choosedCat, setChoosedCat] = useState({});

  const [addButton, setAddButton] = useState(true);
  const addButtonVisible = (state) => {
    setAddButton(state)
  }

  const [miniInfo, setMiniInfo] = useState(false);
  const [chooseCatModal, setChooseCatModal] = useState(false);
  const chooseCatPopUp = (state) => {
    setChooseCatModal(state)
    addButtonVisible(false)
  }
  const [addCatModal, setAddCatModal] = useState(false);
  const addCatPopUp = (state) => {
    setAddCatModal(state)
  }
  const [addFacModal, setAddFacModal] = useState(false);
  const addFacPopUp = (state) => {
    setAddFacModal(state)
  }

  const url = 'http://localhost:3100/api/mapping';
  useFetch({ url, dispatch, setError, setLoading, type: 'GET_FACILITIES' });

  const url2 = 'http://localhost:3100/api/category';
  useFetch({ url: url2, dispatch: dispatch2, setError, setLoading, type: 'GET_CATEGORIES' });

  // console.log(facilities)
  // console.log(categories)

  const [center] = useState({
    lat: -7.795425632583776,
    lng: 110.36814965123658,
  });
  const ZOOM_LEVEL = 14;
  const mapRef = useRef();

  return (
    <>
      <SearchBar></SearchBar>
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
        style={{ width: "100vw", height: "100vh" }}
      >
        <TileLayer
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />
      </MapContainer>

      {addButton &&
        <div className="align-middle" >
          <button
            className="button p-3 mb-10 sm:mb-12 mr-7 relative"
            onClick={(e) => chooseCatPopUp(true)}
          > Add Task + </button>
        </div>
      }

      {chooseCatModal && <ChooseCategory
        categories={categories}
        selfPopup={chooseCatPopUp}
        addFacPopUp={addFacPopUp}
        addCatPopUp={addCatPopUp}
        choosedCat={choosedCat}
        setChoosedCat={setChoosedCat}
        setLoading={setLoading}
        setError={setError} />}

      {addFacModal && <AddFacility
        url={url}
        category={choosedCat}
        selfPopUp={addFacPopUp}
        chooseCatPopUp={chooseCatPopUp}
        addButtonVisible={addButtonVisible}
        setLoading={setLoading}
        setError={setError} />}

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
