#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <GoogleSignIn/GoogleSignIn.h>
#import <GoogleMaps/GoogleMaps.h>




@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"MVPMobileFeatures";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
//  [GIDSignIn sharedInstance].clientID = @"560425926868-n9hg1c37hsiqoi8u843o8aiqnl1k1tfi.apps.googleusercontent.com";
//  [GIDSignIn sharedInstance].delegate = self;
  [GMSServices provideAPIKey:@"AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M"];


  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}


- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    return [[GIDSignIn sharedInstance] handleURL:url];
}

#pragma mark - GIDSignInDelegate

- (void)signIn:(GIDSignIn *)signIn didSignInForUser:(GIDGoogleUser *)user withError:(NSError *)error {
    if (error == nil) {
        // Signed in successfully
        // Access user information using user.profile and user.authentication
    } else {
        // Handle error
        NSLog(@"Google Sign-In Error: %@", error.localizedDescription);
    }
}



@end
