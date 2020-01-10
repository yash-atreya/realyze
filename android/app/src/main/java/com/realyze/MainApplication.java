package com.realyze;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.zmxv.RNSound.RNSoundPackage;
import com.reactlibrary.RNCAppearancePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

//Multidex
import androidx.multidex.MultiDexApplication;

//NetInfo
import com.reactnativecommunity.netinfo.NetInfoPackage;
//Firebase Messaging
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;

//Firebase Storage
import io.invertase.firebase.storage.ReactNativeFirebaseStoragePackage;

//Auth
import io.invertase.firebase.auth.ReactNativeFirebaseAuthPackage;
//Firestore
import io.invertase.firebase.firestore.ReactNativeFirebaseFirestorePackage;
//Cloud Functions
import io.invertase.firebase.functions.ReactNativeFirebaseFunctionsPackage;
//Dynamic Links
import io.invertase.firebase.dynamiclinks.ReactNativeFirebaseDynamicLinksPackage;
//RNDateTimePicker
//import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;


public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          new ReactNativeFirebaseAuthPackage();
          new NetInfoPackage();
          new ReactNativeFirebaseFirestorePackage();
          new ReactNativeFirebaseFunctionsPackage();
          new ReactNativeFirebaseMessagingPackage();
          new ReactNativeFirebaseStoragePackage();
          new ReactNativeFirebaseDynamicLinksPackage();
          //new RNDateTimePickerPackage();
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
