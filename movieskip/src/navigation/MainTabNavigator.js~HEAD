import React from 'react';
import { Platform, Image, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import { LOGO } from '../../constants/genres';

//import Swipe from '../components/Swipe';
//import SwipeCard from '../components/common/SwipeCard';

import WatchlistScreen from '../screens/WatchlistScreen';
import HomeScreen from '../screens/HomeScreen';
import FilterScreen from '../screens/FilterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ReviewScreen from '../screens/ReviewScreen';
import SettingsScreen from '../screens/SettingsScreen';

const styles = {
  tabStyle: {
    height: 65,
    backgroundColor: '#ffffff',
    shadowColor: 'transparent',
  }, 
  iconStyle: {
    width: 27,
    height: 27,
    marginRight: 1,
    marginLeft: 1,
    padding: 10,
    borderRadius: 5
  }
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: ({ focused }) => {
    if(focused) {
      return (
        //GÖr med View och Text för att ha text och icon
        <Image
          source={LOGO}
          style={styles.iconStyle}
        />
      );
    } else {
      return (        
        <Image
          source={LOGO}
          style={[styles.iconStyle, { opacity: 0.5 }]}
        />
      );
    }
  }
};


/* Standard med både icon och label 
const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};
*/


const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: ({ focused }) => {
    if(focused) {
      return (
        //GÖr med View och Text för att ha text och icon
        <Image
          source={LOGO}
          style={styles.iconStyle}
        />
      );
    } else {
      return (        
        <Image
          source={LOGO}
          style={[styles.iconStyle, { opacity: 0.5 }]}
        />
      );
    }
  }
};

export default createMaterialTopTabNavigator(
  {
    settings: SettingsStack,
    HomeStack,
    SettingsStack,
  },
  {
    initialRouteName: 'HomeStack',
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: true,
      style: styles.tabStyle,
      tabStyle: styles.tabStyle,
      inactiveTintColor: '#d3d3d3',
      activeTintColor: '#0f82f5',
      indicatorStyle: {
        display: 'none'
      },
    },
    navigationOptions: ({ navigation }) => ({
      tabBarOnPress: (scene, jumpToIndex) => {
        if (scene.navigation.isFocused()) {
          if (navigation.state.routeName === 'HomeStack') {
            navigation.navigate('Filter');
          }
          return;
        }
        navigation.navigate(scene.navigation.state.routeName);
      }
    })
  }
);


/*

const MainTab = createMaterialTopTabNavigator(
  {
    Watchlist: WatchlistScreen,
    Home: HomeScreen,
    Welcome: WelcomeScreen,
  },
  {
    initialRouteName: 'Home',
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: true,
      style: styles.tabStyle,
      tabStyle: styles.tabStyle,
      inactiveTintColor: '#d3d3d3',
      activeTintColor: '#0f82f5',
      indicatorStyle: {
        display: 'none'
      },
    },
    navigationOptions: ({ navigation }) => ({
      tabBarOnPress: (scene, jumpToIndex) => {
        if (scene.navigation.isFocused()) {
          if (navigation.state.routeName === 'Home') {
            navigation.navigate('Filter');
          }
          return;
        }
        navigation.navigate(scene.navigation.state.routeName);
      }
    })
  }
);

const MainStack = createStackNavigator(
  {
    Main: MainTab,
    Manage: ManageTab
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none',
  }
);

const RootStack = createStackNavigator(
  {
    Ma: MainTab,
    Main: MainStack,
    Filter: FilterScreen
  },
  {
    mode: 'modal',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#f6f6f6',
    },
  }
);







const ManageTab = createMaterialTopTabNavigator(
  {
    Watchlist: WatchlistScreen,
    Review: ReviewScreen,
    Settings: SettingsScreen
  },
  {
    initialRouteName: 'Watchlist',
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: true,
      style: styles.tabStyle,
      tabStyle: styles.tabStyle,
      inactiveTintColor: '#d3d3d3',
      activeTintColor: '#0f82f5',
      indicatorStyle: {
        display: 'none'
      }
    },
    navigationOptions: ({ navigation }) => ({
      tabBarOnPress: (scene, jumpToIndex) => {
        if (scene.navigation.isFocused()) {
          navigation.navigate('Filter');
        } else {
          navigation.navigate(scene.navigation.state.routeName);
        }
      }
    })
  }
);
*/
