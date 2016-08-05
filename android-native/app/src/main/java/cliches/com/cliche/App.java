package cliches.com.cliche;


import android.app.Application;

import cliches.com.cliche.missions.AuthInterceptor;
import cliches.com.cliche.missions.MissionHolder;
import cliches.com.cliche.missions.Preferences;
import cliches.com.cliche.missions.WebService;
import rx.Observable;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;
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
        initializePrefs();
        initializeWebService();
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
