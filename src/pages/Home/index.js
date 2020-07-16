import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const Home = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  useEffect(() => {
    console.log(date);
    var dates =
      date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    setTime(dates);
  }, [date]);
  return (
    <SafeAreaView style={styles.pages}>
      <Text style={styles.h6Text}>Data Tersimpan!</Text>
      <Text style={styles.buttonBlackText}> Masuk: </Text>
      <Text style={styles.buttonBlackText}>{time}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('FaceRecognition')}
        style={[styles.button, {marginTop: 24}]}>
        <Text style={styles.buttonText}>Absensi Ulang</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  h6Text: {
    fontSize: 18,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2C24AA',
    padding: 16,
    borderRadius: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonBlackText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
});
