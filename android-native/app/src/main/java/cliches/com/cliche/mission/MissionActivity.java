package cliches.com.cliche.mission;

import android.content.Intent;
import android.databinding.DataBindingUtil;
import android.support.annotation.StringRes;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.GridLayoutManager;

import com.afollestad.materialdialogs.MaterialDialog;

import cliches.com.cliche.R;
import cliches.com.cliche.databinding.ActivityMissionBinding;
import cliches.com.cliche.models.Mission;
import cliches.com.cliche.mission.MissionPresenter;
import cliches.com.cliche.mission.SpotsAdapter;
import cliches.com.cliche.models.Spot;
import cliches.com.cliche.spot.SpotActivity;
import timber.log.Timber;

public class MissionActivity extends AppCompatActivity implements MissionPresenter.ViewActions {

    public static final String MISSION_KEY = "mission_key";

    ActivityMissionBinding mViewBinding;
    MissionPresenter mPresenter;
    SpotsAdapter mSpotAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mission);

        Mission mission = (Mission) getIntent().getSerializableExtra(MISSION_KEY);
        if(mission == null) {
            Timber.w("Trying to open MissionActivity without a missions");
            return;
        }

        mViewBinding = DataBindingUtil.setContentView(this, R.layout.activity_mission);
        mPresenter = new MissionPresenter(this, mission);
        mSpotAdapter = new SpotsAdapter(this, mPresenter);

        setupToolbar();
        setupRecyclerView();

        getSupportActionBar().setTitle(mission.name);
        mViewBinding.setPresenter(mPresenter);

        mPresenter.refreshDisplay();
        mPresenter.refreshSpots();
    }

    private void setupRecyclerView() {
        GridLayoutManager layoutManager = new GridLayoutManager(this, 2);
        mViewBinding.spotsList.setLayoutManager(layoutManager);
        mViewBinding.spotsList.setAdapter(mSpotAdapter);
    }

    private void setupToolbar() {
        setSupportActionBar(mViewBinding.toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }

    @Override
    public void notifyNewData() {
        mSpotAdapter.notifyDataSetChanged();
    }

    @Override
    public void open(Spot spot) {
        Intent intent = new Intent(this, SpotActivity.class);
        intent.putExtra(SpotActivity.SPOT_KEY, spot);

        startActivity(intent);
    }
}
