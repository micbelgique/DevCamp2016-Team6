package cliches.com.cliche.screens.missions;


import android.widget.ImageView;

import java.util.ArrayList;
import java.util.List;

import cliches.com.cliche.models.Mission;
import cliches.com.cliche.utils.App;
import rx.Subscription;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;
import timber.log.Timber;

public class MissionsListPresenter {
    private ViewActions mViewActions;
    private Subscription mMissionsSubscription;
    private List<Mission> mMissions;

    public Mission getMission(int position) {
        return mMissions.get(position);
    }

    public int missionCount() {
        return mMissions.size();
    }

    public void openMission(int position, ImageView sharedView) {
        Mission tappedMission = mMissions.get(position);

        mViewActions.open(tappedMission, sharedView);
    }

    public interface ViewActions {
        void notifyNewData();
        void open(Mission tappedMission, ImageView sharedView);
    }

    public MissionsListPresenter(ViewActions viewActions) {
        mViewActions = viewActions;
        mMissions = new ArrayList<>();
    }

    public void refreshMissions() {
        mMissionsSubscription = App.get().getApi().getMissions()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                        missions -> {
                            mMissions = missions;
                            Timber.d("missionsHolder: %s", missions.toString());
                        },
                        throwable -> { Timber.e(throwable, "Error while fetching missions"); },
                        () -> {
                            mViewActions.notifyNewData();
                        }
                );
    }

    public void cancelSubscription() {
        if(mMissionsSubscription != null) {
            mMissionsSubscription.unsubscribe();;
        }
    }
}
