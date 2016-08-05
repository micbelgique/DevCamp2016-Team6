package cliches.com.cliche;


import android.app.Application;
import android.databinding.ObservableField;

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

    public Preferences getPrefs() {
        return mPrefs;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        sInstance = this;
        initializePrefs();
        initializeWebService();

        Observable<MissionHolder> observable = mApi.getMissions();

        observable
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                        missionHolder -> {
                            Timber.d("missionsHolder: %s", missionHolder.toString());
                        },
                        throwable -> { Timber.e(throwable, "Error while fetching missions"); },
                        () -> {}
                );
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
