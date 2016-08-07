package cliches.com.cliche.screens.missions;

import android.app.ActivityOptions;
import android.content.Intent;
import android.databinding.DataBindingUtil;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.widget.ImageView;

import cliches.com.cliche.R;
import cliches.com.cliche.databinding.ActivityMissionsListBinding;
import cliches.com.cliche.models.Mission;
import cliches.com.cliche.screens.mission.MissionActivity;

public class MissionsListActivity extends AppCompatActivity implements MissionsListPresenter.ViewActions {

    private ActivityMissionsListBinding mViewBinding;
    private MissionsListPresenter mPresenter;
    private MissionsAdapter mMissionAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mViewBinding = DataBindingUtil.setContentView(this, R.layout.activity_missions_list);
        mPresenter = new MissionsListPresenter(this);
        mMissionAdapter = new MissionsAdapter(this, mPresenter);

        setupToolbar();
        setupRecyclerView();

        mPresenter.refreshMissions();
    }

    private void setupRecyclerView() {
        mViewBinding.missionsList.setLayoutManager(new LinearLayoutManager(this));
        mViewBinding.missionsList.setAdapter(mMissionAdapter);
    }

    private void setupToolbar() {
        setSupportActionBar(mViewBinding.toolbar);
        setTitle("");
    }

    // View Actions

    @Override
    public void notifyNewData() {
        mMissionAdapter.notifyDataSetChanged();
    }

    @Override
    public void open(Mission tappedMission, ImageView sharedView) {
        String transitionName = getString(R.string.mission_image_transition);
        ActivityOptions transitionActivityOptions = ActivityOptions.makeSceneTransitionAnimation(this, sharedView, transitionName);

        Intent intent = new Intent(this, MissionActivity.class);
        intent.putExtra(MissionActivity.MISSION_KEY, tappedMission);
        startActivity(intent, transitionActivityOptions.toBundle());
    }
}
