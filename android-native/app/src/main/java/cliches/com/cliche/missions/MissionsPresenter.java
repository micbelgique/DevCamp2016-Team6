package cliches.com.cliche.missions;


public class MissionsPresenter {

    private final ViewActions mViewActions;

    public interface ViewActions {

    }

    public MissionsPresenter(ViewActions viewActions) {
        mViewActions = viewActions;
    }
}
