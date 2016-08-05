package cliches.com.cliche.missions;

import android.databinding.DataBindingUtil;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.Toolbar;

import cliches.com.cliche.R;
import cliches.com.cliche.databinding.ActivityMainBinding;

public class MainActivity extends AppCompatActivity {

    private ActivityMainBinding mViewBinding;
    private MissionsAdapter mMissionAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mViewBinding = DataBindingUtil.setContentView(this, R.layout.activity_main);
        mMissionAdapter = new MissionsAdapter();

        setupSharedPreferences();
        setupToolbar();
        setupRecyclerView();
    }

    private void setupSharedPreferences() {

    }

    private void setupRecyclerView() {
        mViewBinding.missionsList.setLayoutManager(new LinearLayoutManager(this));
        mViewBinding.missionsList.setAdapter(mMissionAdapter);
    }

    private void setupToolbar() {
        setSupportActionBar( mViewBinding.toolbar);
    }
}
