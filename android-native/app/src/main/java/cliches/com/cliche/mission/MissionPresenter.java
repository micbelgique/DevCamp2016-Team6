package cliches.com.cliche.mission;


import android.support.annotation.StringRes;

import java.util.ArrayList;
import java.util.List;

import cliches.com.cliche.R;
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

    public interface ViewActions {
        void notifyNewData();
        void open(Spot spot);
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

    public void openSpot(int position) {
        Spot tappedSpot = mSpots.get(position);

        mViewAction.open(tappedSpot);
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
                        () -> { mViewAction.notifyNewData(); }
                );
    }
}
