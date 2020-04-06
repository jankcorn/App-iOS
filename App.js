import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import AppIntroSlider from 'react-native-app-intro-slider';
import Nav from './Nav/Nav';
import SplashScreen from 'react-native-splash-screen';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GetStoreData, SetStoreData} from './utils/asyncStorage';
import colors from './assets/colors.js';

const store = configureStore();
const slides = [
  {
    key: 'ftue_1',
    text: 'CovidSafe notifies you if you may have been exposed to coronavirus and helps you monitor any symptoms you\'re having.',
    image: require('./assets/ftue/ftue_1.png'),
  },
  {
    key: 'ftue_2',
    text: 'Learn if you might have been exposed. If you\'ve recently visited a location with a risk of COVID-19 exposure, you\'ll get a notification letting you know.',
    image: require('./assets/ftue/ftue_2.png'),
  },
  {
    key: 'ftue_3',
    text: 'Take care of yourself and others Get self-care tips, connect with a healthcare professional if your symptoms worsen, and report locations you recently visited to protect others.',
    image: require('./assets/ftue/ftue_3.png'),
  },
  {
    key: 'ftue_4',
    text: ' Any information you contribute is protected. Learn more about how your information is used and protected on the Privacy page in Settings.',
    image: require('./assets/ftue/ftue_4.png'),
  },
  {
    key: 'ftue_5',
    text: 'Let\'s slow the spread of COVID-19 together.',
  },
];

function App() {
  let enableFTUE = false;
  const [statusFetched, setStatusFetched] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  getEnableFTUE().then(data => {
    enableFTUE = data;
    setStatusFetched(() => true);
  });

  function getEnableFTUE() {
    return GetStoreData('ENABLE_FTUE').then(enableFTUEString => {
      if (enableFTUEString !== null) {
        enableFTUE = enableFTUEString;
      }
      return enableFTUE;
    });
  }

  function renderItem({item}) {
    if (item.key === 'ftue_5') {
      return (
        <View style={styles.onboarding_done_page}>
          <View style={styles.onboarding_done_container}>
            <Text style={styles.onboarding_done_text}>
              Let's slow the spread of {'\n'} COVID-19 together.
            </Text>
            <TouchableOpacity style={styles.start_button} onPress={onDone}>
              <Text style={styles.start_button_text}>GET STARTED</Text>
            </TouchableOpacity>

            <View style={styles.footer_links}>
              <View style={styles.privacy_link}>
                <Text style={styles.privacy_text}>Privacy</Text>
              </View>
              <View style={styles.terms_link}>
                <Text style={styles.term_text}>Terms and Conditions</Text>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.onboarding_container}>
          <Image style={styles.onboarding_bg} source={item.image} />
          <Text style={styles.onboarding_text}>{item.text}</Text>
        </View>
      );
    }
  }

  function onDone() {
    SetStoreData('ENABLE_FTUE', 'false');
  }

  return (
    <Provider store={store}>
      {statusFetched && !enableFTUE
        ? <Nav />
        : <AppIntroSlider
          renderItem={renderItem}
          data={slides}
          onDone={onDone}
          showNextButton={false}
          showDoneButton={false}
        />
      }
    </Provider>
  );
}

const styles = StyleSheet.create({
  onboarding_container: {
    flex: 1,
  },
  onboarding_bg: {
    width: '100%',
    flex: 0.8,
  },
  onboarding_text: {
    fontSize: 14,
    lineHeight: 18,
    color: 'white',
    backgroundColor: colors.PURPLE_50,
    padding: 20,
    flex: 0.2,
  },
  onboarding_done_page: {
    backgroundColor: colors.PURPLE_50,
    height: '100%',
  },
  onboarding_done_container: {
    top: 400,
  },
  onboarding_done_text: {
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    color: 'white',
  },
  start_button: {
    borderRadius: 2,
    backgroundColor: 'white',
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 25,
    marginVertical: 30,
  },
  start_button_text: {
    color: colors.PURPLE_50,
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '500',
  },
  footer_links: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  privacy_link: {
    paddingRight: 5,
    marginRight: 5,
    borderColor: 'white',
    borderRightWidth: 1,
  },
  privacy_text: {
    color: 'white',
  },
  term_text: {
    color: 'white',
  },
});
export default App;
