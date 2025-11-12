import { useCallback, useRef } from "react";
import { StyleSheet } from "react-native";
import ReanimatedSwipeable, {
  type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import { IconButton, List, MD3Colors } from "react-native-paper";
import Reanimated, { type SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { t } from "@/locales";

const styles = StyleSheet.create({
  rightAction: {
    width: 50,
    height: 50,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  leftAction: {
    width: 50,
    height: 50,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    width: "100%",
    borderTopWidth: 1,
  },

  swipeable: {
    alignItems: "center",
  },
});

type Props = {
  key: number;
  id: string;
  title: string;
  description: string;
  leftIcon: string;
  leftIconColor?: string;
  leftIconSize?: number;
  rightIcon: string;
  rightIconColor?: string;
  rightIconSize?: number;
  onPressLeftIcon: () => void;
  onPressRightIcon: () => void;
  onWillOpen?: (closeRow: () => void) => void;
  onDidClose?: (closeRow: () => void) => void;
};

const defaultProps = {
  leftIconColor: MD3Colors.neutral100,
  leftIconSize: 30,
  rightIconColor: MD3Colors.neutral100,
  rightIconSize: 30,
};

export default function SwipeableRow(props: Props) {
  const item = { ...defaultProps, ...props };
  const swipeRef = useRef<SwipeableMethods>(null);

  const closeSelf = useCallback(() => {
    swipeRef.current?.close();
  }, []);

  const LeftAction = (_prog: SharedValue<number>, drag: SharedValue<number>) => {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value - 50 }],
      };
    });

    return (
      <Reanimated.View style={[styleAnimation, styles.leftAction]}>
        <IconButton
          icon={item.leftIcon}
          iconColor={item.leftIconColor}
          size={item.leftIconSize}
          onPress={() => {
            item.onPressLeftIcon();
            closeSelf();
          }}
        />
      </Reanimated.View>
    );
  };

  const RightAction = (_prog: SharedValue<number>, drag: SharedValue<number>) => {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + 50 }],
      };
    });

    return (
      <Reanimated.View style={[styleAnimation, styles.rightAction]}>
        <IconButton
          icon={item.rightIcon}
          iconColor={item.rightIconColor}
          size={item.rightIconSize}
          onPress={() => {
            item.onPressRightIcon();
            closeSelf();
          }}
        />
      </Reanimated.View>
    );
  };

  return (
    <ReanimatedSwipeable
      key={item.key}
      ref={swipeRef}
      containerStyle={styles.swipeable}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={RightAction}
      renderLeftActions={LeftAction}
      onSwipeableWillOpen={() => item.onWillOpen?.(closeSelf)}
      onSwipeableClose={() => item.onDidClose?.(closeSelf)}
    >
      <List.Item
        key={item.key}
        title={item.title}
        description={item.description || t("screen.list.item.noContent")}
      />
    </ReanimatedSwipeable>
  );
}
