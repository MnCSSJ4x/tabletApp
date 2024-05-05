import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import axios from 'axios';
import React, {useState} from 'react';
import colors from '../../../../../../../../colors';

const DrawingBoard = ({onConfirm, closeButton, onSave}) => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState('');
  const [isDrawing, setIsDrawing] = useState(true); // Start with drawing mode

  const handleStartTouch = ({nativeEvent}) => {
    const {locationX, locationY} = nativeEvent;
    if (isDrawing) {
      setCurrentPath(`M${locationX},${locationY}`);
    } else {
      setCurrentPath('');
    }
  };

  const handleMoveTouch = ({nativeEvent}) => {
    const {locationX, locationY} = nativeEvent;
    if (isDrawing) {
      setCurrentPath(prevPath => `${prevPath} L${locationX},${locationY}`);
    } else {
      setPaths(prevPaths => {
        const updatedPaths = prevPaths.filter(path => {
          const [x, y] = path.split(' ')[0].substring(1).split(',');
          return Math.sqrt((x - locationX) ** 2 + (y - locationY) ** 2) > 10;
        });
        return updatedPaths;
      });
    }
  };

  const handleEndTouch = () => {
    if (!isDrawing && currentPath) {
      setPaths(prevPaths => [...prevPaths]);
    } else if (currentPath) {
      setPaths(prevPaths => [...prevPaths, currentPath]);
    }
    setCurrentPath('');
  };

  const clearDrawing = () => {
    setPaths([]);
  };

  const toggleDrawingMode = () => {
    setIsDrawing(prevMode => !prevMode);
  };
  const saveDrawing = () => {
    onSave(paths);
  };
  const closeButtonCall = () => {
    // Display the alert when the Close button is pressed
    Alert.alert(
      'Warning',
      'Do you want to close without saving your progress? Any unsaved changes will be lost.',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            closeButton(false);
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <View style={styles.container}>
      <Svg style={styles.svgContainer}>
        {paths.map((path, index) => (
          <Path
            key={index}
            d={path}
            stroke="black"
            strokeWidth={`${Dimensions.get('window').width * 0.01}`} // Example: set stroke width as 1% of window width
            fill="none"
          />
        ))}
        <Path
          key="currentPath"
          d={currentPath}
          stroke="black"
          strokeWidth={`${Dimensions.get('window').width * 0.01}`} // Example: set stroke width as 1% of window width
          fill="none"
        />
      </Svg>
      <View
        onTouchStart={handleStartTouch}
        onTouchMove={handleMoveTouch}
        onTouchEnd={handleEndTouch}
        style={styles.touchOverlay}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleDrawingMode}>
          <Text style={styles.buttonText}>{isDrawing ? 'Eraser' : 'Pen'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={clearDrawing}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={saveDrawing}>
          <Text style={styles.buttonText}>Save Drawing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={closeButtonCall}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  svgContainer: {
    flex: 1,
  },
  touchOverlay: {
    ...StyleSheet.absoluteFill,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.interactive01,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default DrawingBoard;
