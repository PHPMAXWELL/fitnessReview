import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const MenuButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };

  const handleOpenMenu = () => {
    setIsVisible(true);
  };

  const handleCloseMenu = () => {
    setIsVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleMenu}
      style={{ alignItems:"flex-end"}}>
      <Image
          source={require("../assets/images/icons_menu_64.png")}
          style={{ width: 80, height: 80, marginTop: 40}} 
        />
      </TouchableOpacity>
      {isVisible && (
        <View style={styles.menu}>
          <TouchableOpacity>
            <Text>Connexion</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton}>
            <Text style={styles.buttonText}>Bonnes pratiques</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default MenuButton;