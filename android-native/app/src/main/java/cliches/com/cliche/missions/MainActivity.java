package cliches.com.cliche.missions;

import android.content.Intent;
import android.databinding.DataBindingUtil;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;

import cliches.com.cliche.mission.MissionActivity;
import cliches.com.cliche.R;
import cliches.com.cliche.databinding.ActivityMainBinding;
import cliches.com.cliche.models.Mission;

public class MainActivity extends AppCompatActivity implements MissionsPresenter.ViewActions {

    private ActivityMainBinding mViewBinding;
    private MissionsPresenter mPresenter;
    private MissionsAdapter mMissionAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mViewBinding = DataBindingUtil.setContentView(this, R.layout.activity_main);
        mPresenter = new MissionsPresenter(this);
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
        setSupportActionBar( mViewBinding.toolbar);
    }

    // View Actions

    @Override
    public void notifyNewData() {
        mMissionAdapter.notifyDataSetChanged();
    }

    @Override
    public void open(Mission tappedMission) {
        Intent intent = new Intent(this, MissionActivity.class);
        intent.putExtra(MissionActivity.MISSION_KEY, tappedMission);
        startActivity(intent);
    }
}
