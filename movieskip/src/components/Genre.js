import React from 'react';
import { View } from 'react-native';
import { Badge } from 'react-native-elements';

import { MAIN_COLOR } from '../../assets/global_vars';

export default ({ name, id, isActive }) => {
  const opacity = isActive ? 1 : 0.4;
  return (
    <View
      style={{ flex: 1, flexDirection: 'row', backgroundColor: MAIN_COLOR, opacity }}
      key={id}
    >
      <Badge
        value={name}
        badgeStyle={{ opacity, padding: 3 }}
        status='primary'
      />
    </View>
  );
};
