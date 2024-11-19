import { View, Text, SafeAreaView, FlatList, ListHeaderComponent, Image, ListEmptyComponent } from 'react-native'
import { RefreshControl } from 'react-native'
import { useState } from 'react'
import {images} from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'

import React from 'react'

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
        <FlatList
        // data={[{ id: 1 }]}
        data ={[]}
        keyExtractor={(item) => item. $id}
        renderItem={({ item }) => (
        <Text className="text-3xl text-white">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
             <View className=" flex justify-between items-start flex-row mb-6">
          <View>
            <Text className="font-pmedium text-sm text-gray-100">
                Welcome Back
            </Text>
            <Text className="text-2xl font-psemibold text-white">
              JSMastery
             </Text>
          </View>

          <View>
            <Image
              source = {images.logoSmall}
              className = 'w-19 h-10'
              resizeMode = 'contain'
            
            />
          </View>
          </View>

          <SearchInput /> 
          <Text className='text-gray-100 text-lg font-pregular mb-3'>
            Latest Videos
          </Text>
          <Trending posts={[{id:1}, {id:2}, {id:3}] ?? []}/> 
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        />
      </SafeAreaView>
  )
}

export default Home