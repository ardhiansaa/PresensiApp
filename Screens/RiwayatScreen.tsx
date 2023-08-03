import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Icons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationParamList } from "../types/navigation";
import "react-native-gesture-handler";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import ButtonBottomSheet from "../Components/ButtonBottomSheet";
import { useGetPresensi } from "../src/GetPresensi";
import History from "../Components/History";
import { ScrollView } from "react-native-gesture-handler";
// interface IRiwayatScreenProps {

// }
type NavigationProps = NativeStackNavigationProp<NavigationParamList>;
const RiwayatScreen = () => {
  const deviceHeight = Dimensions.get("window").height;
  const { data, isLoading } = useGetPresensi();
  const getStatusIds = () => {
    return data?.data.presensi.map((item) => item.status);
  };

  const statusIds = getStatusIds();

  const renderStatus = (statusIds: number) => {
    switch (statusIds) {
      case 1:
        return "ios-log-in";
      case 2:
        return "ios-mail";
      case 3:
        return "ios-sad";
      case 4:
        return "ios-home";
      default:
        return;
    }
  };
  const navigation = useNavigation<NavigationProps>();

  const onBackPressed = () => {
    navigation.navigate("Main");
  };

  const bottomSheetModalRef = useRef<BottomSheet>(null);
  const snapPoints = ["24%", "35%"];
  function handlerPresentModal() {
    bottomSheetModalRef.current?.present();
  }

  const getContent = () => {
    return <ActivityIndicator size="small" />;
  };
  if (isLoading) {
    return (
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {getContent()}
      </View>
      // <Text style={{ justifyContent: "center", alignItems: "center" }}>
      //   Loading..
      // </Text>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* ini header */}
      <View
        style={{
          height: deviceHeight / 11,
          ...styles.header,
        }}
      >
        <Text style={styles.txtHead}>Riwayat</Text>
      </View>

      {/* ini filter */}
      <View></View>

      {/* ini filter */}

      {/* <BottomSheetModalProvider>
        <View>
          <TouchableOpacity
            onPress={handlerPresentModal}
            style={{
              borderWidth: 1,
              borderColor: "grey",
              width: 75,
              padding: 5,
              backgroundColor: "white",
              marginHorizontal: 20,
              marginVertical: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 18, color: "grey" }}> Filters</Text>
          </TouchableOpacity>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ borderRadius: 50 }}
          >
            <View style={styles.containerBottomSheet}>
              <Text style={styles.titleBottomSheet}>Filters</Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <ButtonBottomSheet
                  onPress={onBackPressed}
                  type="SECONDARY"
                  textButton="Terbaru"
                />

                <ButtonBottomSheet
                  onPress={onBackPressed}
                  type="SECONDARY"
                  textButton="Terlama"
                />
                <ButtonBottomSheet
                  onPress={onBackPressed}
                  type="SECONDARY"
                  textButton="Hadir"
                />
                <ButtonBottomSheet
                  onPress={onBackPressed}
                  type="SECONDARY"
                  textButton="Cuti"
                />
                <ButtonBottomSheet
                  onPress={onBackPressed}
                  type="SECONDARY"
                  textButton="Sakit"
                />
                <ButtonBottomSheet
                  onPress={onBackPressed}
                  type="SECONDARY"
                  textButton="WFH"
                />
              </View>
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider> */}

      {/* ini konten */}
      <View
        style={{
          alignItems: "center",
          // marginHorizontal: 25,
          // backgroundColor: "white",
          paddingBottom: 20,
        }}
      >
        <FlatList
          data={data?.data.presensi.slice().reverse()}
          renderItem={({ item }) => (
            <View>
              <History
                textJudul={item.status_kehadiran}
                textTimeStamp={item.tanggal}
                icon={
                  <Icons
                    name={renderStatus(statusIds)}
                    size={40}
                    color={"green"}
                  />
                }
              />
            </View>
          )}
          keyExtractor={(item, index) => item.id.toLocaleString()}
        />

        {/* {data?.data.karyawans?.[0].presensi?.map((item) => (
          <View key={item.id}>
            <Text>{item.status}</Text>
            <Text>{item.tanggal}</Text>
            <Text>{item.updated_at}</Text>
          </View>
        ))} */}
      </View>
    </ScrollView>
  );
};

export default RiwayatScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginTop: 40,
    backgroundColor: "#F0F0F0",
  },
  header: {
    // width: "100%",
    backgroundColor: "white",

    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderColor: "#DDDDDD",
  },
  txtHead: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  component: {
    flexDirection: "row",
    borderWidth: 1.5,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
    // height: 100,
    // paddingHorizontal: 20,
    padding: 25,
    borderColor: "#DDDDDD",
  },
  containerBottomSheet: {
    flex: 1,
    padding: 20,
  },
  titleBottomSheet: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
