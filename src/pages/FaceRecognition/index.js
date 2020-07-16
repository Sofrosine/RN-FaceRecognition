import React, {useState} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {utils} from '@react-native-firebase/app';
import vision, {VisionFaceContourType} from '@react-native-firebase/ml-vision';
import {RNCamera} from 'react-native-camera';

function FaceRecognition({navigation}) {
  const [state, setState] = useState({
    rightMouth: {},
    leftMouth: {},
    rightEar: {},
    leftEar: {},
    rightCheek: {},
    leftCheek: {},
    leftEye: {},
    rightEye: {},
    bottomMouth: {},
    noseBase: {},
  });
  async function processFaces(localPath) {
    const faces = await vision().faceDetectorProcessImage(localPath);

    faces.forEach((face) => {
      console.log('Head rotation on Y axis: ', face.headEulerAngleY);
      console.log('Head rotation on Z axis: ', face.headEulerAngleZ);

      console.log('Left eye open probability: ', face.leftEyeOpenProbability);
      console.log('Right eye open probability: ', face.rightEyeOpenProbability);
      console.log('Smiling probability: ', face.smilingProbability);
      console.log('xixix', face.faceContours);

      face.faceContours.forEach((contour) => {
        // console.log('asdkasdj', countour)
        if (contour.type === VisionFaceContourType.FACE) {
          console.log('Face outline points: ', contour.points);
        } else {
          return;
        }
      });
    });
  }

  const takePicture = async (camera) => {
    if (camera) {
      const options = {quality: 0.5, base64: true};
      const data = await camera.takePictureAsync(options);
      console.log('dataa', data.uri);
      const localPath = await processFaces(data.uri);
    }
  };

  const handlePosition = async (res) => {
    if (res.faces[0].rightMouthPosition) {
      await setState({
        rightMouth: res.faces[0].rightMouthPosition,
        rightEye: res.faces[0].rightEyePosition,
      });
      if (Math.round(state.rightMouth.x) === 171) {
        navigation.replace('Home');
        console.log('ayoayaoya', Math.round(state.rightMouth.x));
      }
      if (Math.round(state.rightMouth.x) === 170) {
        navigation.replace('Home');
        console.log('ayoayaoya', Math.round(state.rightMouth.x));
      }
      if (Math.round(state.rightMouth.x) === 169) {
        navigation.replace('Home');
        console.log('ayoayaoya', Math.round(state.rightMouth.x));
      }
      if (Math.round(state.rightMouth.x) === 168) {
        navigation.replace('Home');
        console.log('ayoayaoya', Math.round(state.rightMouth.x));
      } else {
        console.log(Math.round(state.rightMouth.x));
      }
    }
  };
  // right mouth 171
  // right eye 170

  return (
    <>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
        onFacesDetected={(res) => handlePosition(res)}
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications.all
        }>
        {({camera, status, recordAudioPermissionStatus}) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View style={styles.scanContainer}>
              <View style={styles.scanner}></View>
              <View style={{justifyContent: 'center', top: '25%'}}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {state.rightMouth.x
                    ? `RightMouth: x: ${state.rightMouth.x} y: ${state.rightMouth.y}`
                    : 0}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {state.rightEye.x
                    ? `RightEye: x: ${state.rightEye.x} y: ${state.rightEye.y}`
                    : 0}
                </Text>
              </View>
            </View>
          );
        }}
      </RNCamera>
    </>
  );
}

const PendingView = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <ActivityIndicator size={24} color="red" />
  </View>
);

export default FaceRecognition;

const styles = StyleSheet.create({
  scanContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scanner: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: 'gray',
    alignSelf: 'center',
    top: '20%',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
