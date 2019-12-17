import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator,FlatList, Dimensions, Image} from 'react-native';
import axios from 'axios'

const {height,width} = Dimensions.get('window')
export default class App extends React.Component {

    constructor() {
      super()
      this.state = {
        isLoading: true,
        images: []
      };

      this.loadWallpapers = this.loadWallpapers.bind(this)
    }

    loadWallpapers(){
      axios.get(' https://api.unsplash.com/photos/random?count=15&client_id=6a65cda473e6406acc4007af4aff5347416b7baeb8556e63175d99be64f03ed2').then(function(response){
        console.log(response.data)
        this.setState({ images:response.data, isLoading: false })

      }.bind(this)
      ).catch(function(error){
        console.log(error)

      }).finally(function(){
        console.log('request completed')
      })
    }

    componentDidMount() {
      this.loadWallpapers()
    }

    renderItem=({item}) => {
      return(
        <View style={{ height,width }}>
          <Image
            style={{ flex: 1, height: null, width: null }}
            source={{ uri: item.urls.regular }}
            resizeMode="cover"
          />
        </View>
      )
    }

  render() {
      return this.state.isLoading? (
        <View style={{ flex: 1, 
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center' }}>

        <ActivityIndicator size="large" color="grey"/>

        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <FlatList 
            horizontal
            pagingEnabled
            data={this.state.images}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
