package cliches.com.cliche.screens.mission;


import android.databinding.ObservableField;
import android.view.View;

import java.util.ArrayList;
import java.util.List;

import cliches.com.cliche.models.Mission;
import cliches.com.cliche.models.Spot;
import cliches.com.cliche.utils.App;
import rx.Observable;
import rx.Subscription;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;
import timber.log.Timber;

public class MissionPresenter {

    private Mission mCurrentMission;
    private ViewActions  mViewAction;
    private Subscription spotsSubscription;
    private List<Spot> mSpots;

    public ObservableField<String> imageURL = new ObservableField<>("");
    public ObservableField<String> descriptionText = new ObservableField<>("");

    public Mission getMission() {
        return mCurrentMission;
    }

    public interface ViewActions {
        void notifyNewData();
        void open(Spot spot, View sharedView);
    }

    public MissionPresenter(ViewActions viewActions, Mission mission) {
        mViewAction = viewActions;
        mCurrentMission = mission;
        mSpots = new ArrayList<>();
    }

    public int spotsCount() {
        return mSpots.size();
    }

    public Spot getSpot(int position) {
        return mSpots.get(position);
    }

    public void openSpot(int position, View sharedView) {
        Spot tappedSpot = mSpots.get(position);
        mViewAction.open(tappedSpot, sharedView);
    }

    public void refreshDisplay() {
        imageURL.set(mCurrentMission.pictureURL);
        descriptionText.set(mCurrentMission.description);
    }

    public void refreshSpots() {
        spotsSubscription = App.get().getApi().getSpots(mCurrentMission.serverId)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .flatMap(Observable::from)
                .subscribe(
                        spot -> {
                            spot.missionServerId = mCurrentMission.serverId;
                            mSpots.add(spot);
                        },
                        throwable -> {
                            Timber.e(throwable, "Error while fetching Spots");
                        },
                        () -> {
                            refreshDisplay();
                            mViewAction.notifyNewData(); }
                );
    }
}
