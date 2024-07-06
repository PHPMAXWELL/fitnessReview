import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Keyboard } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import axios from 'axios';
import { useRouter } from "expo-router";



const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = async() => {
    if ( !email || !password) {
      setErrorMessage('Veuillez remplir tous les champs.');
    } else if (!emailRegex.test(email)) {
        setErrorMessage('Veuillez saisir une adresse e-mail valide.');
      } else if (!passwordRegex.test(password)) {
      setErrorMessage('Le mot de passe doit contenir au moins 8 caractères, dont au moins une minuscule, une majuscule et un chiffre.');
    } else {
        try {
          // Envoi des données au serveur
          // const  SECRET_KEY = 'leCodeDeL-Api';
          // var token = jwt.sign({ foo: 'bar' }, SECRET_KEY, { algorithm: 'RS256' }, function(err, token) {
          //   console.log(token);
          // });;
          const options = {
            method: 'POST',
            url:'http://172.20.10.5:3000/api/login',
            headers: {
              //'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'     
          },
            data: {
              email: email,
              password: password
            }, 
        };
        const response = await axios.request(options)
      .then(function (response) {
        const data = response.data.message;
            return (
                 router.push({pathname:"/home",
                  params:  {message:data}
                 })
                 
            );

          })
       .catch(error => {
        console.error('Erreur Axios :',error);
       });
          
         
          //console.log(usernom,userprenom,email,password);
          // Réinitialiser les champs de saisie et les messages d'erreur
          setEmail('');
          setPassword('');
          setErrorMessage('');
            // Faire replier le clavier
            Keyboard.dismiss();
          // Afficher un message de succès à l'utilisateur
          
        } catch (error) {
          //console.error('Erreur lors de l\'inscription :', error.response.data);
          setErrorMessage('Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer.');
        }
      }
  };

  return (
    <View
    className="flex-1 flex justify-center">
      <View
    style={{ height: hp(10), width: wp(100) }}
    className="bg-rose-500 flex items-center justify-end mx-auto"
    >
      {/* <Image
          source={require("../assets/images/logo-app.png")}
          style={{ width: 80, height: 80, marginTop: 40 }} 
        /> */}
    </View>
    <Text
            style={{ fontSize: hp(3),textAlign:'center',marginTop:60}}
            className="text-black font-bold tracking-wide"
        >
          Connexion
        </Text>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Adresse e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={{ height: hp(7), width: wp(80) }}
            className="bg-rose-500 flex items-center justify-center mx-auto"
             onPress={handleRegister}>
        
        <Text 
          style={{ fontSize: hp(3) }}
          className="text-white font-bold tracking-widest"
        >Se connecter</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:80,
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    width: '100%',
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});

export default Login;
