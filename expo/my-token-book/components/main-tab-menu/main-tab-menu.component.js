import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import HomeComponent from '../home/home.component';
import DashboardComponent from '../dashboard/dashboard.component';
import FamilyComponent from '../family/family.component';
import CategoryComponent from '../category/category.component';

export default createBottomTabNavigator({
  Home: {
    screen: HomeComponent,
    navigationOptions: { tabBarLabel: 'Home',
			 tabBarIcon: ({ tintColor }) => (<Feather name="home" color={ tintColor } size={ 24 } />),
		       },
  },
  Dashboard: {
    screen: DashboardComponent,
    navigationOptions: { tabBarLabel: 'Dashboard',
  			 tabBarIcon: ({ tintColor }) => (<Feather name="list" color={ tintColor } size={ 24 } />),
  		       },
  },
  Family: {
    screen: FamilyComponent,
    navigationOptions: { tabBarLabel: 'Family',
  			 tabBarIcon: ({ tintColor }) => (<Ionicons name="ios-people" color={ tintColor } size={ 24 } />),
  		       },
  },
  Category: {
    screen: CategoryComponent,
    navigationOptions: { tabBarLabel: 'Category',
  			 tabBarIcon: ({ tintColor }) => (<Ionicons name="ios-chatboxes" color={ tintColor } size={ 24 } />),
  		       },
  },
});
