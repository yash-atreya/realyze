/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from 'react-native';

//Custom External StyleSheet
import {styles, textInput, buttonStyles} from '../../styles';

//Custom Components
import PrimaryButton from '../components/PrimaryButton';
import IconTabComponent from '../components/IconTabComponent';
import MainHeader from '../components/MainHeader';

//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Modal, {
  SlideAnimation,
  BottomModal,
  ModalContent,
  ModalFooter,
} from 'react-native-modals';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';

//Cutom Screens

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    editProfileVisible: false,
    text: '',
  };
  // toggleModal = () => {
  //   this.setState({visible: !this.state.visible});
  // };

  render() {
    return (
      <View>
        {/* Main Screen Header */}
        <MainHeader mainHeaderTitle="Profile" />

        {/* Search Buddy */}
        <IconTabComponent
          tabTitle="Add Buddies"
          Icon={<FeatherIcon name="user-plus" size={24} color={'#000000'} />}
          onPress={() => this.props.navigation.navigate('SearchAddBuddy')}
        /> 
        {/* Main Screen Body */}

        {/* Setting ProfilePicture and Edit Profile */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: hp('1.6%')
          }}>
          {/* Settings Icon 1/3 */}
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Settings')}>
              <Icon name="ios-settings" size={30} />
            </TouchableOpacity>
          </View>
          {/* ProfilePicture Icon 2/3 */}
          <View style={[stylesShape.CircleShapeView]} />

          {/* EditProfile Icon 3/3 */}
          <View>
            <TouchableOpacity onPress={()=>this.setState({editProfileVisible: true})}>
              <FontAwesome5 name="edit" size={26} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Full name, Username, Buddies, Bio */}
        <View style={{flexDirection: 'row', backgroundColor:'none', marginBottom: hp('1%')}}>
          {/* Left Spacer 1/3 */}
          <View style={{flex: 0.5, backgroundColor: 'none'}} />

          {/* Middle Text Part 2/3 */}
          <View style={{flex:8, backgroundColor:'none'}}>
            {/* The color of this View component will only be seen if it is given a specific height */}
            {/* The Full name cell 1/4 */}
            <View style={{backgroundColor:'none', marginBottom: hp('2%')}}>
              <Text style={[styles.h1PMB, {fontSize: 20, color: '#000000', textAlign:'center'}]}>Tanay Jain</Text>
            </View>
            {/* Username cell name 2/4 */}
            <View style={{backgroundColor:'none', marginBottom: hp('1.9%')}}>
              <Text style={[styles.bcRSBB, {fontSize: 16, color: '#000000', textAlign:'left'}]}>@tanay14.jain</Text>
            </View>
            {/* Buddies and no of Buddies 3/4 */}
            <View style={{backgroundColor:'none', marginBottom: hp('1.9%'), alignItems:'flex-start'}}>
              {/* If aligning items is left to default (i.e nothing) then it causes the entire cell to be touchable opacity therefor we use flex-start to limit the react of the components */}
              <TouchableOpacity onPress={() => this.props.navigation.navigate('MyBuddies')} style={{flexDirection: 'row'}}>
                <Text style={[styles.bcRSBB, {fontSize: 16, color: '#000000', textAlign:'left'}]} >BUDDIES     </Text>
                <Text style={[styles.bcRSBB, {fontSize: 16, color: '#000000', textAlign:'left'}]}>0</Text>
              </TouchableOpacity>
            </View>
            {/* Bio cell 4/4 */}
            <View style={{backgroundColor:'none', marginBottom: hp('1.9%')}}>
              <Text style={[styles.bcRRB, {fontSize: 14, color: '#000000', textAlign:'left'}]}>Not yet updated the Bio</Text>
            </View>
          </View>

          {/* Right Spacer 3/3 */}
          <View style={{flex: 0.5, backgroundColor: 'none'}} />
        </View>

        <IconTabComponent
          tabTitle="View Insights"
          Icon={<Icon name="ios-stats" size={24} color={'#000000'} />}
          onPress={() => this.props.navigation.navigate('ViewInsights')}
        />
        <IconTabComponent
          tabTitle="Share Profile"
          Icon={<Icon name="ios-share-alt" size={24} color={'#000000'} />}
        />

        {/* Edit Profile Modal */}
        <BottomModal
          visible={this.state.editProfileVisible}
          onTouchOutside={() => {
            this.setState({editProfileVisible: false});
          }}
          swipeDirection={['up', 'down']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={event => {
            this.setState({editProfileVisible: false});
          }}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          useNativeDriver={true}
          width={wp('100%')}
          height={hp('91.2%')}
          modalStyle={{
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            backgroundColor: '#B5BBC6',
          }}
          hasBackdrop={true}
          hideModalContentWhileAnimating={true}>
           <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={{flex:1, flexDirection:'row'}}>
                <View style={{flex: 0.5}} />
                <View style={{flex:8, flexDirection:'column', backgroundColor:'none'}}>
                  <View style={{flex:0.02,  backgroundColor:'none'}} />
                  <Text style={[styles.h1PSBB, {fontSize: 30, color: '#000000'}]}>Edit Profile</Text>
                  <View style={{flex:0.03,  backgroundColor:'none'}} />
                  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                    <View style={[stylesShape.CircleShapeView2]} />
                    <View style={{flex:0.3}} />
                    <TouchableOpacity>
                      <Text style={[styles.bcRBB,{fontSize: 14, color: '#000000', textDecorationLine:'underline', textDecorationColor:'#00A1ED'}]}>
                        Change Profile Photo
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex:0.03,  backgroundColor:'none'}} />
                  <KeyboardAvoidingView style={{flexDirection:'column'}}>
                    <Text style={[styles.bcRBB, {fontSize: 15, color:'#000000'}]}>Username: </Text>
                    <TextInput
                      placeholder="Username"
                      placeholderTextColor="#333647"
                      style={[textInput.generalTextInput, {color: '#333647', backgroundColor: '#FFFFFF', alignSelf:'center'}]}
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="default"
                      returnKeyType="next"
                      onSubmitEditing={() => this.bioInput.focus()}
                    />
                    <Text style={[styles.bcRMB, {color:'red', fontSize: 12}]}> Error Message will show here</Text>
                  </KeyboardAvoidingView>
                  <View style={{flex:0.03,  backgroundColor:'none'}} />
                  <KeyboardAvoidingView style={{flexDirection:'column'}}>
                    <Text style={[styles.bcRBB, {fontSize: 15, color:'#000000'}]}>Bio: </Text>
                    <TextInput
                      multiline={true}
                      blurOnSubmit={true}
                      onSubmitEditing={() => {Keyboard.dismiss();}}
                      placeholder="Bio (Max Characters 200)"
                      maxLength={200}
                      placeholderTextColor="#333647"
                      style={[
                        textInput.generalTextInput,
                        {color: '#333647', backgroundColor: '#FFFFFF', height: hp('16.25%'), textAlignVertical: 'top', alignSelf:'center'}]}
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="default"
                      returnKeyType="done"
                      ref={input => (this.bioInput = input)}
                    />
                    <Text style={[styles.bcRMB, {color:'red', fontSize: 12}]}> Error Message will show here</Text>
                  </KeyboardAvoidingView>
                  <View style={{flex:0.03,  backgroundColor:'none'}} />
                  <View style={{flex: 1, backgroundColor:'none', justifyContent:'flex-end'}}>
                    <PrimaryButton onPressPrimaryButton={()=> this.setState({editProfileVisible: false})}  title="UPDATE" />
                  </View>
                  <View style={{flex: 0.2, backgroundColor:'none'}} />
                </View>
                <View style={{flex: 0.5}} />
              </View>
            </TouchableWithoutFeedback>
        </BottomModal>
      </View>
    );
  }
}
const stylesShape = StyleSheet.create({
  CircleShapeView: {
    width: 228,
    height: 228,
    borderRadius: 228 / 2,
    borderWidth: 5,
    borderColor: '#00A1ED',
    // borderColor: '#56575D',
    // borderColor: '#333647',
    shadowColor: '#00A1ED67',
    shadowOffset: {width: 0, height: 7},
    shadowRadius: 6,
  },
  CircleShapeView2: {
    width: 88,
    height: 88,
    borderRadius: 88 / 2,
    borderWidth: 4,
    borderColor: '#00A1ED',
    shadowColor: '#00A1ED67',
    shadowOffset: {width: 0, height: 7},
    shadowRadius: 6,
  },
});

export default ProfileScreen;



{/* <TouchableOpacity
  onPress={()=> this.setState({editProfileVisible: false})}
  style={{shadowColor: '#102FC6',shadowOpacity: 0.3,shadowOffset: {width: 0, height: 7},shadowRadius: 11,}}>
  <LinearGradient
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0}}
    colors={['#00A1ED', '#0A3BC6']}
    style={[buttonStyles.buttonBody,{alignSelf:'center'}]}>
    <Text style={[styles.h1PBW, {fontSize: 24}]}>UPDATE</Text>
  </LinearGradient>
</TouchableOpacity> */}
{
  /* <Button
title="Settings"
onPress={() => this.props.navigation.navigate('Settings')}
/>
<Button title="Edit Profile" onPress={this.toggleModal} /> */
}
{
  /* <Button
          title="My Buddies"
          onPress={() => this.props.navigation.navigate('MyBuddies')}
        /> */
}
{
  /* <Button
          title="View Insights"
          onPress={() => this.props.navigation.navigate('ViewInsights')}
        /> */
}
{
  /* <ModalContent> */
}
{/* <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginTop: hp('4.6%'),
            marginLeft: wp('8.5%'),
          }}>
          <Text style={[styles.bcRSBB, {fontSize: 16, color: '#000000'}]}>
            @USERNAME
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MyBuddies')}
            style={{flexDirection: 'row', marginTop: hp('1.8%')}}>
            <Text style={[styles.bcRMB, {fontSize: 16, color: '#000000'}]}>
              BUDDIES
            </Text>
            <Text
              style={[
                styles.bcRMB,
                {fontSize: 16, color: '#000000', marginLeft: wp('4.8%')},
              ]}>
              155
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.bcRRB,
              {
                fontSize: 12,
                color: '#000000',
                marginTop: hp('1.8%'),
                marginRight: wp('13.5%'),
                textAlign: 'left',
              },
            ]}>
            This is where the bio will be held and shown to everyone lorem ipsum
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          </Text>
        </View> */}




{/* <View style={{flex: 1, marginLeft: wp('6.13%')}}>
              <View>
                <Text
                  style={[
                    styles.h1PSBB,
                    {fontSize: 30, color: '#000000', marginTop: hp('2%')},
                  ]}>
                  EDIT PROFILE
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: Platform.OS === 'ios' ? hp('2%') : hp('1%'),
                }}>
                <View style={stylesShape.CircleShapeView2} />
                <TouchableOpacity>
                  <Text
                    style={[
                      styles.bcRBB,
                      {fontSize: 12, color: '#000000', marginLeft: wp('5.3%')},
                    ]}>
                    Change Profile Photo
                  </Text>
                </TouchableOpacity>
              </View>
              <KeyboardAvoidingView>
                <Text
                  style={[
                    styles.bcRBB,
                    {
                      fontSize: 15,
                      marginTop:
                        Platform.OS === 'ios' ? hp('2.3%') : hp('1.5%'),
                      color: '#000000',
                    },
                  ]}>
                  USERNAME:
                </Text>
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="#333647"
                  style={[
                    textInput.generalTextInput,
                    {
                      marginTop: hp('0.86%'),
                      color: '#333647',
                      backgroundColor: '#FFFFFF',
                      width: wp('87%'),
                    },
                  ]}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  onSubmitEditing={() => this.bioInput.focus()}
                />
              </KeyboardAvoidingView>
              <KeyboardAvoidingView>
                <Text
                  style={[
                    styles.bcRBB,
                    {fontSize: 15, marginTop: hp('2.3%'), color: '#000000'},
                  ]}>
                  BIO:
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={2}
                  blurOnSubmit={true}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  placeholder="Bio"
                  maxLength={250}
                  placeholderTextColor="#333647"
                  style={[
                    textInput.generalTextInput,
                    {
                      marginTop: hp('0.86%'),
                      color: '#333647',
                      backgroundColor: '#FFFFFF',
                      width: wp('87%'),
                      height: hp('16.25%'),
                      textAlignVertical: 'top',
                    },
                  ]}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="done"
                  ref={input => (this.bioInput = input)}
                />
              </KeyboardAvoidingView>
              {/* {console.log(this.state.text)} */}
            //   <ModalFooter>
              <TouchableOpacity
                onPress={() => this.passData()}
                style={{
                  shadowColor: '#102FC6',
                  shadowOpacity: 0.3,
                  shadowOffset: {width: 0, height: 7},
                  shadowRadius: 11,
                  // marginTop: Platform.OS === 'ios' ? hp('20%') : hp('20%'),
                  marginRight: 0,
                }}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#00A1ED', '#0A3BC6']}
                  style={[
                    buttonStyles.buttonBody,
                    {
                      width: wp('87%'),
                      // marginTop: hp('31.5%'),
                    },
                  ]}>
                  <Text style={[styles.h1PBW, {fontSize: 24}]}>SAVE</Text>
                </LinearGradient>
              </TouchableOpacity>
            //   </ModalFooter>
            // </View> */}