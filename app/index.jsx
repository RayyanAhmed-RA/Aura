import { StatusBar } from 'expo-status-bar';
import {ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import {images} from '../constants'
import CustomButton from '../components/customButton';
import { useGlobalContext } from '../context/GlobalProvider';

// NativeWindStyleSheet.setOutput({
//     default: "native",
//   });

export default function App() {
    const {isLoading, isLoggedIn} = useGlobalContext(); 

    if(!isLoading && isLoggedIn) return <Redirect href='/home' /> 
  return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{height:'100%'}}>
            <View className='w-full justify-center items-center h-full px-4'>
                
                <Image 
                source={images.logo}
                className='w-[130px] h[84px]'
                resizeMode='contain'
                />
                
                <Image
                source={images.cards}
                className='max-w-[380px] min-w-[85vh] h-[300px]'
                resizeMode='contain'
                />
                
                <View className="relative mt-5">
                    
                    <Text className="text-3xl text-black font-bold text-center">
                        Discover Endless possbilities with 
                        <Text className="text-secondary">
                         Demo
                        </Text>
                    </Text>
                    
                    <Image source={images.path}
                    className="w-[136px] h-[38px] absoulute w-[136px] h-[15px] absolute -bottom-2 -right-8"
                    resizeMode='contain'
                    />
                </View>
                
                <Text className="text-sm font-pregular text-gray-500 mt-7 text-center">
                Where Creativity Meets Innovation: Embark on a Journey of Limitless
                Exploration with Aora
                </Text>
                
                <CustomButton
                    title="Continue with Email"
                    handlePress = {() => router.push('/sign-in')}
                    containerStyles = "w-full mt-7"
                />
                    
            </View>
        </ScrollView>

        <StatusBar backgroundColor='161622' style='light'/>

    </SafeAreaView>
  );
}


