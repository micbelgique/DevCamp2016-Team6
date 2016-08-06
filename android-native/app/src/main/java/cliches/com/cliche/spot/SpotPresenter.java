package cliches.com.cliche.spot;


import android.databinding.ObservableField;
import android.support.annotation.StringRes;
import android.view.View;

import java.io.File;

import cliches.com.cliche.R;
import cliches.com.cliche.models.Spot;
import cliches.com.cliche.utils.App;
import cliches.com.cliche.utils.SendPictureRequest;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;
import timber.log.Timber;

public class SpotPresenter {

    private Spot mSpot;
    private ViewActions mViewActions;

    public ObservableField<String> spotName= new ObservableField<>("");
    public ObservableField<String> spotDescription = new ObservableField<>("");
    public ObservableField<String> imageURL = new ObservableField<>("");
    public ObservableField<Boolean> isOwned = new ObservableField<>(false);
    public ObservableField<Boolean> displayMap = new ObservableField<>(false);


    public interface ViewActions {
        void openPhotoCaptureScreen();
        void showUploadingDialog();
        void hideUploadingDialog();
        void showErrror(@StringRes int errorMessage);
    }

    public SpotPresenter(ViewActions viewActions, Spot spot) {
        mSpot = spot;
        mViewActions = viewActions;
        refresh();
    }

    public void refresh() {
        displayMap.set(mSpot.geolocalized);
        isOwned.set(mSpot.isOwned());
        spotName.set(mSpot.name);
        spotDescription.set(mSpot.description);
        imageURL.set(mSpot.isOwned() ? mSpot.ownPictureURL : mSpot.pictureURL);
    }

    public void sendPicture(File mSavedPicture) {
        SendPictureRequest request = new SendPictureRequest(mSavedPicture);

        mViewActions.showUploadingDialog();

        App.get().getApi().sendPicture(mSpot.missionServerId, mSpot.serverId, request.picture)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                        responseBody -> {},
                        throwable -> {
                            Timber.e(throwable, "Error while sending picture");
                            mViewActions.hideUploadingDialog();
                            mViewActions.showErrror(R.string.photo_upload_error);
                        },
                        () -> {
                            mViewActions.hideUploadingDialog();
                            mSpot.ownPictureURL = mSavedPicture.getAbsolutePath();
                            refresh();
                        }
                );
    }

    // XML Bound

    public void takePictureTapped(View view) {
        mViewActions.openPhotoCaptureScreen();
    }
}
