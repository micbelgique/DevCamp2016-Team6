package cliches.com.cliche.utils;


import android.app.Application;

import timber.log.BuildConfig;
import timber.log.Timber;

public class App extends Application {

    private WebService.ClicheInterface mApi;
    private Preferences mPrefs;

    private static App sInstance;

    public static App get() {
        return sInstance;
    }

    public WebService.ClicheInterface getApi() {
        return mApi;
    }

    public Preferences getPrefs() {
        return mPrefs;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        sInstance = this;
        initializeTimber();
        initializePrefs();
        initializeWebService();
    }

    private void initializeTimber() {
        if(BuildConfig.DEBUG) {
            Timber.plant(new Timber.DebugTree());
        }
    }

    private void initializePrefs() {
        mPrefs = Preferences.init(this);
    }

    private void initializeWebService() {
        mPrefs.initializeUUIDIfNecessary();
        AuthInterceptor authInterceptor = new AuthInterceptor(mPrefs.getDeviceId());
        mApi = new WebService(authInterceptor).getApi();
    }
}
