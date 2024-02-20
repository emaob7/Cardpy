import * as React from 'react';
import DocumentListScreen from './DocumentListScreen';
import CurriculumScreen from './screens/CurriculumScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';




const Cedulas = ({ uid }) =>  {
  return (
    <>
      {/* Pasa el prop uid a DocumentListScreen */}
      <DocumentListScreen uid={uid} />
    </>
  );
}

const Curriculum = ({ uid }) =>  {
  return (
    <>
      <CurriculumScreen uid={uid}/>
    </>
  );
}
const Tab = createBottomTabNavigator();

export default function TabNav(props) {
  const { uid } = props;
  

  return (
    <>
      <Tab.Navigator>
      <Tab.Screen name="Cedulas" options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
            <Ionicons name="card-outline" size={24} />), }}> 
          {() => <Cedulas uid={uid} />}
        </Tab.Screen>
        <Tab.Screen name="Curriculum" options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={24} />
          ),}}>
        {() => <Curriculum uid={uid} />}
          </Tab.Screen>
      </Tab.Navigator>
      </>
  );
}
