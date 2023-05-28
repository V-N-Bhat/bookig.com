import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Stacknavigator from './Stacknavigator';
import { ModalPortal } from 'react-native-modals';
import { Provider } from 'react-redux';
import Store from './Store';
import { StripeProvider } from '@stripe/stripe-react-native';
export default function App() {
  return (
      <>
      <Provider store={Store}>
      <StripeProvider
      publishableKey="pk_test_51NA77LSCR7ecIwWygoIZGSoVBuyTKl5HZig5ZlNTiyJ71UN73xuItt5zkNqpByEJteaUxUFk7A2EqTieDYqiG1pz00c2pyugt6"
    >

        <Stacknavigator />
        <ModalPortal />
    
    </StripeProvider>

      </Provider>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
