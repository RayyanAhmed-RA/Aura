import { View, Text, SafeAreaView, FlatList, ListHeaderComponent, Image, ListEmptyComponent } from 'react-native'
import { RefreshControl } from 'react-native'
import { useEffect, useState } from 'react'
import {images} from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'


import React from 'react'
import useAppwrite from '../../lib/useAppwrite'


const Home = () => {

  const {data: posts, refetch} = useAppwrite(getAllPosts)
  const {data: latestPosts} = useAppwrite(getLatestPosts)
  const [refreshing, setRefreshing] = useState(false);

  console.log(posts)

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(); 
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
        <FlatList
        // data={[{ id: 1 }]}
        // data ={[]}
        data={posts}
        keyExtractor={(item) => item. $id}
        renderItem={({ item }) => (
        <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
             <View className=" flex justify-between items-start flex-row mb-6">
          <View>
            <Text className="font-pmedium text-sm text-gray-100">
                Welcome Back
            </Text>
            <Text className="text-2xl font-psemibold text-white">
              Rayyan
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
            Latest Bounties
          </Text>
          <Trending posts={latestPosts ?? []}/> 
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