import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabMenuComponent from '../main-tab-menu/main-tab-menu.component';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabMenuComponent,
  })
);
