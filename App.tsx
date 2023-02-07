// In App.js in a new project

import * as React from "react";
import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "./src/screens/CartScreen";
import HomeScreen from "./src/screens/HomeScreen";
import TentangKamiScreen from "./src/screens/TentangKamiScreen";
import DetailProdukScreen from "./src/screens/DetailProdukScreen";
import { RootStackParamList } from "./src/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { COLORS } from "./src/konstanta";
import SemuaProduk from "./src/screens/SemuaProduk";
import { ShoppingCartProvider } from "./src/context/ShoppingCartContext";
import { Provider as PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootStack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <ShoppingCartProvider>
          <PaperProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <StatusBar
                backgroundColor={COLORS.lightV1}
                barStyle="dark-content"
              />
              <RootStack.Navigator
                initialRouteName="Home"
                screenOptions={{ header: () => null }}
              >
                <RootStack.Screen name="Home" component={HomeScreen} />
                <RootStack.Screen
                  name="Detail"
                  component={DetailProdukScreen}
                />
                <RootStack.Screen name="Cart" component={CartScreen} />
                <RootStack.Screen name="AllProduk" component={SemuaProduk} />
                <RootStack.Screen
                  name="TentangKami"
                  component={TentangKamiScreen}
                />
              </RootStack.Navigator>
            </GestureHandlerRootView>
          </PaperProvider>
        </ShoppingCartProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;
