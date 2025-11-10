import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import type React from "react";
import { forwardRef } from "react";

import { StyleSheet } from "react-native";

type Props = {
  children: React.ReactNode;
  onChange: () => void;
  snapPoints?: (string | number)[];
};
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

const BottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ children, onChange, snapPoints = ["90%"] }, ref) => {
    return (
      <BottomSheetModal ref={ref} onChange={onChange} snapPoints={snapPoints}>
        <BottomSheetView style={styles.contentContainer}>{children}</BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default BottomSheet;
