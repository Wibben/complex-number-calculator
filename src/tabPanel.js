import * as React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import * as button from "./button";
import styles from "./styles";

export default function TabViewExample({ panelOne, panelTwo, panelThree }) {
  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#ff4081" }}>{panelOne}</View>
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
  );

  const ThirdRoute = () => (
    <View style={{ flex: 1, backgroundColor: "orange" }} />
  )

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
    { key: "third", title: "Third" },
  ]);

  return (
    <TabView
      renderTabBar={(props) => (
        <TabBar
          style={{ height: 2, marginHorizontal: 50, marginBottom: 5 }}
          tabStyle={{ margin: 2 }}
          activeColor={'green'}
          {...props}
          renderLabel={() => null}
        />
      )}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
