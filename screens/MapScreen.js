import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from '../styles';

//import Geocoder from 'react-native-geocoding';
//Geocoder.init("TASTEGOGLEMAPSAPIKEY", { language: "ro" });

const MapScreen = () => {

// State-uri pentru stocarea locației curente, mesajelor de eroare, căutării și regiunii pe hartă
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [region, setRegion] = useState({
    latitude: 47.0105,
    longitude: 28.8638,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

// obtinem locatia userului
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permisiunea pentru locație a fost refuzată');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,  // Xoom pe harta
        longitudeDelta: 0.0421,
      });
    })();
  }, []);


  /*
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const response = await Geocoder.from(searchQuery);
      if (!response.results.length) {
        console.log('Locația nu a fost găsită.');
        return;
      }
      const location = response.results[0].geometry.location;
      setRegion({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } catch (error) {
      console.log('Locația nu a fost găsită:', error);
    }
  };
  */

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          region={region}
        >
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title={"Locația Ta"}
            description={"Aceasta este locația ta curentă"}
          />
        </MapView>
      ) : (
        <Text>Încă se încarcă locația...</Text>
      )}

    {/*  
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Caută locație..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Caută" onPress={handleSearch} />
      </View>
      */}

    </View>
  );
};

export default MapScreen;
