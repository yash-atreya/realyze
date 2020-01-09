/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  ScrollView,
} from 'react-native';

//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import Modal, {BottomModal, SlideAnimation} from 'react-native-modals';

//Custom External StyleSheet
// import {styles, textInput, buttonStyles} from '../../styles';
import {styles, textInput, buttonStyles} from '../../styles';

//Custom Components
import PrimaryButton from '../components/PrimaryButton';
import MainHeader from '../components/MainHeader';
import GroupComponent from '../components/GroupComponent';
import BuddyAddComponent from '../components/BuddyAddComponent';

class AllGroupsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createGroupVisible: false,
      addMembersVisible: false,
      groupIconsVisible: false,
    };
  }

  render() {
    return (
      <View>
        {/* Main Screen Header */}
        <MainHeader mainHeaderTitle="Groups" />

        {/* New Group Add Button Icon */}
        <View
          style={{
            position: 'absolute',
            marginLeft: wp('81.3%'),
            marginTop: Platform.OS === 'ios' ? hp('79') : hp('80'),
            zIndex: 10,
            shadowcolor: '#00000029',
            shadowRadius: 6,
          }}>
          <TouchableOpacity
            onPress={() => this.setState({createGroupVisible: true})}>
            <Icon name="md-add-circle-outline" color={'#333647'} size={64} />
          </TouchableOpacity>
        </View>

        {/* FlatList Cell Component */}
        <GroupComponent groupName="HOT MOMS CLUB" />


        {/* Create Group Modal */}
        <BottomModal
          visible={this.state.createGroupVisible}
          onTouchOutside={() => this.setState({createGroupVisible: false})}
          swipeDirection={['up', 'down']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={event => {this.setState({createGroupVisible: false});}}
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
          {/* <ModalContent> */}
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{flex:1, flexDirection:'row'}}>
              <View style={{flex: 0.5}} />

              <View style={{flex:8, flexDirection:'column', backgroundColor:'none'}}>
                <View style={{flex:0.02, backgroundColor: 'none'}} />
                <Text style={[styles.h1PSBB, {fontSize: 30, color: '#000000'}]}>NEW GROUP</Text>
                <View style={{flex:0.03, backgroundColor: 'none'}} />
                <View>
                  <Text style={[styles.bcRBB, {fontSize: 15, color:'#000000'}]}>GROUP ICON: </Text>
                  <TouchableOpacity onPress={()=> this.setState({groupIconsVisible: true})}
                    style={{alignSelf: 'center'}}>
                    <View style={[stylesShape.CircleShapeView, {justifyContent:'center', alignItems:'center'}]}>
                      <Icon name="ios-add" size={56} />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flex:0.05, backgroundColor: 'none'}} />
                <KeyboardAvoidingView style={{flexDirection: 'column'}}>
                  <Text style={[styles.bcRBB, {fontSize: 15, color:'#000000'}]}>GROUP NAME: </Text>
                  <TextInput
                    maxLength={100}
                    placeholder="Group Name"
                    placeholderTextColor="#333647"
                    style={[textInput.generalTextInput, {color: '#333647', backgroundColor: '#FFFFFF', alignSelf:'center'}]}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="next"
                    onSubmitEditing={() => this.groupDescriptionInput.focus()}
                  />
                  <Text style={[styles.bcRMB, {color:'red', fontSize: 12}]}> Error Message will show here</Text>
                </KeyboardAvoidingView>
                <View style={{flex: 0.05, backgroundColor: 'none'}} />
                <KeyboardAvoidingView style={{flexDirection: 'column'}}>
                  <Text style={[styles.bcRBB, {fontSize: 15, color:'#000000'}]}>GROUP DESCRIPTION: </Text>
                  <TextInput
                    multiline={true}
                    blurOnSubmit={true}
                    onSubmitEditing={() => {Keyboard.dismiss();}}
                    placeholder="Group Description (Max Characters 200)"
                    maxLength={200}
                    placeholderTextColor="#333647"
                    style={[
                      textInput.generalTextInput,
                      {color: '#333647', backgroundColor: '#FFFFFF', height: hp('16.25%'), textAlignVertical: 'top', alignSelf:'center'}]}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="done"
                    ref={input => (this.groupDescriptionInput = input)}
                  />
                  <Text style={[styles.bcRMB, {color:'red', fontSize: 12}]}> Error Message will show here</Text>
                </KeyboardAvoidingView>
                <View style={{flex:0.05, backgroundColor:'none'}} />

                <View style={{flex: 1, backgroundColor:'none', justifyContent:'flex-end'}}>
                  <PrimaryButton title="NEXT" onPressPrimaryButton={() => {this.setState({addMembersVisible: true,});}} />
                </View>

                <View style={{flex: 0.2, backgroundColor:'none'}} />
              </View>
              <View style={{flex: 0.5}} />
            </View>
          </TouchableWithoutFeedback>
          {/* </ModalContent> */}
        </BottomModal>

        {/* Group Icons Modal */}
        <BottomModal
          visible={this.state.groupIconsVisible}
          onTouchOutside={() => this.setState({groupIconsVisible: false})}
          swipeDirection={['up', 'down']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={event => {this.setState({groupIconsVisible: false});}}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          useNativeDriver={true}
          width={wp('100%')}
          height={hp('50%')}
          modalStyle={{
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            backgroundColor: '#B5BBC6',
          }}
          hasBackdrop={true}
          hideModalContentWhileAnimating={true}>
          <View style={{flexDirection:'row', flex:1}}>
            <View style={{flex: 0.03}} />

            <View style={{flexDirection:'column', justifyContent:'space-around', flex:1}}>
              <View style={{flex: 0.2}} />
              {/* 1st Row of Group Icons */}
              <View style={{flexDirection: 'row', flex:1, justifyContent:'space-around'}}> 
                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity style={[stylesShape.CircleShapeView, {justifyContent:'center', alignItems:'center'}]}>
                    <FontAwesome5Icon name="book" size={30} />
                  </TouchableOpacity>
                  <View style={{flex: 0.01}} />
                  <Text style={[styles.bcRBB, {fontSize: 14}]}>STUDY</Text>
                </View>

                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity style={[stylesShape.CircleShapeView, {justifyContent:'center', alignItems:'center'}]}>
                    <FontAwesomeIcon name="code" size={30} />
                  </TouchableOpacity>
                  <View style={{flex: 0.01}} />
                  <Text style={[styles.bcRBB, {fontSize: 14}]}>CODING</Text>
                </View>

                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity style={[stylesShape.CircleShapeView, {justifyContent:'center', alignItems:'center'}]}>
                    <Icon name="ios-fitness" size={40} />
                  </TouchableOpacity>
                  <View style={{flex: 0.01}} />
                  <Text style={[styles.bcRBB, {fontSize: 14}]}>FITNESS</Text>
                </View>
              </View>
              {/* 2nd Row of Group Icons */}
              <View style={{flexDirection: 'row', flex:1, justifyContent:'space-around'}}> 
                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity style={[stylesShape.CircleShapeView, {justifyContent:'center', alignItems:'center'}]}>
                    <FontAwesomeIcon name="money" size={30} />
                  </TouchableOpacity>
                  <View style={{flex: 0.01}} />
                  <Text style={[styles.bcRBB, {fontSize: 14}]}>FINANCE</Text>
                </View>

                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity style={[stylesShape.CircleShapeView, {justifyContent:'center', alignItems:'center'}]}>
                    <FontAwesomeIcon name="users" size={30} />
                  </TouchableOpacity>
                  <View style={{flex: 0.01}} />
                  <Text style={[styles.bcRBB, {fontSize: 14}]}>FAMILY</Text>
                </View>

                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity style={[stylesShape.CircleShapeView, {justifyContent:'center', alignItems:'center'}]}>
                    <FontAwesome5Icon name="blog" size={30} />
                  </TouchableOpacity>
                  <View style={{flex: 0.01}} />
                  <Text style={[styles.bcRBB, {fontSize: 14}]}>WRITING</Text>
                </View>
              </View>
              {/* 3rd Row of Group Icons */}
              <View style={{flexDirection: 'row', flex:1, justifyContent:'space-around'}}> 
                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity style={[stylesShape.CircleShapeView, {justifyContent:'center', alignItems:'center'}]}>
                    <FontAwesome5Icon name="business-time" size={30}/>
                  </TouchableOpacity>
                  <View style={{flex: 0.01}} />
                  <Text style={[styles.bcRBB, {fontSize: 14}]}>WORK</Text>
                </View>

                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity style={[stylesShape.CircleShapeView, {justifyContent:'center', alignItems:'center'}]}>
                    <FontAwesome5Icon name="map-marked-alt" size={30} />
                  </TouchableOpacity>
                  <View style={{flex: 0.01}} />
                  <Text style={[styles.bcRBB, {fontSize: 14}]}>TRAVEL</Text>
                </View>

                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity style={[stylesShape.CircleShapeView, {justifyContent:'center', alignItems:'center'}]}>
                    <FontAwesomeIcon name="shopping-cart" size={30}/>
                  </TouchableOpacity>
                  <View style={{flex: 0.01}} />
                  <Text style={[styles.bcRBB, {fontSize: 14}]}>SHOPPING</Text>
                </View>
              </View>
              <View style={{flex:0.4}} />
            </View>
            <View style={{flex: 0.03}} />
          </View>
          </BottomModal>

        {/* Add Member Modal */}
        <BottomModal
          visible={this.state.addMembersVisible}
          onTouchOutside={() => this.setState({addMembersVisible: false})}
          swipeDirection={['up', 'down']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={event => {this.setState({addMembersVisible: false});}}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          useNativeDriver={true}
          width={wp('100%')}
          height={hp('85%')}
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
                <View style={{flex:0.02, backgroundColor: 'none'}} />
                <Text style={[styles.h1PSBB, {fontSize: 30, color: '#000000'}]}>ADD BUDDIES</Text>
                <View style={{flex:0.03, backgroundColor: 'none'}} />
                <TextInput
                  placeholder="Search Buddies"
                  style={[textInput.generalTextInput, {alignSelf:'center'}]} />
                <View style={{flex:0.03, backgroundColor: 'none'}} />

                <BuddyAddComponent  onUserProfilePress={()=> this.props.navigation.navigate('UserProfile')} />

                <View style={{flex: 1, backgroundColor:'none', justifyContent:'flex-end'}}>
                  <PrimaryButton
                  title="DONE" 
                  onPressPrimaryButton={() => {this.setState({addMembersVisible: false, createGroupVisible: false});}} />
                </View>
                {/* Bottom Spacer for last Primary Icon */}
                <View style={{flex: 0.08, backgroundColor:'none'}} />
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
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    borderWidth: 3,
    borderColor: '#00A1ED',
    // borderColor: '#56575D',
    // borderColor: '#333647',
    shadowColor: '#00A1ED67',
    shadowOffset: {width: 0, height: 7},
    shadowRadius: 6,
  },
});


export default AllGroupsScreen;

        // <BottomModal
        //   visible={this.state.createGroupVisible}
        //   height={0.8}>
        //   <Text>Create Group Modal</Text>
        //   <Button
        //     onPress={() => {
        //       this.setState({
        //         // createGroupVisible: false,
        //         addMembersVisible: true,
        //       });
        //     }}
        //     title="Next"
        //   />
        // </BottomModal>

// Icons : 

// Study : 
// <FontAwesome5Icon name="book" size={30} />

// Code : 
// <FontAwesomeIcon name="code" size={30} />

// Workout : 
// <Icon name="ios-fitness" size={40}/>

// Finance/Accounts :
// <FontAwesomeIcon name="money" size={30}/>

// Family/Meeting : 
// <FontAwesomeIcon name= "users" size={30}/>

// Blog/Write : 
// <FontAwesome5Icon name="blog" size={30}/>

// Work : 
// <FontAwesome5Icon name="business-time" size={30}/>

// Travel : 
// <FontAwesome5Icon name= "map-marked-alt" size={30}/>

// Shopping : 
// <FontAwesomeIcon name="shopping-cart" size={30}/>