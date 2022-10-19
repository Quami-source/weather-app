import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ScrollView,Image } from 'react-native';
import React from 'react';

export default function App() {
  const [apiData,setData] = React.useState([])
  const [loading,setLoading]= React.useState(false)

  React.useEffect(()=>{
    setLoading(true)
    fetch('http://api.weatherapi.com/v1/forecast.json ?key=dbacb10dd33e474db7d210757221910&q=Paris',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response)=>response.json()).then(data=>{
      setData(data)
      setLoading(false)
    }).catch(e=>{
      setLoading(false)
      console.log(e)
    })
  },[])
  // if(loading === true){
  //   return(
  //     <View style={styles.container}>
  //       <Text>Loading...</Text>
  //     </View>
  //   )
  // }
  console.log(apiData)
  return (
    <ScrollView style={styles.container}>
      <View style={{marginBottom:30}}>
        <Text style={{fontSize:28,fontWeight:'600'}}>Weather forecast</Text>
        <Text>{apiData.forecast.forecastday[0].date}</Text>
      </View>
      <View style={styles.boxes}>
        <View style={styles.box1}>
          <Text style={styles.grayText}>Max Temperature</Text>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <Image resizeMode="contain" style={{width:80,height:80}} source={{uri:'https://cdn.weatherapi.com/weather/64x64/day/113.png'}} />
            <View style={{flexDirection:'row'}}>
              <Text style={styles.text}>{apiData.forecast.forecastday[0].day.maxtemp_c}</Text>
              <Text style={{fontWeight:'600'}}>O</Text>  
            </View>
          </View>
          
        </View>
        <View style={styles.box2}>
          <Text style={styles.grayText}>Max Temperature</Text>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <Image resizeMode="contain" style={{width:80,height:80}} source={{uri:'https://cdn.weatherapi.com/weather/64x64/night/113.png'}} />
            <View style={{flexDirection:'row'}}>
              <Text style={styles.text}>{apiData.forecast.forecastday[0].day.mintemp_c}</Text>
              <Text style={{fontWeight:'600'}}>O</Text>  
            </View>
          </View>
        </View>
      </View>
      <View style={{backgroundColor:"#242424",marginTop:10,borderRadius:20,padding:10}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',}}>
          <Text style={[styles.text,{color:'white'}]}>Today</Text>
          <Text style={{color:'white'}}>{apiData.location.name}</Text>
        </View>
        <View style={{justifyContent:'center',alignItems:'center',marginVertical:50}}>
          <Image source={{uri:"https://cdn-icons-png.flaticon.com/512/1809/1809597.png"}} resizeMode="contain" style={{width:100,height:100}} />
          <View style={{flexDirection:'row'}}>
            <Text style={{color:'white',fontSize:60,fontWeight:'600'}}>{apiData.current.temp_c}</Text>
            <Text style={{color:'white',fontSize:18,top:10,paddingLeft:10,fontWeight:"600"}}>O</Text>
          </View>
          <Text style={{color:'white'}}>{apiData.current.condition.text }</Text>
        </View>
        <View style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
        <View>
          <Text style={styles.subText} >Wind now</Text>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.subTextHeading}>{apiData.current.wind_kph}</Text>
            <Text style={styles.subText}>km</Text>
          </View>
        </View>
        <View>
          <Text style={styles.subText} >Humidity</Text>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.subTextHeading}>{apiData.current.humidity}</Text>
            <Text style={styles.subText}>%</Text>
          </View>
        </View>
        <View>
          <Text style={styles.subText} >Percipitation</Text>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.subTextHeading}>{apiData.current.precip_mm}</Text>
            <Text style={styles.subText}>mm</Text>
          </View>
        </View>
      </View>
      </View>
      
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:40,
    marginHorizontal:20,
    backgroundColor: '#fff',
  },
  boxes:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  box1:{
    backgroundColor:'pink',
    padding:8,
    borderRadius:20,
    flex:0.5,
    marginRight:5
  },
  box2:{
    backgroundColor:'cyan',
    padding:8,
    borderRadius:20,
    flex:0.5,
    marginLeft:5
  },
  text:{
    fontSize:25,
    fontWeight:'700'
  },
  subText:{
    color:'white',
    paddingTop:10
  },
  subTextHeading:{
    color:'white',
    fontWeight:'600',
    fontSize:29,
    paddingVertical:10
  },
  grayText:{
    color:'#242424',
    fontSize:11,
    paddingBottom:10
  }

});
