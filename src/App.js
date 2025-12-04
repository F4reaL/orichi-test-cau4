import './App.css';

import {
  AppProvider
} from "@shopify/polaris";
import '@shopify/polaris/build/esm/styles.css';

import VolumeDiscountForm from './components/VolumeDiscountForm'
function App() {



  return (
    <AppProvider>
      <VolumeDiscountForm />
    </AppProvider>

  )

}

export default App;
